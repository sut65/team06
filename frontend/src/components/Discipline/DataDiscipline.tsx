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
import { ButtonGroup, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import {
  Alert,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  Snackbar,
} from "@mui/material";

import { DisciplineInterface } from "../../models/IDiscipline";

import { Adminbar } from "../Bar-Admin";
import { HiHome } from "react-icons/hi";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
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

function DataDiscipline() {
  /////////////////////////////////////////////////////

  let navigate = useNavigate();

  const [Disciplines, ListDiscipline] = useState<DisciplineInterface[]>([]);

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
  const requestOpionsGet = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  /////////////////////////////////////////////////////

  //แสดงข้อมูล discipline ทั้งหมด
  const feachDiscipline = async () => {
    fetch(`${apiUrl}/ListDiscipline`, requestOpionsGet)
      .then((response) => response.json())
      .then((result) => {
        console.log(result.data);
        ListDiscipline(result.data);
      });
  };

  const DeleteDiscipline = (id: string) => {
    console.log(id);
    const requestOptions = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };

    fetch(`${apiUrl}/DeleteDiscipline/${id}`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        console.log(res);
        if (res.data) {
          // setSuccess(true);
          //alert(`Are you sure delete id: ${id}`);
          setTimeout(() => {
            window.location.href = "/DataDiscipline";
          }, 500);
        } else {
          // setError(true);
        }
      });
  };

  /////////////////////////////////////////////////////

  /////////////////////////////////////////////////////

  useEffect(() => {
    feachDiscipline();
  }, []);

  /////////////////////////////////////////////////////

  ///////////////////////////////////////////////////////////////////////

  const [token, setToken] = React.useState<String>("");
  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
    }
  }, []);

  if (!token) {
    return <Home />;
  }

  ///////////////////////////////////////////////////////////////////////

  return (
    <div className="DataDiscipline" id="outer-container">
      <ThemeProvider theme={Theme}>
        <Adminbar
          pageWrapId={"page-DataDiscipline"}
          outerContainerId={"outer-container"}
        />
        <div id="page-DataDiscipline">
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
                        DISCIPLINE
                      </Typography>
                    </Box>
                    <Box sx={{ marginLeft: 94, marginTop: 1.6 }}>
                      <Button
                        variant="contained"
                        component={RouterLink}
                        to="/CreateDiscipline"
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
                        <TableCell align="center">Student_Number</TableCell>
                        <TableCell align="center">Student_Name</TableCell>
                        <TableCell align="center">Discipline_Type</TableCell>
                        <TableCell align="center">Discipline_Reason</TableCell>
                        <TableCell align="center">
                          Discipline_Punishment
                        </TableCell>
                        <TableCell align="center">Discipline_Point</TableCell>
                        <TableCell align="center"></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {Disciplines.map((row) => (
                        <TableRow
                          key={row.ID}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell align="center">
                            {row.Student.Student_Number}
                          </TableCell>
                          <TableCell align="center">
                            {row.Student.Student_Name}
                          </TableCell>
                          <TableCell align="center">
                            {row.DisciplineType.DisciplineType_Name}
                          </TableCell>
                          <TableCell align="center">
                            {row.Discipline_Reason}
                          </TableCell>
                          <TableCell align="center">
                            {row.Discipline_Punishment}{" "}
                          </TableCell>
                          <TableCell align="center">
                            {row.Discipline_Point}{" "}
                          </TableCell>
                          <TableCell align="center">
                            <ButtonGroup>
                              <Button
                                onClick={() =>
                                  navigate(`UpdateDiscipline/${row.ID}`)
                                }
                                color="info"
                              >
                                update
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
                  <Button onClick={() => DeleteDiscipline(rowID + "")}>Sure</Button>
                </DialogActions>
              </Dialog>
            </Box>
          </React.Fragment>
        </div>
      </ThemeProvider>
    </div>
  );
}

export default DataDiscipline;
