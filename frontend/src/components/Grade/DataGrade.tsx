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
import { ButtonGroup, TextField } from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import { GradeInterface } from "../../models/IGrade";
import Home from "../Home";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { HiHome } from "react-icons/hi";
import { BiSearchAlt } from "react-icons/bi";
import { Adminbar } from "../Bar-Admin";


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

function DataGrade() {
  /////////////////////////////////////////////////////
  let navigate = useNavigate();
  const [message, setAlertMessage] = React.useState("");

  const [Gradestable, setGradestable] = useState<GradeInterface[]>([]);
  const [Filter, setFilter] = useState(Gradestable);
  const [input, setInput] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  /////////////////////////////////////////////////////
  const apiUrl = "http://localhost:8080";
  const requestOpionsGet = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };
  /////////////////////////////////////////////////////

  //แสดงข้อมูล Grade ทั้งหมด
  const feachGradestable = async () => {
    fetch(`${apiUrl}/grade_table`, requestOpionsGet)
      .then((response) => response.json())
      .then((result) => {
        console.log(result.data);
        setGradestable(result.data);
      });
  };

  /////////////////////////////////////////////////////
  const DeleteGrade = (id: string) => {
    console.log(id);
    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };

    fetch(`${apiUrl}/delete_Grade/${id}`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        console.log(res);
        if (res.data) {
          // setSuccess(true);
          alert(`Are you sure delete id: ${id}`);
          setTimeout(() => {
            window.location.href = "/DataGrade";
          }, 500);
        } else {
          // setError(true);
        }
      });
  };

  /////////////////////////////////////////////////////

  useEffect(() => {
    feachGradestable();
  }, []);
  useEffect(() => {
    const NewFilter = Gradestable.filter((Gradestable) => {
      return Gradestable.Grade_Student_Number.includes(input);
    });

    setFilter(NewFilter);
  }, [Gradestable, input]);

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

  /////////////////////////////////////////////////////

  return (
    <div className="DataGrade" id="outer-container">
      <ThemeProvider theme={Theme}>
        <Adminbar
          pageWrapId={"page-DataGrade"}
          outerContainerId={"outer-container"}
        />
        <div id="page-DataGrade">
          <React.Fragment>
            <Box sx={{ backgroundColor: "#313131", height: "100vh" }}>
              <CssBaseline />
              <Container maxWidth="lg">
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
                        GRADE
                      </Typography>
                    </Box>
                    <Box sx={{ marginLeft: 25 }}>
                      <Typography variant="h4" gutterBottom>
                        <TextField
                          fullWidth
                          id="Student_Number"
                          type="string"
                          label="ค้นหา รหัสนักศึกษา"
                          variant="standard"
                          name="Student_Name"
                          value={input}
                          onChange={(event) => setInput(event.target.value)}
                        />
                      </Typography>
                    </Box>
                    <Box sx={{ marginTop: 2.3 }}>
                      <BiSearchAlt size="30" />
                    </Box>
                    <Box sx={{ marginLeft: 43.5, marginTop: 0.9 }}>
                      <Button
                        variant="contained"
                        component={RouterLink}
                        to="/CreateGrade"
                        color="secondary"
                        size="large"
                      >
                        create
                      </Button>
                    </Box>
                  </Box>
                </Paper>
                <TableContainer component={Paper} sx={{ marginTop: 1 }}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell align="center">ID</TableCell>
                        <TableCell align="center">รหัสนักศึกษา</TableCell>
                        <TableCell align="center">รหัสวิชา</TableCell>
                        <TableCell align="center">ชื่อวิชา</TableCell>
                        <TableCell align="center">เกรด</TableCell>
                        <TableCell align="center"></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {Filter.map((row) => (
                        <TableRow
                          key={row.ID}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell align="center">{row.ID}</TableCell>
                          <TableCell align="center">
                            {row.Grade_Student_Number}
                          </TableCell>
                          <TableCell align="center">
                            {row.Grade_Code_Supject}
                          </TableCell>
                          <TableCell align="center">
                            {row.Grade_Supject}
                          </TableCell>
                          <TableCell align="center">{row.Grade} </TableCell>
                          <TableCell align="center">
                            <ButtonGroup>
                              <Button
                                onClick={() =>
                                  navigate(`UpdateGrade/${row.ID}`)
                                }
                                color="info"
                              >
                                update
                              </Button>
                              <Button
                                onClick={() =>
                                  navigate(`SearchGrade/${row.ID}`)
                                }
                              >
                                <SearchIcon />
                              </Button>
                              <Button
                                onClick={() => DeleteGrade(row.ID + "")}
                                color="secondary"
                              >
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

export default DataGrade;
