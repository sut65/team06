import React, { useEffect, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { FormControl } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { Link as RouterLink, useParams } from "react-router-dom";
import Home from "../Home";
import { FiArrowLeft } from "react-icons/fi";
import { ThemeProvider, createTheme } from "@mui/material";
import { Adminbar } from "../Bar-Admin";
import { ActivityTypeInterface } from "../../models/IActivityType";
import { TrimesterInterface } from "../../models/ITrimester";
import { ActivityInterface } from "../../models/IActivity";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
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

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function UpdateActivity() {
  /////////////////////////////////////////////////////

  let { id } = useParams();
  

  const [activityType, setActivityType] = useState<ActivityTypeInterface[]>([]);
  const [trimester, setTrimester] = useState<TrimesterInterface[]>([]);
  const [activity, setActivity] = useState<Partial<ActivityInterface>>({});
  const [activity_Date, setActivity_Date] = useState<Date | null>(new Date());
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [message, setAlertMessage] = React.useState("");

  /////////////////////////////////////////////////////
  const apiUrl = "http://localhost:8080";
  const requestOpionsGet = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };
  /////////////////// combobox /////////////////////////

  const feachActivityByID = async () => {
    fetch(`${apiUrl}/activitys/${id}`, requestOpionsGet)
      .then((response) => response.json())
      .then((result) => {
        result.data && setActivity(result.data);
      });
  };

  const feachActivityType = async () => {
    fetch(`${apiUrl}/activityType`, requestOpionsGet)
      .then((response) => response.json())
      .then((result) => {
        console.log(result.data);
        setActivityType(result.data);
      });
  };

  const feachTrimester = async () => {
    fetch(`${apiUrl}/trimester`, requestOpionsGet)
      .then((response) => response.json())
      .then((result) => {
        console.log(result.data);
        setTrimester(result.data);
      });
  };

  /////////////////////////////////////////////////////

  const handleChange = (event: SelectChangeEvent) => {
    const name = event.target.name as keyof typeof activity;
    setActivity({
      ...activity,
      [name]: event.target.value,
    });
  };

  const handleInputChange = (
    event: React.ChangeEvent<{ id?: string; value: any }>
  ) => {
    const id = event.target.id as keyof typeof activity;
    const { value } = event.target;
    setActivity({ ...activity, [id]: value });
  };

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

  /////////////////////////////////////////////////////
  useEffect(() => {
    feachActivityType();
    feachTrimester();
    feachActivityByID();
  }, []);
  console.log(activity);

  /////////////////////////////////////////////////////
  const convertType = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
  };

  //ตัวรับข้อมูลเข้าตาราง
  function update() {
    let data = {
      ID: convertType(id),
      ActivityType: convertType(activity.ActivityTypeID),
      Trimester: convertType(activity.TrimesterID),

      Activity_Student_Number: activity.Activity_Student_Number,
      Activity_Name: activity.Activity_Name,
      Location: activity.Location,
      Activity_Date: activity_Date,
      Position: activity.Position,
      Activity_Year: activity.Activity_Year,
      Hour: activity.Hour,
    };
    console.log(data);

    const requestOptions = {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    fetch(`${apiUrl}/update_activity`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        console.log(res);
        if (res.data) {
          setAlertMessage("อัพเดทข้อมูลสำเร็จ");
          setSuccess(true);
          setTimeout(() => {
            window.location.href = "/DataActivity";
          }, 500);
        } else {
          setError(true);
          setAlertMessage(res.error);
        }
      });
  }
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
    <div className="CreateActivirty" id="outer-container">
      <ThemeProvider theme={Theme}>
        <Adminbar
          pageWrapId={"page-CreateActivity"}
          outerContainerId={"outer-container"}
        />
        <div id="page-CreateActivity">
          <React.Fragment>
            <Box sx={{ backgroundColor: "#313131", height: "200vh" }}>
              <CssBaseline />
              <Container maxWidth="lg" sx={{ padding: 2 }}>
                <Paper sx={{ padding: 2 }}>
                  <Box display={"flex"}>
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="h4" gutterBottom>
                      <a className="menu-head">
                        <Button
                          color="inherit"
                          component={RouterLink}
                          to="/DataActivity"
                        >
                          <FiArrowLeft size="30" />
                        </Button>
                        </a>
                        UPDATE ACTIVITY
                      </Typography>
                    </Box>
                  </Box>
                </Paper>
              </Container>
              <Container maxWidth="lg" sx={{ marginTop: 1 }}>
                <Paper sx={{ padding: 2 }}>
                  <Box sx={{ mt: 2 }}>
                    <Snackbar
                      id="success"
                      open={success}
                      autoHideDuration={3000}
                      onClose={handleClose}
                      anchorOrigin={{ vertical: "top", horizontal: "center" }}
                    >
                      <Alert onClose={handleClose} severity="success">
                        {message}
                      </Alert>
                    </Snackbar>
                    <Snackbar
                      id="error"
                      open={error}
                      autoHideDuration={6000}
                      onClose={handleClose}
                      anchorOrigin={{ vertical: "top", horizontal: "center" }}
                    >
                      <Alert onClose={handleClose} severity="error">
                        {message}
                      </Alert>
                    </Snackbar>
                    <Box sx={{ flexGrow: 1 }}>
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <h4>บันทึกกิจกรรมนักศึกษา</h4>
                          <hr />
                        </Grid>
                        <Grid item xs={4}>
                          <p>รหัสนักศึกษา</p>
                          <TextField
                            fullWidth
                            id="Activity_Student_Number"
                            type="string"
                            //label="รหัสนักศึกษา"
                            variant="outlined"
                            name="Activity_Student_Number"
                            value={activity.Activity_Student_Number}
                            onChange={handleInputChange}
                          />
                        </Grid>
                        <Grid item xs={8}></Grid>
                        <Grid item xs={4}>
                          <p>ประเภทกิจกรรม</p>
                          <Select
                            fullWidth
                            id="ActivityType"
                            onChange={handleChange}
                            native
                            value={activity.ActivityTypeID + ""}
                            inputProps={{ name: "ActivityTypeID" }}
                          >
                            <option aria-label="None" value="">
                              ประเภทกิจกรรม
                            </option>
                            {activityType.map((item) => (
                              <option key={item.ID} value={item.ID}>
                                {item.Activity_Type_Name}
                              </option>
                            ))}
                          </Select>
                        </Grid>
                        <Grid item xs={8}></Grid>
                        <Grid item xs={4}>
                          <p>ชื่อกิจกรรม</p>
                          <TextField
                            fullWidth
                            id="Activity_Name"
                            type="string"
                            //label="ชื่อกิจกรรม"
                            variant="outlined"
                            name="Activity_Name"
                            value={activity.Activity_Name}
                            onChange={handleInputChange}
                          />
                        </Grid>
                        <Grid item xs={8}></Grid>
                        <Grid item xs={4}>
                          <p>สถานที่ทำกิจกรรม</p>
                          <TextField
                            fullWidth
                            id="Location"
                            type="string"
                            // label="สถานที่ทำกิจกรรม"
                            variant="outlined"
                            name="Location"
                            value={activity.Location}
                            onChange={handleInputChange}
                          />
                        </Grid>
                        <Grid item xs={8}></Grid>
                        <Grid item xs={4}>
                          <p>ตำแหน่ง</p>
                          <TextField
                            fullWidth
                            id="Position"
                            type="string"
                            //label="ตำแหน่ง"
                            variant="outlined"
                            name="Position"
                            value={activity.Position}
                            onChange={handleInputChange}
                          />
                        </Grid>
                        <Grid item xs={8}></Grid>
                        <Grid item xs={4}>
                          <FormControl fullWidth variant="outlined">
                            <p>วันที่ทำกิจกรรม</p>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                              <DatePicker
                                renderInput={(params) => (
                                  <TextField {...params} />
                                )}
                                value={activity_Date}
                                label="วันที่ทำกิจกรรม"
                                onChange={setActivity_Date}
                              />
                            </LocalizationProvider>
                          </FormControl>
                        </Grid>
                        <Grid item xs={8}></Grid>
                        <Grid item xs={4}>
                          <p>ปีการศึกษา</p>
                          <TextField
                            fullWidth
                            id="Activity_Year"
                            type="string"
                            // label="ปีการศึกษา"
                            variant="outlined"
                            name="Activity_Year"
                            value={activity.Activity_Year}
                            onChange={handleInputChange}
                          />
                        </Grid>
                        <Grid item xs={8}></Grid>
                        <Grid item xs={4}>
                          <p>ภาคการศึกษา</p>
                          <Select
                            fullWidth
                            id="Trimester"
                            onChange={handleChange}
                            native
                            value={activity.TrimesterID + ""}
                            inputProps={{ name: "TrimesterID" }}
                          >
                            <option aria-label="None" value="">
                              ภาคการศึกษา
                            </option>
                            {trimester.map((item) => (
                              <option key={item.ID} value={item.ID}>
                                {item.Trimester_Name}
                              </option>
                            ))}
                          </Select>
                        </Grid>
                        <Grid item xs={8}></Grid>
                        <Grid item xs={4}>
                          <p>จำนวนชั่วโมง</p>
                          <TextField
                            fullWidth
                            id="Hour"
                            type="uint"
                            //label="จำนวนชั่วโมง"
                            variant="outlined"
                            name="Hour"
                            value={activity.Hour}
                            onChange={handleInputChange}
                          />
                        </Grid>
                        <Grid item xs={8}></Grid>
                        <Grid item xs={3}>
                          <Button
                            variant="contained"
                            size="large"
                            fullWidth
                            color="primary"
                            onClick={update}
                          >
                            <a className="menu-button-submit">update</a>
                          </Button>
                        </Grid>
                        <Grid item xs={3}>
                          <Button
                            variant="contained"
                            size="large"
                            fullWidth
                            color="secondary"
                            component={RouterLink}
                            to="/DataActivity"
                          >
                            <a className="menu-button-back">back</a>
                          </Button>
                        </Grid>
                        <Grid item xs={6}></Grid>
                      </Grid>
                    </Box>
                  </Box>
                </Paper>
              </Container>
            </Box>
          </React.Fragment>
        </div>
      </ThemeProvider>
    </div>
  );
}
export default UpdateActivity;
