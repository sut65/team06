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
import { DormitoryInterface } from "../../models/IDormitory";
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

function ShowDormitory() {
  /////////////////////////////////////////////////////

  const [dormitory, setDormitory] = useState<DormitoryInterface[]>([]);
  const [filter, setFilter] = useState(dormitory);
  const studentID = parseInt(localStorage.getItem("Student-id") + "");

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
  const feachDormitoryByID = async () => {
    fetch(`${apiUrl}/dormitory_table`, requestOpionsGet)
      .then((response) => response.json())
      .then((result) => {
        if (result.data) {
          console.log(result.data);
          setDormitory(result.data);
        } else {
          return false;
        }
      });
  };
  /////////////////////////////////////////////////////

  useEffect(() => {
    feachDormitoryByID();
  }, []);

  useEffect(() => {
    const NewFilter = dormitory.filter((dormitory) => {
        return dormitory.StudentID === Number(studentID)
    });

    setFilter(NewFilter);
}, [dormitory, studentID]);

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
    <div className="ShowDormitory" id="outer-container">
      <ThemeProvider theme={Theme}>
        <Studentbar
          pageWrapId={"page-ShowDormitory"}
          outerContainerId={"outer-container"}
        />
        <div id="page-ShowDormitory">
          <React.Fragment>
            <Box sx={{ backgroundColor: "#313131", height: "100vh" }}>
              <CssBaseline />
              <Container maxWidth="lg" sx={{ padding: 1}}>
                <Paper sx={{ padding: 1 }}>
                  <Box display={"flex"}>
                    <Box sx={{ marginTop: 1.6 }}>
                      <Typography variant="h4" gutterBottom>
                        DORMITPRY
                      </Typography>
                    </Box>
                  </Box>
                </Paper>
                <TableContainer component={Paper} sx={{ marginTop: 1 }}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell align="center">ลำดับ</TableCell>
                        <TableCell align="center">รหัสนักศึกษา</TableCell>
                        <TableCell align="center">ปีการศึกษา</TableCell>
                        <TableCell align="center">ประเภทหอพัก</TableCell>
                        <TableCell align="center">เลขห้องพัก</TableCell>
                        <TableCell align="center">สาขาวิชา</TableCell>
                        <TableCell align="center"></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filter.map((row, idx) => (
                        <TableRow
                          key={row.ID}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell align="center">{idx + 1}</TableCell>
                          <TableCell align="center">{row.Dormitory_Student_Number}</TableCell>
                          <TableCell align="center">{row.Dormitory_AcademicYear}</TableCell>
                          <TableCell align="center">{row.DormitoryType.Dormitory_Type_Name}</TableCell>
                          <TableCell align="center">{row.Room_Number}</TableCell>
                          <TableCell align="center">{row.Branch.Branch_Name}</TableCell>
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

export default ShowDormitory;
