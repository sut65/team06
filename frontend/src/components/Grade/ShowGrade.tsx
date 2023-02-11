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
import { GradeInterface } from "../../models/IGrade";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Studentbar } from "../Bar-Student";
import Home from "../Home";
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

function ShowGrade() {
  /////////////////////////////////////////////////////

  const [grade, setGrade] = useState<GradeInterface[]>([]);

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

  //แสดงข้อมูล postponement ทั้งหมด
  const feachGradeByID = async () => {
    fetch(`${apiUrl}/grade/${id}`, requestOpionsGet)
      .then((response) => response.json())
      .then((result) => {
        if (result.data) {
          console.log(result.data);
          setGrade(result.data);
        } else {
          return false;
        }
      });
  };

  /////////////////////////////////////////////////////

  useEffect(() => {
    feachGradeByID();
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
  /////////////////////////////////////////////////
  return (
    <div className="ShowGrade" id="outer-container">
      <ThemeProvider theme={Theme}>
        <Studentbar
          pageWrapId={"page-ShowGrade"}
          outerContainerId={"outer-container"}
        />
        <div id="page-ShowGrade">
          <React.Fragment>
            <Box sx={{ backgroundColor: "#313131", height: "200vh" }}>
              <CssBaseline />
              <Container maxWidth="lg">
                <Paper sx={{ padding: 1 }}>
                  <Box display={"flex"}>
                    <Box sx={{ marginTop: 1.6 }}>
                      <Typography variant="h4" gutterBottom>
                        Grade
                      </Typography>
                    </Box>
                  </Box>
                </Paper>
                <TableContainer component={Paper} sx={{ marginTop: 1 }}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell align="center">Row</TableCell>
                        <TableCell align="center">
                          Grade_Student_Number
                        </TableCell>
                        <TableCell align="center">Grade_Code_Supject</TableCell>
                        <TableCell align="center">Grade_Supject</TableCell>
                        <TableCell align="center">Grade</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {grade.map((row, idx) => (
                        <TableRow
                          key={row.ID}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell align="center">{idx + 1}</TableCell>
                          <TableCell align="center">
                            {row.Grade_Student_Number}
                          </TableCell>
                          <TableCell align="center">
                            {row.Grade_Code_Supject}
                          </TableCell>
                          <TableCell align="center">
                            {row.Grade_Supject}
                          </TableCell>
                          <TableCell align="center">{row.Grade}</TableCell>
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

export default ShowGrade;
