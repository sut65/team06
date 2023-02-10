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
import { Link as RouterLink , useParams } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import { BranchInterface } from "../../models/IBranch";
import { InstituteInterface } from "../../models/IInstitute";
import { GradeInterface } from "../../models/IGrade";
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


function SearchGrade() {
  /////////////////////////////////////////////////////

  let { id } = useParams();
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
    feachGradeByID();
  }, []);
  console.log(grade)
  /////////////////////////////////////////////////////
  return (
    <div className="SearchGrade" id="outer-container">
       <ThemeProvider theme={Theme}>
       <Adminbar pageWrapId={"page-SearchStudent"} outerContainerId={"outer-container"} />
      <div id="page-SearchGrade">

      <React.Fragment>
      <Box sx={{ backgroundColor: "#313131", height: "260vh" }}>
        <CssBaseline />
        <Container maxWidth="lg" >
          <Paper sx={{ padding: 2 }}>
            <Box display={"flex"}>
              <Box sx={{marginTop: 1.6 }}>
              <Typography variant="h4" gutterBottom>
                <Button
                      color="inherit"
                      component={RouterLink}
                      to="/DataGrade"
                      sx={{marginBottom:0.5}}
                    >
                      <FiArrowLeft size="30" />
                    </Button>
                  SEARCH GRADE
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Container>
        <Container maxWidth="lg" sx={{marginTop:1}}>
          <Paper sx={{ padding: 2 }}>
            <Box display={"flex"}>
              <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <h4>ข้อมูลผลการเรียน</h4>
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
                      color="secondary"
                      component={RouterLink}
                      to="/DataGrade"
                    >
                      back
                    </Button>
                  </Grid>
                  <Grid item xs={8}></Grid>
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
export default SearchGrade;