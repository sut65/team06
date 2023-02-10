import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Link as RouterLink, useNavigate, useParams } from "react-router-dom";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography/Typography";

import { ScholarshipInterface } from "../../models/IScholarship";
import { ScholarshipTypeInterface } from "../../models/IScholarshipType";
import { Studentbar } from "../Bar-Student";

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

function Details() {
  let { id } = useParams();
  let navigate = useNavigate();

  const [scholarship, setScholarship] = useState<Partial<ScholarshipInterface>>(
    {}
  );
  const [scholarshipType, setScholarshipType] = useState<
    Partial<ScholarshipTypeInterface>
  >({});

  const apiUrl = "http://localhost:8080";
  const requestOptionsGet = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };
  /////////////////////////////////////////////////////

  //แสดงข้อมูล scholarship ทั้งหมด
  const fetchScholarship = async () => {
    fetch(`${apiUrl}/scholarship/${id}`, requestOptionsGet)
      .then((response) => response.json())
      .then((result) => {
        console.log(result.data);
        setScholarship(result.data);
      });
  };

  //แสดงข้อมูล scholarship typeทั้งหมด
  const fetchScholarshipType = async () => {
    fetch(`${apiUrl}/scholarship_type/${id}`, requestOptionsGet)
      .then((response) => response.json())
      .then((result) => {
        console.log(result.data);
        setScholarshipType(result.data);
      });
  };

  useEffect(() => {
    fetchScholarship();
    fetchScholarshipType();
  }, []);

  return (
    <div className="AllScholarship" id="outer-container">
      <ThemeProvider theme={Theme}>
        <Studentbar
          pageWrapId={"page-AllScholarship"}
          outerContainerId={"outer-container"}
        />
        <div id="page-AllScholarship">
          <Box sx={{ bgcolor: "#CFD8DC", height: "100vh" }}>
            <Container maxWidth="lg" sx={{ padding: 2 }}>
              <Paper elevation={2} sx={{ paddingLeft: 5 }}>
                <Grid item xs={12} sx={{ padding: 2, mb: 2 }}>
                  <Box display={"flex"}>
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography
                        sx={{
                          color: "#039BE5",
                          fontFamily: "fantasy",
                          fontSize: 30,
                          textAlign: "center",
                        }}
                      >
                        Scholarship Details
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              </Paper>

              <Paper
                elevation={2}
                sx={{
                  paddingLeft: 5,
                  paddingBottom: 1,
                  paddingTop: 1,
                  paddingRight: 5,
                }}
              >
                <Grid item xs={12}>
                  <h2 style={{ color: "#0288D1" }}>คุณสมบัติทั่วไป ดังนี้</h2>
                  <p>(1) มีสัญชาติไทย</p>
                  <p>
                    (2)
                    ศึกษาหรือได้รับการตอบรับให้เข้าศึกษาอยู่ในสถานศึกษาที่ร่วมดำเนินงานกับกองทุน{" "}
                  </p>
                  <p>
                    (3)
                    เป็นผู้ขอกู้ยืมเงินเพื่อการศึกษาในการเข้าศึกษาที่สถานศึกษาเพียงแห่งเดียวในคราวภาคการศึกษาเดียวกัน
                  </p>
                  <p>
                    (4)
                    มีผลการเรียนดีหรือผ่านเกณฑ์การวัดและประเมินผลของสถานศึกษา
                  </p>
                  <h2 style={{ color: "#0288D1" }}> ลักษณะต้องห้าม ดังนี้</h2>
                  <p>
                    (1)
                    เป็นผู้สำเร็จการศึกษาระดับปริญญาตรีในสาขาใดสาขาหนึ่งมาก่อน
                    เว้นแต่จะได้กำหนดเป็นอย่างอื่นในคุณสมบัติเฉพาะสำหรับการให้เงินกู้ยืมเพื่อการศึกษาลักษณะหนึ่งลักษณะใด
                  </p>
                  <p>
                    (2)
                    เป็นผู้ปฏิบัติงานและรับเงินเดือนหรือค่าจ้างประจำในหน่วยงานของรัฐหรือเอกชนในลักษณะเต็มเวลา
                    เว้นแต่จะได้กำหนดเป็นอย่างอื่นในคุณสมบัติเฉพาะสำหรับการให้เงินกู้ยืมเพื่อการศึกษาลักษณะหนึ่งลักษณะใด
                  </p>
                </Grid>
              </Paper>
              <Button
                onClick={() => navigate("create")}
                sx={{ marginTop: 2, float: "right", fontFamily: "cursive" }}
                variant="contained"
                color="primary"
              >
                APPLY
              </Button>
            </Container>
          </Box>
        </div>
      </ThemeProvider>
    </div>
  );
}
export default Details;
