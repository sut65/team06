import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AdminLoginInterface } from "../models/IAdmin-login";
import { FcAssistant } from "react-icons/fc";
import { Homebar } from "./Bar-Home";

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

function AdminLogin() {
  ///////////////////////////////////////////////////////////////////////////////

  const [adminLogin, setAdminLogin] = useState<Partial<AdminLoginInterface>>(
    {}
  );
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  ///////////////////////////////////////////////////////////////////////////////

  const handleInputChange = (
    event: React.ChangeEvent<{ id?: string; value: any }>
  ) => {
    const id = event.target.id as keyof typeof adminLogin;
    const { value } = event.target;
    setAdminLogin({ ...adminLogin, [id]: value });
    console.log(adminLogin);
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

  ///////////////////////////////////////////////////////////////////////////////

  const AdminLogin = async (data: AdminLoginInterface) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };

    let res = await fetch("http://localhost:8080/admin_Login", requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("Admin-id", res.data.id);
          console.log(res.data);
          return res.data;
        } else {
          return false;
        }
      });

    return res;
  };

  ///////////////////////////////////////////////////////////////////////////////

  const submit = async () => {
    let res = await AdminLogin(adminLogin);
    if (res) {
      setSuccess(true);
      setTimeout(() => {
        window.location.href = "/HomeAdmin";
      }, 1000);
    } else {
      setError(true);
    }
  };

  ///////////////////////////////////////////////////////////////////////////////

  return (
    <ThemeProvider theme={Theme}>
      <Grid container component="main" sx={{ height: "91.4vh" }}>
        <Snackbar
          open={success}
          autoHideDuration={3000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert onClose={handleClose} severity="success">
            เข้าสู่ระบบสำเร็จ
          </Alert>
        </Snackbar>
        <Snackbar
          open={error}
          autoHideDuration={3000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert onClose={handleClose} severity="error">
            อีเมลหรือรหัสผ่านไม่ถูกต้อง
          </Alert>
        </Snackbar>

        <div className="Login-Admin" id="outer-container">
          <Homebar
            pageWrapId={"Login-Admin"}
            outerContainerId={"outer-container"}
          />
          <div id="Login-Admin">
            <React.Fragment>
              <CssBaseline />
              <Grid item xs={12}>
                <Box
                  sx={{
                    my: 20,
                    mx: 75,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    alignSelf: "center",
                  }}
                >
                  <Avatar sx={{ width: 80, height: 80 }}>
                    <FcAssistant size={50} />
                  </Avatar>
                  <Typography component="h1" variant="h5">
                    Login
                  </Typography>
                  <Box sx={{ mt: 1 }}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="Admin_Email"
                      label="Admin_Email"
                      name="Admin_Email"
                      value={adminLogin.Admin_Email || ""}
                      onChange={handleInputChange}
                    />
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      name="Admin_Password"
                      label="Admin_Password"
                      type="password"
                      id="Admin_Password"
                      value={adminLogin.Admin_Password || ""}
                      onChange={handleInputChange}
                    />
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                      onClick={submit}
                    >
                      Login
                    </Button>
                  </Box>
                </Box>
              </Grid>
            </React.Fragment>
          </div>
        </div>
      </Grid>
    </ThemeProvider>
  );
}

export default AdminLogin;
