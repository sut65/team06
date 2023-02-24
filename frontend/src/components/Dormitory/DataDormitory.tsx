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
import SearchIcon from "@mui/icons-material/Search";
import { ButtonGroup, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { HiHome } from "react-icons/hi";
import { BiSearchAlt } from "react-icons/bi";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";

import { DormitoryInterface } from "../../models/IDormitory";

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

function date_TO_String(date_Object: string): string {
  // get the year, month, date, hours, and minutes seprately and append to the strig.n
  let date_String: string =
    date_Object.slice(5, 7) +
    "/" +
    date_Object.slice(8, 10) +
    "/" +
    date_Object.slice(0, 4);
  return date_String;
}

function DataDormitory() {
  /////////////////////////////////////////////////////

  let navigate = useNavigate();
  console.log(navigate);

  const [dormitorytable, setDormitorytable] = useState<DormitoryInterface[]>(
    []
  );

  const [filter, setFilter] = useState(dormitorytable);
  const [Dormitory_Student_Number, setDormitory_Student_Number] = useState("");

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

  //แสดงข้อมูล dormitory ทั้งหมด
  const feachDormitorytable = async () => {
    fetch(`${apiUrl}/dormitory_table`, requestOpionsGet)
      .then((response) => response.json())
      .then((result) => {
        console.log(result.data);
        setDormitorytable(result.data);
      });
  };

  /////////////////////////////////////////////////////
  // ลบข้อมูล dormitory
  const deleteDormitory = (id: string) => {
    console.log(id);
    const requestOptions = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };

    fetch(`${apiUrl}/delete_dormitoty/${id}`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        console.log(res);
        if (res.data) {
          // setSuccess(true);
          // alert(`Are you sure delete id: ${id}`);
          setTimeout(() => {
            window.location.href = "/DataDormitory";
          }, 500);
        } else {
          // setError(true);
        }
      });
  };

  /////////////////////////////////////////////////////

  useEffect(() => {
    feachDormitorytable();
  }, []);

  useEffect(() => {
    const NewFilter = dormitorytable.filter((dormitorytable) => {
      return dormitorytable.Dormitory_Student_Number?.includes(
        Dormitory_Student_Number
      );
    });

    setFilter(NewFilter);
  }, [dormitorytable, Dormitory_Student_Number]);

  /////////////////////////////////////////////////////

  return (
    <div className="DataDormitory" id="outer-container">
      <ThemeProvider theme={Theme}>
        <Adminbar
          pageWrapId={"page-DataDormitory"}
          outerContainerId={"outer-container"}
        />
        <div id="page-DataDormitory">
          <React.Fragment>
            <Box sx={{ backgroundColor: "#313131", height: "100vh" }}>
              <CssBaseline />
              <Container maxWidth="lg" sx={{ padding: 1}}>
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
                        Dormitory
                      </Typography>
                    </Box>

                    <Box sx={{ marginLeft: 20 }}>
                      <Typography variant="h4" gutterBottom>
                        <TextField
                          fullWidth
                          id="Dormitory_Student_Number"
                          type="string"
                          label="ค้นหา รหัสนักศึกษา"
                          variant="standard"
                          name="Dormitory_Student_Number"
                          value={Dormitory_Student_Number}
                          onChange={(event) =>
                            setDormitory_Student_Number(event.target.value)
                          }
                        />
                      </Typography>
                    </Box>

                    <Box sx={{ marginTop: 2.3 }}>
                      <BiSearchAlt size="30" />
                    </Box>

                    <Box sx={{ marginLeft: 50, marginTop: 1.5 }}>
                      <Button
                        variant="contained"
                        component={RouterLink}
                        to="/CreateDormitory"
                        color="info"
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
                        <TableCell align="center">ลำดับ</TableCell>
                        <TableCell align="center">รหัสนักศึกษา</TableCell>
                        <TableCell align="center">ปีการศึกษา</TableCell>
                        <TableCell align="center">ประเภทหอพัก</TableCell>
                        <TableCell align="center">เลขห้องพัก</TableCell>
                        <TableCell align="center">สาขาวิชา</TableCell>
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
                          <TableCell align="center">{row.Dormitory_Student_Number}</TableCell>
                          <TableCell align="center">{row.Dormitory_AcademicYear}</TableCell>
                          <TableCell align="center">{row.DormitoryType.Dormitory_Type_Name}</TableCell>
                          <TableCell align="center">{row.Room_Number}</TableCell>
                          <TableCell align="center">{row.Branch.Branch_Name}</TableCell>
                          <TableCell align="center">
                            <ButtonGroup>
                              <Button
                                onClick={() =>
                                  navigate(`UpdateDormitory/${row.ID}`)
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
                              <Button
                                onClick={() =>
                                  navigate(`SearchDormitory/${row.ID}`)
                                }
                                color="secondary"
                              >
                                <SearchIcon />
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
                  <Button onClick={() => deleteDormitory(rowID + "")}>Sure</Button>
                </DialogActions>
              </Dialog>
            </Box>
          </React.Fragment>
        </div>
      </ThemeProvider>
    </div>
  );
}

export default DataDormitory;
