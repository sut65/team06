import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { Alert, FormControl, MenuItem, Select, SelectChangeEvent, Snackbar, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DisciplineInterface, DisciplineTypeInterface } from '../../models/IDiscipline';
import { Link as RouterLink } from "react-router-dom";
import { StudentInterface } from '../../models/IStudent';

import { Adminbar } from "../Bar-Admin";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { FiArrowLeft } from "react-icons/fi";

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

export default function CreateDiscipline() {
    const [Added_Time, setAdded_Time] = React.useState<Dayjs | null>(dayjs());
    const [Discipline_Reason, setDiscipline_Reason] = React.useState<String>("");
    const [Discipline_Punishment, setDiscipline_Punishment] = React.useState<String>("");
    const [Discipline_Point, setDiscipline_Point] = React.useState<String>(""); //this is number i'll fix it later

    //save entity
    const [DisciplineTypeID, setDisciplineTypeID] = React.useState('');
    const [StudentID, setStudentID] = React.useState('');

    //data from fetch

    const [DisciplineTypes, setDisciplineTypes] = React.useState<DisciplineTypeInterface[]>([]);

    //fetch data from other
    const [Students, setStudents] = React.useState<StudentInterface[]>([]);
    const [StudentName, setStudentName] = React.useState('');

    const adminID = parseInt(localStorage.getItem("Admin-id") + "");

    const [success, setSuccess] = React.useState(false);
    const [error, setError] = React.useState(false);

    //onchange
    const onChangeDisciplineType = (event: SelectChangeEvent) => {
        setDisciplineTypeID(event.target.value as string);
    };

    const onChangeStudent = (event: SelectChangeEvent) => {
        setStudentID(event.target.value as string)
        console.log(event.target.value as string);
        SearchStudent();
    }

    const handleClose = (
        event?: React.SyntheticEvent | Event,
        reason?: string
    ) => {
        if (reason === "clickaway") {
            return;
        }
        setSuccess(false);
        setError(false);
    };

    async function submit() {
        setAdded_Time(dayjs())
        //TODO I'll do it later
        //Data ที่จะนำไปบันทึกลงใน Discipline
        let data = {
            AdminID: adminID,
            StudentID: StudentID,
            DisciplineTypeID: DisciplineTypeID,
            Discipline_Reason: Discipline_Reason,
            Discipline_Punishment: Discipline_Punishment,
            Discipline_Point: Number(Discipline_Point),
            Added_Time: Added_Time,
        };

        const apiUrl = "http://localhost:8080/CreateDiscipline";
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        };
        fetch(apiUrl, requestOptions)
            .then((response) => response.json())
            .then((res) => {
                if (res.data) {
                    ListStudent();
                    ListDisciplineType();
                    setSuccess(true);
                } else {
                    setError(true);
                }
            });

        //reset

        setDiscipline_Reason("");
        setDiscipline_Punishment("");
        setDiscipline_Point("");
        setStudentID("");
        setStudentName("");
        setDisciplineTypeID("");
        setAdded_Time(dayjs());
    }

    //TODO function Search is Search for Student
    //TODO match with patna

    const SearchStudent = async () => {
        const apiUrl1 = `http://localhost:8080/student/${StudentID}`;
        const requestOptions1 = {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        };
        fetch(apiUrl1, requestOptions1)
            .then((response) => response.json())
            .then((res) => {
                if (res.data) {
                    console.log(res.data);
                    setStudentName(res.data.Student_Name);
                }
            });
    }


    //load data to combobox

    //TODO match with getVisitorType
    const ListDisciplineType = async () => {
        const apiUrl = "http://localhost:8080/ListDisciplineType";
        const requestOptions = {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        };
        fetch(apiUrl, requestOptions)
            .then((response) => response.json())
            .then((res) => {
                if (res.data) {
                    setDisciplineTypes(res.data);
                    console.log("do type");
                }
            });
    }

    //TODO match with getMapBeds
    const ListStudent = async () => {
        const apiUrl = "http://localhost:8080/student_table";
        const requestOptions = {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        };
        fetch(apiUrl, requestOptions)
            .then((response) => response.json())
            .then((res) => {
                if (res.data) {
                    setStudents(res.data);
                    console.log("do student");
                }
            });
    }

    //========function useEffect ========
    React.useEffect(() => {
        SearchStudent();
    }, [StudentID]);

    React.useEffect(() => {
        ListStudent();
        ListDisciplineType();
    }, []);

    return (
        <div className="CreateDiscipline" id="outer-container">
            <ThemeProvider theme={Theme}>
                <Adminbar
                    pageWrapId={"page-CreateDiscipline"}
                    outerContainerId={"outer-container"}
                />
                <div id="page-CreateDiscipline">
                    <React.Fragment>
                        <Box sx={{ backgroundColor: "#313131", height: "260vh" }}>
                            <CssBaseline />
                            <Container maxWidth="lg">
                                <Paper sx={{ padding: 1 }}>
                                    <Snackbar
                                        open={success}
                                        autoHideDuration={6000}
                                        onClose={handleClose}
                                        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                                    >
                                        <Alert onClose={handleClose} severity="success">
                                            บันทึกข้อมูลสำเร็จ
                                        </Alert>
                                    </Snackbar>
                                    <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>
                                        <Alert onClose={handleClose} severity="error">
                                            บันทึกข้อมูลไม่สำเร็จ
                                        </Alert>
                                    </Snackbar>

                                    <Box
                                        display="flex"
                                    >
                                        <Box sx={{ marginTop: 1.6 }}>
                                            <Typography variant="h4" gutterBottom>
                                                <Button
                                                    color="inherit"
                                                    component={RouterLink}
                                                    to="/DataDiscipline"
                                                    sx={{ marginBottom: 0.5 }}
                                                >
                                                    <FiArrowLeft size="30" />
                                                </Button>
                                                CREATE DISCIPLINE
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Paper>
                            </Container>
                            <Container maxWidth="lg" sx={{ marginTop: 1 }}>
                                <Paper sx={{ padding: 2 }}>
                                    <Box display={"flex"}>
                                        <Box sx={{ flexGrow: 1 }}>
                                            <Grid container spacing={1}
                                                sx={{
                                                    marginY: 2,
                                                    paddingX: 1,
                                                }}
                                            >
                                                <Grid item xs={2}>
                                                    <Typography variant="inherit" align="right">
                                                        Reason
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <TextField
                                                        fullWidth
                                                        id="Discipline_Reason"
                                                        value={Discipline_Reason}
                                                        type="string"
                                                        variant="outlined"
                                                        onChange={(event) => setDiscipline_Reason(event.target.value)}
                                                    />
                                                </Grid>

                                                <Grid item xs={2}>
                                                    <Typography variant="inherit" align="right">
                                                        DisciplineType
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <FormControl fullWidth>
                                                        <Select
                                                            id="DisciplineType"
                                                            value={DisciplineTypeID}
                                                            displayEmpty
                                                            inputProps={{ 'aria-label': 'Without label' }}
                                                            onChange={onChangeDisciplineType}
                                                        >
                                                            <MenuItem value="">
                                                                DisciplineType {/*เลือก DisciplineType*/}
                                                            </MenuItem>
                                                            {DisciplineTypes.map(disciplineType => (
                                                                <MenuItem value={disciplineType.ID} key={disciplineType.ID}>
                                                                    {disciplineType.DisciplineType_Name}
                                                                </MenuItem>
                                                            ))}
                                                        </Select>
                                                    </FormControl>
                                                </Grid>

                                                <Grid item xs={2}>
                                                    <Typography variant="inherit" align="right">
                                                        Punishment
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <TextField
                                                        fullWidth
                                                        value={Discipline_Punishment}
                                                        id="Discipline_Punishment"
                                                        type="string"
                                                        variant="outlined"
                                                        onChange={(event) => setDiscipline_Punishment(event.target.value)}
                                                    />
                                                </Grid>

                                                <Grid item xs={2}>
                                                    <Typography variant="inherit" align="right">
                                                        Student
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <FormControl fullWidth >
                                                        <Select
                                                            id="Student_Number"
                                                            value={StudentID}
                                                            displayEmpty
                                                            inputProps={{ 'aria-label': 'Without label' }}
                                                            onChange={onChangeStudent}
                                                        >
                                                            <MenuItem value="">
                                                                Student {/*เลือก Student*/}
                                                            </MenuItem>
                                                            {Students.map(student => (
                                                                <MenuItem value={student.ID} key={student.ID}>
                                                                    {student.Student_Number}
                                                                </MenuItem>
                                                            ))}
                                                        </Select>
                                                    </FormControl>
                                                </Grid>

                                                <Grid item xs={2}>
                                                    <Typography variant="inherit" align="right">
                                                        Point
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <TextField
                                                        // This is number
                                                        fullWidth
                                                        value={Discipline_Point}
                                                        id="Discipline_Point"
                                                        type="string"
                                                        variant="outlined"
                                                        onChange={(event) => setDiscipline_Point(event.target.value)}
                                                    />
                                                </Grid>

                                                <Grid item xs={2}>
                                                    <Typography variant="inherit" align="right">
                                                        Student Name
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <TextField
                                                        fullWidth
                                                        id="Student_Name"
                                                        value={StudentName}
                                                        InputProps={{
                                                            readOnly: true,
                                                        }}
                                                    />
                                                </Grid>

                                                <Grid item xs={6} />

                                                <Grid item xs={2}>
                                                    <Typography variant="inherit" align="right">
                                                        Added_Time
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                        <DateTimePicker
                                                            renderInput={(props) => <TextField {...props} />}
                                                            label="Added_Time"
                                                            value={Added_Time}
                                                            onChange={(newValue) => {
                                                                setAdded_Time(newValue);
                                                            }}
                                                        />
                                                    </LocalizationProvider>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    {/*Hasn't finished*/}
                                                    <Button sx={{ float: "left", backgroundColor: "#C70039", marginY: 3, marginX: 3 }}
                                                        component={RouterLink} to="/DataDiscipline" variant="contained">
                                                        back
                                                    </Button>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Button
                                                        onClick={submit}
                                                        variant="contained"
                                                        sx={{ float: "right", marginY: 3, marginX: 3 }}

                                                        color="success"
                                                    >
                                                        submit
                                                    </Button>
                                                </Grid>
                                            </Grid>
                                        </Box>
                                    </Box>
                                </Paper>
                            </Container>
                        </Box>
                    </React.Fragment >
                </div>
            </ThemeProvider>
        </div>
    );

}