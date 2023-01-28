import { slide as Menu } from "react-burger-menu";
import "./Bar.css";
import { IoIosLogIn } from "react-icons/io";
import { MdAdminPanelSettings } from "react-icons/md";

type SidemenuProps = {
  pageWrapId: string;
  outerContainerId: string;
};

export const Homebar = ({ pageWrapId, outerContainerId }: SidemenuProps) => {
  return (
    <Menu>
      <p className="memu-title">MENU</p>
      <a className="menu-item" href="/StudentLogin">
        <IoIosLogIn />
        STUDENT LOG IN
      </a>
      <a className="menu-item logout" href="/AdminLogin">
        <MdAdminPanelSettings />
        ADMIN LOG IN
      </a>
    </Menu>
  );
};
