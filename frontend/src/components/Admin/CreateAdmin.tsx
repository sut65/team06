import React, { useEffect, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  Grid,
  TextField,
  Snackbar,
} from "@mui/material";
import { FiArrowLeft } from "react-icons/fi";
import { Adminbar } from "../Bar-Admin";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Link as RouterLink } from "react-router-dom";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

import { PrefixInterface } from "../../models/IPrefix";
import { GenderInterface } from "../../models/IGender";
import { ProvinceInterface } from "../../models/IProvince";
import { AdminInterface } from "../../models/IAdmin";

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

function CreateAdmin() {
  //////////////////////////////////////////////////////
  const [prefix, setPrefix] = useState<PrefixInterface[]>([]);
  const [gender, setGender] = useState<GenderInterface[]>([]);
  const [province, setProvince] = useState<ProvinceInterface[]>([]);
  const [admin, setAdmin] = useState<Partial<AdminInterface>>({});

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [message, setAlertMessage] = React.useState("");
  const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  /////////////////////////////////////////////////////
  const apiUrl = "http://localhost:8080";
  const requestOpionsGet = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  const feachPrefix = async () => {
    fetch(`${apiUrl}/prefix`, requestOpionsGet)
      .then((response) => response.json())
      .then((result) => {
        console.log(result.data);
        setPrefix(result.data);
      });
  };

  const feachGender = async () => {
    fetch(`${apiUrl}/gender`, requestOpionsGet)
      .then((response) => response.json())
      .then((result) => {
        console.log(result.data);
        setGender(result.data);
      });
  };

  const feachProvince = async () => {
    fetch(`${apiUrl}/province`, requestOpionsGet)
      .then((response) => response.json())
      .then((result) => {
        console.log(result.data);
        setProvince(result.data);
      });
  };

  /////////////////////////////////////////////////////
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
  const handleChange = (event: SelectChangeEvent) => {
    const name = event.target.name as keyof typeof admin;
    setAdmin({
      ...admin,
      [name]: event.target.value,
    });
  };

  const handleInputChange = (
    event: React.ChangeEvent<{ id?: string; value: any }>
  ) => {
    const id = event.target.id as keyof typeof admin;
    const { value } = event.target;
    console.log(id);
    setAdmin({ ...admin, [id]: value });
  };

  const convertType = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
  };

  useEffect(() => {
    feachPrefix();
    feachGender();
    feachProvince();
  }, []);

  //ตัวรับข้อมูลเข้าตาราง ฟังก์ชัน submit
  function submit() {
    let data = {
      Admin_Name: admin.Admin_Name,
      Admin_Email: admin.Admin_Email,
      Admin_Password: admin.Admin_Password,
      Admin_Tel: admin.Admin_Tel,
      Admin_Address: admin.Admin_Address,

      Prefix: convertType(admin.PrefixID),
      Gender: convertType(admin.GenderID),
      Province: convertType(admin.ProvinceID),
    };

    const requestOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    //fetch เรียกให้ ctrate
    fetch(`${apiUrl}/create_Admin`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        console.log(res);
        if (res.data) {
          setAlertMessage("บันทึกข้อมูลสำเร็จ");
          setSuccess(true);
          setTimeout(() => {
            window.location.href = "/DataAdmin";
          }, 500);
        } else {
          setAlertMessage(res.error);
          setError(true);
        }
      });
  }
  return (
    <div className="CreateAdmin" id="outer-container">
      <ThemeProvider theme={Theme}>
        <Adminbar
          pageWrapId={"page-CreateAdmin"}
          outerContainerId={"outer-container"}
        />
        <div id="page-CreateStudent">
          <React.Fragment>
            <Box sx={{ backgroundColor: "#313131", height: "260vh" }}>
              <CssBaseline />
              <Container maxWidth="lg">
                <Paper sx={{ padding: 2 }}>
                  <Box display={"flex"}>
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="h4" gutterBottom>
                        <Button
                          color="inherit"
                          component={RouterLink}
                          to="/DataAdmin"
                          sx={{ marginBottom: 0.5 }}
                        >
                          <FiArrowLeft size="30" />
                        </Button>
                        CreateAdmin
                      </Typography>
                    </Box>
                  </Box>
                </Paper>
              </Container>
              <Container maxWidth="lg">
                <Box
                  sx={{
                    mt: 2,
                  }}
                >
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
                </Box>

                <Paper sx={{ padding: 2 }}>
                  <Box display={"flex"}>
                    <Box sx={{ flexGrow: 1 }}>
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <h4>ข้อมูลพนักงาน</h4>
                          <hr />
                        </Grid>
                        <Grid item xs={2}>
                          <p>คำนำหน้า </p>
                          <Select
                            fullWidth
                            id="Prefix"
                            onChange={handleChange}
                            native
                            value={admin.PrefixID + ""}
                            inputProps={{ name: "PrefixID" }}
                          >
                            <option aria-label="None" value="">
                              คำนำหน้า
                            </option>
                            {prefix.map((item) => (
                              <option key={item.ID} value={item.ID}>
                                {item.Prefix_Name}
                              </option>
                            ))}
                          </Select>
                        </Grid>
                        <Grid item xs={4}>
                          <p>ชื่อ-สกุล</p>
                          <TextField
                            fullWidth
                            id="Admin_Name"
                            type="string"
                            label="ชื่อ-สกุล"
                            variant="outlined"
                            name="Admin_Name"
                            value={admin.Admin_Name}
                            onChange={handleInputChange}
                          />
                        </Grid>
                        <Grid item xs={6}></Grid>
                        <Grid item xs={4}>
                          <p>อีเมล</p>
                          <TextField
                            fullWidth
                            id="Admin_Email"
                            type="string"
                            label="อีเมล"
                            variant="outlined"
                            name="Admin_Email"
                            value={admin.Admin_Email}
                            onChange={handleInputChange}
                          />
                        </Grid>
                        <Grid item xs={8}></Grid>
                        <Grid item xs={4}>
                          <p>รหัสผ่าน</p>
                          <TextField
                            fullWidth
                            id="Admin_Password"
                            type="string"
                            label="รหัสผ่าน"
                            variant="outlined"
                            name="Admin_Password"
                            value={admin.Admin_Password}
                            onChange={handleInputChange}
                          />
                        </Grid>
                        <Grid item xs={8}></Grid>
                        <Grid item xs={2}>
                          <p>เพศ </p>
                          <Select
                            fullWidth
                            id="Gender"
                            onChange={handleChange}
                            native
                            value={admin.GenderID + ""}
                            inputProps={{ name: "GenderID" }}
                          >
                            <option aria-label="None" value="">
                              เพศ
                            </option>
                            {gender.map((item) => (
                              <option key={item.ID} value={item.ID}>
                                {item.Gender_Type}
                              </option>
                            ))}
                          </Select>
                        </Grid>
                        <Grid item xs={4}>
                          <p>เบอร์โทรศัพท์</p>
                          <TextField
                            fullWidth
                            id="Admin_Tel"
                            type="string"
                            label="เบอร์โทรศัพท์"
                            variant="outlined"
                            name="Admin_Tel"
                            value={admin.Admin_Tel}
                            onChange={handleInputChange}
                          />
                        </Grid>
                        <Grid item xs={6}></Grid>
                        <Grid item xs={4}>
                          <p>ที่อยู่</p>
                          <TextField
                            fullWidth
                            id="Admin_Address"
                            type="string"
                            label="ที่อยู่"
                            variant="outlined"
                            name="Admin_Address"
                            value={admin.Admin_Address}
                            onChange={handleInputChange}
                          />
                        </Grid>
                        <Grid item xs={4}>
                          <p>จังหวัด</p>
                          <Select
                            fullWidth
                            id="Province"
                            onChange={handleChange}
                            native
                            value={admin.ProvinceID + ""}
                            inputProps={{ name: "ProvinceID" }}
                          >
                            <option aria-label="None" value="">
                              จังหวัด
                            </option>
                            {province.map((item) => (
                              <option key={item.ID} value={item.ID}>
                                {item.Province_Name}
                              </option>
                            ))}
                          </Select>
                        </Grid>
                        <Grid item xs={4}></Grid>

                        <Grid item xs={3}>
                          <Button
                            variant="contained"
                            size="large"
                            fullWidth
                            color="primary"
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
                            color="secondary"
                            component={RouterLink}
                            to="/DataAdmin"
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
            </Box>
          </React.Fragment>
        </div>
      </ThemeProvider>
    </div>
  );
}
export default CreateAdmin;
