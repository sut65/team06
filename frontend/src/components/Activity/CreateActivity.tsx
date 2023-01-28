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
import { Link as RouterLink } from "react-router-dom";
import { GetAdminByID } from "../../services/HttpClientService";
import DataActivity from "./DataActivity";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { FiArrowLeft } from "react-icons/fi";
import { Adminbar } from "../Bar-Admin";
import { AdminInterface } from "../../models/IAdmin";
import Home from "../Home";

import { ActivityTypeInterface } from "../../models/IActivityType";
import { TrimesterInterface } from "../../models/ITrimester";
import { ActivityInterface } from "../../models/IActivity";

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

function CreateActivity() {
  /////////////////////////////////////////////////////

  const [activityType, setActivityType] = useState<ActivityTypeInterface[]>([]);
  const [trimester, setTrimester] = useState<TrimesterInterface[]>([]);
  const [activity, setActivity] = useState<Partial<ActivityInterface>>({});
  const [activity_Date, setActivity_Date] = useState<Date | null>(new Date());
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [admin, setAdmin] = useState<AdminInterface>();

  /////////////////////////////////////////////////////
  const apiUrl = "http://localhost:8080";
  const requestOpionsGet = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };
  /////////////////// combobox /////////////////////////

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

  const fetchAdminByID = async () => {
    let res = await GetAdminByID();
    activity.AdminID = res.ID;
    if (res) {
      setAdmin(res);
    }
  };

  /////////////////////////////////////////////////////
  useEffect(() => {
    feachActivityType();
    feachTrimester();
    fetchAdminByID();
  }, []);
  console.log(activity);

  /////////////////////////////////////////////////////

  //ตัวรับข้อมูลเข้าตาราง
  function submit() {
    let data = {
      ActivityTypeID:
        typeof activity.ActivityTypeID === "string"
          ? parseInt(activity.ActivityTypeID)
          : 0,
      TrimesterID:
        typeof activity.TrimesterID === "string"
          ? parseInt(activity.TrimesterID)
          : 0,

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
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };

    fetch(`${apiUrl}/create_Activity`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        console.log(res);
        if (res.data) {
          setSuccess(true);
          setTimeout(() => {
            window.location.href = "/DataActivity";
          }, 500);
        } else {
          setError(true);
        }
      });
  }

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
    <div className="CreateAcativity" id="outer-container">
      <ThemeProvider theme={Theme}>
        <Adminbar
          pageWrapId={"page-CreateAcativity"}
          outerContainerId={"outer-container"}
        />
        <div id="page-CreateAcativity">
          <React.Fragment>
            <Box sx={{ backgroundColor: "#313131", height: "125vh" }}></Box>
            <CssBaseline />
            <Container maxWidth="lg" sx={{ padding: 2 }}>
              <Paper sx={{ padding: 2 }}>
                <Box display={"flex"}>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h4" gutterBottom>
                      <Button
                        color="inherit"
                        component={RouterLink}
                        to="/DataActivity"
                      >
                        <FiArrowLeft size="30" />
                      </Button>
                      CREATE ACTIVITY
                    </Typography>
                  </Box>
                </Box>
              </Paper>
            </Container>
            <Container maxWidth="lg">
              <Paper sx={{ padding: 2 }}>
                <Box display={"flex"}>
                  <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <h4>บันทึกกิจกรรมนักศึกษา</h4>
                        <hr />
                      </Grid>
                      <Grid item xs={6}>
                        <p>รหัสนักศึกษา</p>
                        <TextField
                          fullWidth
                          id="Activity_Student_Number"
                          type="string"
                          label="รหัสนักศึกษา"
                          variant="outlined"
                          name="Activity_Student_Number"
                          value={activity.Activity_Student_Number}
                          onChange={handleInputChange}
                        />
                      </Grid>
                      <Grid item xs={6}></Grid>
                      <Grid item xs={2}>
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
                          label="ชื่อกิจกรรม"
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
                          label="สถานที่ทำกิจกรรม"
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
                          label="ตำแหน่ง"
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
                          label="ปีการศึกษา"
                          variant="outlined"
                          name="Activity_Year"
                          value={activity.Activity_Year}
                          onChange={handleInputChange}
                        />
                      </Grid>
                      <Grid item xs={6}></Grid>
                      <Grid item xs={6}>
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
                      <Grid item xs={6}></Grid>
                      <Grid item xs={6}>
                        <p>จำนวนชั่วโมง</p>
                        <TextField
                          fullWidth
                          id="Hour"
                          type="uint"
                          label="จำนวนชั่วโมง"
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
                          onClick={submit}
                        >
                          submit
                        </Button>
                      </Grid>
                      <Grid item xs={3}>
                        <Button
                          variant="contained"
                          size="large"
                          fullWidth
                          component={RouterLink}
                          to="/DataActivity"
                        >
                          back
                        </Button>
                      </Grid>
                      <Grid item xs={6}></Grid>
                    </Grid>
                  </Box>
                </Box>
              </Paper>
            </Container>
          </React.Fragment>
        </div>
      </ThemeProvider>
    </div>
  );
}
export default CreateActivity;
