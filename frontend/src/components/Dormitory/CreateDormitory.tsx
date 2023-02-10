import React, { useEffect, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { Link as RouterLink, useParams } from "react-router-dom";
import { GetAdminByID } from "../../services/HttpClientService";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { FiArrowLeft } from "react-icons/fi";

import { Adminbar } from "../Bar-Admin";

import { BranchInterface } from "../../models/IBranch";
import { DormitoryTypeInterface } from "../../models/IDormitoryType";
import { RoomTypeInterface } from "../../models/IRoomType";
import { TrimesterInterface } from "../../models/ITrimester";

import { DormitoryInterface } from "../../models/IDormitory";
import { AdminInterface } from "../../models/IAdmin";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

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

function CreateDormitory() {
  /////////////////////////////////////////////////////

  const [branch, setBranch] = useState<BranchInterface[]>([]);
  const [dormitorytype, setDormitoryType] = useState<DormitoryTypeInterface[]>(
    []
  );
  const [roomtype, setRoomType] = useState<RoomTypeInterface[]>([]);
  const [trimester, setTrimester] = useState<TrimesterInterface[]>([]);
  const [admin, setAdmin] = useState<AdminInterface>();

  const [message, setAlertMessage] = React.useState("");

  const [dormitory, setDormitory] = useState<Partial<DormitoryInterface>>({});

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  /////////////////////////////////////////////////////
  const apiUrl = "http://localhost:8080";
  const requestOptionsGet = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };
  /////////////////// combobox /////////////////////////

  const feachBranch = async () => {
    fetch(`${apiUrl}/branch`, requestOptionsGet)
      .then((response) => response.json())
      .then((result) => {
        console.log(result.data);
        setBranch(result.data);
      });
  };

  const feachDormitoryType = async () => {
    fetch(`${apiUrl}/dormitorytype`, requestOptionsGet)
      .then((response) => response.json())
      .then((result) => {
        console.log("type", result.data);
        setDormitoryType(result.data);
      });
  };

  const feachRoomType = async () => {
    fetch(`${apiUrl}/roomtype`, requestOptionsGet)
      .then((response) => response.json())
      .then((result) => {
        console.log(result.data);
        setRoomType(result.data);
      });
  };

  const feachTrimester = async () => {
    fetch(`${apiUrl}/trimester`, requestOptionsGet)
      .then((response) => response.json())
      .then((result) => {
        console.log(result.data);
        setTrimester(result.data);
      });
  };

  const fetchAdminByID = async () => {
    let res = await GetAdminByID();
    dormitory.AdminID = res.ID;
    if (res) {
      setAdmin(res);
    }
  };

  /////////////////////////////////////////////////////

  const handleChange = (event: SelectChangeEvent) => {
    const name = event.target.name as keyof typeof dormitory;
    setDormitory({
      ...dormitory,
      [name]: event.target.value,
    });
  };

  const handleInputChange = (
    event: React.ChangeEvent<{ id?: string; value: any }>
  ) => {
    const id = event.target.id as keyof typeof dormitory;
    const { value } = event.target;
    setDormitory({ ...dormitory, [id]: value });
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccess(false);
    setError(false);
  };

  /////////////////////////////////////////////////////
  useEffect(() => {
    feachBranch();
    feachDormitoryType();
    feachRoomType();
    feachTrimester();
    fetchAdminByID();
  }, []);

  /////////////////////////////////////////////////////

  const convertType = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
  };

  //ตัวรับข้อมูลเข้าตาราง
  function submit() {
    let data = {
      AdminID: dormitory.AdminID,
      BranchID: convertType(dormitory.BranchID),
      DormitoryTypeID: convertType(dormitory.DormitoryTypeID),
      RoomTypeID: convertType(dormitory.RoomTypeID),
      TrimesterID: convertType(dormitory.TrimesterID),

      Dormitory_Student_Number: dormitory.Dormitory_Student_Number,
      Dormitory_AcademicYear: convertType(dormitory.Dormitory_AcademicYear),
      Room_Number: convertType(dormitory.Room_Number),
    };

    const requestOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    console.log(data);

    fetch(`${apiUrl}/dormitory`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        console.log(res);
        if (res.data) {
          setAlertMessage("บันทึกข้อมูลสำเร็จ");
          setSuccess(true);
          setTimeout(() => {
            // window.location.href = "/DataDormitory";
          }, 500);
        } else {
          setAlertMessage(res.error);
          setError(true);
        }
      });
  }

  /////////////////////////////////////////////////////

  return (
    <div className="CreateSuggestion" id="outer-container">
      <ThemeProvider theme={Theme}>
        <Adminbar
          pageWrapId={"page-CreateSuggestion"}
          outerContainerId={"outer-container"}
        />
        <div id="page-CreateSuggestion">
          <React.Fragment>
            <Box sx={{ backgroundColor: "#313131", height: "125vh" }}>
              <CssBaseline />
              <Container maxWidth="lg" sx={{ padding: 2 }}>
                <Paper sx={{ padding: 2 }}>
                  <Box display={"flex"}>
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="h5" gutterBottom>
                        <Button
                          color="inherit"
                          component={RouterLink}
                          to="/DataDormitory"
                        >
                          <FiArrowLeft size="30" />
                        </Button>
                        CREATE DORMITORY
                      </Typography>
                    </Box>
                  </Box>
                </Paper>
              </Container>
              <Container maxWidth="lg">
                <Box
                  sx={{
                    mt: 2,
                  }}
                >
                  <Snackbar
                    id="success"
                    open={success}
                    autoHideDuration={3000}
                    onClose={handleClose}
                    anchorOrigin={{ vertical: "top", horizontal: "center" }}
                  >
                    <Alert onClose={handleClose} severity="success">
                      {message}
                    </Alert>
                  </Snackbar>
                  <Snackbar
                    id="error"
                    open={error}
                    autoHideDuration={6000}
                    onClose={handleClose}
                    anchorOrigin={{ vertical: "top", horizontal: "center" }}
                  >
                    <Alert onClose={handleClose} severity="error">
                      {message}
                    </Alert>
                  </Snackbar>
                </Box>

                <Paper sx={{ padding: 2 }}>
                  <Box display={"flex"}>
                    <Box sx={{ flexGrow: 1 }}>
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <h4>ข้อมูลหอพักนักศึกษา</h4>
                          <hr />
                        </Grid>

                        <Grid item xs={4}>
                          <p>รหัสนักศึกษา</p>
                          <TextField
                            fullWidth
                            id="Dormitory_Student_Number"
                            type="string"
                            label="รหัสนักศึกษา"
                            variant="outlined"
                            name="Dormitory_Student_Number"
                            value={dormitory.Dormitory_Student_Number}
                            onChange={handleInputChange}
                          />
                        </Grid>
                        <Grid item xs={8}></Grid>
                        <Grid item xs={4}>
                          <p>ปีการศึกษา</p>
                          <TextField
                            fullWidth
                            id="Dormitory_AcademicYear"
                            type="string"
                            label="ปีการศึกษา"
                            variant="outlined"
                            name="Dormitory_AcademicYear"
                            value={dormitory.Dormitory_AcademicYear}
                            onChange={handleInputChange}
                          />
                        </Grid>

                        <Grid item xs={6}>
                          <p>ภาคการศึกษา</p>
                          <Select
                            fullWidth
                            id="Trimester"
                            onChange={handleChange}
                            native
                            value={dormitory.TrimesterID + ""}
                            inputProps={{ name: "TrimesterID" }}
                          >
                            <option aria-label="None" value="">
                              ภาคการศึกษา
                            </option>
                            {trimester.map((item) => (
                              <option key={item.ID} value={item.ID}>
                                {item.Trimester_Name}
                              </option>
                            ))}
                          </Select>
                        </Grid>
                        <Grid item xs={2}></Grid>
                        <Grid item xs={6}>
                          <p>ประเภทหอพัก</p>
                          <Select
                            fullWidth
                            id="DormitoryType"
                            onChange={handleChange}
                            native
                            value={dormitory.DormitoryTypeID + ""}
                            inputProps={{ name: "DormitoryTypeID" }}
                          >
                            <option aria-label="None" value="">
                              ประเภทหอพัก
                            </option>
                            {dormitorytype.map((item) => (
                              <option key={item.ID} value={item.ID}>
                                {item.Dormitory_Type_Name}
                              </option>
                            ))}
                          </Select>
                        </Grid>
                        <Grid item xs={6}></Grid>
                        <Grid item xs={6}>
                          <p>ประเภทห้องพัก</p>
                          <Select
                            fullWidth
                            id="RoomType"
                            onChange={handleChange}
                            native
                            value={dormitory.RoomTypeID + ""}
                            inputProps={{ name: "RoomTypeID" }}
                          >
                            <option aria-label="None" value="">
                              ประเภทห้องพัก
                            </option>
                            {roomtype.map((item) => (
                              <option key={item.ID} value={item.ID}>
                                {item.Room_Type_Name}
                              </option>
                            ))}
                          </Select>
                        </Grid>
                        <Grid item xs={6}></Grid>
                        <Grid item xs={6}>
                          <p>สาขาวิชา</p>
                          <Select
                            fullWidth
                            id="Branch"
                            onChange={handleChange}
                            native
                            value={dormitory.BranchID + ""}
                            inputProps={{ name: "BranchID" }}
                          >
                            <option aria-label="None" value="">
                              สาขาวิชา
                            </option>
                            {branch.map((item) => (
                              <option key={item.ID} value={item.ID}>
                                {item.Branch_Name}
                              </option>
                            ))}
                          </Select>
                        </Grid>
                        <Grid item xs={6}></Grid>

                        <Grid item xs={4}>
                          <p>เลขห้องพัก</p>
                          <TextField
                            fullWidth
                            id="Room_Number"
                            type="number"
                            label="เลขห้องพัก"
                            variant="outlined"
                            name="Room_Number"
                            value={dormitory.Room_Number}
                            onChange={handleInputChange}
                          />
                        </Grid>

                        <Grid item xs={12}></Grid>
                        <Grid item xs={6}></Grid>
                        <Grid item xs={3}>
                          <Button
                            variant="contained"
                            size="large"
                            fullWidth
                            onClick={submit}
                          >
                            submit
                          </Button>
                        </Grid>
                        <Grid item xs={3}>
                          <Button
                            variant="contained"
                            size="large"
                            fullWidth
                            component={RouterLink}
                            to="/DataDormitory"
                          >
                            back
                          </Button>
                        </Grid>
                        <Grid item xs={6}></Grid>
                      </Grid>
                    </Box>
                  </Box>
                </Paper>
              </Container>
            </Box>
          </React.Fragment>
        </div>
      </ThemeProvider>
    </div>
  );
}
export default CreateDormitory;
