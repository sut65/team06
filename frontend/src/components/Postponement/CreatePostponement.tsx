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
import { FormControl } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { Link as RouterLink } from "react-router-dom";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { FiArrowLeft } from "react-icons/fi";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { GetStudentByID } from "../../services/HttpClientService";
import Home from "../Home";
import { Studentbar } from "../Bar-Student";

import { InstituteInterface } from "../../models/IInstitute";
import { BranchInterface } from "../../models/IBranch";
import { DegreeInterface } from "../../models/IDegree";
import { TrimesterInterface } from "../../models/ITrimester";
import { PrefixInterface } from "../../models/IPrefix";

import { StudentInterface } from "../../models/IStudent";
import { PostponementInterface } from "../../models/IPostponement";
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

function CreatePostponement() {
  /////////////////////////////////////////////////////
  const [institute, setInstitute] = useState<InstituteInterface[]>([]);
  const [branch, setBranch] = useState<BranchInterface[]>([]);
  const [trimester, setTrimester] = useState<TrimesterInterface[]>([]);
  const [degree, setDegree] = useState<DegreeInterface[]>([]);
  const [prefix, setPrefix] = useState<PrefixInterface[]>([]);
  const [postponement, setPostponement] = useState<Partial<PostponementInterface>>({});


  const [student, setStudent] = useState<StudentInterface>();


  const [Postponement_Date, setPostponement_Date] =
    useState<Date | null>(new Date());
  
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [message, setAlertMessage] = React.useState("");
  const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  
  /////////////////////////////////////////////////////
  const apiUrl = "http://localhost:8080";
  const requestOpionsGet = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };
  /////////////////// combobox /////////////////////////

  const feachInstitute = async () => {
    fetch(`${apiUrl}/institute`, requestOpionsGet)
      .then((response) => response.json())
      .then((result) => {
        console.log(result.data);
        setInstitute(result.data);
      });
  };

  const feachBranch = async () => {
    fetch(`${apiUrl}/branch`, requestOpionsGet)
      .then((response) => response.json())
      .then((result) => {
        console.log(result.data);
        setBranch(result.data);
      });
  };


  const feachDegree = async () => {
    fetch(`${apiUrl}/degree`, requestOpionsGet)
      .then((response) => response.json())
      .then((result) => {
        console.log(result.data);
        setDegree(result.data);
      });
  };

  const feachPrefix = async () => {
    fetch(`${apiUrl}/prefix`, requestOpionsGet)
      .then((response) => response.json())
      .then((result) => {
        console.log(result.data);
        setPrefix(result.data);
      });
  };


  const feachTrimeater = async () => {
    fetch(`${apiUrl}/trimester`, requestOpionsGet)
      .then((response) => response.json())
      .then((result) => {
        console.log(result.data);
        setTrimester(result.data);
      });
  };
  const fetchStudentByID = async () => {
    let res = await GetStudentByID();
    postponement.StudentID = res.ID;
    if (res) {
      setStudent(res);
    }
  };

  /////////////////////////////////////////////////////
  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }}

  const handleChange = (event: SelectChangeEvent) => {
    const name = event.target.name as keyof typeof postponement;
    setPostponement({
      ...postponement,
      [name]: event.target.value,
    });
  };

  const handleInputChange = (
    event: React.ChangeEvent<{ id?: string; value: any }>
  ) => {
    const id = event.target.id as keyof typeof postponement;
    const { value } = event.target;
    console.log(id)
    console.log(value)
    setPostponement({ ...postponement, [id]: value });
  };

  /////////////////////////////////////////////////////
  useEffect(() => {
    feachInstitute();
    feachBranch();
    feachDegree();
    feachPrefix();
    feachTrimeater();
    fetchStudentByID();
  }, []);
  console.log(postponement)
  /////////////////////////////////////////////////////
  //ตัวรับข้อมูลเข้าตาราง
  function submit() {
    let data = {
      Student: postponement.StudentID,
      Degree:
        typeof postponement.DegreeID === "string" ? parseInt(postponement.DegreeID) : 0,
      Prefix:
        typeof postponement.PrefixID === "string" ? parseInt(postponement.PrefixID) : 0,
      Institute:
        typeof postponement.InstituteID === "string" ? parseInt(postponement.InstituteID) : 0,
      Trimester:
        typeof postponement.TrimesterID === "string" ? parseInt(postponement.TrimesterID) : 0,
      Branch:
        typeof postponement.BranchID === "string" ? parseInt(postponement.BranchID) : 0,

      Postponement_Student_Number: postponement.Postponement_Student_Number,
      Postponement_Student_Name:   postponement. Postponement_Student_Name,
      Postponement_AcademicYear: postponement.Postponement_AcademicYear,
      Postponement_Gpax: postponement.Postponement_Gpax,
      Postponement_Credit: postponement.Postponement_Credit,
      Postponement_Date: Postponement_Date,
      Postponement_Reasons: postponement.Postponement_Reasons,
    };

    console.log("data ", data)
    
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };

    fetch(`${apiUrl}/create_Postponement`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        console.log(res);
        if (res.data) {
          setAlertMessage("บันทึกข้อมูลสำเร็จ");
          setSuccess(true);
          setTimeout(() => {
            window.location.href = "/DataPostponement";
          }, 500);
        } else {
          setAlertMessage(res.error);
          setError(true);
        }
      });
  }

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
  /////////////////////////////////////////////
  return (
    <div className="CreatePostponement" id="outer-container">
    <ThemeProvider theme={Theme}>
        <Studentbar
      pageWrapId={"page-CreatePostponement"}
      outerContainerId={"outer-container"}
    />
    <div id="page-CreatePostponement">
      <React.Fragment>
      <Box sx={{ backgroundColor: "#313131", height: "200vh" }}>
        <CssBaseline />
        <Container maxWidth="lg" sx={{ padding: 2 }}>
          <Paper sx={{ padding: 2 }}>
            <Box display={"flex"}>
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h5" gutterBottom>
                <Button
                        color="inherit"
                        component={RouterLink}
                        to="/DataPostponement"
                      >
                        <FiArrowLeft size="30" />
                      </Button>
                  CREATE POSTPONEMENT
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
                    <h4>ยื่นคำร้องขอผ่อนผันค่าธรรมเนียมการศึกษา</h4>
                    <hr />
                  </Grid>
                  <Grid item xs={4}>
                    <p>รหัสนักศึกษา</p>
                    <TextField
                      fullWidth
                      id="Postponement_Student_Number"
                      type="string"
                      label="รหัสนักศึกษา"
                      variant="outlined"
                      name="Postponement_Student_Number"
                      value={postponement.Postponement_Student_Number}
                      onChange={handleInputChange}
                    />
                  </Grid>
                  <Grid item xs={8}></Grid>
                  <Grid item xs={2}>
                    <p>คำนำหน้า </p>
                    <Select
                      fullWidth
                      id="Prefix"
                      onChange={handleChange}
                      native
                      value={postponement.PrefixID + ""}
                      inputProps={{ name: "PrefixID" }}
                    >
                      <option aria-label="None" value="">
                        คำนำหน้า
                      </option>
                      {prefix.map((item) => (
                        <option key={item.ID} value={item.ID}>
                          {item.Prefix_Name}
                        </option>
                      ))}
                    </Select>
                  </Grid>
                  <Grid item xs={4}>
                    <p>ชื่อ-สกุล</p>
                    <TextField
                      fullWidth
                      id="Postponement_Student_Name"
                      type="string"
                      label="ชื่อ-สกุล"
                      variant="outlined"
                      name="Postponement_Student_Name"
                      value={postponement.Postponement_Student_Name}
                      onChange={handleInputChange}
                    />
                  </Grid>
                  <Grid item xs={6}></Grid>
                  <Grid item xs={3}>
                  <p>ระดับการศึกษา</p>
                    <Select
                      fullWidth
                      id="Degree"
                      onChange={handleChange}
                      native
                      value={postponement.DegreeID + ""}
                      inputProps={{ name: "DegreeID" }}
                    >
                      <option aria-label="None" value="">
                        ระดับการศึกษา
                      </option>
                      {degree.map((item) => (
                        <option key={item.ID} value={item.ID}>
                          {item.Degree_Name}
                        </option>
                      ))}
                    </Select>
                  </Grid>
                  <Grid item xs={3}>
                  <p>ภาคเรียน</p>
                    <Select
                      fullWidth
                      id="Trimester"
                      onChange={handleChange}
                      native
                      value={postponement.TrimesterID + ""}
                      inputProps={{ name: "TrimesterID" }}
                    >
                      <option aria-label="None" value="">
                        ภาคเรียน
                      </option>
                      {trimester.map((item) => (
                        <option key={item.ID} value={item.ID}>
                          {item.Trimester_Name}
                        </option>
                      ))}
                    </Select>
                  </Grid>
                  <Grid item xs={6}></Grid>
                  <Grid item xs={3}>
                  <p>ปีการศึกษา</p>
                    <TextField
                      fullWidth
                      id="Postponement_AcademicYear"
                      type="string"
                      label="ปีการศึกษา"
                      variant="outlined"
                      name="Postponement_AcademicYear"
                      value={postponement.Postponement_AcademicYear}
                      onChange={handleInputChange}
                    />
                  </Grid>
                  <Grid item xs={9}></Grid>
                  <Grid item xs={4}>
                  <p>สำนักวิชา</p>
                    <Select
                      fullWidth
                      id="Institute"
                      onChange={handleChange}
                      native
                      value={postponement.InstituteID + ""}
                      inputProps={{ name: "InstituteID" }}
                    >
                      <option aria-label="None" value="">
                        สำนักวิชา
                      </option>
                      {institute.map((item) => (
                        <option key={item.ID} value={item.ID}>
                          {item.Institute_Name}
                        </option>
                      ))}
                    </Select>
                  </Grid>
                  <Grid item xs={4}>
                  <p>สาขาวิชา</p>
                    <Select
                      fullWidth
                      id="Branch"
                      onChange={handleChange}
                      native
                      value={postponement.BranchID + ""}
                      inputProps={{ name: "BranchID" }}
                    >
                      <option aria-label="None" value="">
                        สาขาชา
                      </option>
                      {branch.map((item) => (
                        <option key={item.ID} value={item.ID}>
                          {item.Branch_Name}
                        </option>
                      ))}
                    </Select>
                  </Grid>
                  <Grid item xs={3}></Grid>
                  <Grid item xs={6}>
                    <p>เกรดเฉลี่ยสะสม</p>
                    <TextField
                      fullWidth
                      id="Postponement_Gpax"
                      type="number"
                      label="Gpax"
                      variant="outlined"
                      name="Postponement_Gpax"
                      value={postponement.Postponement_Gpax}
                      onChange={handleInputChange}
                      />
                  </Grid>
                  <Grid item xs={6}></Grid>
                  <Grid item xs={6}>
                    <p>จำนวนหน่วยกิต</p>
                    <TextField
                      fullWidth
                      id="Postponement_Credit"
                      type="number"
                      label="จำนวนหน่วยกิต"
                      variant="outlined"
                      name="Postponement_Credit"
                      value={postponement.Postponement_Credit}
                      onChange={handleInputChange}
                    />
                  </Grid>
                  <Grid item xs={6}></Grid>
                  <Grid item xs={6}>
                  <FormControl fullWidth variant="outlined">
                      <p>เวลาที่ต้องการขอผ่อนผัน</p>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                          renderInput={(params) => <TextField {...params} />}
                          value={Postponement_Date}
                          label="เวลาที่ต้องการขอผ่อนผัน"
                          onChange={setPostponement_Date}
                        />
                      </LocalizationProvider>
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}></Grid>
                  <Grid item xs={6}>
                    <p>สาเหตุ</p>
                    <TextField
                      fullWidth
                      id="Postponement_Reasons"
                      type="string"
                      label="สาเหตุ"
                      variant="outlined"
                      name="Postponement_Reasons"
                      value={postponement.Postponement_Reasons}
                      onChange={handleInputChange}
                    />
                  </Grid>
                  <Grid item xs={6}></Grid>
                  <Grid item xs={3}>
                    <Button  variant="contained" size="large" fullWidth onClick={submit} color="primary">
                      submit
                    </Button>
                  </Grid>
                  <Grid item xs={3}>
                    <Button
                      variant="contained"
                      size="large"
                      fullWidth
                      color="secondary"
                      component={RouterLink}
                      to="/DataPostponement"
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
export default CreatePostponement;