import React, { useEffect, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
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
import { ButtonGroup, TextField } from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import { ActivityInterface } from "../../models/IActivity";
import Home from "../Home";
import { Adminbar } from "../Bar-Admin";
import { BiSearchAlt } from "react-icons/bi";
import { HiHome } from "react-icons/hi";
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

function DataActivity() {
  /////////////////////////////////////////////////////
  let navigate = useNavigate();

  const [activitystable, setActivitystable] = useState<ActivityInterface[]>([]);
  const [Filter, setFilter] = useState(activitystable);
  const [input, setInput] = useState("");

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
  const feachActivitystable = async () => {
    fetch(`${apiUrl}/activity_table`, requestOpionsGet)
      .then((response) => response.json())
      .then((result) => {
        console.log(result.data);
        setActivitystable(result.data);
      });
  };

  /////////////////////////////////////////////////////
  const DeleteActivity = (id: string) => {
    console.log(id);
    const requestOptions = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };

    fetch(`${apiUrl}/delete_activity/${id}`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        console.log(res);
        if (res.data) {
          // setSuccess(true);
          alert(`Are you sure delete id: ${id}`);
          setTimeout(() => {
            window.location.href = "/DataActivity";
          }, 500);
        } else {
          // setError(true);
        }
      });
  };

  /////////////////////////////////////////////////////

  useEffect(() => {
    feachActivitystable();
  }, []);
  useEffect(() => {
    const NewFilter = activitystable.filter((activitystable) => {
      return activitystable.Activity_Student_Number.includes(input);
    });

    setFilter(NewFilter);
  }, [activitystable, input]);

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
    <div className="DataActivity" id="outer-container">
      <ThemeProvider theme={Theme}>
        <Adminbar
          pageWrapId={"page-DataActivity"}
          outerContainerId={"outer-container"}
        />
        <div id="page-DataActivity">
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
                        ACTIVITY
                      </Typography>
                    </Box>
                    <Box sx={{ marginLeft: 25 }}>
                      <Typography variant="h4" gutterBottom>
                        <TextField
                          fullWidth
                          id="Activity_Student_Number"
                          type="string"
                          label="ค้นหา รหัสนักศึกษา"
                          variant="standard"
                          name="Activity_Student_Number"
                          value={input}
                          onChange={(event) => setInput(event.target.value)}
                        />
                      </Typography>
                    </Box>
                    <Box sx={{ marginTop: 2.3 }}>
                      <BiSearchAlt size="30" />
                    </Box>
                    <Box sx={{ marginLeft: 43.5, marginTop: 0.9 }}>
                      <Button
                        variant="contained"
                        component={RouterLink}
                        to="/CreateActivity"
                        color="secondary"
                        size="large"
                      >
                        create
                      </Button>
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
                      {Filter.map((row) => (
                        <TableRow
                          key={row.ID}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell align="center">{row.ID}</TableCell>
                          <TableCell align="center">
                            {row.Activity_Student_Number}
                          </TableCell>
                          <TableCell align="center">
                            {row.Activity_Name}
                          </TableCell>
                          <TableCell align="center">{row.Location}</TableCell>
                          <TableCell align="center">{row.Position} </TableCell>
                          <TableCell align="center">{row.Hour} </TableCell>
                          <TableCell align="center">
                            <ButtonGroup>
                              <Button
                                onClick={() =>
                                  navigate(`UpdateActivity/${row.ID}`)
                                }
                                color="info"
                              >
                                update
                              </Button>
                              <Button
                                onClick={() =>
                                  navigate(`SearchActivity/${row.ID}`)
                                }
                              >
                                <SearchIcon />
                              </Button>
                              <Button
                                onClick={() => DeleteActivity(row.ID + "")}
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

export default DataActivity;
