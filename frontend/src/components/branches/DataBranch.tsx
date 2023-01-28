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
import Grid from "@mui/material/Grid";

import { BranchInterface } from "../../models/IBranch";
import { Adminbar } from "../Bar-Admin";

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
function DataBranch() {
  /////////////////////////////////////////////////////
  let navigate = useNavigate();

  const [Branchstable, setBranchstable] = useState<BranchInterface[]>([]);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  /////////////////////////////////////////////////////
  const apiUrl = "http://localhost:8080";
  const requestOptionsGet = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };
  /////////////////////////////////////////////////////

  //แสดงข้อมูล branch ทั้งหมด
  const feachBranchstable = async () => {
    fetch(`${apiUrl}/data_branch`, requestOptionsGet)
      .then((response) => response.json())
      .then((result) => {
        console.log(result.data);
        setBranchstable(result.data);
      });
  };

  ///delete branch/////////////////////////////////////
  const DeleteBranch = (id: string) => {
    console.log(id);
    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };

    fetch(`${apiUrl}/delete_branch/${id}`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        console.log(res);
        if (res.data) {
          setSuccess(true);
          // alert(`Are you sure delete id: ${id}`);
          setTimeout(() => {
            window.location.href = "/DataBranch";
          }, 500);
        } else {
          setError(true);
        }
      });
  };
  /////////////////////////////////////////////////////
  useEffect(() => {
    feachBranchstable();
  }, []);
  /////////////////////////////////////////////////////

  return (
    <div className="DataBranch" id="outer-container">
      <ThemeProvider theme={Theme}>
        <Adminbar
          pageWrapId={"page-DataBranch"}
          outerContainerId={"outer-container"}
        />
        <div id="page-DataBranch">
          <Box sx={{ bgcolor: "#CFD8DC", height: "100vh" }}>
            <Container maxWidth="lg" sx={{ padding: 2 }}>
              <Paper sx={{ padding: 2, mb: 2 }}>
                <Grid item xs={12} display={"flex"}>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography
                      sx={{
                        color: "#EC407A",
                        fontFamily: "fantasy",
                        fontSize: 30,
                      }}
                    >
                      Branch
                    </Typography>
                  </Box>
                  <Box>
                    <Button
                      variant="contained"
                      component={RouterLink}
                      to="/create_branch"
                    >
                      create
                    </Button>
                  </Box>
                </Grid>
              </Paper>
              <Paper>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell align="center">
                          <h3>No.</h3>
                        </TableCell>
                        <TableCell align="center">
                          <h3>Institute</h3>
                        </TableCell>
                        <TableCell align="center">
                          <h3>Branch</h3>
                        </TableCell>
                        <TableCell align="center">
                          <h3>Prefix Founder</h3>
                        </TableCell>
                        <TableCell align="center">
                          <h3>Founder</h3>
                        </TableCell>
                        <TableCell align="center">
                          <h3>Branch Info</h3>
                        </TableCell>
                        <TableCell align="center">
                          <h3>Admin</h3>
                        </TableCell>
                        <TableCell align="center">
                          <h3>Options</h3>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {Branchstable.map((row, idx) => (
                        <TableRow
                          key={row.ID}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell align="center">{idx + 1}</TableCell>
                          <TableCell align="center">
                            {row.Branch_Name}
                          </TableCell>
                          <TableCell align="center">
                            {row.Institute.Institute_Name}
                          </TableCell>
                          <TableCell align="center">
                            {row.Prefix.Prefix_Name}
                          </TableCell>
                          <TableCell align="center">
                            {row.Branch_Teacher}
                          </TableCell>
                          <TableCell align="center">
                            {row.Branch_Info}
                          </TableCell>
                          <TableCell align="center">
                            {row.Admin.Admin_Name}
                          </TableCell>
                          <TableCell align="center">
                            <ButtonGroup>
                              <Button
                                onClick={() =>
                                  navigate(`UpdateBranch/${row.ID}`)
                                }
                              >
                                update
                              </Button>
                              <Button
                                onClick={() => DeleteBranch(row.ID + "")}
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
              </Paper>
            </Container>
          </Box>
        </div>
      </ThemeProvider>
    </div>
  );
}
export default DataBranch;
