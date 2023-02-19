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
import { ThemeProvider, createTheme } from "@mui/material/styles";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";

import { ScholarshipApInterface } from "../../models/IScholarshipAp";
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

function DataScholarshipAp() {
  /////////////////////////////////////////////////////

  let navigate = useNavigate();

  const [ScholarshipAp, setScholarshipAp] = useState<
    Partial<ScholarshipApInterface[]>
  >([]);

  console.log("ScholarshipAp", ScholarshipAp);

  ////////////////////////////alert/////////////////////
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const [rowID, setRowID] = useState("");

  const handleClickOpenPopup = (id: string) => {
    console.log("click");

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

  const fetchStudentByID = async () => {
    fetch(
      `${apiUrl}/ListScholarshipApBySID/${localStorage.getItem("Student-id")}`,
      requestOptionsGet
    )
      .then((response) => response.json())
      .then((result) => {
        result.data && setScholarshipAp(result.data);
        console.log("fetchStudentByID", result.data);
      });
  };

  ///delete scholarship/////////////////////////////////////
  const DeleteScholarship = (id: string) => {
    console.log(id);
    const requestOptions = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };

    fetch(`${apiUrl}/delete_scholarship_applicants/${id}`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        console.log(res);
        if (res.data) {
          setTimeout(() => {
            window.location.href = "/data_scholarship_applicants";
          }, 500);
        } else {
        }
      });
  };
  /////////////////////////////////////////////////////
  useEffect(() => {
    fetchStudentByID();
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

  return (
    <div className="DataScholarshipApplicant" id="outer-container">
      <ThemeProvider theme={Theme}>
        <Studentbar
          pageWrapId={"page-DataScholarshipApplicant"}
          outerContainerId={"outer-container"}
        />
        <div id="page-DataScholarshipApplicant">
          <Box sx={{ bgcolor: "#CFD8DC", height: "200vh" }}>
            <Container maxWidth="lg" sx={{ padding: 2 }}>
              <Paper sx={{ padding: 2, mb: 2 }}>
                <Box display={"flex"}>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography
                      sx={{
                        color: "#039BE5",
                        fontFamily: "fantasy",
                        fontSize: 30,
                        textAlign: "center",
                      }}
                    >
                      Scholarship Applicant
                    </Typography>
                  </Box>
                </Box>
              </Paper>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">
                        <h4>No.</h4>
                      </TableCell>
                      <TableCell align="center">
                        <h4>Name</h4>
                      </TableCell>
                      <TableCell align="center">
                        <h4>Identity Card</h4>
                      </TableCell>
                      <TableCell align="center">
                        <h4>Scholarship</h4>
                      </TableCell>
                      <TableCell align="center">
                        <h4>Branch</h4>
                      </TableCell>
                      <TableCell align="center">
                        <h4>Institute</h4>
                      </TableCell>
                      <TableCell align="center">
                        <h4>GPAX</h4>
                      </TableCell>
                      <TableCell align="center">
                        <h4>Reasons</h4>
                      </TableCell>
                      <TableCell align="center">
                        <h4>Options</h4>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {ScholarshipAp.map((row, idx) => (
                      <TableRow
                        key={row?.ID}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell align="center">{idx + 1}</TableCell>
                        <TableCell align="center">
                          {row?.Student.Student_Name}
                        </TableCell>
                        <TableCell align="center">
                          {row?.Identity_Card}
                        </TableCell>
                        <TableCell align="center">
                          {row?.Scholarship.Scholarship_Name}
                        </TableCell>
                        <TableCell align="center">
                          {row?.Branch.Branch_Name}
                        </TableCell>
                        <TableCell align="center">
                          {row?.Institute.Institute_Name}
                        </TableCell>
                        <TableCell align="center">{row?.GPAX}</TableCell>
                        <TableCell align="center">{row?.Reasons}</TableCell>
                        <TableCell align="center">
                          <ButtonGroup>
                            <Button
                              onClick={() =>
                                navigate(`UpdateScholarshipAp/${row?.ID}`)
                              }
                            >
                              UPDATE
                            </Button>
                            <Button
                              onClick={() => handleClickOpenPopup(row?.ID + "")}
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
                    color: "#DE3163",
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
                <Button onClick={() => DeleteScholarship(rowID + "")}>Sure</Button>
              </DialogActions>
            </Dialog>
          </Box>
        </div>
      </ThemeProvider>
    </div>
  );
}
export default DataScholarshipAp;
