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
import { Link as RouterLink, useParams } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Home from "../Home";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

import { Adminbar } from "../Bar-Admin";

import { BranchInterface } from "../../models/IBranch";
import { InstituteInterface } from "../../models/IInstitute";
import { GradeInterface } from "../../models/IGrade";

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

function UpdateGrade() {
  /////////////////////////////////////////////////////

  let { id } = useParams();
  const [institute, setInstitute] = useState<InstituteInterface[]>([]);
  const [branch, setBranch] = useState<BranchInterface[]>([]);
  const [grade, setGrade] = useState<Partial<GradeInterface>>({});
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [message, setAlertMessage] = React.useState("");

  /////////////////////////////////////////////////////
  const apiUrl = "http://localhost:8080";
  const requestOpionsGet = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };
  /////////////////// combobox /////////////////////////

  const feachGradeByID = async () => {
    fetch(`${apiUrl}/grade/${id}`, requestOpionsGet)
      .then((response) => response.json())
      .then((result) => {
        result.data && setGrade(result.data);
      });
  };

  const feachInstitute = async () => {
    fetch(`${apiUrl}/institute`, requestOpionsGet)
      .then((response) => response.json())
      .then((result) => {
        setInstitute(result.data);
      });
  };

  const feachBranch = async () => {
    fetch(`${apiUrl}/branch`, requestOpionsGet)
      .then((response) => response.json())
      .then((result) => {
        setBranch(result.data);
      });
  };

  /////////////////////////////////////////////////////

  const handleChange = (event: SelectChangeEvent) => {
    const name = event.target.name as keyof typeof grade;
    setGrade({
      ...grade,
      [name]: event.target.value,
    });
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

  const handleInputChange = (
    event: React.ChangeEvent<{ id?: string; value: any }>
  ) => {
    const id = event.target.id as keyof typeof grade;
    const { value } = event.target;
    setGrade({ ...grade, [id]: value });
  };

  /////////////////////////////////////////////////////
  useEffect(() => {
    feachInstitute();
    feachBranch();
    feachGradeByID();
  }, []);
  console.log(grade);

  /////////////////////////////////////////////////////
  const convertType = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
  };
  //ตัวรับข้อมูลเข้าตาราง
  function update() {
    let data = {
      ID: convertType(id),
      Institute: convertType(grade.InstituteID),
      Branch: convertType(grade.BranchID),

      Grade_Student_Number: grade.Grade_Student_Number,
      Grade_GPA: grade.Grade_GPA,
      Grade_Supject: grade.Grade_Supject,
      Grade_Code_Supject: grade.Grade_Code_Supject,
      Grade: grade.Grade,
    };
    console.log(data);

    const requestOptions = {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    fetch(`${apiUrl}/update_grade`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        console.log(res);
        if (res.data) {
          setAlertMessage("อัพเดทข้อมูลสำเร็จ");
          setSuccess(true);
          setTimeout(() => {
            window.location.href = "/DataGrade";
          }, 500);
        } else {
          setError(true);
          setAlertMessage(res.error);
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
    <div className="UpdateGrade" id="outer-container">
      <ThemeProvider theme={Theme}>
        <Adminbar
          pageWrapId={"page-UpdateGrade"}
          outerContainerId={"outer-container"}
        />
        <div id="page-UpdateGrade">
          <React.Fragment>
            <Box sx={{ backgroundColor: "#313131", height: "260vh" }}>
              <CssBaseline />
              <Container maxWidth="lg">
                <Paper sx={{ padding: 1 }}>
                  <Box display={"flex"}>
                    <Box sx={{ marginTop: 1.6 }}>
                      <Typography variant="h4" gutterBottom>
                        <a className="menu-head">
                          <Button
                            color="inherit"
                            component={RouterLink}
                            to="/DataGrade"
                            sx={{ marginBottom: 0.5 }}
                          >
                            <FiArrowLeft size="30" />
                          </Button>
                        </a>
                        UPDATE GRADE
                      </Typography>
                    </Box>
                  </Box>
                </Paper>
              </Container>
              <Container maxWidth="lg" sx={{ marginTop: 1 }}>
                <Paper sx={{ padding: 2 }}>
                  <Box sx={{ mt: 2 }}>
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
                    <Box sx={{ flexGrow: 1 }}>
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <h4>บันทึกผลการเรียน</h4>
                          <hr />
                        </Grid>
                        <Grid item xs={4}>
                          <p>รหัสนักศึกษา</p>
                          <TextField
                            fullWidth
                            id="Grade_Student_Number"
                            type="string"
                            //label="รหัสนักศึกษา"
                            variant="outlined"
                            name="Grade_Student_Number"
                            value={grade.Grade_Student_Number}
                            onChange={handleInputChange}
                          />
                        </Grid>
                        <Grid item xs={8}></Grid>
                        <Grid item xs={4}>
                          <p>สำนักวิชา</p>
                          <Select
                            fullWidth
                            id="Institute"
                            onChange={handleChange}
                            native
                            value={grade.InstituteID + ""}
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
                        <Grid item xs={8}></Grid>
                        <Grid item xs={4}>
                          <p>สาขาวิชา</p>
                          <Select
                            fullWidth
                            id="Branch"
                            onChange={handleChange}
                            native
                            value={grade.BranchID + ""}
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
                        <Grid item xs={8}></Grid>
                        <Grid item xs={4}>
                          <p>รหัสวิชา</p>
                          <TextField
                            fullWidth
                            id="Grade_Code_Supject"
                            type="string"
                            //label="รหัสวิชา"
                            variant="outlined"
                            name="Grade_Code_Supject"
                            value={grade.Grade_Code_Supject}
                            onChange={handleInputChange}
                          />
                        </Grid>
                        <Grid item xs={8}></Grid>
                        <Grid item xs={4}>
                          <p>ชื่อวิชา</p>
                          <TextField
                            fullWidth
                            id="Grade_Supject"
                            type="string"
                            //label="ชื่อวิชา"
                            variant="outlined"
                            name="Grade_Supject"
                            value={grade.Grade_Supject}
                            onChange={handleInputChange}
                          />
                        </Grid>
                        <Grid item xs={8}></Grid>
                        <Grid item xs={4}>
                          <p>ผลการเรียน</p>
                          <TextField
                            fullWidth
                            id="Grade"
                            type="string"
                            //label="ผลการเรียน"
                            variant="outlined"
                            name="Grade"
                            value={grade.Grade}
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
                            onClick={update}
                            // component={RouterLink}
                            // to="/DataGrade"
                          >
                            <a className="menu-button-submit">update</a>
                          </Button>
                        </Grid>
                        <Grid item xs={3}>
                          <Button
                            variant="contained"
                            size="large"
                            fullWidth
                            color="secondary"
                            component={RouterLink}
                            to="/DataGrade"
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
export default UpdateGrade;
