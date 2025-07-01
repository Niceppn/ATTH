import React, { useState } from "react";
import {
  Card,
  Row,
  Col,
  Button,
  Form,
  InputGroup,
  Badge,
  ProgressBar,
} from "react-bootstrap";

const Dashboard = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState("7d");

  // Sample data for dashboard metrics
  const dashboardStats = [
    {
      id: 1,
      title: "คำขอทดสอบทั้งหมด",
      value: "247",
      change: "+12%",
      changeType: "positive",
      icon: "clipboard-check",
      color: "primary",
    },
    {
      id: 2,
      title: "ทดสอบสำเร็จ",
      value: "189",
      change: "+8%",
      changeType: "positive",
      icon: "check-circle",
      color: "success",
    },
    {
      id: 3,
      title: "กำลังดำเนินการ",
      value: "42",
      change: "-3%",
      changeType: "negative",
      icon: "clock",
      color: "warning",
    },
    {
      id: 4,
      title: "ผู้ทดสอบที่ใช้งาน",
      value: "18",
      change: "+2",
      changeType: "positive",
      icon: "users",
      color: "info",
    },
  ];

  const recentActivities = [
    {
      id: 1,
      action: "เพิ่มคำขอทดสอบใหม่",
      project: "Mobile Banking App",
      user: "สมชาย ใจดี",
      time: "5 นาทีที่แล้ว",
      status: "success",
    },
    {
      id: 2,
      action: "อัปเดตรายงานการทดสอบ",
      project: "E-Commerce Platform",
      user: "สมหญิง รักงาน",
      time: "15 นาทีที่แล้ว",
      status: "info",
    },
    {
      id: 3,
      action: "ส่งมอบผลการทดสอบ",
      project: "Government Portal",
      user: "วิชัย เก่งมาก",
      time: "1 ชั่วโมงที่แล้ว",
      status: "success",
    },
    {
      id: 4,
      action: "แจ้งปัญหาการทดสอบ",
      project: "Healthcare System",
      user: "นุชนาฏ ใส่ใจ",
      time: "2 ชั่วโมงที่แล้ว",
      status: "warning",
    },
  ];

  const upcomingTests = [
    {
      id: 1,
      project: "Banking Mobile App",
      type: "Accessibility Testing",
      tester: "ทีมทดสอบ A",
      date: "2024-01-15",
      priority: "สูง",
    },
    {
      id: 2,
      project: "E-Learning Platform",
      type: "Performance Testing",
      tester: "ทีมทดสอบ B",
      date: "2024-01-16",
      priority: "ปานกลาง",
    },
    {
      id: 3,
      project: "Corporate Website",
      type: "WCAG Compliance",
      tester: "ทีมทดสอบ C",
      date: "2024-01-18",
      priority: "ต่ำ",
    },
  ];

  const getIcon = (iconName) => {
    const icons = {
      "clipboard-check": (
        <svg
          width="24"
          height="24"
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
      "check-circle": (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M22 11.08V12C21.9988 14.1564 21.3005 16.2547 20.0093 17.9818C18.7182 19.7088 16.9033 20.9725 14.8354 21.5839C12.7674 22.1953 10.5573 22.1219 8.53447 21.3746C6.51168 20.6273 4.78465 19.2461 3.61096 17.4371C2.43727 15.628 1.87979 13.4898 2.02168 11.3363C2.16356 9.18288 2.99721 7.13471 4.39828 5.49618C5.79935 3.85766 7.69279 2.71539 9.79619 2.24618C11.8996 1.77697 14.1003 1.98981 16.07 2.85999"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M22 4L12 14.01L9 11.01"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      clock: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 6V12L16 14"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      users: (
        <svg
          width="24"
          height="24"
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
    };
    return icons[iconName] || icons["clipboard-check"];
  };

  const getPriorityBadgeVariant = (priority) => {
    switch (priority) {
      case "สูง":
        return "danger";
      case "ปานกลาง":
        return "warning";
      case "ต่ำ":
        return "secondary";
      default:
        return "primary";
    }
  };

  const getStatusVariant = (status) => {
    switch (status) {
      case "success":
        return "success";
      case "warning":
        return "warning";
      case "info":
        return "info";
      default:
        return "primary";
    }
  };

  return (
    <div className="dashboard-container">
      {/* Dashboard Header */}
      <div className="dashboard-header">
        <div className="header-content">
          <div className="title-section">
            <h1 className="dashboard-title">Dashboard</h1>
            <p className="dashboard-subtitle">ภาพรวมของระบบทดสอบการเข้าถึง</p>
          </div>
          <div className="header-actions">
            <Form.Select
              value={selectedTimeframe}
              onChange={(e) => setSelectedTimeframe(e.target.value)}
              className="timeframe-select"
            >
              <option value="7d">7 วันที่ผ่านมา</option>
              <option value="30d">30 วันที่ผ่านมา</option>
              <option value="90d">90 วันที่ผ่านมา</option>
            </Form.Select>
            <Button variant="outline-primary" className="export-btn">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 2.58579 20.4142C2.21071 20.0391 2 19.5304 2 19V15"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M7 10L12 15L17 10"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 15V3"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              ส่งออกรายงาน
            </Button>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <Row className="dashboard-stats">
        {dashboardStats.map((stat) => (
          <Col lg={3} md={6} key={stat.id} className="mb-4">
            <Card className="stat-card h-100">
              <Card.Body>
                <div className="stat-card-content">
                  <div className={`stat-icon stat-icon-${stat.color}`}>
                    {getIcon(stat.icon)}
                  </div>
                  <div className="stat-info">
                    <div className="stat-value">{stat.value}</div>
                    <div className="stat-label">{stat.title}</div>
                    <div className={`stat-change ${stat.changeType}`}>
                      {stat.change} จากเดือนที่แล้ว
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Row>
        {/* Recent Activities */}
        <Col lg={8} className="mb-4">
          <Card className="dashboard-card">
            <Card.Header className="card-header-dashboard">
              <div className="header-with-actions">
                <h5 className="card-title">กิจกรรมล่าสุด</h5>
                <Button variant="outline-light" size="sm">
                  ดูทั้งหมด
                </Button>
              </div>
            </Card.Header>
            <Card.Body className="p-0">
              <div className="activity-list">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="activity-item">
                    <div className="activity-content">
                      <div className="activity-main">
                        <div className="activity-title">{activity.action}</div>
                        <div className="activity-project">
                          {activity.project}
                        </div>
                      </div>
                      <div className="activity-meta">
                        <div className="activity-user">{activity.user}</div>
                        <div className="activity-time">{activity.time}</div>
                      </div>
                    </div>
                    <Badge
                      bg={getStatusVariant(activity.status)}
                      className="activity-badge"
                    >
                      {activity.status === "success"
                        ? "สำเร็จ"
                        : activity.status === "warning"
                          ? "เตือน"
                          : "ข้อมูล"}
                    </Badge>
                  </div>
                ))}
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Upcoming Tests */}
        <Col lg={4} className="mb-4">
          <Card className="dashboard-card">
            <Card.Header className="card-header-dashboard">
              <h5 className="card-title">การทดสอบที่กำลังจะมาถึง</h5>
            </Card.Header>
            <Card.Body>
              <div className="upcoming-tests">
                {upcomingTests.map((test) => (
                  <div key={test.id} className="test-item">
                    <div className="test-header">
                      <div className="test-project">{test.project}</div>
                      <Badge
                        bg={getPriorityBadgeVariant(test.priority)}
                        className="priority-badge"
                      >
                        {test.priority}
                      </Badge>
                    </div>
                    <div className="test-type">{test.type}</div>
                    <div className="test-meta">
                      <div className="test-tester">{test.tester}</div>
                      <div className="test-date">{test.date}</div>
                    </div>
                  </div>
                ))}
              </div>
              <Button
                variant="outline-primary"
                size="sm"
                className="w-100 mt-3"
              >
                ดูปฏิทินเต็ม
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Progress Overview */}
      <Row>
        <Col lg={12}>
          <Card className="dashboard-card">
            <Card.Header className="card-header-dashboard">
              <h5 className="card-title">ภาพรวมความคืบหน้าการทดสอบ</h5>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={6}>
                  <div className="progress-section">
                    <div className="progress-header">
                      <span className="progress-label">
                        การทดสอบ Accessibility
                      </span>
                      <span className="progress-percentage">75%</span>
                    </div>
                    <ProgressBar
                      now={75}
                      variant="success"
                      className="custom-progress"
                    />
                  </div>
                </Col>
                <Col md={6}>
                  <div className="progress-section">
                    <div className="progress-header">
                      <span className="progress-label">
                        การทดสอบ WCAG Compliance
                      </span>
                      <span className="progress-percentage">60%</span>
                    </div>
                    <ProgressBar
                      now={60}
                      variant="primary"
                      className="custom-progress"
                    />
                  </div>
                </Col>
                <Col md={6}>
                  <div className="progress-section">
                    <div className="progress-header">
                      <span className="progress-label">
                        การทดสอบ Performance
                      </span>
                      <span className="progress-percentage">45%</span>
                    </div>
                    <ProgressBar
                      now={45}
                      variant="warning"
                      className="custom-progress"
                    />
                  </div>
                </Col>
                <Col md={6}>
                  <div className="progress-section">
                    <div className="progress-header">
                      <span className="progress-label">การส่งมอบรายงาน</span>
                      <span className="progress-percentage">90%</span>
                    </div>
                    <ProgressBar
                      now={90}
                      variant="info"
                      className="custom-progress"
                    />
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
