import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaTachometerAlt,
  FaClipboardList,
  FaUsers,
  FaCalendarAlt,
  FaFolder,
  FaSearch,
  FaHome,
  FaBell,
  FaBars,
  FaSignOutAlt
} from "react-icons/fa";



const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation(); // เช็ค path ปัจจุบันเพื่อเน้นเมนู active

  const menuItems = [
    { icon: FaTachometerAlt, label: "งานที่ได้รับมอบหมาย", to: "/work" },
    { icon: FaClipboardList, label: "ประวัติการทดสอบ", to: "/history" },
    { icon: FaCalendarAlt, label: "ปฏิทินงานการทดสอบ", to: "/calendar" },
    { icon: FaFolder, label: "ระบบจัดเก็บเอกสาร/ฟอร์ม", to: "/document" },
    { icon: FaSearch, label: "คู่มือการทดสอบ", to: "/manual" },
    { icon: FaHome, label: "แนวทางการทดสอบ", to: "/guide" },
    { icon: FaBell, label: "แจ้งเตือน & ติดต่อกลุ่ม", to: "/notifications" },
    { icon: FaSignOutAlt, label: "ออกจากระบบ", to: "/logout" },
  ];

  return (
    <div className={`sidebar ${isOpen ? "sidebar-open" : "sidebar-closed"}`}>
      {/* Header */}
      <div className="sidebar-header">
        <div className="d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center">
            <div className="sidebar-logo">
              <button
                onClick={toggleSidebar}
                aria-label={isOpen ? "ปิดเมนู" : "เปิดเมนู"}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  fontSize: "1.5rem",
                }}
              >
                <FaBars />
              </button>
              
              {/*<div className="logo-icon">
                <FaBars />
              </div>*/}
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
                className={`nav-link ${location.pathname === item.to ? "active" : ""
                  }`}
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
        <div className="user-info">
          <div className="user-avatar">
            <FaUsers />
          </div>
          <div className="user-details">
            <div className="user-name">ผู้ใช้งาน</div>
            <div className="user-role">Administrator</div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Sidebar;
