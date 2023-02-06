import { slide as Menu } from "react-burger-menu";
import "./Bar.css";
import { IoIosLogIn } from "react-icons/io";

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

export const Studentbar = ({ pageWrapId, outerContainerId }: SidemenuProps) => {
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
            to="/HomeStudent"
          >
            <a className="menu-head"> Menu </a>
          </Button>
        </p>
        <a className="menu-item" href="/HomeStudent">
          *ผลการศึกษา
        </a>
        <a className="menu-item" href="/HomeStudent">
          *ประวัติกิจกรรม
        </a>
        <a className="menu-item" href="/HomeStudent">
          *ระเบียนประวัติ
        </a>
        <a className="menu-item" href="/SearchDiscipline">
          *ข้อมูลวินัย
        </a>
        <a className="menu-item" href="/HomeStudent">
          *หอพักนักศึกษา
        </a>
        <a className="menu-item logout" href="/all_scholarship">
          สมัครขอทุนการศึกษา
        </a>
        <a className="menu-item" href="/DataPostponement">
          ยื่นคำร้องผ่อนผันค่าธรรมเนียมการศึกษา
        </a>
        <a className="menu-item" href="/DataPetition">
          ยื่นคำร้องลาหยุด
        </a>
        <a className="menu-item"></a>
        <a className="menu-item" href="/DataSuggestion">
          เสนอความคิดเห็น
        </a>
        <a className="menu-item logout" onClick={logout}>
          STUDENT LOG OUT
        </a>
      </Menu>
    </ThemeProvider>
  );
};
