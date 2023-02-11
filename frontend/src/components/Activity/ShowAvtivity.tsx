import React, { useEffect, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { ActivityInterface } from "../../models/IActivity";
import Home from "../Home";
import { Studentbar } from "../Bar-Student";
import { ThemeProvider, createTheme } from "@mui/material/styles";


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

function ShowActivity() {
  /////////////////////////////////////////////////////

  const [activity, setActivity] = useState<ActivityInterface[]>([]);
  const id = localStorage.getItem("Student-id");

  /////////////////////////////////////////////////////
  const apiUrl = "http://localhost:8080";
  const requestOpionsGet = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };
  /////////////////////////////////////////////////////

  //แสดงข้อมูล Activity ทั้งหมด
  const feachActivityByID = async () => {
    fetch(`${apiUrl}/activity/${id}`, requestOpionsGet)
      .then((response) => response.json())
      .then((result) => {
        if (result.data) {
          console.log(result.data);
          setActivity(result.data);
        } else {
          return false;
        }
      });
  };
  /////////////////////////////////////////////////////

  useEffect(() => {
    feachActivityByID();
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
    <div className="ShowActivity" id="outer-container">
      <ThemeProvider theme={Theme}>
        <Studentbar
          pageWrapId={"page-ShowActivity"}
          outerContainerId={"outer-container"}
        />
        <div id="page-ShowActivity">
          <React.Fragment>
            <Box sx={{ backgroundColor: "#313131", height: "100vh" }}>
              <CssBaseline />
              <Container maxWidth="lg">
                <Paper sx={{ padding: 1 }}>
                  <Box display={"flex"}>
                    <Box sx={{ marginTop: 1.6 }}>
                      <Typography variant="h4" gutterBottom>
                        ACTIVITY
                      </Typography>
                    </Box>
                  </Box>
                </Paper>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell align="center">ID</TableCell>
                        <TableCell align="center">รหัสนักศึกษา</TableCell>
                        <TableCell align="center">ชื่อกิจกรรม</TableCell>
                        <TableCell align="center">สถานที่</TableCell>
                        <TableCell align="center">ตำแหน่ง</TableCell>
                        <TableCell align="center">ชั่วโมงจิตอาสา</TableCell>
                        <TableCell align="center"></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {activity.map((row, idx) => (
                        <TableRow
                          key={row.ID}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell align="center">{idx + 1}</TableCell>
                          <TableCell align="center">
                            {row.Activity_Student_Number}
                          </TableCell>
                          <TableCell align="center">
                            {row.Activity_Name}
                          </TableCell>
                          <TableCell align="center">{row.Location}</TableCell>
                          <TableCell align="center">{row.Position} </TableCell>
                          <TableCell align="center">{row.Hour} </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Container>
            </Box>
          </React.Fragment>
        </div>
      </ThemeProvider>
    </div>
  );
}

export default ShowActivity;
