import React from "react";
import { classNames } from "../utils/classNames";
import { useAuth } from "../context/AuthContext";

const Sidebar = ({ isOpen, onToggle, currentPage, onNavigate }) => {
  const { logout } = useAuth();

  const navItems = [
    // Core Workflow - Primary Functions
    {
      id: "dashboard",
      label: "Dashboard",
      icon: "dashboard",
      active: currentPage === "dashboard",
      page: "dashboard",
    },
    {
      id: "test-requests",
      label: "จัดการคำขอทดสอบ",
      icon: "clipboard-check",
      active: currentPage === "test-requests",
      page: "test-requests",
    },
    {
      id: "testers",
      label: "ผู้ทดสอบ",
      icon: "users",
      active: currentPage === "testers",
      page: "testers",
    },
    {
      id: "field-calendar",
      label: "ปฏิทินงานภาคสนาม",
      icon: "calendar",
      active: currentPage === "field-calendar",
      page: "field-calendar",
    },

    // Results & Documentation
    {
      id: "document-system",
      label: "ระบบจัดเก็บเอกสาร/ฟอร์ม",
      icon: "folder",
      active: currentPage === "document-system",
      page: "document-system",
    },
    {
      id: "testcase",
      label: "ผลการทดสอบ / รายงาน",
      icon: "search",
      active: currentPage === "testcase",
      page: "testcase",
    },

    // Management Functions
    {
      id: "customer-management",
      label: "จัดการลูกค้า/องค์กร",
      icon: "building",
      active: currentPage === "customer-management",
      page: "customer-management",
    },
    {
      id: "notifications",
      label: "แจ้งเตือน & ติดต่อกลับ",
      icon: "bell",
      active: currentPage === "notifications",
      page: "notifications",
    },

    // Administrative Functions
    {
      id: "system-settings",
      label: "ตั้งค่าระบบ",
      icon: "cog",
      active: currentPage === "system-settings",
      page: "system-settings",
    },
    {
      id: "user-permissions",
      label: "สิทธิ์ผู้ใช้งาน",
      icon: "shield",
      active: currentPage === "user-permissions",
      page: "user-permissions",
    },
  ];

  const getIcon = (iconName) => {
    const icons = {
      dashboard: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="3"
            y="3"
            width="7"
            height="9"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <rect
            x="14"
            y="3"
            width="7"
            height="5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <rect
            x="14"
            y="12"
            width="7"
            height="9"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <rect
            x="3"
            y="16"
            width="7"
            height="5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      "clipboard-check": (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16 4H18C18.5304 4 19.0391 4.21071 19.4142 4.58579C19.7893 4.96086 20 5.46957 20 6V20C20 20.5304 19.7893 21.0391 19.4142 21.4142C19.0391 21.7893 18.5304 22 18 22H6C5.46957 22 4.96086 21.7893 4.58579 21.4142C4.21071 21.0391 4 20.5304 4 20V6C4 5.46957 4.21071 4.96086 4.58579 4.58579C4.96086 4.21071 5.46957 4 6 4H8"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <rect
            x="8"
            y="2"
            width="8"
            height="4"
            rx="1"
            ry="1"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M10 12L12 14L16 10"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      users: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle
            cx="9"
            cy="7"
            r="4"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      search: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="11"
            cy="11"
            r="8"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M21 21L16.65 16.65"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      folder: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M22 19C22 19.5304 21.7893 20.0391 21.4142 20.4142C21.0391 20.7893 20.5304 21 20 21H4C3.46957 21 2.96086 20.7893 2.58579 20.4142C2.21071 20.0391 2 19.5304 2 19V5C2 4.46957 2.21071 3.96086 2.58579 3.58579C2.96086 3.21071 3.46957 3 4 3H9L11 6H20C20.5304 6 21.0391 6.21071 21.4142 6.58579C21.7893 6.96086 22 7.46957 22 8V19Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      calendar: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="3"
            y="4"
            width="18"
            height="18"
            rx="2"
            ry="2"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <line
            x1="16"
            y1="2"
            x2="16"
            y2="6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <line
            x1="8"
            y1="2"
            x2="8"
            y2="6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <line
            x1="3"
            y1="10"
            x2="21"
            y2="10"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      building: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6 22V16H10V22H18V12H22L12 2L2 12H6Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M9 9H15V15H9V9Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      cog: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="12"
            cy="12"
            r="3"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M19.4 15C19.2669 15.3016 19.2272 15.6362 19.286 15.9606C19.3448 16.285 19.4995 16.5843 19.73 16.82L19.79 16.88C19.976 17.0657 20.1235 17.2863 20.2241 17.5291C20.3248 17.7719 20.3766 18.0322 20.3766 18.295C20.3766 18.5578 20.3248 18.8181 20.2241 19.0609C20.1235 19.3037 19.976 19.5243 19.79 19.71C19.6043 19.896 19.3837 20.0435 19.1409 20.1441C18.8981 20.2448 18.6378 20.2966 18.375 20.2966C18.1122 20.2966 17.8519 20.2448 17.6091 20.1441C17.3663 20.0435 17.1457 19.896 16.96 19.71L16.9 19.65C16.6643 19.4195 16.365 19.2648 16.0406 19.206C15.7162 19.1472 15.3816 19.1869 15.08 19.32C14.7842 19.4468 14.532 19.6572 14.3543 19.9255C14.1766 20.1938 14.0813 20.5082 14.08 20.83V21C14.08 21.5304 13.8693 22.0391 13.4942 22.4142C13.1191 22.7893 12.6104 23 12.08 23C11.5496 23 11.0409 22.7893 10.6658 22.4142C10.2907 22.0391 10.08 21.5304 10.08 21V20.91C10.0723 20.579 9.96512 20.2573 9.77251 19.9887C9.5799 19.7201 9.31074 19.5176 9 19.405C8.69838 19.2719 8.36381 19.2322 8.03941 19.291C7.71502 19.3498 7.41568 19.5045 7.18 19.735L7.12 19.795C6.93425 19.981 6.71368 20.1285 6.47088 20.2291C6.22808 20.3298 5.96783 20.3816 5.705 20.3816C5.44217 20.3816 5.18192 20.3298 4.93912 20.2291C4.69632 20.1285 4.47575 19.981 4.29 19.795C4.10405 19.6093 3.95653 19.3887 3.85588 19.1459C3.75523 18.9031 3.70343 18.6428 3.70343 18.38C3.70343 18.1172 3.75523 17.8569 3.85588 17.6141C3.95653 17.3713 4.10405 17.1507 4.29 16.965L4.35 16.905C4.58054 16.6693 4.73519 16.37 4.794 16.0456C4.85282 15.7212 4.81312 15.3866 4.68 15.085C4.55324 14.7892 4.34276 14.537 4.07447 14.3593C3.80618 14.1816 3.49179 14.0863 3.17 14.085H3C2.46957 14.085 1.96086 13.8743 1.58579 13.4992C1.21071 13.1241 1 12.6154 1 12.085C1 11.5546 1.21071 11.0459 1.58579 10.6708C1.96086 10.2957 2.46957 10.085 3 10.085H3.09C3.42099 10.0773 3.742726 9.97012 4.011326 9.77751C4.279927 9.5849 4.482275 9.31574 4.595 9.005C4.72812 8.70338 4.76782 8.36881 4.709 8.04441C4.65019 7.72002 4.49554 7.42068 4.265 7.185L4.205 7.125C4.01905 6.93925 3.87153 6.71868 3.77088 6.47588C3.67023 6.23308 3.61843 5.97283 3.61843 5.71C3.61843 5.44717 3.67023 5.18692 3.77088 4.94412C3.87153 4.70132 4.01905 4.48075 4.205 4.295C4.39075 4.10905 4.61132 3.96153 4.85412 3.86088C5.09692 3.76023 5.35717 3.70843 5.62 3.70843C5.88283 3.70843 6.14308 3.76023 6.38588 3.86088C6.62868 3.96153 6.84925 4.10905 7.035 4.295L7.095 4.355C7.33068 4.58554 7.63002 4.74019 7.95441 4.799C8.27881 4.85782 8.61338 4.81812 8.915 4.685H9C9.29577 4.55824 9.54802 4.34776 9.72569 4.07947C9.90337 3.81118 9.99872 3.49679 10 3.175V3C10 2.46957 10.2107 1.96086 10.5858 1.58579C10.9609 1.21071 11.4696 1 12 1C12.5304 1 13.0391 1.21071 13.4142 1.58579C13.7893 1.96086 14 2.46957 14 3V3.09C14.0013 3.41221 14.0966 3.7266 14.2743 3.99489C14.452 4.26318 14.7042 4.47366 15 4.6C15.3016 4.73312 15.6362 4.77282 15.9606 4.714C16.285 4.65519 16.5843 4.50054 16.82 4.27L16.88 4.21C17.0657 4.02405 17.2863 3.87653 17.5291 3.77588C17.7719 3.67523 18.0322 3.62343 18.295 3.62343C18.5578 3.62343 18.8181 3.67523 19.0609 3.77588C19.3037 3.87653 19.5243 4.02405 19.71 4.21C19.896 4.39575 20.0435 4.61632 20.1441 4.85912C20.2448 5.10192 20.2966 5.36217 20.2966 5.625C20.2966 5.88783 20.2448 6.14808 20.1441 6.39088C20.0435 6.63368 19.896 6.85425 19.71 7.04L19.65 7.1C19.4195 7.33568 19.2648 7.63502 19.206 7.95941C19.1472 8.28381 19.1869 8.61838 19.32 8.92V9C19.4468 9.29577 19.6572 9.54802 19.9255 9.72569C20.1938 9.90337 20.5082 9.99872 20.83 10H21C21.5304 10 22.0391 10.2107 22.4142 10.5858C22.7893 10.9609 23 11.4696 23 12C23 12.5304 22.7893 13.0391 22.4142 13.4142C22.0391 13.7893 21.5304 14 21 14H20.91C20.5878 14.0013 20.2734 14.0966 20.0051 14.2743C19.7368 14.452 19.5263 14.7042 19.4 15V15Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      bell: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      shield: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M9 12L11 14L15 10"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      chart: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3 3V21H21"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M9 9L12 6L16 10L21 5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    };
    return icons[iconName] || icons.dashboard;
  };

  const handleNavClick = (item) => {
    if (onNavigate && item.page) {
      onNavigate(item.page);
    }
  };

  return (
    <>
      <aside className={classNames("sidebar", isOpen && "sidebar-open")}>
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <div className="logo-icon">
              <svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  width="40"
                  height="40"
                  rx="8"
                  fill="white"
                  fillOpacity="0.15"
                />
                <path
                  d="M20 8C26.6274 8 32 13.3726 32 20C32 26.6274 26.6274 32 20 32C13.3726 32 8 26.6274 8 20C8 13.3726 13.3726 8 20 8Z"
                  fill="white"
                />
                <path
                  d="M26.6667 16.6667C26.6667 15.5621 25.7712 14.6667 24.6667 14.6667C24.1788 14.6667 23.7333 14.8485 23.3939 15.1515C22.1818 14.4242 20.6667 14 19 13.9697L19.8788 9.81818L22.7879 10.4848C22.8242 11.1273 23.3576 11.6364 24 11.6364C24.6788 11.6364 25.2121 11.103 25.2121 10.4242C25.2121 9.74545 24.6788 9.21212 24 9.21212C23.5152 9.21212 23.103 9.51515 22.9333 9.93939L19.6364 9.21212C19.5152 9.18182 19.3939 9.18182 19.2727 9.24848C19.1515 9.31515 19.0606 9.41818 19.0303 9.53939L18.0606 13.9697C16.303 14 14.7879 14.4242 13.5758 15.1515C13.2364 14.8485 12.7879 14.6667 12.303 14.6667C11.1985 14.6667 10.303 15.5621 10.303 16.6667C10.303 17.4545 10.7273 18.1515 11.3576 18.4848C11.3576 18.6364 11.3576 18.7879 11.3576 18.9394C11.3576 21.8788 15.8788 24.303 21.3333 24.303C26.7879 24.303 31.3091 21.8788 31.3091 18.9394C31.3091 18.7879 31.3091 18.6364 31.3091 18.4848C31.9394 18.1515 32.3636 17.4545 32.3636 16.6667H26.6667Z"
                  fill="#16A085"
                />
                <ellipse
                  cx="16.6667"
                  cy="18.6667"
                  rx="1.66667"
                  ry="1.66667"
                  fill="white"
                />
                <ellipse
                  cx="25"
                  cy="18.6667"
                  rx="1.66667"
                  ry="1.66667"
                  fill="white"
                />
                <path
                  d="M15 22C15.9204 22.7538 17.8463 23.5 20 23.5C22.1537 23.5 24.0796 22.7538 25 22"
                  stroke="white"
                  strokeWidth="1.66667"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <div className="logo-text">
              <div className="logo-title">UTT</div>
              <div className="logo-subtitle">Universal Test Tool</div>
            </div>
          </div>

          {/* Close button for mobile */}
          <button
            className="sidebar-close"
            onClick={onToggle}
            aria-label="ปิดเมนู"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18 6L6 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6 6L18 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        <nav className="sidebar-nav">
          <ul className="nav-list">
            {navItems.map((item) => (
              <li key={item.id} className="nav-item">
                <a
                  href="#"
                  className={classNames(
                    "nav-link",
                    item.active && "nav-link-active",
                  )}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item);
                  }}
                >
                  <span className="nav-icon">{getIcon(item.icon)}</span>
                  <span className="nav-text">{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="sidebar-footer">
          {/* Logout Section */}
          <div className="logout-section">
            <a
              href="#"
              className="nav-link logout-link"
              onClick={(e) => {
                e.preventDefault();
                logout();
              }}
            >
              <span className="nav-icon">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M16 17L21 12L16 7"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M21 12H9"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span className="nav-text">ออกจากระบบ</span>
            </a>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
