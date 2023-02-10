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
import { ButtonGroup } from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { HiHome } from "react-icons/hi";
import { BiSearchAlt } from "react-icons/bi";

import { SuggestionInterface } from "../../models/ISuggestion";

import Home from "../Home";
import { Studentbar } from "../Bar-Student";

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

function DataSuggestion() {
  /////////////////////////////////////////////////////

  let navigate = useNavigate();
  console.log(navigate);

  const [suggestiontable, setSuggestiontable] = useState<SuggestionInterface[]>(
    []
  );
  const [filter, setFilter] = useState(suggestiontable);
  const [Suggestion_Student_Number, setStudent_Student_Number] = useState("");

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

  //แสดงข้อมูล suggestion ทั้งหมด
  const feachSuggestiontable = async () => {
    fetch(`${apiUrl}/suggestion_table`, requestOpionsGet)
      .then((response) => response.json())
      .then((result) => {
        console.log(result.data);
        setSuggestiontable(result.data);
      });
  };

  /////////////////////////////////////////////////////
  // ลบข้อมูล suggestion
  const deleteSuggestion = (id: string) => {
    console.log(id);
    const requestOptions = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };

    fetch(`${apiUrl}/delete_suggestion/${id}`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        console.log(res);
        if (res.data) {
          // setSuccess(true);
          alert(`Are you sure delete id: ${id}`);
          setTimeout(() => {
            window.location.href = "/DataSuggestion";
          }, 500);
        } else {
          // setError(true);
        }
      });
  };

  /////////////////////////////////////////////////////

  useEffect(() => {
    feachSuggestiontable();
  }, []);

  useEffect(() => {
    const NewFilter = suggestiontable.filter((suggestiontable) => {
      return suggestiontable.Suggestion_Student_Number?.includes(
        Suggestion_Student_Number
      );
    });

    setFilter(NewFilter);
  }, [suggestiontable, Suggestion_Student_Number]);

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
    <div className="DataSuggestion" id="outer-container">
      <ThemeProvider theme={Theme}>
        <Studentbar
          pageWrapId={"page-DataStudent"}
          outerContainerId={"outer-container"}
        />
        <div id="page-DataSuggestion">
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
                          to="/HomeStudent"
                          sx={{ marginBottom: 0.5 }}
                        >
                          <HiHome size="30" />
                        </Button>
                        SUGGESTION
                      </Typography>
                    </Box>
                    <Box sx={{ marginTop: 2.3 }}>
                      <BiSearchAlt size="30" />
                    </Box>
                    <Box sx={{ marginLeft: 43.5, marginTop: 0.9 }}>
                      <Button
                        variant="contained"
                        component={RouterLink}
                        to="/CreateSuggestion"
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
                        <TableCell align="center">ลำดับ</TableCell>
                        <TableCell align="center">ID</TableCell>
                        <TableCell align="center">รหัสนักศึกษา</TableCell>
                        <TableCell align="center">ชื่อ-สกุล</TableCell>
                        <TableCell align="center">ชื่ออาจารย์</TableCell>
                        <TableCell align="center">
                          วันที่เสนอความคิดเห็น
                        </TableCell>
                        <TableCell align="center">รายละเอียด</TableCell>
                        {/* <TableCell align="center">สาขา</TableCell> */}
                        <TableCell align="center"></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {suggestiontable.map((row, idx) => (
                        <TableRow
                          key={row.ID}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell align="center">{idx + 1}</TableCell>
                          <TableCell align="center">{row.ID}</TableCell>
                          <TableCell align="center">
                            {row.Suggestion_Student_Number}
                          </TableCell>
                          <TableCell align="center">
                            {row.Suggestion_Student_Name}
                          </TableCell>
                          <TableCell align="center">
                            {row.Suggestion_Teacher}
                          </TableCell>
                          <TableCell align="center">
                            {row.Suggestion_Date + ""}
                          </TableCell>
                          <TableCell align="center">
                            {row.Suggestion_Detail}
                          </TableCell>
                          {/* <TableCell align="center">{row.BranchID}</TableCell> */}
                          <TableCell align="center">
                            <ButtonGroup>
                              <Button
                                onClick={() =>
                                  navigate(`UpdateSuggestion/${row.ID}`)
                                }
                                color="info"
                              >
                                update
                              </Button>
                              <Button
                                onClick={() => deleteSuggestion(row.ID + "")}
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

export default DataSuggestion;
