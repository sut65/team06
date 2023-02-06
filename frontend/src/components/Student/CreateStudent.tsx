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
import { FiArrowLeft } from "react-icons/fi";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { GetAdminByID } from "../../services/HttpClientService";
import Home from "../Home";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

import { Adminbar } from "../Bar-Admin";

import { InstituteInterface } from "../../models/IInstitute";
import { BranchInterface } from "../../models/IBranch";
import { CourseInterface } from "../../models/ICourse";
import { DegreeInterface } from "../../models/IDegree";
import { PrefixInterface } from "../../models/IPrefix";
import { GenderInterface } from "../../models/IGender";
import { ProvinceInterface } from "../../models/IProvince";
import { StudentInterface } from "../../models/IStudent";
import { AdminInterface } from "../../models/IAdmin";

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
function CreateStudent() {
  /////////////////////////////////////////////////////
  const [admin, setAdmin] = useState<AdminInterface>();
  const [message, setAlertMessage] = React.useState("");

  const [institute, setInstitute] = useState<InstituteInterface[]>([]);
  const [branch, setBranch] = useState<BranchInterface[]>([]);
  const [course, setCourse] = useState<CourseInterface[]>([]);
  const [degree, setDegree] = useState<DegreeInterface[]>([]);
  const [prefix, setPrefix] = useState<PrefixInterface[]>([]);
  const [gender, setGender] = useState<GenderInterface[]>([]);
  const [province, setProvince] = useState<ProvinceInterface[]>([]);

  const [Student_Birthday, setStudent_Birthday] = useState<Date | null>(new Date());
  const [Student_Year_Of_Entry, setStudent_Year_Of_Entry] = useState<Date | null>(new Date());

  const [student, setStudent] = useState<Partial<StudentInterface>>({});

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  /////////////////////////////////////////////////////
  const apiUrl = "http://localhost:8080";
  const requestOptionsGet = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };
  /////////////////// combobox /////////////////////////

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

  const feachCourse = async () => {
    fetch(`${apiUrl}/course`, requestOptionsGet)
      .then((response) => response.json())
      .then((result) => {
        console.log(result.data);
        setCourse(result.data);
      });
  };

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

  const feachGender = async () => {
    fetch(`${apiUrl}/gender`, requestOptionsGet)
      .then((response) => response.json())
      .then((result) => {
        console.log(result.data);
        setGender(result.data);
      });
  };

  const feachProvince = async () => {
    fetch(`${apiUrl}/province`, requestOptionsGet)
      .then((response) => response.json())
      .then((result) => {
        console.log(result.data);
        setProvince(result.data);
      });
  };

  const feachAdminByID = async () => {
    let res = await GetAdminByID();
    student.AdminID = res.ID;
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
    const name = event.target.name as keyof typeof student;
    setStudent({
      ...student,
      [name]: event.target.value,
    });
  };

  const handleInputChange = (
    event: React.ChangeEvent<{ id?: string; value: any }>
  ) => {
    const id = event.target.id as keyof typeof student;
    const { value } = event.target;
    setStudent({ ...student, [id]: value });
  };

  /////////////////////////////////////////////////////
  useEffect(() => {
    feachInstitute();
    feachBranch();
    feachCourse();
    feachDegree();
    feachPrefix();
    feachGender();
    feachProvince();
    feachAdminByID();
  }, []);
  console.log(student);
  /////////////////////////////////////////////////////
  const convertType = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
  };
  //ตัวรับข้อมูลเข้าตาราง
  function submit() {
    let data = {
      Admin: student.AdminID,
      Gender: convertType(student.GenderID),
      Degree: convertType(student.DegreeID),
      Prefix: convertType(student.PrefixID),
      Institute: convertType(student.InstituteID),
      Province: convertType(student.ProvinceID),
      Branch: convertType(student.BranchID),
      Course: convertType(student.CourseID),
      Student_Year_Of_Entry: Student_Year_Of_Entry,
      Student_Number: student.Student_Number,
      Student_Name: student.Student_Name,
      Student_Birthday: Student_Birthday,
      Student_Tel: student.Student_Tel,
      Student_Identity_Card: student.Student_Identity_Card,
      Student_Nationality: student.Student_Nationality,
      Student_Religion: student.Student_Religion,
      Student_Address: student.Student_Address,
      Student_Fathers_Name: student.Student_Fathers_Name,
      Student_Mothers_Name: student.Student_Mothers_Name,
    };
    console.log(data);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };

    fetch(`${apiUrl}/create_Student`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        console.log(res);
        if (res.data) {
          setAlertMessage("บันทึกข้อมูลสำเร็จ");
          setSuccess(true);
          setTimeout(() => {
            window.location.href = "/DataStudent";
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
            <Box sx={{ backgroundColor: "#313131", height: "260vh" }}>
              <CssBaseline />
              <Container maxWidth="lg">
                <Paper sx={{ padding: 1 }}>
                  <Box display={"flex"}>
                    <Box>
                      <a className="menu-head">
                        <Button
                          color="inherit"
                          component={RouterLink}
                          to="/DataStudent"
                          sx={{ marginBottom: 0.5 }}
                        >
                          <FiArrowLeft size="30" />
                        </Button>
                      </a>
                    </Box>
                    <Box sx={{ marginTop: 0.4 }}>
                      <Typography variant="h4" gutterBottom>
                        CREATE STUDENT
                      </Typography>
                    </Box>
                  </Box>
                </Paper>
              </Container>
              <Container maxWidth="lg" sx={{ marginTop: 1 }}>
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
                          <h3>ประวัติส่วนตัวนักศึกษา</h3>
                          <hr />
                        </Grid>
                        <Grid item xs={2}>
                          <p>คำนำหน้า </p>
                          <Select
                            fullWidth
                            id="Prefix"
                            onChange={handleChange}
                            native
                            value={student.PrefixID + ""}
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
                            id="Student_Name"
                            type="string"
                            label="ชื่อ-สกุล"
                            variant="outlined"
                            name="Student_Name"
                            value={student.Student_Name}
                            onChange={handleInputChange}
                          />
                        </Grid>
                        <Grid item xs={6}></Grid>
                        <Grid item xs={2}>
                          <p>เพศ </p>
                          <Select
                            fullWidth
                            id="Gender"
                            onChange={handleChange}
                            native
                            value={student.GenderID + ""}
                            inputProps={{ name: "GenderID" }}
                          >
                            <option aria-label="None" value="">
                              เพศ
                            </option>
                            {gender.map((item) => (
                              <option key={item.ID} value={item.ID}>
                                {item.Gender_Type}
                              </option>
                            ))}
                          </Select>
                        </Grid>
                        <Grid item xs={4}>
                          <FormControl fullWidth variant="outlined">
                            <p>วัน/เดือน/ปี เกิด</p>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                              <DatePicker
                                renderInput={(props) => (
                                  <TextField {...props} />
                                )}
                                value={Student_Birthday}
                                label="วันเกิด"
                                onChange={setStudent_Birthday}
                              />
                            </LocalizationProvider>
                          </FormControl>
                        </Grid>
                        <Grid item xs={6}></Grid>
                        <Grid item xs={6}>
                          <p>เบอร์โทรศัพท์</p>
                          <TextField
                            fullWidth
                            id="Student_Tel"
                            type="string"
                            label="เบอร์โทรศัพท์"
                            variant="outlined"
                            name="Student_Tel"
                            value={student.Student_Tel}
                            onChange={handleInputChange}
                          />
                        </Grid>
                        <Grid item xs={6}></Grid>
                        <Grid item xs={6}>
                          <p>รหัสบัตรประชาชน</p>
                          <TextField
                            fullWidth
                            id="Student_Identity_Card"
                            type="string"
                            label="รหัสบัตรประชาชน"
                            variant="outlined"
                            name="Student_Identity_Card"
                            value={student.Student_Identity_Card}
                            onChange={handleInputChange}
                          />
                        </Grid>
                        <Grid item xs={6}></Grid>
                        <Grid item xs={6}>
                          <p>ชื่อ-สกุล บิดา</p>
                          <TextField
                            fullWidth
                            id="Student_Fathers_Name"
                            type="string"
                            label="ชื่อ-สกุล บิดา"
                            variant="outlined"
                            name="Student_Fathers_Name"
                            value={student.Student_Fathers_Name}
                            onChange={handleInputChange}
                          />
                        </Grid>
                        <Grid item xs={6}></Grid>
                        <Grid item xs={6}>
                          <p>ชื่อ-สกุล มารดา</p>
                          <TextField
                            fullWidth
                            id="Student_Mothers_Name"
                            type="string"
                            label="ชื่อ-สกุล มารดา"
                            variant="outlined"
                            name="Student_Mothers_Name"
                            value={student.Student_Mothers_Name}
                            onChange={handleInputChange}
                          />
                        </Grid>
                        <Grid item xs={6}></Grid>
                        <Grid item xs={3}>
                          <p>สัญชาติ</p>
                          <TextField
                            fullWidth
                            id="Student_Nationality"
                            type="string"
                            label="สัญชาติ"
                            variant="outlined"
                            name="Student_Nationality"
                            value={student.Student_Nationality}
                            onChange={handleInputChange}
                          />
                        </Grid>
                        <Grid item xs={3}>
                          <p>ศาสนา</p>
                          <TextField
                            fullWidth
                            id="Student_Religion"
                            type="string"
                            label="ศาสนา"
                            variant="outlined"
                            name="Student_Religion"
                            value={student.Student_Religion}
                            onChange={handleInputChange}
                          />
                        </Grid>
                        <Grid item xs={6}></Grid>
                        <Grid item xs={6}>
                          <p>จังหวัด</p>
                          <Select
                            fullWidth
                            id="Province"
                            onChange={handleChange}
                            native
                            value={student.ProvinceID + ""}
                            inputProps={{ name: "ProvinceID" }}
                          >
                            <option aria-label="None" value="">
                              จังหวัด
                            </option>
                            {province.map((item) => (
                              <option key={item.ID} value={item.ID}>
                                {item.Province_Name}
                              </option>
                            ))}
                          </Select>
                        </Grid>
                        <Grid item xs={6}></Grid>
                        <Grid item xs={6}>
                          <p>ที่อยู่ ปัจจุบัน</p>
                          <TextField
                            fullWidth
                            id="Student_Address"
                            type="string"
                            label="ที่อยู่"
                            variant="outlined"
                            name="Student_Address"
                            value={student.Student_Address}
                            onChange={handleInputChange}
                            multiline
                          />
                        </Grid>
                        <Grid item xs={6}></Grid>
                        <Grid item xs={12}>
                          <hr />
                          <h4>ข้อมูลนักศึกษา</h4>
                        </Grid>
                        <Grid item xs={3}>
                          <p>สำนักวิชา</p>
                          <Select
                            fullWidth
                            id="Institute"
                            onChange={handleChange}
                            native
                            value={student.InstituteID + ""}
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
                        <Grid item xs={3}>
                          <p>สาขาวิชา</p>
                          <Select
                            fullWidth
                            id="Branch"
                            onChange={handleChange}
                            native
                            value={student.BranchID + ""}
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
                        <Grid item xs={3}>
                          <p>หลักสูตร</p>
                          <Select
                            fullWidth
                            id="Course"
                            onChange={handleChange}
                            native
                            value={student.CourseID + ""}
                            inputProps={{ name: "CourseID" }}
                          >
                            <option aria-label="None" value="">
                              หลักสูตร
                            </option>
                            {course.map((item) => (
                              <option key={item.ID} value={item.ID}>
                                {item.Course_Name}
                              </option>
                            ))}
                          </Select>
                        </Grid>
                        <Grid item xs={3}>
                          <p>ระดับการศึกษา</p>
                          <Select
                            fullWidth
                            id="Degree"
                            onChange={handleChange}
                            native
                            value={student.DegreeID + ""}
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
                          <FormControl fullWidth variant="outlined">
                            <p>ปีที่เข้าศึกษา</p>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                              <DatePicker
                                renderInput={(props) => (
                                  <TextField {...props} />
                                )}
                                value={Student_Year_Of_Entry}
                                label="ปีที่เข้าศึกษา"
                                onChange={setStudent_Year_Of_Entry}
                              />
                            </LocalizationProvider>
                          </FormControl>
                        </Grid>
                        <Grid item xs={6}></Grid>
                        <Grid item xs={6}>
                          <p>รหัสนักศึกษา</p>
                          <TextField
                            fullWidth
                            id="Student_Number"
                            type="string"
                            label="รหัสนักศึกษา"
                            variant="outlined"
                            name="Student_Number"
                            value={student.Student_Number}
                            onChange={handleInputChange}
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
                            <a className="menu-button-submit">submit</a>
                          </Button>
                        </Grid>
                        <Grid item xs={3}>
                          <Button
                            variant="contained"
                            size="large"
                            fullWidth
                            color="secondary"
                            component={RouterLink}
                            to="/DataStudent"
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
export default CreateStudent;
