import { slide as Menu } from "react-burger-menu";
import "./Bar.css";

type SidemenuProps = {
  pageWrapId: string;
  outerContainerId: string;
};

export const Adminbar = ({ pageWrapId, outerContainerId }: SidemenuProps) => {
  return (
    
    <Menu>
      <a className="memu-title"> MENU</a>
      <a className="menu-item" href="/DataStudent">
      บันทึก-ข้อมูลนักศึกษา
      </a>
      <a className="menu-item" href="/HomeAdmin">
      บันทึก-เกรด
      </a>
      <a className="menu-item" href="/HomeAdmin">
      บันทึก-หอพักนักศึกษา
      </a>
      <a className="menu-item" href="/HomeAdmin">
      บันทึก-กิจกรรม
      </a>
      <a className="menu-item" href="/HomeAdmin">
      บันทึก-ข้อมูลวินัย
      </a>
      <a className="menu-item logout" href="/HomeAdmin">
      บันทึก-ข้อมูลสาขาวิชา
      </a>
      <a className="menu-item" href="/DataCourse">
      บันทึก-ข้อมูลหลักสูตร
      </a>
      <a className="menu-item logout" href="/HomeAdmin">
      บันทึก-ข้อมูลแอดมิน
      </a>
      <a className="menu-item logout" href="/">
        ADMIN LOG OUT
      </a>
    </Menu>
  );
};
