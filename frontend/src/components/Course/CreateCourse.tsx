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
import { Link as RouterLink } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { GetAdminByID } from "../../services/HttpClientService";
import Home from "../Home";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

import { Adminbar } from "../Bar-Admin";

import { DegreeInterface } from "../../models/IDegree";
import { PrefixInterface } from "../../models/IPrefix";
import { InstituteInterface } from "../../models/IInstitute";
import { BranchInterface } from "../../models/IBranch";
import { AdminInterface } from "../../models/IAdmin";

import { CourseInterface } from "../../models/ICourse";

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
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
function CreateCourse() {
  /////////////////////////////////////////////////////
  const [message, setAlertMessage] = React.useState("");

  const [degree, setDegree] = useState<DegreeInterface[]>([]);
  const [prefix, setPrefix] = useState<PrefixInterface[]>([]);
  const [institute, setInstitute] = useState<InstituteInterface[]>([]);
  const [branch, setBranch] = useState<BranchInterface[]>([]);
  const [admin, setAdmin] = useState<AdminInterface>();

  const [course, setCourse] = useState<Partial<CourseInterface>>({});

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  /////////////////////////////////////////////////////
  const apiUrl = "http://localhost:8080";
  const requestOptionsGet = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };
  /////////////////// combobox /////////////////////////

  const feachDegree = async () => {
    fetch(`${apiUrl}/degree`, requestOptionsGet)
      .then((response) => response.json())
      .then((result) => {
        console.log(result.data);
        setDegree(result.data);
      });
  };

  const feachPrefix = async () => {
    fetch(`${apiUrl}/prefix`, requestOptionsGet)
      .then((response) => response.json())
      .then((result) => {
        console.log(result.data);
        setPrefix(result.data);
      });
  };

  const feachInstitute = async () => {
    fetch(`${apiUrl}/institute`, requestOptionsGet)
      .then((response) => response.json())
      .then((result) => {
        console.log(result.data);
        setInstitute(result.data);
      });
  };

  const feachBranch = async () => {
    fetch(`${apiUrl}/branch`, requestOptionsGet)
      .then((response) => response.json())
      .then((result) => {
        console.log(result.data);
        setBranch(result.data);
      });
  };

  const fetchAdminByID = async () => {
    let res = await GetAdminByID();
    course.AdminID = res.ID;
    if (res) {
      setAdmin(res);
    }
  };

  /////////////////////////////////////////////////////
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

  const handleChange = (event: SelectChangeEvent) => {
    const name = event.target.name as keyof typeof course;
    setCourse({
      ...course,
      [name]: event.target.value,
    });
  };

  const handleInputChange = (
    event: React.ChangeEvent<{ id?: string; value: any }>
  ) => {
    const id = event.target.id as keyof typeof course;
    const { value } = event.target;
    setCourse({ ...course, [id]: value });
  };

  /////////////////////////////////////////////////////
  useEffect(() => {
    feachDegree();
    feachPrefix();
    feachInstitute();
    feachBranch();
    fetchAdminByID();
  }, []);
  console.log(course);

  /////////////////////////////////////////////////////

  const convertType = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
  };

  //ตัวรับข้อมูลเข้าตาราง
  function submit() {
    let data = {
      Admin: course.AdminID,
      Degree: convertType(course.DegreeID),
      Prefix: convertType(course.PrefixID),
      Institute: convertType(course.InstituteID),
      Branch: convertType(course.BranchID),
      Course_Name: course.Course_Name,
      Course_Teacher: course.Course_Teacher,
      Course_Credit: convertType(course.Course_Credit),
      Course_Detail: course.Course_Detail,
      Course_Year: convertType(course.Course_Year),
    };
    console.log(data);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };

    fetch(`${apiUrl}/create_course`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        console.log(res);
        if (res.data) {
          setAlertMessage("บันทึกข้อมูลสำเร็จ");
          setSuccess(true);
          setTimeout(() => {
            window.location.href = "/DataCourse";
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

  /////////////////////////////////////////////////////

  return (
    <div className="CreateStudent" id="outer-container">
      <ThemeProvider theme={Theme}>
        <Adminbar
          pageWrapId={"page-CreateStudent"}
          outerContainerId={"outer-container"}
        />
        <div id="page-CreateStudent">
          <React.Fragment>
            <Box sx={{ backgroundColor: "#313131", height: "125vh" }}>
              <CssBaseline />
              <Container maxWidth="lg" sx={{ padding: 2 }}>
                <Paper sx={{ padding: 2 }}>
                  <Box display={"flex"}>
                    <Box>
                      <a className="menu-head">
                        <Button
                          color="inherit"
                          component={RouterLink}
                          to="/DataCourse"
                        >
                          <FiArrowLeft size="30" />
                        </Button>
                      </a>
                    </Box>
                    <Box sx={{ marginTop: 0.4 }}>
                      <Typography variant="h4" gutterBottom>
                        CREATE COURSE
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
                          <h4>ข้อมูลหลักสูตร</h4>
                          <hr />
                        </Grid>
                        <Grid item xs={6}>
                          <p>ชื่อหลักสูตรการศึกษา</p>
                          <TextField
                            fullWidth
                            id="Course_Name"
                            type="string"
                            label="หลักสูตร"
                            variant="outlined"
                            name="Course_Name"
                            value={course.Course_Name}
                            onChange={handleInputChange}
                          />
                        </Grid>
                        <Grid item xs={6}></Grid>
                        <Grid item xs={2}>
                          <p>คำนำหน้า</p>
                          <Select
                            fullWidth
                            id="Prefix"
                            onChange={handleChange}
                            native
                            value={course.PrefixID + ""}
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
                          <p>อาจารย์ผู้ก่อตั้ง</p>
                          <TextField
                            fullWidth
                            id="Course_Teacher"
                            type="string"
                            label="ชื่อ-สกุล"
                            variant="outlined"
                            name="Course_Teacher"
                            value={course.Course_Teacher}
                            onChange={handleInputChange}
                          />
                        </Grid>
                        <Grid item xs={6}></Grid>
                        <Grid item xs={3}>
                          <p>จำนวนหน่วยกิต</p>
                          <TextField
                            fullWidth
                            id="Course_Credit"
                            type="number"
                            label="จำนวนหน่วยกิต"
                            variant="outlined"
                            name="Course_Credit"
                            value={course.Course_Credit}
                            onChange={handleInputChange}
                          />
                        </Grid>
                        <Grid item xs={3}>
                          <p>ปีก่อตั้งหลักสูตรการศึกษา</p>
                          <TextField
                            fullWidth
                            id="Course_Year"
                            type="number"
                            label="ปี"
                            variant="outlined"
                            name="Course_Year"
                            value={course.Course_Year}
                            onChange={handleInputChange}
                          />
                        </Grid>
                        <Grid item xs={6}></Grid>
                        <Grid item xs={6}>
                          <Select
                            fullWidth
                            id="Degree"
                            onChange={handleChange}
                            native
                            value={course.DegreeID + ""}
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
                        <Grid item xs={6}></Grid>
                        <Grid item xs={6}>
                          <Select
                            fullWidth
                            id="Institute"
                            onChange={handleChange}
                            native
                            value={course.InstituteID + ""}
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
                        <Grid item xs={6}></Grid>
                        <Grid item xs={6}>
                          <Select
                            fullWidth
                            id="Branch"
                            onChange={handleChange}
                            native
                            value={course.BranchID + ""}
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
                        <Grid item xs={6}>
                          <p>รายละเอียดหลักสูตรการศึกษา</p>
                          <TextField
                            fullWidth
                            id="Course_Detail"
                            type="string"
                            label="รายละเอียดหลักสูตรการศึกษา"
                            variant="outlined"
                            name="Course_Detail"
                            value={course.Course_Detail}
                            onChange={handleInputChange}
                            multiline
                          />
                        </Grid>
                        <Grid item xs={6}></Grid>
                        <Grid item xs={3}>
                          <Button
                            variant="contained"
                            size="large"
                            fullWidth
                            color="primary"
                            onClick={submit}
                          >
                            <a className="menu-button-submit">SUBMIT</a>
                          </Button>
                        </Grid>
                        <Grid item xs={3}>
                          <Button
                            variant="contained"
                            size="large"
                            fullWidth
                            color="secondary"
                            component={RouterLink}
                            to="/DataCourse"
                          >
                            <a className="menu-button-back">back</a>
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
export default CreateCourse;
