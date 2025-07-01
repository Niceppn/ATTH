import React, { useState } from "react";
import {
  Card,
  Row,
  Col,
  Button,
  Form,
  Alert,
  Badge,
  Modal,
  InputGroup,
} from "react-bootstrap";

const Notifications = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);

  // Statistics data
  const stats = [
    {
      icon: "📁",
      value: 5,
      label: "โครงการ",
      color: "var(--primary)",
      bgColor: "rgba(26, 112, 99, 0.1)",
    },
    {
      icon: "🔍",
      value: 5,
      label: "การค้นหา",
      color: "#17a2b8",
      bgColor: "rgba(23, 162, 184, 0.1)",
    },
    {
      icon: "✅",
      value: 4,
      label: "ยืนยันแล้ว",
      color: "#28a745",
      bgColor: "rgba(40, 167, 69, 0.1)",
    },
    {
      icon: "👥",
      value: 19,
      label: "ผู้ใช้งาน",
      color: "#dc3545",
      bgColor: "rgba(220, 53, 69, 0.1)",
    },
  ];

  // User activity notifications
  const notifications = [
    {
      id: 1,
      type: "user_login",
      title: "ผู้ใช้เข้าสู่ระบบ",
      message:
        "สมชาย ใจดี เข้าสู่ระบบเพื่อทำการทดสอบโครงการ Mobile Banking App",
      user: "สมชาย ใจดี",
      userRole: "Senior Tester",
      date: "2024-01-10",
      time: "14:30",
      status: "unread",
      priority: "ปกติ",
      action: "เข้าสู่ระบบ",
    },
    {
      id: 2,
      type: "system_maintenance",
      title: "การปรับปรุงระบบ",
      message:
        "ระบบจะมีการปรับปรุงเวอร์ชั่นใหม่ในวันที่ 15 ม.ค. 2024 เวลา 02:00-06:00 น.",
      date: "2024-01-08",
      time: "09:15",
      status: "read",
      priority: "สำคัญ",
    },
    {
      id: 3,
      type: "test_complete",
      title: "การทดสอบเสร็จสิ้น",
      message:
        "การทดสอบ WCAG 2.1 สำหรับเว็บไซต์ E-Commerce Platform เสร็จสิ้นเรียบร้อยแล้ว",
      user: "วิชัย เก่งมาก",
      userRole: "QA Engineer",
      date: "2024-01-05",
      time: "16:45",
      status: "read",
      priority: "ปกติ",
      action: "ทำการทดสอบเสร็จสิ้น",
    },
    {
      id: 4,
      type: "issue_found",
      title: "พบปัญหาการทดสอบ",
      message:
        "พบปัญหาร้ายแรงในการทดสอบ Accessibility สำหรับระบบ Healthcare System",
      user: "นุชนาฏ ใส่ใจ",
      userRole: "Accessibility Specialist",
      date: "2024-01-03",
      time: "11:20",
      status: "unread",
      priority: "เร่งด่วน",
      action: "รายงานปัญหา",
    },
    {
      id: 5,
      type: "user_contact",
      title: "ผู้ใช้ติดต่อระบบ",
      message:
        "สมหญิง รักงาน ส่งคำถามเกี่ยวกับการใช้งานระบบ Document Management",
      user: "สมหญิง รักงาน",
      userRole: "Project Manager",
      date: "2024-01-02",
      time: "10:15",
      status: "unread",
      priority: "ปกติ",
      action: "ส่งคำถาม",
    },
    {
      id: 6,
      type: "user_register",
      title: "ผู้ใช้ใหม่ลงทะเบียน",
      message: "ประยุทธ์ ทดสอบ ลงทะเบียนเป็นสมาชิกใหม่และรอการอนุมัติ",
      user: "ประยุทธ์ ทดสอบ",
      userRole: "Field Tester",
      date: "2024-01-01",
      time: "08:45",
      status: "read",
      priority: "ปกติ",
      action: "ลงทะเบียนใหม่",
    },
  ];

  // Filter notifications based on search and type
  const filteredNotifications = notifications.filter((notification) => {
    const matchesSearch =
      notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (notification.user &&
        notification.user.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesType =
      filterType === "all" || notification.type === filterType;

    return matchesSearch && matchesType;
  });

  const unreadCount = notifications.filter((n) => n.status === "unread").length;

  const getNotificationIcon = (type) => {
    switch (type) {
      case "user_login":
        return "👤";
      case "user_register":
        return "✨";
      case "user_contact":
        return "💬";
      case "system_maintenance":
        return "⚙️";
      case "test_complete":
        return "✅";
      case "issue_found":
        return "⚠️";
      default:
        return "📢";
    }
  };

  const getNotificationVariant = (type) => {
    switch (type) {
      case "user_login":
        return "primary";
      case "user_register":
        return "success";
      case "user_contact":
        return "info";
      case "system_maintenance":
        return "warning";
      case "test_complete":
        return "success";
      case "issue_found":
        return "danger";
      default:
        return "secondary";
    }
  };

  const getPriorityVariant = (priority) => {
    switch (priority) {
      case "เร่งด่วน":
        return "danger";
      case "สำคัญ":
        return "warning";
      case "ปกติ":
        return "secondary";
      default:
        return "primary";
    }
  };

  const handleNotificationClick = (notification) => {
    setSelectedNotification(notification);
    setShowModal(true);
  };

  return (
    <div className="notifications-container">
      {/* Page Header */}
      <div className="notifications-header">
        <h1 className="notifications-title">แจ้งเตือนระบบ</h1>
        <p className="notifications-subtitle">
          ติดตามกิจกรรมผู้ใช้งาน การแจ้งเตือนระบบ และการติดต่อ
        </p>
      </div>

      {/* Statistics Cards */}
      <Row className="mb-4">
        {stats.map((stat, index) => (
          <Col lg={3} md={6} className="mb-3" key={index}>
            <Card className="stat-card h-100">
              <Card.Body>
                <div className="stat-card-content">
                  <div
                    className="stat-icon-modern"
                    style={{
                      backgroundColor: stat.bgColor,
                      color: stat.color,
                    }}
                  >
                    <span style={{ fontSize: "1.5rem" }}>{stat.icon}</span>
                  </div>
                  <div className="stat-info">
                    <div className="stat-value">{stat.value}</div>
                    <div className="stat-label">{stat.label}</div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Search and Filter Controls */}
      <Row className="mb-4">
        <Col lg={8}>
          <Card className="filter-card">
            <Card.Body>
              <Row className="align-items-end">
                <Col md={8} className="mb-3">
                  <Form.Label>ค้นหาการแจ้งเตือน</Form.Label>
                  <div className="search-bar-container">
                    <Form.Control
                      type="text"
                      placeholder="ค้นหาชื่อผู้ใช้, ข้อความ, หรือกิจกรรม..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="search-input-large"
                      size="lg"
                    />
                    <Button
                      variant="primary"
                      className="search-button-modern"
                      size="lg"
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M21 21L15.803 15.803M15.803 15.803C17.2096 14.3964 18 12.4887 18 10.5C18 6.35786 14.6421 3 10.5 3C6.35786 3 3 6.35786 3 10.5C3 14.6421 6.35786 18 10.5 18C12.4887 18 14.3964 17.2096 15.803 15.803Z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </Button>
                  </div>
                </Col>
                <Col md={4} className="mb-3">
                  <Form.Label>ประเภทการแจ้งเตือน</Form.Label>
                  <Form.Select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="form-select-modern"
                    style={{
                      fontSize: "1rem",
                      padding: "0.75rem",
                      borderRadius: "8px",
                      border: "2px solid #e9ecef",
                    }}
                  >
                    <option value="all">ทั้งหมด</option>
                    <option value="user_login">ผู้ใช้เข้าสู่ระบบ</option>
                    <option value="user_register">ผู้ใช้ใหม่</option>
                    <option value="user_contact">ติดต่อระบบ</option>
                    <option value="test_complete">ทดสอบเสร็จ</option>
                    <option value="issue_found">พบปัญหา</option>
                    <option value="system_maintenance">การปรับปรุง</option>
                  </Form.Select>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={4}>
          <Card className="summary-card">
            <Card.Body>
              <h6>สรุปการแจ้งเตือน</h6>
              <div className="summary-stats">
                <div className="summary-item">
                  <span className="summary-label">ทั้งหมด:</span>
                  <span className="summary-value">{notifications.length}</span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">ยังไม่อ่าน:</span>
                  <span className="summary-value text-danger">
                    {unreadCount}
                  </span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">กำลังแสดง:</span>
                  <span className="summary-value">
                    {filteredNotifications.length}
                  </span>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Notifications List */}
      <Card className="notifications-list-card">
        <Card.Header className="card-header-notifications">
          <div className="header-with-actions">
            <h5 className="card-title">การแจ้งเตือนล่าสุด</h5>
            <Button variant="outline-primary" size="sm">
              ทำเครื่องหมายอ่านทั้งหมด
            </Button>
          </div>
        </Card.Header>
        <Card.Body className="p-0">
          <div className="notifications-list">
            {filteredNotifications.length === 0 ? (
              <div
                className="empty-notifications"
                style={{ padding: "3rem", textAlign: "center" }}
              >
                <div
                  style={{
                    fontSize: "3rem",
                    marginBottom: "1rem",
                    opacity: 0.3,
                  }}
                >
                  🔔
                </div>
                <h5 style={{ color: "var(--text-secondary)" }}>
                  ไม่พบการแจ้งเตือน
                </h5>
                <p
                  style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}
                >
                  ลองเปลี่ยนคำค้นหาหรือตัวกรองการแจ้งเตือน
                </p>
              </div>
            ) : (
              filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`notification-item ${notification.status === "unread" ? "unread" : ""}`}
                  onClick={() => handleNotificationClick(notification)}
                >
                  <div className="notification-content">
                    <div className="notification-header">
                      <div className="notification-icon-wrapper">
                        <div
                          className={`notification-icon notification-${notification.type}`}
                        >
                          {getNotificationIcon(notification.type)}
                        </div>
                      </div>
                      <div className="notification-main">
                        <div className="notification-title-row">
                          <h6 className="notification-title">
                            {notification.title}
                          </h6>
                          <div className="notification-time">
                            {notification.date} {notification.time}
                          </div>
                        </div>
                        <p className="notification-message">
                          {notification.message}
                        </p>
                        {notification.user && (
                          <div className="notification-user-info">
                            <Badge
                              bg="light"
                              text="dark"
                              className="user-badge"
                            >
                              👤 {notification.user}
                            </Badge>
                            {notification.userRole && (
                              <Badge
                                bg="outline-secondary"
                                className="role-badge"
                              >
                                {notification.userRole}
                              </Badge>
                            )}
                            {notification.action && (
                              <Badge
                                bg={getNotificationVariant(notification.type)}
                                className="action-badge"
                              >
                                {notification.action}
                              </Badge>
                            )}
                          </div>
                        )}
                        <div className="notification-badges">
                          <Badge
                            bg={getPriorityVariant(notification.priority)}
                            className="priority-badge"
                          >
                            {notification.priority}
                          </Badge>
                          {notification.status === "unread" && (
                            <Badge bg="primary" className="status-badge">
                              ใหม่
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </Card.Body>
      </Card>

      {/* Notification Detail Modal */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>รายละเอียดการแจ้งเตือน</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedNotification && (
            <div className="notification-detail">
              <div className="detail-header">
                <div className="detail-icon-wrapper">
                  <div
                    className={`detail-icon notification-${selectedNotification.type}`}
                  >
                    {getNotificationIcon(selectedNotification.type)}
                  </div>
                </div>
                <div className="detail-meta">
                  <Badge
                    bg={getPriorityVariant(selectedNotification.priority)}
                    className="mb-2"
                  >
                    ระดับความสำคัญ: {selectedNotification.priority}
                  </Badge>
                  <div className="detail-time">
                    {selectedNotification.date} เวลา {selectedNotification.time}
                  </div>
                  {selectedNotification.user && (
                    <div className="detail-user">
                      <strong>ผู้ใช้:</strong> {selectedNotification.user}
                      {selectedNotification.userRole && (
                        <span className="text-muted">
                          {" "}
                          ({selectedNotification.userRole})
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
              <h5 className="detail-title">{selectedNotification.title}</h5>
              <p className="detail-message">{selectedNotification.message}</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            ปิด
          </Button>
          <Button variant="primary">ทำเครื่องหมายว่าอ่านแล้ว</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Notifications;
