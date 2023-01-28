import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Link as RouterLink } from "react-router-dom";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import CssBaseline from "@mui/material/CssBaseline";
import { useNavigate, useParams } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

import { StudentInterface } from "../../models/IStudent";
import { ScholarshipInterface } from "../../models/IScholarship";
import { ScholarshipTypeInterface } from "../../models/IScholarshipType";
import { InstituteInterface } from "../../models/IInstitute";
import { BranchInterface } from "../../models/IBranch";
import { ScholarshipApInterface } from "../../models/IScholarshipAp";
import { Studentbar } from "../Bar-Student";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Theme = createTheme({
  palette: {
    primary: {
      main: "#B3E5FC",
    },
    secondary: {
      main: "#C70039",
    },
    info: {
      main: "#164DC9",
    },
  },
});

function CreateScholarshipAp() {
  ////////////////////variables////////////////////////
  let { id } = useParams();

  const [Student, setStudent] = useState<Partial<ScholarshipApInterface>>({});
  const [Branch, setBranch] = useState<BranchInterface[]>([]);
  const [Institute, setInstitute] = useState<InstituteInterface[]>([]);
  const [Scholarship, setScholarship] = useState<Partial<ScholarshipInterface>>(
    {}
  );
  const [ScholarshipType, setScholarshipType] = useState<
    Partial<ScholarshipTypeInterface>
  >({});

  const [ScholarshipAp, setScholarshipAp] = useState<
    Partial<ScholarshipApInterface>
  >({});

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  ////////////////////////////////////////////
  const apiUrl = "http://localhost:8080";
  const requestOptionsGet = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };

  //แสดงข้อมูล scholarship ทั้งหมด
  const feachScholarshipByID = async () => {
    fetch(`${apiUrl}/scholarship/${id}`, requestOptionsGet)
      .then((response) => response.json())
      .then((result) => {
        console.log(result.data);
        setScholarship(result.data);
      });
  };

  //แสดงข้อมูล scholarship typeทั้งหมด
  const feachScholarshipTypeByID = async () => {
    fetch(`${apiUrl}/scholarship_type/${id}`, requestOptionsGet)
      .then((response) => response.json())
      .then((result) => {
        console.log(result.data);
        setScholarshipType(result.data);
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

  const feachInstitute = async () => {
    fetch(`${apiUrl}/institute`, requestOptionsGet)
      .then((response) => response.json())
      .then((result) => {
        console.log(result.data);
        setInstitute(result.data);
      });
  };

  const feachStudentByID = async () => {
    fetch(
      `${apiUrl}/scholarship_student/${localStorage.getItem("Student-id")}`,
      requestOptionsGet
    )
      .then((response) => response.json())
      .then((result) => {
        result.data && setScholarshipAp(result.data);
        console.log("feachStudentByIDfromStudentEntity", result.data);
      });
  };

  useEffect(() => {
    feachBranch();
    feachInstitute();
    feachScholarshipByID();
    feachScholarshipTypeByID();
    feachStudentByID();
  }, []);

  console.log(ScholarshipAp);

  ///////////////////handle change ของ combobox////////////////////////
  const handleChange = (event: SelectChangeEvent) => {
    const name = event.target.name as keyof typeof ScholarshipAp;
    setScholarshipAp({
      ...ScholarshipAp,
      [name]: event.target.value,
    });
  };

  //////////////////handle change ของ input field///////////////////////
  const handleInputChange = (
    event: React.ChangeEvent<{ id?: string; value: any }>
  ) => {
    const id = event.target.id as keyof typeof CreateScholarshipAp;
    const { value } = event.target;
    console.log(id, value);
    setScholarshipAp({ ...ScholarshipAp, [id]: value });
  };

  ////////////////////handle close alert/////////////////////////
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
  ///////////////////////////convertType/////////////////////////
  const convertType = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
  };

  ///////////////////////////submit button/////////////////////////
  function submit() {
    let data = {
      StudentID: convertType(ScholarshipAp.StudentID),
      InstituteID: convertType(ScholarshipAp.InstituteID),
      BranchID: convertType(ScholarshipAp.BranchID),
      ScholarshipTypeID: convertType(ScholarshipType.ID),
      ScholarshipID: convertType(Scholarship.ID),
      Identity_Card: ScholarshipAp.Identity_Card,
      GPAX: convertType(ScholarshipAp.GPAX),
      Reasons: ScholarshipAp.Reasons,
    };

    console.log("data", data);

    const requestOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    fetch(`${apiUrl}/create`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        console.log(res);
        if (res.data) {
          console.log("submit", res.data);
          setSuccess(true);
          window.location.href = "/data_scholarship_applicants";
        } else {
          setError(true);
        }
      });
  }

  /////////////////////////////////////////////////////////////////////

  return (
    <div className="UpdateScholarshipApplicant" id="outer-container">
      <ThemeProvider theme={Theme}>
        <Studentbar
          pageWrapId={"page-UpdateScholarshipApplicant"}
          outerContainerId={"outer-container"}
        />
        <div id="page-UpdateScholarshipApplicant">
          <Box sx={{ bgcolor: "#CFD8DC", height: "300vh" }}>
            <React.Fragment>
              <CssBaseline>
                <Container maxWidth="lg" sx={{ padding: 2 }}>
                  <Snackbar
                    open={success}
                    autoHideDuration={6000}
                    onClose={handleClose}
                    anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                  >
                    <Alert onClose={handleClose} severity="success">
                      บันทึกข้อมูลสำเร็จ
                    </Alert>
                  </Snackbar>

                  <Snackbar
                    open={error}
                    autoHideDuration={6000}
                    onClose={handleClose}
                    anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                  >
                    <Alert onClose={handleClose} severity="error">
                      บันทึกข้อมูลไม่สำเร็จ
                    </Alert>
                  </Snackbar>

                  <Paper sx={{ padding: 2, mb: 2 }}>
                    <Box display={"flex"}>
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography
                          sx={{
                            color: "#039BE5",
                            fontFamily: "fantasy",
                            fontSize: 30,
                            textAlign:"center"
                          }}
                        >
                          Apply Scholarship
                        </Typography>
                      </Box>
                    </Box>
                  </Paper>

                  <Paper>
                    <Grid item xs={12} sx={{ padding: 5 }}>
                      <Grid container spacing={2} sx={{ padding: 2 }}>
                        <Grid item xs={12}>
                          <h3>ชื่อ-นามสกุล</h3>
                          <TextField
                            fullWidth
                            id="StudentID"
                            variant="outlined"
                            value={ScholarshipAp.Student_Name}
                            disabled
                          />
                        </Grid>

                        <Grid item xs={12}>
                          <h3>เลขประจำตัวประชาชน 13 หลัก</h3>
                          <TextField
                            fullWidth
                            id="Identity_Card"
                            variant="outlined"
                            inputProps={{ maxLength: 13 }}
                            value={ScholarshipAp.Identity_Card}
                            onChange={handleInputChange}
                          />
                        </Grid>

                        <Grid item xs={12}>
                          <h3>เกรดเฉลี่ยสะสม (GPAX)</h3>
                          <TextField
                            fullWidth
                            id="GPAX"
                            inputProps={{ maxLength: 4 }}
                            variant="outlined"
                            value={ScholarshipAp.GPAX}
                            onChange={handleInputChange}
                          />
                        </Grid>

                        <Grid item xs={12}>
                          <h3>ประเภททุนการศึกษา</h3>
                          <TextField
                            fullWidth
                            id="ScholarshipTypeID"
                            disabled
                            value={ScholarshipType.Scholarship_Type_Name}
                            inputProps={{ name: "ScholarshipTypeID" }}
                          ></TextField>
                        </Grid>

                        <Grid item xs={12}>
                          <h3>ทุนการศึกษา</h3>
                          <TextField
                            fullWidth
                            id="ScholarshipID"
                            disabled
                            value={Scholarship.Scholarship_Name}
                            inputProps={{ name: "ScholarshipID" }}
                          ></TextField>
                        </Grid>

                        <Grid item xs={12}>
                          <h3>สาขา</h3>
                          <Select
                            fullWidth
                            disabled
                            id="Branch"
                            value={ScholarshipAp.BranchID + ""}
                            inputProps={{ name: "BranchID" }}
                          >
                            {Branch.map((item) => (
                              <option key={item.ID} value={item.ID}>
                                {item.Branch_Name}
                              </option>
                            ))}
                          </Select>
                        </Grid>

                        <Grid item xs={12}>
                          <h3>สำนักวิชา</h3>
                          <Select
                            fullWidth
                            disabled
                            id="Institute"
                            value={ScholarshipAp.InstituteID + ""}
                            inputProps={{ name: "InstituteID" }}
                          >
                            {Institute.map((item) => (
                              <option key={item.ID} value={item.ID}>
                                {item.Institute_Name}
                              </option>
                            ))}
                          </Select>
                        </Grid>

                        <Grid item xs={12}>
                          <h3>
                            เหตุผลประกอบในการสมัครทุน (ไม่น้อยกว่า 300 ตัวอักษร)
                          </h3>
                          <TextField
                            fullWidth
                            id="Reasons"
                            variant="outlined"
                            multiline
                            value={ScholarshipAp.Reasons}
                            onChange={handleInputChange}
                          />
                        </Grid>

                        <Grid item xs={12}>
                          <Button
                            onClick={submit}
                            variant="contained"
                            color="primary"
                            sx={{ float: "right" }}
                          >
                            SUBMIT
                          </Button>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Paper>
                </Container>
              </CssBaseline>
            </React.Fragment>
          </Box>
        </div>
      </ThemeProvider>
    </div>
  );
}
export default CreateScholarshipAp;
