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
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import {
  ButtonGroup,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { PostponementInterface } from "../../models/IPostponement";
import SearchIcon from "@mui/icons-material/Search";
import { ThemeProvider, createTheme } from "@mui/material/styles";
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
  let navigate = useNavigate();

  const [Postponementtable, setPostponementable] = useState<
    PostponementInterface[]
  >([]);

  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const [rowID, setRowID] = useState("");

  const handleClickOpenPopup = (id: string) => {
    setRowID(id)
    setIsOpenPopup(true);
  }
  const handleClickClosePopup = () => setIsOpenPopup(false);

  const id = localStorage.getItem("Student-id");
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

  //แสดงข้อมูล postponement ทั้งหมด
  const feachPostponementtable = async () => {
    fetch(`${apiUrl}/postponement/${id}`, requestOpionsGet)
      .then((response) => response.json())
      .then((result) => {
        if (result.data) {
          console.log(result.data);
          setPostponementable(result.data);
        } else {
          return false;
        }
      });
  };

  /////////////////////////////////////////////////////
  const deletePostponement = (id: string) => {
    console.log(id);
    const requestOptions = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };

    fetch(`${apiUrl}/delete_postponementadmin/${id}`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        console.log(res);
        if (res.data) {
          // setSuccess(true);
          // alert(`Are you sure delete id: ${id}`);
          setTimeout(() => {
            window.location.href = "/DataPostponement";
          }, 500);
        } else {
          // setError(true);
        }
      });
  };

  /////////////////////////////////////////////////////

  useEffect(() => {
    feachPostponementtable();
  }, []);

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
              <Container maxWidth="lg">
                <Paper sx={{ padding: 1 }}>
                  <Box display={"flex"}>
                    <Box sx={{ marginTop: 1.6 }}>
                      <Typography variant="h4" gutterBottom>
                        POSTPONEMENT
                      </Typography>
                    </Box>

                    <Box sx={{ marginLeft: 85, marginTop: 0.9 }}>
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
                <TableContainer component={Paper} sx={{ marginTop: 1 }}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell align="center">Row</TableCell>
                        <TableCell align="center">ID</TableCell>
                        <TableCell align="center">
                          Postponement_Student_Number
                        </TableCell>
                        <TableCell align="center">
                          Postponement_Student_Name
                        </TableCell>
                        <TableCell align="center">
                          Postponement_AcademicYear
                        </TableCell>
                        <TableCell align="center">Postponement_Gpax</TableCell>
                        <TableCell align="center">
                          Postponement_Credit
                        </TableCell>
                        <TableCell align="center">
                          Postponement_Reasons
                        </TableCell>
                        <TableCell align="center"></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {Postponementtable.map((row, idx) => (
                        <TableRow
                          key={row.ID}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell align="center">{idx + 1}</TableCell>
                          <TableCell align="center">{row.ID}</TableCell>
                          <TableCell align="center">
                            {row.Postponement_Student_Number}
                          </TableCell>
                          <TableCell align="center">
                            {row.Postponement_Student_Name}
                          </TableCell>
                          <TableCell align="center">
                            {row.Postponement_AcademicYear}
                          </TableCell>
                          <TableCell align="center">
                            {row.Postponement_Gpax}
                          </TableCell>
                          <TableCell align="center">
                            {row.Postponement_Credit}
                          </TableCell>
                          <TableCell align="center">
                            {row.Postponement_Reasons}
                          </TableCell>
                          <TableCell align="center">
                            <ButtonGroup>
                              <Button
                                onClick={() =>
                                  navigate(`UpdatePosponement/${row.ID}`)
                                }
                                color="info"
                              >
                                update
                              </Button>
                              <Button
                                onClick={() =>
                                  navigate(`SearchPostponement/${row.ID}`)
                                }
                              >
                                <SearchIcon />{" "}
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
                  <Button onClick={() => deletePostponement(rowID + "")}>
                    Sure
                  </Button>
                </DialogActions>
              </Dialog>
            </Box>
          </React.Fragment>
        </div>
      </ThemeProvider>
    </div>
  );
}

export default DataPostponement;
