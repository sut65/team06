import { slide as Menu } from "react-burger-menu";
import "./Bar.css";
import { IoIosLogIn } from "react-icons/io";

type SidemenuProps = {
  pageWrapId: string;
  outerContainerId: string;
};

export const Studentbar = ({ pageWrapId, outerContainerId }: SidemenuProps) => {
  return (
    <Menu>
      <p className="memu-title">MENU</p>
      <a className="menu-item" href="/HomeStudent">
        *ผลการศึกษา
      </a>
      <a className="menu-item" href="/HomeStudent">
        *ประวัติกิจกรรม
      </a>
      <a className="menu-item" href="/HomeStudent">
        *ระเบียนประวัติ
      </a>
      <a className="menu-item" href="/HomeStudent">
        *ข้อมูลวินัย
      </a>
      <a className="menu-item" href="/HomeStudent">
        *หอพักนักศึกษา
      </a>
      <a className="menu-item logout" href="/HomeStudent">
        สมัครขอทุนการศึกษา
      </a>
      <a className="menu-item" href="/HomeStudent">
        ยื่นคำร้องผ่อนผันค่าธรรมเนียมการศึกษา
      </a>
      <a className="menu-item" href="/HomeStudent">
        ยื่นคำร้องลาหยุด
      </a>
      <a className="menu-item"></a>
      <a className="menu-item" href="/HomeStudent">
        เสนอความคิดเห็น
      </a>
      <a className="menu-item logout" href="/">
        STUDENT LOG OUT
      </a>
    </Menu>
  );
};
