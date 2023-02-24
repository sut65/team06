import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { CssBaseline, Paper } from "@mui/material";
import React from "react";

import { Homebar } from "./Bar-Home";

function Home() {
  return (
    <div className="Home" id="outer-container">
      <Homebar pageWrapId={"page-Home"} outerContainerId={"outer-container"} />
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
                backgroundColor: "#F5E9CF",
                backgroundRepeat: "secondary",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div>
                <Container>
                  <Box>
                    <h1 style={{ textAlign: "center", color: "#434242" }}>
                      523332 Software Engineering
                    </h1>
                    <h2 style={{ textAlign: "center", color: "#434242" }}>
                      TEAM06 ระบบประวัตินักศึกษา
                    </h2>
                    <h3 style={{ textAlign: "center", color: "#434242" }}>
                    B6304249 ธนกฤต น้ำนวล
                    </h3>
                    <h3 style={{ textAlign: "center", color: "#434242" }}>
                    B6306304 วนัสนันท์ จันทร์มล
                    </h3>
                    <h3 style={{ textAlign: "center", color: "#434242" }}>
                    B6311391 ศุภกานต์ แสงจันทร์
                    </h3>
                    <h3 style={{ textAlign: "center", color: "#434242" }}>
                    B6321437 ชุตินันท์ เจริญครบุรี
                    </h3>
                    <h3 style={{ textAlign: "center", color: "#434242" }}>
                    B6322113 ปรารถนา บุตรโท
                    </h3>
                    <h3 style={{ textAlign: "center", color: "#434242" }}>
                    B6332426 นฤมน เกษรบัว
                    </h3>
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

export default Home;
