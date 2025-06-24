import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaTachometerAlt,
  FaClipboardList,
  FaCalendarAlt,
  FaFolder,
  FaSearch,
  FaHome,
  FaBell,
  FaBars,
  FaSignOutAlt,
  FaCog,
  FaUsers,
  FaUserCog
} from "react-icons/fa";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { icon: FaTachometerAlt, label: "งานที่ได้รับมอบหมาย", to: "/work" },
    { icon: FaClipboardList, label: "ประวัติการทดสอบ", to: "/history" },
    { icon: FaCalendarAlt, label: "ปฏิทินงานการทดสอบ", to: "/calendar" },
    { icon: FaFolder, label: "ระบบจัดเก็บเอกสาร/ฟอร์ม", to: "/documents" },
    { icon: FaSearch, label: "คู่มือการทดสอบ", to: "/manual" },
    { icon: FaHome, label: "แนวทางการทดสอบ", to: "/guide" },
    { icon: FaBell, label: "แจ้งเตือน & ติดต่อกลุ่ม", to: "/notifications" },
    { icon: FaSignOutAlt, label: "ออกจากระบบ", to: "/logout" },
    //{ icon: FaCog, label:"ตั้งค่า", to:"/setting"}
  ];

  const handleClickSetting = () => {
    navigate("/setting"); // ไปหน้า setting
  };

  return (
    <div className={`sidebar ${isOpen ? "sidebar-open" : "sidebar-closed"}`}>
      {/* Header */}
      <div className="sidebar-header">
        <div className="d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center">
            <div className="sidebar-logo">
              <div className="logo-icon">
                <FaBars />
              </div>
            </div>
            {isOpen && (
              <div className="sidebar-title">
                <h5 className="mb-0">ATTH</h5>
                <small>Assistive Tech Test Hub</small>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        <ul className="nav flex-column">
          {menuItems.map((item, index) => (
            <li key={index} className="nav-item">
              <Link
                to={item.to}
                className={`nav-link ${location.pathname === item.to ? "active" : ""}`}
                title={!isOpen ? item.label : ""}
              >
                <span className="nav-icon">
                  <item.icon />
                </span>
                {isOpen && <span className="nav-text">{item.label}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div className={`sidebar-footer ${isOpen ? "footer-open" : "footer-closed"}`}>
        <div className="user-info d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center">
            <div className="user-avatar me-2">
              <FaUsers />
            </div>
            {isOpen && (
              <div className="user-details">
                <div className="user-name">ผู้ใช้งาน</div>
                <div className="user-role">Administrator</div>
              </div>
            )}
          </div>

          {isOpen && (
            <div
              onClick={handleClickSetting}
              style={{ cursor: "pointer", display: "flex", alignItems: "center" }}
              title="ตั้งค่า Admin"
            >
              <FaCog size={20} style={{ marginRight: "8px" }} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
