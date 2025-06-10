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
  InputGroup,
} from "react-bootstrap";

const Testers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [selectedTester, setSelectedTester] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // Sample testers data
  const testers = [
    {
      id: 1,
      name: "สมชาย ใจดี",
      email: "somchai@company.com",
      phone: "081-234-5678",
      department: "Accessibility Testing",
      position: "Senior Tester",
      experience: "5 ปี",
      certifications: ["WCAG 2.1", "Section 508", "JAWS"],
      status: "active",
      avatar: "SC",
      totalTests: 45,
      successRate: 96,
      specialties: [
        "Screen Reader Testing",
        "WCAG Compliance",
        "Mobile Accessibility",
      ],
    },
    {
      id: 2,
      name: "สมหญิง รักงาน",
      email: "somying@company.com",
      phone: "082-345-6789",
      department: "Performance Testing",
      position: "Lead Tester",
      experience: "7 ปี",
      certifications: ["LoadRunner", "JMeter", "Performance Testing"],
      status: "active",
      avatar: "SY",
      totalTests: 62,
      successRate: 98,
      specialties: ["Load Testing", "Stress Testing", "API Performance"],
    },
    {
      id: 3,
      name: "วิชัย เก่งมาก",
      email: "wichai@company.com",
      phone: "083-456-7890",
      department: "Usability Testing",
      position: "UX Tester",
      experience: "3 ปี",
      certifications: ["UX Design", "Usability Testing", "User Research"],
      status: "busy",
      avatar: "WG",
      totalTests: 28,
      successRate: 94,
      specialties: [
        "User Interface Testing",
        "User Experience",
        "Prototype Testing",
      ],
    },
    {
      id: 4,
      name: "นุชนาฏ ใส่ใจ",
      email: "nuchnat@company.com",
      phone: "084-567-8901",
      department: "Security Testing",
      position: "Security Specialist",
      experience: "6 ปี",
      certifications: ["CISSP", "CEH", "Security+"],
      status: "active",
      avatar: "NS",
      totalTests: 38,
      successRate: 99,
      specialties: [
        "Penetration Testing",
        "Vulnerability Assessment",
        "Security Audit",
      ],
    },
    {
      id: 5,
      name: "ประยุทธ์ ทดสอบ",
      email: "prayuth@company.com",
      phone: "085-678-9012",
      department: "Automation Testing",
      position: "Automation Engineer",
      experience: "4 ปี",
      certifications: ["Selenium", "Cypress", "TestComplete"],
      status: "leave",
      avatar: "PT",
      totalTests: 52,
      successRate: 97,
      specialties: ["Test Automation", "CI/CD", "Framework Development"],
    },
  ];

  const departments = [
    "all",
    "Accessibility Testing",
    "Performance Testing",
    "Usability Testing",
    "Security Testing",
    "Automation Testing",
  ];

  const filteredTesters = testers.filter((tester) => {
    const matchesSearch =
      tester.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tester.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tester.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment =
      selectedDepartment === "all" || tester.department === selectedDepartment;
    return matchesSearch && matchesDepartment;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case "active":
        return <Badge bg="success">ว่าง</Badge>;
      case "busy":
        return <Badge bg="warning">ไม่ว่าง</Badge>;
      case "leave":
        return <Badge bg="secondary">ลา</Badge>;
      default:
        return <Badge bg="primary">ไม่ทราบ</Badge>;
    }
  };

  const getSuccessRateColor = (rate) => {
    if (rate >= 95) return "success";
    if (rate >= 90) return "warning";
    return "danger";
  };

  const handleTesterClick = (tester) => {
    setSelectedTester(tester);
    setShowModal(true);
  };

  return (
    <div className="testers-container">
      {/* Page Header */}
      <div className="testers-header">
        <h1 className="testers-title">ผู้ทดสอบ</h1>
        <p className="testers-subtitle">
          จัดการข้อมูลผู้ทดสอบ ความเชี่ยวชาญ และสถานะการทำงาน
        </p>
      </div>

      {/* Filter and Search */}
      <Row className="mb-4">
        <Col lg={8}>
          <Card className="filter-card">
            <Card.Body>
              <Row className="align-items-end">
                <Col md={6} className="mb-3">
                  <Form.Label>ค้นหาผู้ทดสอบ</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type="text"
                      placeholder="ค้นหาชื่อ, อีเมล, หรือแผนก..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="search-input-custom"
                    />
                    <Button variant="outline-primary">
                      <svg
                        width="16"
                        height="16"
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
                        />
                        <path
                          d="M21 21L16.65 16.65"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                      </svg>
                    </Button>
                  </InputGroup>
                </Col>
                <Col md={4} className="mb-3">
                  <Form.Label>แผนก</Form.Label>
                  <Form.Select
                    value={selectedDepartment}
                    onChange={(e) => setSelectedDepartment(e.target.value)}
                    className="form-select-custom"
                  >
                    <option value="all">ทุกแผนก</option>
                    {departments.slice(1).map((dept) => (
                      <option key={dept} value={dept}>
                        {dept}
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
                    เพิ่มผู้ทดสอบ
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={4}>
          <Card className="stats-summary-card">
            <Card.Body>
              <h6 className="card-title">สรุปข้อมูล</h6>
              <div className="stats-grid">
                <div className="stat-item">
                  <div className="stat-number">{testers.length}</div>
                  <div className="stat-label">ผู้ทดสอบทั้งหมด</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">
                    {testers.filter((t) => t.status === "active").length}
                  </div>
                  <div className="stat-label">ว่าง</div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Testers Table */}
      <Card className="testers-table-card">
        <Card.Header className="card-header-testers">
          <h5 className="card-title">รายชื่อผู้ทดสอบ</h5>
        </Card.Header>
        <Card.Body className="p-0">
          <Table responsive className="testers-table mb-0">
            <thead>
              <tr>
                <th>ผู้ทดสอบ</th>
                <th>แผนก</th>
                <th>ตำแหน่ง</th>
                <th>ประสบการณ์</th>
                <th>จำนวนการทดสอบ</th>
                <th>อัตราความสำเร็จ</th>
                <th>สถานะ</th>
                <th>การดำเนินการ</th>
              </tr>
            </thead>
            <tbody>
              {filteredTesters.map((tester) => (
                <tr key={tester.id} className="tester-row">
                  <td>
                    <div className="tester-info">
                      <div className="tester-avatar">{tester.avatar}</div>
                      <div className="tester-details">
                        <div className="tester-name">{tester.name}</div>
                        <div className="tester-email">{tester.email}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="department-badge">
                      {tester.department}
                    </span>
                  </td>
                  <td>{tester.position}</td>
                  <td>{tester.experience}</td>
                  <td>
                    <span className="test-count">{tester.totalTests}</span>
                  </td>
                  <td>
                    <Badge bg={getSuccessRateColor(tester.successRate)}>
                      {tester.successRate}%
                    </Badge>
                  </td>
                  <td>{getStatusBadge(tester.status)}</td>
                  <td>
                    <div className="action-buttons">
                      <Button
                        variant="outline-primary"
                        size="sm"
                        onClick={() => handleTesterClick(tester)}
                      >
                        ดูรายละเอียด
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* Tester Detail Modal */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>รายละเอียดผู้ทดสอบ</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedTester && (
            <div className="tester-detail">
              <Row>
                <Col md={4}>
                  <div className="tester-profile">
                    <div className="large-avatar">{selectedTester.avatar}</div>
                    <h5 className="profile-name">{selectedTester.name}</h5>
                    <p className="profile-position">
                      {selectedTester.position}
                    </p>
                    {getStatusBadge(selectedTester.status)}
                  </div>
                </Col>
                <Col md={8}>
                  <div className="tester-info-detail">
                    <h6>ข้อมูลติดต่อ</h6>
                    <p>
                      <strong>อีเมล:</strong> {selectedTester.email}
                    </p>
                    <p>
                      <strong>เบอร์โทร:</strong> {selectedTester.phone}
                    </p>
                    <p>
                      <strong>แผนก:</strong> {selectedTester.department}
                    </p>
                    <p>
                      <strong>ประสบการณ์:</strong> {selectedTester.experience}
                    </p>

                    <h6 className="mt-4">ความเชี่ยวชาญ</h6>
                    <div className="specialties">
                      {selectedTester.specialties.map((specialty, index) => (
                        <Badge key={index} bg="info" className="me-2 mb-2">
                          {specialty}
                        </Badge>
                      ))}
                    </div>

                    <h6 className="mt-4">ใบรับรอง</h6>
                    <div className="certifications">
                      {selectedTester.certifications.map((cert, index) => (
                        <Badge key={index} bg="success" className="me-2 mb-2">
                          {cert}
                        </Badge>
                      ))}
                    </div>

                    <h6 className="mt-4">สถิติการทำงาน</h6>
                    <Row>
                      <Col sm={6}>
                        <div className="stat-box">
                          <div className="stat-number">
                            {selectedTester.totalTests}
                          </div>
                          <div className="stat-label">การทดสอบทั้งหมด</div>
                        </div>
                      </Col>
                      <Col sm={6}>
                        <div className="stat-box">
                          <div className="stat-number">
                            {selectedTester.successRate}%
                          </div>
                          <div className="stat-label">อัตราความสำเร็จ</div>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </Col>
              </Row>
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

      {/* Add Tester Modal */}
      <Modal
        show={showAddModal}
        onHide={() => setShowAddModal(false)}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>เพิ่มผู้ทดสอบใหม่</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col md={6} className="mb-3">
                <Form.Label>ชื่อ-นามสกุล</Form.Label>
                <Form.Control type="text" placeholder="กรอกชื่อ-นามสกุล" />
              </Col>
              <Col md={6} className="mb-3">
                <Form.Label>อีเมล</Form.Label>
                <Form.Control type="email" placeholder="กรอกอีเมล" />
              </Col>
            </Row>
            <Row>
              <Col md={6} className="mb-3">
                <Form.Label>เบอร์โทรศัพท์</Form.Label>
                <Form.Control type="tel" placeholder="กรอกเบอร์โทรศัพท์" />
              </Col>
              <Col md={6} className="mb-3">
                <Form.Label>แผนก</Form.Label>
                <Form.Select>
                  <option>เลือกแผนก</option>
                  {departments.slice(1).map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </Form.Select>
              </Col>
            </Row>
            <Row>
              <Col md={6} className="mb-3">
                <Form.Label>ตำแหน่ง</Form.Label>
                <Form.Control type="text" placeholder="กรอกตำแหน่ง" />
              </Col>
              <Col md={6} className="mb-3">
                <Form.Label>ประสบการณ์ (ปี)</Form.Label>
                <Form.Control type="number" placeholder="0" />
              </Col>
            </Row>
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

export default Testers;
