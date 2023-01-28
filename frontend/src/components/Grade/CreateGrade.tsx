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
import Home from "../Home";
import DataGrade from "./DataGrade";
import { Adminbar } from "../Bar-Admin";
import { FiArrowLeft } from "react-icons/fi";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { GetAdminByID } from "../../services/HttpClientService";
import { BranchInterface } from "../../models/IBranch";
import { InstituteInterface } from "../../models/IInstitute";
import { GradeInterface } from "../../models/IGrade";
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
function CreateGrade() {
  /////////////////////////////////////////////////////
  const [admin, setAdmin] = useState<AdminInterface>();

  const [institute, setInstitute] = useState< InstituteInterface[]>([]);
  const [branch, setBranch] = useState<BranchInterface[]>([]);
  const [grade, setGrade] = useState<Partial<GradeInterface>>({});
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

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

  const fetchAdminByID = async () => {
    let res = await GetAdminByID();
    grade.AdminID = res.ID;
    if (res) {
      setAdmin(res);
    }
  };


  /////////////////////////////////////////////////////

  const handleChange = (event: SelectChangeEvent) => {
    const name = event.target.name as keyof typeof grade;
    setGrade({
      ...grade,
      [name]: event.target.value,
    });
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
    fetchAdminByID();
  }, []);
  console.log(grade);

  /////////////////////////////////////////////////////
  const convertType = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
  };
  //ตัวรับข้อมูลเข้าตาราง
  function submit() {
    let data = {
        InstituteID:
        typeof grade.InstituteID === "string" ? parseInt(grade.InstituteID) : 0,
        BranchID:
        typeof grade.BranchID === "string" ? parseInt(grade.BranchID) : 0,
    
        Grade_Student_Number: grade.Grade_Student_Number,
        Grade_GPA: grade.Grade_GPA,
        Grade_Supject: grade.Grade_Supject,
        Grade_Code_Supject: grade.Grade_Code_Supject,
        Grade: grade.Grade,
    };
    console.log(data)

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };

    fetch(`${apiUrl}/create_Grade`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        console.log(res);
        if (res.data) {
          setSuccess(true);
          setTimeout(() => {
            window.location.href = "/DataGrade";
          }, 500);
        } else {
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
    <div className="CreateGrade" id="outer-container">
      <ThemeProvider theme={Theme}>
        <Adminbar
        pageWrapId={"page-CreateGrade"}
        outerContainerId={"outer-container"}
      />
      <div id="page-CreateGrade">

      <React.Fragment>
        <Box sx={{ backgroundColor: "#313131", height: "260vh" }}>
            <CssBaseline />
            <Container maxWidth="lg">
              <Paper sx={{ padding: 2 }}>
                <Box display={"flex"}>
                  <Box sx={{ marginTop: 1.6 }}>
                  <Typography variant="h4" gutterBottom>
                        <Button
                          color="inherit"
                          component={RouterLink}
                          to="/DataStudent"
                          sx={{ marginBottom: 0.5 }}
                        >
                          <FiArrowLeft size="30" />
                        </Button>
                        CREATE STUDENT
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
                    <h4>บันทึกผลการเรียน</h4>
                    <hr />
                  </Grid>
                  <Grid item xs={4}>
                    <p>รหัสนักศึกษา</p>
                    <TextField
                      fullWidth
                      id="Grade_Student_Number"
                      type="string"
                      label="รหัสนักศึกษา"
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
                      label="รหัสวิชา"
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
                      label="ชื่อวิชา"
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
                      label="ผลการเรียน"
                      variant="outlined"
                      name="Grade"
                      value={grade.Grade}
                      onChange={handleInputChange}
                    />
                  </Grid>
                  <Grid item xs={8}></Grid>
                  <Grid item xs={3}>
                    <Button variant="contained" 
                    size="large" 
                    fullWidth 
                    color="primary"
                    onClick={submit}>
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
                      to="/DataGrade"
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
export default CreateGrade;