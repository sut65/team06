import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { Link as RouterLink } from "react-router-dom";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import CssBaseline from "@mui/material/CssBaseline";
import { useNavigate, useParams } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

import { ScholarshipTypeInterface } from "../../models/IScholarshipType";
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

function UpdateScholarshipAp() {
  ////////////////////variables////////////////////////
  let { id } = useParams(); // id ของ row ที่เลือกหน้า data scholarship applicant
  console.log("id", id);

  const [ScholarshipType, setScholarshipType] = useState<
    Partial<ScholarshipTypeInterface>
  >({});

  const [ScholarshipAp, setScholarshipAp] = useState<
    Partial<ScholarshipApInterface>
  >({});

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [message, setAlertMessage] = useState("");

  console.log("ScholarshipType", ScholarshipType.ID);

  ////////////////////////////////////////////
  const apiUrl = "http://localhost:8080";
  const requestOptionsGet = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  const fetchStudentByID = async () => {
    fetch(`${apiUrl}/applicant/${id}`, requestOptionsGet)
      .then((response) => response.json())
      .then((result) => {
        result.data && setScholarshipAp(result.data);
        console.log(
          "fetchStudentByIDfromScholarshipApplicantEntity",
          result.data
        );
      });
  };

  useEffect(() => {
    fetchStudentByID();
  }, []);

  console.log(ScholarshipAp);

  //////////////////handle change ของ input field///////////////////////
  const handleInputChange = (
    event: React.ChangeEvent<{ id?: string; value: any }>
  ) => {
    const id = event.target.id as keyof typeof ScholarshipAp;
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

  ///////////////////////////update button/////////////////////////
  function update() {
    let data = {
      ID: convertType(id),
      StudentID: convertType(ScholarshipAp.StudentID),
      InstituteID: convertType(ScholarshipAp.InstituteID),
      BranchID: convertType(ScholarshipAp.BranchID),
      ScholarshipTypeID: convertType(ScholarshipAp.ScholarshipTypeID),
      ScholarshipID: convertType(ScholarshipAp.ScholarshipID),
      Identity_Card: ScholarshipAp.Identity_Card,
      GPAX: convertType(ScholarshipAp.GPAX),
      Reasons: ScholarshipAp.Reasons,
    };

    console.log("data", data);
    console.log("ScholarshipAp.StudentID", ScholarshipAp.StudentID);
    console.log("ScholarshipAp.InstituteID", ScholarshipAp.InstituteID);
    console.log("ScholarshipAp.BranchID", ScholarshipAp.BranchID);
    console.log("ScholarshipType.ID", ScholarshipAp.ID);
    console.log("Scholarship.ID", ScholarshipAp.ID);

    const requestOptions = {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    fetch(`${apiUrl}/update_scholarship_applicants`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        console.log(res);
        if (res.data) {
          console.log("update", res.data);
          setSuccess(true);
          setAlertMessage("บันทึกข้อมูลสำเร็จ");
          window.location.href = "/data_scholarship_applicants";
        } else {
          setError(true);
          setAlertMessage(res.error);
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
          <Box sx={{ bgcolor: "#CFD8DC", height: "auto" }}>
            <React.Fragment>
              <CssBaseline>
                <Container maxWidth="lg" sx={{ padding: 2 }}>
                  <Snackbar
                    id="success"
                    open={success}
                    autoHideDuration={3000}
                    onClose={handleClose}
                    anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                  >
                    <Alert onClose={handleClose} severity="success">
                      {message}
                    </Alert>
                  </Snackbar>

                  <Snackbar
                    id="error"
                    open={error}
                    autoHideDuration={3000}
                    onClose={handleClose}
                    anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                  >
                    <Alert onClose={handleClose} severity="error">
                      {message}
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
                          }}
                        >
                          Update Scholarship Applicant
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
                            inputProps={{ readOnly: true }}
                            fullWidth
                            id="StudentID"
                            variant="outlined"
                            value={ScholarshipAp.Student?.Student_Name}
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
                            value={
                              ScholarshipAp.ScholarshipType
                                ?.Scholarship_Type_Name
                            }
                            inputProps={{
                              readOnly: true,
                              name: "ScholarshipTypeID",
                            }}
                          ></TextField>
                        </Grid>

                        <Grid item xs={12}>
                          <h3>ทุนการศึกษา</h3>
                          <TextField
                            fullWidth
                            id="ScholarshipID"
                            value={ScholarshipAp.Scholarship?.Scholarship_Name}
                            inputProps={{
                              readOnly: true,
                              name: "ScholarshipID",
                            }}
                          ></TextField>
                        </Grid>

                        <Grid item xs={12}>
                          <h3>สาขาวิชา</h3>
                          <TextField
                            fullWidth
                            id="Branch"
                            value={ScholarshipAp.Branch?.Branch_Name}
                            inputProps={{ readOnly: true, name: "BranchID" }}
                          ></TextField>
                        </Grid>

                        <Grid item xs={12}>
                          <h3>สำนักวิชา</h3>
                          <TextField
                            fullWidth
                            id="Institute"
                            value={ScholarshipAp.Institute?.Institute_Name}
                            inputProps={{ readOnly: true, name: "InstituteID" }}
                          ></TextField>
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
                            onClick={update}
                            variant="contained"
                            color="primary"
                            component={RouterLink}
                            to="/data_scholarship_applicants"
                            sx={{ float: "right" }}
                          >
                            UPDATE
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
export default UpdateScholarshipAp;
