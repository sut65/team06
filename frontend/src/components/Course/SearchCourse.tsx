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

import { Adminbar } from "../Bar-Admin";

import { DegreeInterface } from "../../models/IDegree";
import { PrefixInterface } from "../../models/IPrefix";
import { InstituteInterface } from "../../models/IInstitute";
import { BranchInterface } from "../../models/IBranch";

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

function CreateCourse() {
  /////////////////////////////////////////////////////

  let { id } = useParams();

  const [degree, setDegree] = useState<DegreeInterface[]>([]);
  const [prefix, setPrefix] = useState<PrefixInterface[]>([]);
  const [institute, setInstitute] = useState<InstituteInterface[]>([]);
  const [branch, setBranch] = useState<BranchInterface[]>([]);

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

  const feachCourseByID = async () => {
    fetch(`${apiUrl}/course/${id}`, requestOptionsGet)
      .then((response) => response.json())
      .then((result) => {
        result.data && setCourse(result.data);
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

  /////////////////////////////////////////////////////

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
    feachCourseByID();
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
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h4" gutterBottom>
                      <Button
                        color="inherit"
                        component={RouterLink}
                        to="/DataCourse"
                      >
                        <FiArrowLeft size="30" />
                      </Button>
                      SEARCH COURSE
                    </Typography>
                  </Box>
                </Box>
              </Paper>
            </Container>
            <Container maxWidth="lg">
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
                          variant="outlined"
                          name="Course_Name"
                          disabled
                          value={course.Course_Name}
                          onChange={handleInputChange}
                        />
                      </Grid>
                      <Grid item xs={6}></Grid>
                      <Grid item xs={2}>
                        <p>คำนำหน้า</p>
                        <Select
                          disabled
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
                          variant="outlined"
                          name="Course_Teacher"
                          disabled
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
                          variant="outlined"
                          name="Course_Credit"
                          disabled
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
                          variant="outlined"
                          name="Course_Year"
                          disabled
                          value={course.Course_Year}
                          onChange={handleInputChange}
                        />
                      </Grid>
                      <Grid item xs={6}></Grid>
                      <Grid item xs={6}>
                        <Select
                          disabled
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
                          disabled
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
                          disabled
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
                          variant="outlined"
                          name="Course_Detail"
                          disabled
                          value={course.Course_Detail}
                          onChange={handleInputChange}
                          multiline
                        />
                      </Grid>
                      <Grid item xs={6}></Grid>
                      <Grid item xs={6}>
                        <Button
                          variant="contained"
                          size="large"
                          fullWidth
                          color="secondary"
                          component={RouterLink}
                          to="/DataCourse"
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
export default CreateCourse;
