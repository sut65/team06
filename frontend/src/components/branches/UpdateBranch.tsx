import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Link as RouterLink, useParams } from "react-router-dom";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

import { PrefixInterface } from "../../models/IPrefix";
import { InstituteInterface } from "../../models/IInstitute";
import { BranchInterface } from "../../models/IBranch";
import { Adminbar } from "../Bar-Admin";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function UpdateBranch() {
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
  ////////////////////variables////////////////////////
  let { id } = useParams();
  console.log("id", id);

  const [Prefix, setPrefix] = useState<PrefixInterface[]>([]);
  const [Institute, setInstitute] = useState<InstituteInterface[]>([]);

  const [Branch, setBranch] = useState<Partial<BranchInterface>>({});

  const adminID = parseInt(localStorage.getItem("Admin-id") + "");

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const [message, setAlertMessage] = useState("");

  ////////////////////////////////////////////
  const apiUrl = "http://localhost:8080";
  const requestOptionsGet = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  const fetchBrachByID = async () => {
    fetch(`${apiUrl}/branch/${id}`, requestOptionsGet)
      .then((response) => response.json())
      .then((result) => {
        result.data && setBranch(result.data);
      });
  };

  const fetchPrefix = async () => {
    fetch(`${apiUrl}/prefix`, requestOptionsGet)
      .then((response) => response.json())
      .then((result) => {
        console.log(result.data);
        setPrefix(result.data);
      });
  };

  const fetchInstitute = async () => {
    fetch(`${apiUrl}/institute`, requestOptionsGet)
      .then((response) => response.json())
      .then((result) => {
        console.log(result.data);
        setInstitute(result.data);
      });
  };

  ////////////////////handle close alert/////////////////////////
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

  useEffect(() => {
    fetchPrefix();
    fetchInstitute();
    fetchBrachByID();
  }, []);

  console.log(Branch);

  ///////////////////handle change ของ combobox////////////////////////
  const handleChange = (event: SelectChangeEvent) => {
    const name = event.target.name as keyof typeof Branch;
    setBranch({
      ...Branch,
      [name]: event.target.value,
    });
  };

  //////////////////handle change ของ input field///////////////////////
  const handleInputChange = (
    event: React.ChangeEvent<{ id?: string; value: any }>
  ) => {
    const id = event.target.id as keyof typeof Branch;
    const { value } = event.target;
    console.log(id, value);
    setBranch({ ...Branch, [id]: value });
  };

  ///////////////////////////convertType/////////////////////////
  const convertType = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
  };

  ///////////////////////////update button/////////////////////////
  function update() {
    let data = {
      ID: convertType(id),
      AdminID: adminID,
      InstituteID: convertType(Branch.InstituteID),
      PrefixID: convertType(Branch.PrefixID),
      Branch_Name: Branch.Branch_Name,
      Branch_Teacher: Branch.Branch_Teacher,
      Branch_Info: Branch.Branch_Info,
    };

    console.log("data", data);
    console.log("Branch.AdminID", Branch.AdminID);

    const requestOptions = {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    fetch(`${apiUrl}/update_branch`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        console.log(res);
        if (res.data) {
          setSuccess(true);
          setAlertMessage("บันทึกข้อมูลสำเร็จ");
          window.location.href = "/DataBranch";
        } else {
          setError(true);
          setAlertMessage(res.error);
        }
      });
  }

  /////////////////////////////////////////////////////////////////////

  return (
    <div className="UpdateBranch" id="outer-container">
      <ThemeProvider theme={Theme}>
        <Adminbar
          pageWrapId={"page-UpdateBranch"}
          outerContainerId={"outer-container"}
        />
        <div id="page-UpdateBranch">
          <Snackbar
            id="success"
            open={success}
            autoHideDuration={3000}
            onClose={handleClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          >
            <Alert onClose={handleClose} severity="success">
              {message}
            </Alert>
          </Snackbar>

          <Snackbar
            id="error"
            open={error}
            autoHideDuration={3000}
            onClose={handleClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          >
            <Alert onClose={handleClose} severity="error">
              {message}
            </Alert>
          </Snackbar>

          <Box sx={{ bgcolor: "#CFD8DC", height: "auto" }}>
            <React.Fragment>
              <CssBaseline>
                <Container maxWidth="lg" sx={{ padding: 2 }}>
                  <Paper sx={{ padding: 2, mb: 2 }}>
                    <Box display={"flex"}>
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography
                          sx={{
                            color: "#F06292",
                            fontFamily: "fantasy",
                            fontSize: 30,
                            textAlign: "center",
                          }}
                        >
                          Branch
                        </Typography>
                      </Box>
                    </Box>
                  </Paper>
                  <Paper>
                    <Grid item xs={12} sx={{ padding: 5 }}>
                      <Grid container spacing={2} sx={{ padding: 2 }}>
                        <Grid item xs={12}>
                          <h3>สาขาวิชา</h3>
                          <TextField
                            fullWidth
                            id="Branch_Name"
                            variant="outlined"
                            value={Branch.Branch_Name}
                            onChange={handleInputChange}
                          />
                        </Grid>

                        <Grid item xs={12}>
                          <h3>สำนักวิชา</h3>
                          <Select
                            fullWidth
                            required
                            id="Institute"
                            onChange={handleChange}
                            native
                            value={Branch.InstituteID + ""}
                            inputProps={{ name: "InstituteID" }}
                          >
                            <option aria-label="None" value="">
                              กรุณาเลือกสำนักวิชา
                            </option>
                            {Institute.map((item) => (
                              <option key={item.ID} value={item.ID}>
                                {item.Institute_Name}
                              </option>
                            ))}
                          </Select>
                        </Grid>

                        <Grid item xs={12}>
                          <h3>คำนำหน้า</h3>
                          <Select
                            fullWidth
                            required
                            id="Prefix"
                            onChange={handleChange}
                            native
                            value={Branch.PrefixID + ""}
                            inputProps={{ name: "PrefixID" }}
                          >
                            <option aria-label="None" value="">
                              กรุณาเลือกคำนำหน้า
                            </option>
                            {Prefix.map((item) => (
                              <option key={item.ID} value={item.ID}>
                                {item.Prefix_Name}
                              </option>
                            ))}
                          </Select>
                        </Grid>

                        <Grid item xs={12}>
                          <h3>ผู้ก่อตั้งสาขา</h3>
                          <TextField
                            fullWidth
                            placeholder="ชื่อภาษาอังกฤษ"
                            id="Branch_Teacher"
                            variant="outlined"
                            value={Branch.Branch_Teacher}
                            onChange={handleInputChange}
                          />
                        </Grid>

                        <Grid item xs={12}>
                          <h3>รายละเอียดเกี่ยวกับสาขา</h3>
                          <TextField
                            fullWidth
                            placeholder="ความยาวไม่เกิน 450 ตัวอักษร"
                            id="Branch_Info"
                            variant="outlined"
                            multiline
                            value={Branch.Branch_Info}
                            onChange={handleInputChange}
                          />
                        </Grid>

                        <Grid item xs={12}>
                          <Button
                            onClick={update}
                            variant="contained"
                            color="primary"
                            sx={{ float: "right" }}
                          >
                            UPDATE
                          </Button>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Paper>
                </Container>
              </CssBaseline>
            </React.Fragment>
          </Box>
        </div>
      </ThemeProvider>
    </div>
  );
}
export default UpdateBranch;
