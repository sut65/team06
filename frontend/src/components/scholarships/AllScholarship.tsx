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
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

import { StudentInterface } from "../../models/IStudent";
import { ScholarshipInterface } from "../../models/IScholarship";
import { ScholarshipTypeInterface } from "../../models/IScholarshipType";
import { ScholarshipApInterface } from "../../models/IScholarshipAp";
import { Studentbar } from "../Bar-Student";

function AllScholarship() {
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
  ////////////////////variables////////////////////////

  const [Student, setStudent] = useState<StudentInterface[]>([]);
  const [Scholarship, setScholarship] = useState<ScholarshipInterface[]>([]);
  const [ScholarshipType, setScholarshipType] = useState<
    ScholarshipTypeInterface[]
  >([]);

  const [ScholarshipAp, setScholarshipAp] = useState<
    Partial<ScholarshipApInterface>
  >({});

  const apiUrl = "http://localhost:8080";
  const requestOptionsGet = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  const fetchScholarship = async () => {
    fetch(`${apiUrl}/scholarship`, requestOptionsGet)
      .then((response) => response.json())
      .then((result) => {
        console.log(result.data);
        setScholarship(result.data);
      });
  };

  const fetchScholarshipType = async () => {
    fetch(`${apiUrl}/scholarship_type`, requestOptionsGet)
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

  console.log(ScholarshipAp);

  return (
    <div className="AllScholarship" id="outer-container">
      <ThemeProvider theme={Theme}>
        <Studentbar
          pageWrapId={"page-AllScholarship"}
          outerContainerId={"outer-container"}
        />
        <div id="page-AllScholarship">
          <Box sx={{ bgcolor: "#CFD8DC", height: "auto" }}>
            <Container maxWidth="lg" sx={{ padding: 2 }}>
              <Paper sx={{ padding: 2, mb: 2 }}>
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
                      Scholarship
                    </Typography>
                  </Box>
                </Box>
              </Paper>
              <Paper elevation={2}>
                <Grid item xs={12} container spacing={8} sx={{ margin: 5 }}>
                  {Scholarship.map((item) => {
                    return (
                      <Grid item xs={5} container sx={{ marginBottom: 5 }}>
                        <Paper
                          elevation={4}
                          sx={{
                            padding: 2,
                            display: "flex",
                            alignItems: "center",
                            gap: "1rem",
                            p: "2rem",
                            height: "200px",
                          }}
                        >
                          <Grid item xs={7}>
                            <h3 style={{ color: "#42A5F5" }}>
                              <u>{item.Scholarship_Name}</u>
                            </h3>
                            <p style={{ color: "#78909C" }}>
                              {item.Scholarship_Info}
                            </p>
                            <p style={{ color: "#9E9E9E" }}>
                              {item.Scholarship_Close}
                            </p>

                            <Button
                              variant="contained"
                              color="primary"
                              component={RouterLink}
                              to={`/scholarship/detail/${item.ID}`}
                              sx={{ fontFamily: "cursive" }}
                            >
                              Read more
                            </Button>
                          </Grid>
                          <Grid item xs={5}>
                            <img
                              src="https://images.unsplash.com/photo-1604594849809-dfedbc827105?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8NHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"
                              alt=""
                              style={{ width: "100%", height: "100px" }}
                            />
                          </Grid>
                        </Paper>
                      </Grid>
                    );
                  })}
                </Grid>
              </Paper>
            </Container>
          </Box>
        </div>
      </ThemeProvider>
    </div>
  );
}
export default AllScholarship;
