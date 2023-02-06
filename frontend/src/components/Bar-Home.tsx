import { slide as Menu } from "react-burger-menu";
import "./Bar.css";
import { BiLogIn } from "react-icons/bi";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
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

export const Homebar = ({ pageWrapId, outerContainerId }: SidemenuProps) => {
  return (
    <ThemeProvider theme={Theme}>
      <Menu>
        <p className="memu-title">
          <Button size="large" color="primary" component={RouterLink} to="/">
            <a className="menu-head"> Menu </a>
          </Button>
        </p>
        <a className="menu-item" href="/StudentLogin">
          <BiLogIn size="20" />
          <a> STUDENT LOG IN</a>
        </a>
        <a className="menu-item logout" href="/AdminLogin">
          <MdOutlineAdminPanelSettings size="20" />
          <a> ADMIN LOG IN</a>
        </a>
      </Menu>
    </ThemeProvider>
  );
};
