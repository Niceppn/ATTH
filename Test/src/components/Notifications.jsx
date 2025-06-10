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
} from "react-bootstrap";

const Notifications = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    company: "",
    subject: "",
    details: "",
  });
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);

  // Sample notifications data
  const notifications = [
    {
      id: 1,
      type: "warning",
      title: "แจ้งเตือนการหมดอายุใบรับรอง",
      message:
        "ใบรับรองการทดสอบสำหรับโครงการ Mobile Banking App จะหมดอายุในอีก 7 วัน",
      date: "2024-01-10",
      time: "14:30",
      priority: "สูง",
      status: "unread",
    },
    {
      id: 2,
      type: "info",
      title: "การปรับปรุงระบบ",
      message:
        "ระบบจะมีการปรับปรุงเวอร์ชั่นใหม่ในวันที่ 15 ม.ค. 2024 เวลา 02:00-06:00 น.",
      date: "2024-01-08",
      time: "09:15",
      priority: "ปานกลาง",
      status: "read",
    },
    {
      id: 3,
      type: "success",
      title: "การทดสอบเสร็จสิ้น",
      message:
        "การทดสอบ WCAG 2.1 สำหรับเว็บไซต์ E-Commerce Platform เสร็จสิ้นเรียบร้อยแล้ว",
      date: "2024-01-05",
      time: "16:45",
      priority: "ต่ำ",
      status: "read",
    },
    {
      id: 4,
      type: "error",
      title: "พบปัญหาการทดสอบ",
      message:
        "พบปัญหาร้าย serious ในการทดสอบ Accessibility สำหรับระบบ Healthcare System",
      date: "2024-01-03",
      time: "11:20",
      priority: "สูง",
      status: "unread",
    },
  ];

  const subjectOptions = [
    "เลือกหัวข้อ",
    "ปัญหาการใช้งานระบบ",
    "ขอข้อมูลเพิ่มเติม",
    "รายงานปัญหา",
    "คำแนะนำ",
    "ขอความช่วยเหลือ",
    "ความคิดเห็นและข้อเสนอแนะ",
    "อื่นๆ",
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (
      !formData.fullName ||
      !formData.email ||
      !formData.subject ||
      !formData.details
    ) {
      setAlertType("danger");
      setAlertMessage("กรุณากรอกข้อมูลที่จำเป็นให้ครบถ้วน");
      setShowAlert(true);
      return;
    }

    if (formData.subject === "เลือกหัวข้อ") {
      setAlertType("warning");
      setAlertMessage("กรุณาเลือกหัวข้อที่ต้องการติดต่อ");
      setShowAlert(true);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setAlertType("warning");
      setAlertMessage("กรุณากรอกอีเมลให้ถูกต้อง");
      setShowAlert(true);
      return;
    }

    // Success
    setAlertType("success");
    setAlertMessage("ส่งข้อความเรียบร้อยแล้ว เราจะติดต่อกลับภายใน 24 ชั่วโมง");
    setShowAlert(true);

    // Reset form
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      company: "",
      subject: "",
      details: "",
    });
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case "warning":
        return (
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.29 3.86L1.82 18C1.64 18.37 1.55 18.78 1.55 19.2C1.55 20.2 2.35 21 3.35 21H20.65C21.65 21 22.45 20.2 22.45 19.2C22.45 18.78 22.36 18.37 22.18 18L13.71 3.86C13.32 3.15 12.69 2.75 12 2.75C11.31 2.75 10.68 3.15 10.29 3.86Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <line
              x1="12"
              y1="9"
              x2="12"
              y2="13"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <line
              x1="12"
              y1="17"
              x2="12.01"
              y2="17"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        );
      case "info":
        return (
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
              r="10"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <line
              x1="12"
              y1="16"
              x2="12"
              y2="12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <line
              x1="12"
              y1="8"
              x2="12.01"
              y2="8"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        );
      case "success":
        return (
          <svg
            width="20"
            height="20"
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
        );
      case "error":
        return (
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
              r="10"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <line
              x1="15"
              y1="9"
              x2="9"
              y2="15"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <line
              x1="9"
              y1="9"
              x2="15"
              y2="15"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        );
      default:
        return null;
    }
  };

  const getNotificationVariant = (type) => {
    switch (type) {
      case "warning":
        return "warning";
      case "info":
        return "info";
      case "success":
        return "success";
      case "error":
        return "danger";
      default:
        return "primary";
    }
  };

  const getPriorityVariant = (priority) => {
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

  const handleNotificationClick = (notification) => {
    setSelectedNotification(notification);
    setShowModal(true);
  };

  return (
    <div className="notifications-container">
      {/* Page Header */}
      <div className="notifications-header">
        <h1 className="notifications-title">แจ้งเตือน & ติดต่อกลับ</h1>
        <p className="notifications-subtitle">
          ระบบแจ้งเตือนความคืบหน้า หรือแจ้งปัญหาและติดต่อกลับ
        </p>
      </div>

      {showAlert && (
        <Alert
          variant={alertType}
          dismissible
          onClose={() => setShowAlert(false)}
          className="mb-4"
        >
          {alertMessage}
        </Alert>
      )}

      <Row>
        {/* Notifications List */}
        <Col lg={7} className="mb-4">
          <Card className="notifications-list-card">
            <Card.Header className="card-header-notifications">
              <div className="header-with-actions">
                <h5 className="card-title">การแจ้งเตือนล่าสุด</h5>
                <Button variant="outline-light" size="sm">
                  ทำเครื่องหมายอ่านทั้งหมด
                </Button>
              </div>
            </Card.Header>
            <Card.Body className="p-0">
              <div className="notifications-list">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`notification-item ${notification.status === "unread" ? "unread" : ""}`}
                    onClick={() => handleNotificationClick(notification)}
                  >
                    <div className="notification-content">
                      <div className="notification-header">
                        <div
                          className={`notification-icon notification-${notification.type}`}
                        >
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="notification-meta">
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
                          <div className="notification-time">
                            {notification.date} {notification.time}
                          </div>
                        </div>
                      </div>
                      <div className="notification-body">
                        <h6 className="notification-title">
                          {notification.title}
                        </h6>
                        <p className="notification-message">
                          {notification.message}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Contact Form */}
        <Col lg={5} className="mb-4">
          <Card className="contact-form-card">
            <Card.Body>
              <div className="contact-form-container">
                <div className="form-header">
                  <h5 className="form-title">ส่งข้อความหาเรา</h5>
                </div>

                <Form onSubmit={handleSubmit} className="contact-form">
                  <Row>
                    <Col md={6} className="mb-3">
                      <Form.Label className="form-label-required">
                        ชื่อ-นามสกุล{" "}
                        <span className="required-asterisk">*</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className="form-input-custom"
                        placeholder="กรอกชื่อ-นามสกุล"
                      />
                    </Col>
                    <Col md={6} className="mb-3">
                      <Form.Label className="form-label-required">
                        อีเมล <span className="required-asterisk">*</span>
                      </Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="form-input-custom"
                        placeholder="กรอกอีเมล"
                      />
                    </Col>
                  </Row>

                  <Row>
                    <Col md={6} className="mb-3">
                      <Form.Label>เบอร์โทรศัพท์</Form.Label>
                      <Form.Control
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="form-input-custom"
                        placeholder="กรอกเบอร์โทรศัพท์"
                      />
                    </Col>
                    <Col md={6} className="mb-3">
                      <Form.Label>บริษัท/องค์กร</Form.Label>
                      <Form.Control
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="form-input-custom"
                        placeholder="กรอกชื่อบริษัท/องค์กร"
                      />
                    </Col>
                  </Row>

                  <div className="mb-3">
                    <Form.Label className="form-label-required">
                      หัวข้อ <span className="required-asterisk">*</span>
                    </Form.Label>
                    <Form.Select
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="form-select-custom"
                    >
                      {subjectOptions.map((option, index) => (
                        <option key={index} value={option}>
                          {option}
                        </option>
                      ))}
                    </Form.Select>
                  </div>

                  <div className="mb-4">
                    <Form.Label className="form-label-required">
                      รายละเอียด <span className="required-asterisk">*</span>
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={6}
                      name="details"
                      value={formData.details}
                      onChange={handleInputChange}
                      className="form-textarea-custom"
                      placeholder="กรอกรายละเอียดที่ต้องการติดต่อ..."
                    />
                  </div>

                  <Button type="submit" className="submit-btn-custom w-100">
                    ส่งข้อความ
                  </Button>
                </Form>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

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
                <div
                  className={`detail-icon notification-${selectedNotification.type}`}
                >
                  {getNotificationIcon(selectedNotification.type)}
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
