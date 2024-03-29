import React, { useEffect, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
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
import { ButtonGroup, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { HiHome } from "react-icons/hi";
import { BiSearchAlt } from "react-icons/bi";
import Home from "../Home";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import { StudentInterface } from "../../models/IStudent";

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

function DataStudent() {
  /////////////////////////////////////////////////////

  let navigate = useNavigate();

  const [Studentstable, setStudentstable] = useState<StudentInterface[]>([]);
  const [Filter, setFilter] = useState(Studentstable);
  const [input, setInput] = useState("");

  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const [rowID, setRowID] = useState("");

  const handleClickOpenPopup = (id: string) => {
    console.log('click');

    setRowID(id);
    setIsOpenPopup(true);
  };
  const handleClickClosePopup = () => setIsOpenPopup(false);
  /////////////////////////////////////////////////////
  const apiUrl = "http://localhost:8080";
  const requestOptionsGet = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };
  /////////////////////////////////////////////////////

  //แสดงข้อมูล student ทั้งหมด
  const feachStudentstable = async () => {
    fetch(`${apiUrl}/student_table`, requestOptionsGet)
      .then((response) => response.json())
      .then((result) => {
        console.log(result.data);
        setStudentstable(result.data);
      });
  };

  const DeleteStudent = (id: string) => {
    console.log(id);
    const requestOptions = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };

    fetch(`${apiUrl}/delete_student/${id}`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        console.log(res);
        if (res.data) {
          // setSuccess(true);
          // alert(`Are you sure delete id: ${id}`);
          if (localStorage.getItem("Student-id") === id) {
            console.log(id);
            localStorage.clear();
            window.location.href = "/";
          } else {
            window.location.reload();
          }
        } else {
          // setError(true);
        }
      });
  };

  /////////////////////////////////////////////////////

  useEffect(() => {
    feachStudentstable();
  }, []);

  useEffect(() => {
    const NewFilter = Studentstable.filter((Studentstable) => {
      return Studentstable.Student_Number.includes(input);
    });

    setFilter(NewFilter);
  }, [Studentstable, input]);

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

  /////////////////////////////////////////////////////

  return (
    <div className="DataStudent" id="outer-container">
      <ThemeProvider theme={Theme}>
        <Adminbar
          pageWrapId={"page-DataStudent"}
          outerContainerId={"outer-container"}
        />
        <div id="page-DataStudent">
          <React.Fragment>
            <Box sx={{ backgroundColor: "#313131", height: "100vh" }}>
              <CssBaseline />
              <Container maxWidth="lg">
                <Paper sx={{ padding: 1 }}>
                  <Box display={"flex"}>
                    <Box sx={{ marginTop: 1.6 }}>
                      <Typography variant="h4" gutterBottom>
                        STUDENT
                      </Typography>
                    </Box>
                    <Box sx={{ marginLeft: 32 }}>
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
                    <Box sx={{ marginLeft: 45.4, marginTop: 0.9 }}>
                      <Button
                        variant="contained"
                        component={RouterLink}
                        to="/CreateStudent"
                        color="secondary"
                        size="large"
                      >
                        <a className="menu-button-back">create</a>
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
                        <TableCell align="center">ชื่อ-สกุล</TableCell>
                        <TableCell align="center">
                          รหัสประจำตัวประชาชน
                        </TableCell>
                        <TableCell align="center">เบอร์โทรศัพท์</TableCell>
                        <TableCell align="center">OPTION</TableCell>
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
                            {row.Student_Number}
                          </TableCell>
                          <TableCell align="center">
                            {row.Student_Name}
                          </TableCell>
                          <TableCell align="center">
                            {row.Student_Identity_Card}
                          </TableCell>
                          <TableCell align="center">
                            {row.Student_Tel}{" "}
                          </TableCell>
                          <TableCell align="center">
                            <ButtonGroup>
                              <Button
                                onClick={() =>
                                  navigate(`UpdateStudent/${row.ID}`)
                                }
                                color="info"
                              >
                                update
                              </Button>
                              <Button
                                onClick={() =>
                                  navigate(`SearchStudent/${row.ID}`)
                                }
                              >
                                <SearchIcon />
                              </Button>
                              <Button
                                onClick={() => handleClickOpenPopup(row.ID + "")}
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
              {/* Popup */}
              <Dialog
                open={isOpenPopup}
                onClose={handleClickClosePopup}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      color: "#e65100",
                      fontSize: "2rem",
                    }}
                  >
                    Delete {<PriorityHighIcon fontSize="large" />}
                  </Box>
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    Are you sure to delete ?
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClickClosePopup}>Cancel</Button>
                  <Button onClick={() => DeleteStudent(rowID + "")}>Sure</Button>
                </DialogActions>
              </Dialog>
            </Box>
          </React.Fragment>
        </div>
      </ThemeProvider>
    </div>
  );
}

export default DataStudent;
