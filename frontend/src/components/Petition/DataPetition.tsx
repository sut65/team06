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
import SearchIcon from "@mui/icons-material/Search";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { format } from 'date-fns'
import * as dayjs from 'dayjs'
import Moment from 'moment';
import TextField from "@mui/material/TextField";
import { Alert, FormControl, MenuItem, Select, SelectChangeEvent, Snackbar } from '@mui/material';
import { HiHome } from "react-icons/hi";

import { PetitionInterface } from "../../models/IPetition";

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

function date_TO_String(date_Object: string): string {
    // get the year, month, date, hours, and minutes seprately and append to the strig.n
    let date_String: string = 
      date_Object.slice(0,4) + "/" + date_Object.slice(5,7) + "/" + date_Object.slice(8,10)
    return date_String;
  }

function DataPetition() {
    /////////////////////////////////////////////////////

    let navigate = useNavigate();


    const [Petitions, ListPetition] = useState<PetitionInterface[]>([]);
    const [filter, setFilter] = useState(Petitions);


    const studentID = parseInt(localStorage.getItem("Student-id") + "");

    /////////////////////////////////////////////////////
    const apiUrl = "http://localhost:8080";
    const requestOpionsGet = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    };


    /////////////////////////////////////////////////////

    //แสดงข้อมูล petition ทั้งหมด
    const feachPetition = async () => {
        fetch(`${apiUrl}/ListPetition`, requestOpionsGet)
            .then((response) => response.json())
            .then((result) => {
                console.log(result.data);
                ListPetition(result.data);
            });
    };

    const DeletePetition = (id: string) => {
        console.log(id)
        const requestOptions = {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },

        };

        fetch(`${apiUrl}/DeletePetition/${id}`, requestOptions)
            .then((response) => response.json())
            .then((res) => {
                console.log(res);
                if (res.data) {
                    // setSuccess(true);
                    alert(`Are you sure delete id: ${id}`)
                    setTimeout(() => {
                        window.location.href = "/DataPetition";
                    }, 500);
                } else {
                    // setError(true);
                }
            });

    }

    /////////////////////////////////////////////////////

    /////////////////////////////////////////////////////

    useEffect(() => {
        feachPetition();
    }, []);

    useEffect(() => {
        const NewFilter = Petitions.filter((Petitions) => {
            return Petitions.StudentID === studentID
        });

        setFilter(NewFilter);
    }, [Petitions, studentID]);

    /////////////////////////////////////////////////////

    const date = new Date();

    return (
        <div className="DataPetition" id="outer-container">
            <ThemeProvider theme={Theme}>
                <Studentbar
                    pageWrapId={"page-DataPetition"}
                    outerContainerId={"outer-container"}
                />
                <div id="page-DataPetition">
                    <React.Fragment>
                        <Box sx={{ backgroundColor: "#313131", height: "100vh" }}>
                            <CssBaseline />
                            <Container maxWidth="lg" >
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
                                                PETITION
                                            </Typography>
                                        </Box>
                                        <Box sx={{ marginLeft: 98, marginTop: 1.6 }}>
                                            <Button
                                                variant="contained"
                                                component={RouterLink}
                                                to="/CreatePetition"
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
                                                <TableCell align="center">PetitionType</TableCell>
                                                <TableCell align="center">Petition_Reason</TableCell>
                                                <TableCell align="center">PetitionPeriod</TableCell>
                                                <TableCell align="center">Petition_Startdate</TableCell>
                                                <TableCell align="center">Petition_Enddate</TableCell>
                                                <TableCell align="center"></TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {filter.map((row) => (
                                                <TableRow
                                                    key={row.ID}
                                                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                                >
                                                    <TableCell align="center">{row.PetitionType.PetitionType_Name}</TableCell>
                                                    <TableCell align="center">{row.Petition_Reason}</TableCell>
                                                    <TableCell align="center">{row.PetitionPeriod.PetitionPeriod_Num}</TableCell>
                                                    <TableCell align="center">{date_TO_String(row.Petition_Startdate.toString())}</TableCell>
                                                    <TableCell align="center">{date_TO_String(row.Petition_Enddate.toString())} </TableCell>
                                                    <TableCell align="center">
                                                        <ButtonGroup>
                                                            <Button
                                                                onClick={() => navigate(`UpdatePetition/${row.ID}`)}
                                                                color="info"
                                                            >
                                                                update
                                                            </Button>
                                                            <Button
                                                                onClick={() => DeletePetition(row.ID + "")}
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

export default DataPetition;