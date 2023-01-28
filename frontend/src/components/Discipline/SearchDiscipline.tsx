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
import { Link as RouterLink, } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";

import { DisciplineInterface } from "../../models/IDiscipline";

import { Studentbar } from "../Bar-Student";
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

function SearchDiscipline() {
    /////////////////////////////////////////////////////

    const [Disciplines, ListDiscipline] = useState<DisciplineInterface[]>([]);

    //Filter
    const [filter, setFilter] = useState(Disciplines);
    const studentID = parseInt(localStorage.getItem("Student-id") + "");
    /////////////////////////////////////////////////////
    const apiUrl = "http://localhost:8080";
    const requestOpionsGet = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    };
    /////////////////////////////////////////////////////

    //แสดงข้อมูล discipline ทั้งหมด

    const feachDiscipline = async () => {
        fetch(`${apiUrl}/ListDiscipline`, requestOpionsGet)
            .then((response) => response.json())
            .then((result) => {
                console.log(result.data);
                ListDiscipline(result.data);
            });
    };

    useEffect(() => {
        feachDiscipline();
    }, []);

    useEffect(() => {
        const NewFilter = Disciplines.filter((Disciplines) => {
            return Disciplines.StudentID === Number(studentID)
        });

        setFilter(NewFilter);
    }, [Disciplines, studentID]);

    /////////////////////////////////////////////////////

    return (
        <div className="SearchDiscipline" id="outer-container">
            <ThemeProvider theme={Theme}>
                <Studentbar
                    pageWrapId={"page-SearchDiscipline"}
                    outerContainerId={"outer-container"}
                />
                <div id="page-SearchDiscipline">
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
                                                DISCIPLINE
                                            </Typography>
                                        </Box>
                                        {/* <Box sx={{ marginLeft: 102, marginTop: 0.9 }}>
                                        <Button
                                            variant="contained"
                                            component={RouterLink}
                                            to="/DataDiscipline"
                                            color="secondary"
                                            size="large"
                                        >
                                            back
                                        </Button>
                                    </Box> */}
                                    </Box>
                                </Paper>
                                <TableContainer component={Paper} sx={{ marginTop: 1 }}>
                                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell align="center">Student_Number</TableCell>
                                                <TableCell align="center">Student_Name</TableCell>
                                                <TableCell align="center">Discipline_Type</TableCell>
                                                <TableCell align="center">Discipline_Reason</TableCell>
                                                <TableCell align="center">Discipline_Punishment</TableCell>
                                                <TableCell align="center">Discipline_Point</TableCell>
                                                <TableCell align="center"></TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {filter.map((row) => (
                                                <TableRow
                                                    key={row.ID}
                                                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                                >
                                                    <TableCell align="center">{row.Student.Student_Number}</TableCell>
                                                    <TableCell align="center">{row.Student.Student_Name}</TableCell>
                                                    <TableCell align="center">{row.DisciplineType.DisciplineType_Name}</TableCell>
                                                    <TableCell align="center">
                                                        {row.Discipline_Reason}
                                                    </TableCell>
                                                    <TableCell align="center">{row.Discipline_Punishment} </TableCell>
                                                    <TableCell align="center">{row.Discipline_Point} </TableCell>
                                                    <TableCell align="center">
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

export default SearchDiscipline;