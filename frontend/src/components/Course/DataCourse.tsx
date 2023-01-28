import React, { useEffect, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { ButtonGroup } from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { HiHome } from "react-icons/hi";
import { BiSearchAlt } from "react-icons/bi";
import Home from "../Home";

import { CourseInterface } from "../../models/ICourse";

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

function DataCourse() {
  /////////////////////////////////////////////////////

  let navigate = useNavigate();

  const [coursetable, setCoursetable] = useState<CourseInterface[]>([]);
  const [Filter, setFilter] = useState(coursetable);
  const [input, setInput] = useState("");

  /////////////////////////////////////////////////////
  const apiUrl = "http://localhost:8080";
  const requestOptionsGet = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };
  /////////////////////////////////////////////////////

  //แสดงข้อมูล student ทั้งหมด
  const feachCoursetable = async () => {
    fetch(`${apiUrl}/course_table`, requestOptionsGet)
      .then((response) => response.json())
      .then((result) => {
        console.log(result.data);
        setCoursetable(result.data);
      });
  };

  const DeleteCourse = (id: string) => {
    console.log(id);
    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };

    fetch(`${apiUrl}/delete_course/${id}`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        console.log(res);
        if (res.data) {
          // setSuccess(true);
          alert(`Are you sure delete id: ${id}`);
          setTimeout(() => {
            window.location.href = "/DataCourse";
          }, 500);
        } else {
          // setError(true);
        }
      });
  };

  /////////////////////////////////////////////////////

  useEffect(() => {
    feachCoursetable();
  }, []);

  useEffect(() => {
    const NewFilter = coursetable.filter((coursetable) => {
      return coursetable.Course_Name.includes(input);
    });

    setFilter(NewFilter);
  }, [coursetable, input]);

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
    <div className="DataCourse" id="outer-container">
      <ThemeProvider theme={Theme}>
        <Adminbar
          pageWrapId={"page-DataCourse"}
          outerContainerId={"outer-container"}
        />
        <div id="page-DataCourse">
          <React.Fragment>
            <Box sx={{ backgroundColor: "#313131", height: "100vh" }}>
              <CssBaseline />
              <Container maxWidth="lg">
                <Paper sx={{ padding: 1 }}>
                  <Box display={"flex"}>
                    <Box sx={{ marginTop: 1.6 }}>
                      <Typography variant="h4" gutterBottom>
                        <Button
                          color="inherit"
                          component={RouterLink}
                          to="/HomeAdmin"
                          sx={{ marginBottom: 0.5 }}
                        >
                          <HiHome size="30" />
                        </Button>
                        Course
                      </Typography>
                    </Box>
                    <Box sx={{ marginLeft: 25 }}>
                      <Typography variant="h4" gutterBottom>
                        <TextField
                          fullWidth
                          id="Course_Name"
                          type="string"
                          label="ค้นหา หลักสูตร"
                          variant="standard"
                          name="Course_Name"
                          value={input}
                          onChange={(event) => setInput(event.target.value)}
                        />
                      </Typography>
                    </Box>
                    <Box sx={{ marginTop: 2.3 }}>
                      <BiSearchAlt size="30" />
                    </Box>
                    <Box sx={{ marginLeft: 50, marginTop:0.9 }}>
                      <Button
                        variant="contained"
                        component={RouterLink}
                        to="/CreateCourse"
                        color="secondary"
                        size="large"
                      >
                        create
                      </Button>
                    </Box>
                  </Box>
                </Paper>
                <TableContainer component={Paper} sx={{ marginTop: 1 }}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell align="center">ID</TableCell>
                        <TableCell align="center">ชื่อ หลักสูตร</TableCell>
                        <TableCell align="center">ระดับการศึกษา</TableCell>
                        <TableCell align="center">ปีก่อตั้งหลักสูตรการศึกษา</TableCell>
                        <TableCell align="center">จำนวนหน่วยกิต</TableCell>
                        <TableCell align="center">ชื่อ-สกุล อาจารย์</TableCell>
                        <TableCell align="center">OPTION</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {Filter.map((row) => (
                        <TableRow
                          key={row.ID}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell align="center">{row.ID}</TableCell>
                          <TableCell align="center">
                            {row.Course_Name}
                          </TableCell>
                          <TableCell align="center">
                            {row.Degree.Degree_Name}
                          </TableCell>
                          <TableCell align="center">
                            {row.Course_Year}
                          </TableCell>
                          <TableCell align="center">
                            {row.Course_Credit}
                          </TableCell>
                          <TableCell align="center">
                            {row.Course_Teacher}{" "}
                          </TableCell>
                          <TableCell align="center">
                            <ButtonGroup>
                              <Button
                                onClick={() =>
                                  navigate(`UpdateCourse/${row.ID}`)
                                }
                                color="info"
                              >
                                update
                              </Button>
                              <Button
                                onClick={() =>
                                  navigate(`SearchCourse/${row.ID}`)
                                }
                              >
                                <SearchIcon />
                              </Button>
                              <Button
                                onClick={() => DeleteCourse(row.ID + "")}
                                color="secondary"
                              >
                                <DeleteOutlineIcon />
                              </Button>
                            </ButtonGroup>
                          </TableCell>
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

export default DataCourse;
