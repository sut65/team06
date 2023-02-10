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
import { AdminInterface } from "../../models/IAdmin";
import TextField from "@mui/material/TextField";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { HiHome } from "react-icons/hi";
import { Adminbar } from "../Bar-Admin";
import { BiSearchAlt } from "react-icons/bi";
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

function DataAdmin() {
  /////////////////////////////////////////////////////
  let navigate = useNavigate();
  console.log(navigate);
  const [Admintable, setAdmintable] = useState<AdminInterface[]>([]);
  const [filter, setFilter] = useState(Admintable);
  const [name, setname] = useState<string>("");
  /////////////////////////////////////////////////////
  const apiUrl = "http://localhost:8080";
  const requestOpionsGet = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };
  /////////////////////////////////////////////////////

  //แสดงข้อมูล admin ทั้งหมด
  const feachAdmintable = async () => {
    fetch(`${apiUrl}/admin_table`, requestOpionsGet)
      .then((response) => response.json())
      .then((result) => {
        console.log(result.data);
        setAdmintable(result.data);
      });
  };

  /////////////////////////////////////////////////////
  const deleteAdmin = (id: string) => {
    console.log(id);
    const requestOptions = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };

    fetch(`${apiUrl}/delete_admin/${id}`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        console.log(res);
        if (res.data) {
          alert(`Are you sure delete id: ${id}`);
          if (localStorage.getItem("Admin-id") === id) {
            console.log(id);
            localStorage.clear();
            window.location.href = "/";
          } else {
            window.location.reload();
          }
        } else {
        }
      });
  };

  /////////////////////////////////////////////////////

  useEffect(() => {
    feachAdmintable();
  }, []);
  useEffect(() => {
    const NewFilter = Admintable.filter((Admintable) => {
      return Admintable.Admin_Name?.includes(name);
    });

    setFilter(NewFilter);
  }, [Admintable, name]);

  /////////////////////////////////////////////////////

  return (
    <div className="DataAdmin" id="outer-container">
      <ThemeProvider theme={Theme}>
        <Adminbar
          pageWrapId={"page-DataAdmin"}
          outerContainerId={"outer-container"}
        />
        <div id="page-DataAdmin">
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
                        Admin
                      </Typography>
                    </Box>
                    <Box sx={{ marginLeft: 25 }}>
                      <Typography variant="h4" gutterBottom>
                        <TextField
                          fullWidth
                          id="Admin_Name"
                          type="string"
                          label="ค้นหา"
                          variant="standard"
                          name="Admin_Name"
                          value={name}
                          onChange={(event) => setname(event.target.value)}
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
                        to="/CreateAdmin"
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
                        <TableCell align="center">Row</TableCell>
                        <TableCell align="center">ID</TableCell>
                        <TableCell align="center">Admin_Name</TableCell>
                        <TableCell align="center">Admin_Email</TableCell>
                        <TableCell align="center">Admin_Tel</TableCell>
                        <TableCell align="center"></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filter.map((row, idx) => (
                        <TableRow
                          key={row.ID}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell align="center">{idx + 1}</TableCell>
                          <TableCell align="center">{row.ID}</TableCell>
                          <TableCell align="center">{row.Admin_Name}</TableCell>
                          <TableCell align="center">
                            {row.Admin_Email}
                          </TableCell>
                          <TableCell align="center">{row.Admin_Tel}</TableCell>
                          <TableCell align="center">
                            <ButtonGroup>
                              <Button
                                onClick={() =>
                                  navigate(`UpdateAdmin/${row.ID}`)
                                }
                                color="info"
                              >
                                update
                              </Button>
                              <Button
                                onClick={() => deleteAdmin(row.ID + "")}
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

export default DataAdmin;
