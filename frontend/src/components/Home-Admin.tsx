import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { CssBaseline } from "@mui/material";
import Home from "./Home";

import { Adminbar } from "./Bar-Admin";

function HomeAdmin() {
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

  return (
    <div className="Home" id="outer-container">
      <Adminbar pageWrapId={"page-Home"} outerContainerId={"outer-container"} />
      <div id="page-Home">
        <React.Fragment>
          <CssBaseline />
          <Grid container component="main" sx={{ height: "100vh" }}>
            <Grid
              item
              xs={false}
              sm={4}
              md={12}
              sx={{
                backgroundImage:
                  "url(https://images.unsplash.com/photo-1542640244-7e672d6cef4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80)",
                backgroundRepeat: "secondary",
                backgroundColor: (t) =>
                  t.palette.mode === "dark"
                    ? t.palette.grey[50]
                    : t.palette.grey[900],
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div>
                <Container>
                  <Box>
                    <h1 style={{ textAlign: "center", color: "#ffffff" }}>
                      Test
                    </h1>
                  </Box>
                </Container>
              </div>
            </Grid>
          </Grid>
        </React.Fragment>
      </div>
    </div>
  );
}

export default HomeAdmin;
