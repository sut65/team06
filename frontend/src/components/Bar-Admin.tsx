import { slide as Menu } from "react-burger-menu";
import "./Bar.css";

import { Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";

type SidemenuProps = {
  pageWrapId: string;
  outerContainerId: string;
};

const Theme = createTheme({
  palette: {
    primary: {
      main: "#313131",
    },
  },
});

export const Adminbar = ({ pageWrapId, outerContainerId }: SidemenuProps) => {
  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <ThemeProvider theme={Theme}>
      <Menu>
        <p className="memu-title">
          <Button
            size="large"
            color="primary"
            component={RouterLink}
            to="/HomeAdmin"
          >
            <a className="menu-head"> Menu </a>
          </Button>
        </p>
        <a className="menu-item" href="/DataStudent">
          บันทึก-ข้อมูลนักศึกษา
        </a>
        <a className="menu-item" href="/DataGrade">
          บันทึก-เกรด
        </a>
        <a className="menu-item" href="/DataDormitory">
          บันทึก-หอพักนักศึกษา
        </a>
        <a className="menu-item" href="/DataActivity">
          บันทึก-กิจกรรม
        </a>
        <a className="menu-item" href="/DataDiscipline">
          บันทึก-ข้อมูลวินัย
        </a>
        <a className="menu-item logout" href="/DataBranch">
          บันทึก-ข้อมูลสาขาวิชา
        </a>
        <a className="menu-item" href="/DataCourse">
          บันทึก-ข้อมูลหลักสูตร
        </a>
        <a className="menu-item logout" href="/DataAdmin">
          บันทึก-ข้อมูลแอดมิน
        </a>
        <a className="menu-item logout" onClick={logout}>
          ADMIN LOG OUT
        </a>
      </Menu>
    </ThemeProvider>
  );
};
