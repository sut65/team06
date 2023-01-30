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

import { PrefixInterface } from "../../models/IPrefix";
import { AdminInterface } from "../../models/IAdmin";
import { InstituteInterface } from "../../models/IInstitute";
import { BranchInterface } from "../../models/IBranch";
import { Adminbar } from "../Bar-Admin";
import { GetAdminByID } from "../../services/HttpClientService";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function CreateBranch() {
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

  const [Prefix, setPrefix] = useState<PrefixInterface[]>([]);
  const [Institute, setInstitute] = useState<InstituteInterface[]>([]);
  const [admin, setAdmin] = useState<AdminInterface>();

  const [Branch, setBranch] = useState<Partial<BranchInterface>>({});

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  ////////////////////////////////////////////
  const apiUrl = "http://localhost:8080";
  const requestOptionsGet = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
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

  const fetchAdminByID = async () => {
    let res = await GetAdminByID();
    Branch.AdminID = res.ID;
    if (res) {
      setAdmin(res);
    }
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
    fetchAdminByID();
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

  ///////////////////////////submit button/////////////////////////
  function submit() {
    let data = {
      AdminID: convertType(Branch.AdminID),
      InstituteID: convertType(Branch.InstituteID),
      PrefixID: convertType(Branch.PrefixID),
      Branch_Name: Branch.Branch_Name,
      Branch_Teacher: Branch.Branch_Teacher,
      Branch_Info: Branch.Branch_Info,
    };

    console.log("data", data);

    const requestOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    fetch(`${apiUrl}/create_branch`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        console.log(res);
        if (res.data) {
          setSuccess(true);
          window.location.href = "/DataBranch";
        } else {
          setError(true);
        }
      });
  }

  /////////////////////////////////////////////////////////////////////

  return (
    <div className="CreateBranch" id="outer-container">
      <ThemeProvider theme={Theme}>
        <Adminbar
          pageWrapId={"page-CreateBranch"}
          outerContainerId={"outer-container"}
        />
        <div id="page-CreateBranch">

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

          <Snackbar
            open={error}
            autoHideDuration={6000}
            onClose={handleClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          >
            <Alert onClose={handleClose} severity="error">
              บันทึกข้อมูลไม่สำเร็จ
            </Alert>
          </Snackbar>

        <Box sx={{ bgcolor: "#CFD8DC", height: "100vh" }}>
          <React.Fragment>
            <CssBaseline>
              <Container maxWidth="lg">
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
                <Paper elevation={2}>
                  <Grid item xs={12} sx={{ padding: 5 }}>
                    <Grid container spacing={2} sx={{ padding: 2 }}>
                      <Grid item xs={12}>
                        <h3>สาขา</h3>
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
                          id="Branch_Teacher"
                          variant="outlined"
                          value={Branch.Branch_Teacher}
                          onChange={handleInputChange}
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <h3>
                          รายละเอียดเกี่ยวกับสาขา (ความยาวไม่น้อยกว่า 100
                          ตัวอักษร)
                        </h3>
                        <TextField
                          fullWidth
                          id="Branch_Info"
                          variant="outlined"
                          multiline
                          value={Branch.Branch_Info}
                          onChange={handleInputChange}
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <Button
                          onClick={submit}
                          variant="contained"
                          color="primary"
                          sx={{ float: "right" }}
                        >
                          SUBMIT
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
export default CreateBranch;
