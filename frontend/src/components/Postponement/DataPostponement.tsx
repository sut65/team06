import React, { useEffect, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { ButtonGroup } from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { PostponementInterface } from "../../models/IPostponement";
import SearchIcon from "@mui/icons-material/Search";

import TextField from "@mui/material/TextField";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { HiHome } from "react-icons/hi";
import { BiSearchAlt } from "react-icons/bi";
import { Studentbar } from "../Bar-Student";
import Home from "../Home";
const Theme = createTheme({
  palette: {
    primary: {
      main: "#313131",
    },
    secondary: {
      main: "#C70039",
    },
    info: {
      main: "#164DC9",
    },
  },
});

function DataPostponement() {
  /////////////////////////////////////////////////////
  let navigate = useNavigate()
  console.log(navigate)

  const [Postponementtable, setPostponementable] = useState<PostponementInterface[]>([]);

  const [filter, setFilter] = useState(Postponementtable);
  const [name, setname] = useState<string>("");
  /////////////////////////////////////////////////////
  const apiUrl = "http://localhost:8080";
  const requestOpionsGet = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };
  /////////////////////////////////////////////////////

  //แสดงข้อมูล postponement ทั้งหมด
  const feachPostponementtable = async () => {
    fetch(`${apiUrl}/postponement_table`, requestOpionsGet)
      .then((response) => response.json())
      .then((result) => {
        console.log(result.data);
        setPostponementable(result.data);
      });
  };

  /////////////////////////////////////////////////////
const deletePostponement = (id: string) => {
  console.log(id)
  const requestOptions = {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },

  };

  fetch(`${apiUrl}/delete_postponementadmin/${id}`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      console.log(res);
      if (res.data) {
        // setSuccess(true);
        alert(`Are you sure delete id: ${id}`)
        setTimeout(() => {
          window.location.href = "/DataPostponement";
        }, 500);
      } else {
        // setError(true);
      }
    });

}


  /////////////////////////////////////////////////////

  useEffect(() => {
    feachPostponementtable();
  }, []);

  useEffect(() => {
    const NewFilter = Postponementtable.filter((Postponementtable) => {
      return Postponementtable.Postponement_Student_Name?.includes(name, 0)
  });

  setFilter(NewFilter);
  }, [Postponementtable, name]);

  /////////////////////////////////////////////////////
  const [token, setToken] = useState<String>("");
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
    }
  }, []);

  if (!token) {
    return <Home />;
  }
  /////////////////////////////////////////////////
  return (
    <div className="DataPostponement" id="outer-container">
      <ThemeProvider theme={Theme}>
        <Studentbar
        pageWrapId={"page-DataPostponement"}
        outerContainerId={"outer-container"}
      />
      <div id="page-DataPostponement">
      <React.Fragment>
      <Box sx={{ backgroundColor: "#313131", height: "200vh" }}>
        <CssBaseline />
        <Container maxWidth="lg" >
          <Paper sx={{ padding: 1 }}>
            <Box display={"flex"}>
             <Box sx={{ marginTop: 1.6 }}>
                <Typography variant="h4" gutterBottom>
                      <Button
                          color="inherit"
                          component={RouterLink}
                          to="/HomeAdmin"
                          sx={{ marginBottom: 0.5 }}
                        >
                          <HiHome size="30" />
                      </Button>
                     POSTPONEMENT
                </Typography>
              </Box>
              <Box sx={{marginLeft:10}}>
                    <Typography variant="h4" gutterBottom >
                    <TextField
                        fullWidth
                        id="Student_Name"
                        type="string"
                        label="ค้นหา ชื่อนักศึกษา"
                        variant="standard"
                        name="Student_Name"
                        value={name}
                        onChange={(event) => setname(event.target.value)}
                      />
                    </Typography>
                  </Box>
                  <Box sx={{ marginTop: 2.3 }}>
                      <BiSearchAlt size="30" />
                    </Box>      
                <Box sx={{ marginLeft: 45, marginTop:0.9 }}>
                <Button
                  variant="contained"
                  component={RouterLink}
                  to="/CreatePostponement"
                  color="secondary"
                  size="large"
                >
                  create
                </Button>
              </Box>
            </Box>
          </Paper>
          <TableContainer component={Paper}sx={{ marginTop: 1 }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">Row</TableCell>
                  <TableCell align="center">ID</TableCell>
                  <TableCell align="center">Postponement_Student_Number</TableCell>
                  <TableCell align="center">Postponement_Student_Name</TableCell>
                  <TableCell align="center">Postponement_AcademicYear</TableCell>
                  <TableCell align="center">Postponement_Gpax</TableCell>
                  <TableCell align="center">Postponement_Credit</TableCell> 
                  <TableCell align="center">Postponement_Reasons</TableCell>
                  <TableCell align="center"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filter.map((row, idx) => (
                  <TableRow
                    key={row.ID}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="center">{idx + 1}</TableCell>
                    <TableCell align="center">{row.ID}</TableCell>
                    <TableCell align="center">{row.Postponement_Student_Number}</TableCell>
                    <TableCell align="center">{row.Postponement_Student_Name}</TableCell>
                    <TableCell align="center">{row.Postponement_AcademicYear}</TableCell>            
                    <TableCell align="center">{row.Postponement_Gpax}</TableCell>
                    <TableCell align="center">{row.Postponement_Credit}</TableCell>
                    <TableCell align="center">{row.Postponement_Reasons}</TableCell>    
                    <TableCell align="center">
                      <ButtonGroup>
                       <Button onClick={() => navigate(`UpdatePosponement/${row.ID}`)}color="info">update</Button>
                       <Button onClick={() => navigate(`SearchPostponement/${row.ID}`)}><SearchIcon /> </Button>
                        <Button onClick={() => deletePostponement(row.ID+"")}color="secondary">
                          <DeleteOutlineIcon />
                        </Button>
                      </ButtonGroup>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
        </Box>
      </React.Fragment>
      </div>
    </ThemeProvider>
  </div>
  );
}

export default DataPostponement;