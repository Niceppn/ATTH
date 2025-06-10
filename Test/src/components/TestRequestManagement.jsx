import React, { useState } from "react";
import {
  Card,
  Row,
  Col,
  Button,
  Form,
  Table,
  Badge,
  Modal,
  Alert,
  ProgressBar,
} from "react-bootstrap";

const TestRequestManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedPriority, setSelectedPriority] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [activeTab, setActiveTab] = useState("details");

  // Sample test requests data
  const testRequests = [
    {
      id: "TR-2024-001",
      title: "การทดสอบ Mobile Banking Application",
      client: "ธนาคารกรุงเทพ จำกัด (มหาชน)",
      requestDate: "2024-01-15",
      dueDate: "2024-02-15",
      status: "in-progress",
      priority: "high",
      testType: "Accessibility Testing",
      tester: "สมชาย ใจดี",
      progress: 65,
      description:
        "ทดสอบการเข้าถึงของแอปพลิเคชันธนาคารบนมือถือตามมาตรฐาน WCAG 2.1 AA",
      requirements: [
        "WCAG 2.1 AA Compliance",
        "Screen Reader Testing",
        "Keyboard Navigation",
        "Color Contrast",
      ],
      deliverables: [
        "Test Report",
        "Accessibility Audit",
        "Recommendation Document",
      ],
      estimatedHours: 80,
      actualHours: 52,
    },
    {
      id: "TR-2024-002",
      title: "การทดสอบ E-Government Portal",
      client: "กรมการปกครอง กระทรวงมหาดไทย",
      requestDate: "2024-01-12",
      dueDate: "2024-02-28",
      status: "pending",
      priority: "medium",
      testType: "WCAG Compliance",
      tester: "สมหญิง รักงาน",
      progress: 0,
      description: "ทดสอบเว็บไซต์ภาครัฐเพื่อให้สอดคล้องกับมาตรฐานการเข้าถึง",
      requirements: [
        "WCAG 2.1 AA",
        "Government Standards",
        "Multi-browser Testing",
      ],
      deliverables: ["Compliance Report", "Test Cases", "Bug Reports"],
      estimatedHours: 120,
      actualHours: 0,
    },
    {
      id: "TR-2024-003",
      title: "การทดสอบ E-Commerce Website",
      client: "บริษัท เทคโนโลยี จำกัด",
      requestDate: "2024-01-10",
      dueDate: "2024-01-25",
      status: "completed",
      priority: "high",
      testType: "Performance Testing",
      tester: "วิชัย เก่งมาก",
      progress: 100,
      description: "ทดสอบประสิทธิภาพและความเร็วของเว็บไซต์อีคอมเมิร์ซ",
      requirements: ["Load Testing", "Stress Testing", "Performance Metrics"],
      deliverables: ["Performance Report", "Optimization Recommendations"],
      estimatedHours: 60,
      actualHours: 58,
    },
    {
      id: "TR-2024-004",
      title: "การทดสอบ Healthcare Management System",
      client: "โรงพยาบาลราวิถี",
      requestDate: "2024-01-08",
      dueDate: "2024-03-08",
      status: "planning",
      priority: "high",
      testType: "Security Testing",
      tester: "นุชนาฏ ใส่ใจ",
      progress: 15,
      description: "ทดสอบความปลอดภัยของระบบจัดการโรงพยาบาล",
      requirements: ["Security Audit", "Penetration Testing", "Data Privacy"],
      deliverables: [
        "Security Report",
        "Vulnerability Assessment",
        "Security Guidelines",
      ],
      estimatedHours: 100,
      actualHours: 15,
    },
    {
      id: "TR-2024-005",
      title: "การทดสอบ Learning Management System",
      client: "มหาวิทยาลัยเทคโนโลยีพระจอมเกล้า",
      requestDate: "2024-01-05",
      dueDate: "2024-02-05",
      status: "on-hold",
      priority: "low",
      testType: "Usability Testing",
      tester: "ประยุทธ์ ทดสอบ",
      progress: 25,
      description: "ทดสอบความใช้งานง่ายของระบบการเรียนการสอนออนไลน์",
      requirements: [
        "User Experience Testing",
        "Interface Design Review",
        "User Journey Testing",
      ],
      deliverables: [
        "Usability Report",
        "UX Recommendations",
        "User Feedback Analysis",
      ],
      estimatedHours: 40,
      actualHours: 10,
    },
  ];

  const statusTypes = [
    { value: "all", label: "ทุกสถานะ" },
    { value: "pending", label: "รอดำเนินการ" },
    { value: "planning", label: "วางแผน" },
    { value: "in-progress", label: "กำลังดำเนินการ" },
    { value: "completed", label: "เสร็จสิ้น" },
    { value: "on-hold", label: "ระงับชั่วคราว" },
  ];

  const priorityTypes = [
    { value: "all", label: "ทุกระดับ" },
    { value: "high", label: "สูง" },
    { value: "medium", label: "ปานกลาง" },
    { value: "low", label: "ต่ำ" },
  ];

  const filteredRequests = testRequests.filter((request) => {
    const matchesSearch =
      request.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      selectedStatus === "all" || request.status === selectedStatus;
    const matchesPriority =
      selectedPriority === "all" || request.priority === selectedPriority;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case "pending":
        return <Badge bg="warning">รอดำเนินการ</Badge>;
      case "planning":
        return <Badge bg="info">วางแผน</Badge>;
      case "in-progress":
        return <Badge bg="primary">กำลังดำเนินการ</Badge>;
      case "completed":
        return <Badge bg="success">เสร็จสิ้น</Badge>;
      case "on-hold":
        return <Badge bg="secondary">ระงับชั่วคราว</Badge>;
      default:
        return <Badge bg="secondary">ไม่ทราบ</Badge>;
    }
  };

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case "high":
        return <Badge bg="danger">สูง</Badge>;
      case "medium":
        return <Badge bg="warning">ปานกลาง</Badge>;
      case "low":
        return <Badge bg="info">ต่ำ</Badge>;
      default:
        return <Badge bg="secondary">ไม่ทราบ</Badge>;
    }
  };

  const getProgressColor = (progress) => {
    if (progress >= 80) return "success";
    if (progress >= 50) return "primary";
    if (progress >= 30) return "warning";
    return "danger";
  };

  const getStatusText = (type) => {
    switch (type) {
      case "total":
        return "ทั้งหมด";
      case "completed":
        return "เสร็จสิ้น";
      case "in-progress":
        return "ดำเนินการ";
      case "pending":
        return "รอดำเนิน";
      default:
        return "ทั้งหมด";
    }
  };

  const handleRequestClick = (request) => {
    setSelectedRequest(request);
    setActiveTab("details");
    setShowModal(true);
  };

  const totalRequests = testRequests.length;
  const completedRequests = testRequests.filter(
    (r) => r.status === "completed",
  ).length;
  const inProgressRequests = testRequests.filter(
    (r) => r.status === "in-progress",
  ).length;
  const pendingRequests = testRequests.filter(
    (r) => r.status === "pending",
  ).length;

  return (
    <div className="test-request-container">
      {/* Page Header */}
      <div className="test-request-header">
        <h1 className="test-request-title">จัดการคำขอทดสอบ</h1>
        <p className="test-request-subtitle">
          จัดการคำขอทดสอบ การมอบหมายงาน และติดตามความคืบหน้าของโครงการทดสอบ
        </p>
      </div>

      {/* Statistics Cards */}
      <Row className="dashboard-stats">
        <Col lg={3} md={6} className="mb-4">
          <Card className="stat-card h-100">
            <Card.Body>
              <div className="stat-card-content">
                <div className="stat-icon stat-icon-primary">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15M9 5C9 6.10457 9.89543 7 11 7H13C14.1046 7 15 6.10457 15 5M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5M12 12H15M12 16H15M9 12H9.01M9 16H9.01"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="stat-info">
                  <div className="stat-value">{totalRequests}</div>
                  <div className="stat-label">คำขอทั้งหมด</div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={3} md={6} className="mb-4">
          <Card className="stat-card h-100">
            <Card.Body>
              <div className="stat-card-content">
                <div className="stat-icon stat-icon-success">
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
                </div>
                <div className="stat-info">
                  <div className="stat-value">{completedRequests}</div>
                  <div className="stat-label">เสร็จสิ้น</div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={3} md={6} className="mb-4">
          <Card className="stat-card h-100">
            <Card.Body>
              <div className="stat-card-content">
                <div className="stat-icon stat-icon-warning">
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
                </div>
                <div className="stat-info">
                  <div className="stat-value">{inProgressRequests}</div>
                  <div className="stat-label">กำลังดำเนินการ</div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={3} md={6} className="mb-4">
          <Card className="stat-card h-100">
            <Card.Body>
              <div className="stat-card-content">
                <div className="stat-icon stat-icon-info">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 16V12"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 8H12.01"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="stat-info">
                  <div className="stat-value">{pendingRequests}</div>
                  <div className="stat-label">รอดำเนินการ</div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Search and Filter */}
      <Row className="mb-4">
        <Col lg={9}>
          <Card className="filter-card">
            <Card.Body>
              <Row className="align-items-end">
                <Col md={4} className="mb-3">
                  <Form.Label>ค้นหาคำขอทดสอบ</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="ค้นหารหัส, ชื่อโครงการ, หรือลูกค้า..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input-custom"
                  />
                </Col>
                <Col md={3} className="mb-3">
                  <Form.Label>สถานะ</Form.Label>
                  <Form.Select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="form-select-custom"
                  >
                    {statusTypes.map((status) => (
                      <option key={status.value} value={status.value}>
                        {status.label}
                      </option>
                    ))}
                  </Form.Select>
                </Col>
                <Col md={3} className="mb-3">
                  <Form.Label>ความสำคัญ</Form.Label>
                  <Form.Select
                    value={selectedPriority}
                    onChange={(e) => setSelectedPriority(e.target.value)}
                    className="form-select-custom"
                  >
                    {priorityTypes.map((priority) => (
                      <option key={priority.value} value={priority.value}>
                        {priority.label}
                      </option>
                    ))}
                  </Form.Select>
                </Col>
                <Col md={2} className="mb-3">
                  <Button
                    variant="primary"
                    className="w-100"
                    onClick={() => setShowAddModal(true)}
                  >
                    เพิ่มคำขอ
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={3}>
          <Card className="quick-actions-card">
            <Card.Body>
              <h6>การดำเนินการด่วน</h6>
              <div className="quick-actions">
                <Button
                  variant="outline-primary"
                  size="sm"
                  className="w-100 mb-2"
                >
                  สร้างรายงาน
                </Button>
                <Button variant="outline-success" size="sm" className="w-100">
                  ส่งออกข้อมูล
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Test Requests Table */}
      <Card className="test-requests-table-card">
        <Card.Header className="card-header-test-requests">
          <h5 className="card-title">รายการคำขอทดสอบ</h5>
        </Card.Header>
        <Card.Body className="p-0">
          <Table responsive className="test-requests-table mb-0">
            <thead>
              <tr>
                <th>รหัสคำขอ</th>
                <th>โครงการ</th>
                <th>ลูกค้า</th>
                <th>ประเภทการทดสอบ</th>
                <th>ผู้ทดสอบ</th>
                <th>กำหนดส่ง</th>
                <th>สถานะ</th>
                <th>ความสำคัญ</th>
                <th>ความคืบหน้า</th>
                <th>การดำเนินการ</th>
              </tr>
            </thead>
            <tbody>
              {filteredRequests.map((request) => (
                <tr key={request.id} className="request-row">
                  <td>
                    <div className="request-id">
                      <strong>{request.id}</strong>
                      <div className="request-date">{request.requestDate}</div>
                    </div>
                  </td>
                  <td>
                    <div className="project-info">
                      <div className="project-title">{request.title}</div>
                      <div className="project-description">
                        {request.description.substring(0, 60)}...
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="client-name">{request.client}</div>
                  </td>
                  <td>
                    <Badge bg="info" className="test-type-badge">
                      {request.testType}
                    </Badge>
                  </td>
                  <td>
                    <div className="tester-name">{request.tester}</div>
                  </td>
                  <td>
                    <div className="due-date">{request.dueDate}</div>
                  </td>
                  <td>{getStatusBadge(request.status)}</td>
                  <td>{getPriorityBadge(request.priority)}</td>
                  <td>
                    <div className="progress-info">
                      <ProgressBar
                        now={request.progress}
                        variant={getProgressColor(request.progress)}
                        className="progress-bar-small"
                      />
                      <small className="progress-text">
                        {request.progress}%
                      </small>
                    </div>
                  </td>
                  <td>
                    <Button
                      variant="outline-primary"
                      size="sm"
                      onClick={() => handleRequestClick(request)}
                    >
                      ดูรายละเอียด
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* Test Request Detail Modal */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        size="xl"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>{selectedRequest && selectedRequest.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedRequest && (
            <div className="request-detail-container">
              {/* Topic Selection Buttons */}
              <div className="topic-selection-buttons">
                <Button
                  variant={
                    activeTab === "details" ? "primary" : "outline-primary"
                  }
                  onClick={() => setActiveTab("details")}
                  className="topic-btn"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.89 22 5.99 22H18C19.1 22 20 21.1 20 20V8L14 2ZM18 20H6V4H13V9H18V20Z"
                      fill="currentColor"
                    />
                  </svg>
                  รายละเอียด
                </Button>

                <Button
                  variant={
                    activeTab === "requirements" ? "primary" : "outline-primary"
                  }
                  onClick={() => setActiveTab("requirements")}
                  className="topic-btn"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9 16.2L4.8 12L3.4 13.4L9 19L21 7L19.6 5.6L9 16.2Z"
                      fill="currentColor"
                    />
                  </svg>
                  ข้อกำหนด
                </Button>

                <Button
                  variant={
                    activeTab === "progress" ? "primary" : "outline-primary"
                  }
                  onClick={() => setActiveTab("progress")}
                  className="topic-btn"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13 3C9.23 3 6 6.23 6 10H1L5.64 14.64L5.74 14.82L10.67 10H6C6 6.69 8.69 4 12 4S18 6.69 18 10S15.31 16 12 16H11V18H12C15.77 18 19 14.77 19 11S15.77 3 12 3H13ZM12 7V11L15.25 13.15L16.19 11.53L13.75 10V7H12Z"
                      fill="currentColor"
                    />
                  </svg>
                  ความคืบหน้า
                </Button>

                <Button
                  variant={
                    activeTab === "deliverables" ? "primary" : "outline-primary"
                  }
                  onClick={() => setActiveTab("deliverables")}
                  className="topic-btn"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14 2H6C4.9 2 4.01 2.9 4.01 4L4 20C4 21.1 4.89 22 5.99 22H18C19.1 22 20 21.1 20 20V8L14 2ZM18 20H6V4H13V9H18V20ZM9 13L11 15L15 11L16.41 12.41L11 17.83L7.59 14.42L9 13Z"
                      fill="currentColor"
                    />
                  </svg>
                  ผลส่งมอบ
                </Button>
              </div>

              {/* Content based on selected topic */}
              <div className="topic-content">
                {activeTab === "details" && (
                  <div className="tab-content">
                    <Row>
                      <Col md={6}>
                        <h6>ข้อมูลโครงการ</h6>
                        <div className="info-item">
                          <strong>รหัสคำขอ:</strong> {selectedRequest.id}
                        </div>
                        <div className="info-item">
                          <strong>ลูกค้า:</strong> {selectedRequest.client}
                        </div>
                        <div className="info-item">
                          <strong>ประเภทการทดสอบ:</strong>{" "}
                          {selectedRequest.testType}
                        </div>
                        <div className="info-item">
                          <strong>ผู้ทดสอบ:</strong> {selectedRequest.tester}
                        </div>
                      </Col>
                      <Col md={6}>
                        <h6>กำหนดเวลา</h6>
                        <div className="info-item">
                          <strong>วันที่ขอ:</strong>{" "}
                          {selectedRequest.requestDate}
                        </div>
                        <div className="info-item">
                          <strong>กำหนดส่ง:</strong> {selectedRequest.dueDate}
                        </div>
                        <div className="info-item">
                          <strong>สถานะ:</strong>{" "}
                          {getStatusBadge(selectedRequest.status)}
                        </div>
                        <div className="info-item">
                          <strong>ความสำคัญ:</strong>{" "}
                          {getPriorityBadge(selectedRequest.priority)}
                        </div>
                      </Col>
                    </Row>
                    <div className="info-item mt-3">
                      <strong>คำอธิบาย:</strong>
                      <p className="mt-2">{selectedRequest.description}</p>
                    </div>
                  </div>
                )}

                {activeTab === "requirements" && (
                  <div className="tab-content">
                    <h6>ข้อกำหนดการทดสอบ</h6>
                    <ul className="requirements-list">
                      {selectedRequest.requirements.map((req, index) => (
                        <li key={index} className="requirement-item">
                          <Badge bg="primary" className="me-2">
                            ✓
                          </Badge>
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {activeTab === "progress" && (
                  <div className="tab-content">
                    <h6>ความคืบหน้าการทำงาน</h6>
                    <div className="progress-section">
                      <div className="progress-header">
                        <span>ความคืบหน้าโดยรวม</span>
                        <span className="progress-percentage">
                          {selectedRequest.progress}%
                        </span>
                      </div>
                      <ProgressBar
                        now={selectedRequest.progress}
                        variant={getProgressColor(selectedRequest.progress)}
                        className="custom-progress mb-3"
                      />
                    </div>
                    <Row>
                      <Col md={6}>
                        <div className="time-info">
                          <strong>เวลาที่ประมาณการ:</strong>{" "}
                          {selectedRequest.estimatedHours} ชั่วโมง
                        </div>
                      </Col>
                      <Col md={6}>
                        <div className="time-info">
                          <strong>เวลาที่ใช้จริง:</strong>{" "}
                          {selectedRequest.actualHours} ชั่วโมง
                        </div>
                      </Col>
                    </Row>
                  </div>
                )}

                {activeTab === "deliverables" && (
                  <div className="tab-content">
                    <h6>ผลส่งมอบ</h6>
                    <ul className="deliverables-list">
                      {selectedRequest.deliverables.map(
                        (deliverable, index) => (
                          <li key={index} className="deliverable-item">
                            <Badge bg="success" className="me-2">
                              📄
                            </Badge>
                            {deliverable}
                          </li>
                        ),
                      )}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            ปิด
          </Button>
          <Button variant="primary">แก้ไขข้อมูล</Button>
        </Modal.Footer>
      </Modal>

      {/* Add Test Request Modal */}
      <Modal
        show={showAddModal}
        onHide={() => setShowAddModal(false)}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>เพิ่มคำขอทดสอบใหม่</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col md={8} className="mb-3">
                <Form.Label>ชื่อโครงการ</Form.Label>
                <Form.Control type="text" placeholder="กรอกชื่อโครงการ" />
              </Col>
              <Col md={4} className="mb-3">
                <Form.Label>ความสำคัญ</Form.Label>
                <Form.Select>
                  <option value="high">สูง</option>
                  <option value="medium">ปานกลาง</option>
                  <option value="low">ต่ำ</option>
                </Form.Select>
              </Col>
            </Row>
            <Row>
              <Col md={6} className="mb-3">
                <Form.Label>ลูกค้า</Form.Label>
                <Form.Control type="text" placeholder="กรอกชื่อลูกค้า" />
              </Col>
              <Col md={6} className="mb-3">
                <Form.Label>ประเภทการทดสอบ</Form.Label>
                <Form.Select>
                  <option>เลือกประเภท</option>
                  <option value="accessibility">Accessibility Testing</option>
                  <option value="performance">Performance Testing</option>
                  <option value="security">Security Testing</option>
                  <option value="usability">Usability Testing</option>
                </Form.Select>
              </Col>
            </Row>
            <Row>
              <Col md={6} className="mb-3">
                <Form.Label>วันที่กำหนดส่ง</Form.Label>
                <Form.Control type="date" />
              </Col>
              <Col md={6} className="mb-3">
                <Form.Label>ผู้ทดสอบ</Form.Label>
                <Form.Select>
                  <option>เลือกผู้ทดสอบ</option>
                  <option>สมชาย ใจดี</option>
                  <option>สมหญิง รักงาน</option>
                  <option>วิชัย เก่งมาก</option>
                  <option>นุชนาฏ ใส่ใจ</option>
                </Form.Select>
              </Col>
            </Row>
            <div className="mb-3">
              <Form.Label>คำอธิบายโครงการ</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="อธิบายรายละเอียดการทดสอบ..."
              />
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddModal(false)}>
            ยกเลิก
          </Button>
          <Button variant="primary">บันทึก</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TestRequestManagement;
