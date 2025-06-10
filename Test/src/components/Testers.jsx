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
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedTestSteps, setSelectedTestSteps] = useState([]);

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

  // Sample test requests data for assignment
  const testRequests = [
    {
      id: "TR-2024-001",
      title: "การทดสอบ Mobile Banking Application",
      testSteps: [
        { id: 1, name: "ทดสอบการเข้าถึงด้วย Screen Reader", status: "pending" },
        { id: 2, name: "ทดสอบการนำทางด้วยคีย์บอร์ด", status: "pending" },
        { id: 3, name: "ทดสอบความคมชัดของสี", status: "pending" }
      ]
    },
    {
      id: "TR-2024-002",
      title: "การทดสอบ E-Government Portal",
      testSteps: [
        { id: 4, name: "ทดสอบการเข้าถึงตาม WCAG 2.1", status: "pending" },
        { id: 5, name: "ทดสอบการทำงานบนหลายเบราว์เซอร์", status: "pending" }
      ]
    }
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
                    <Button variant="outline-primary" className="search-btn">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
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
                        className="me-2"
                      >
                        ดูรายละเอียด
                      </Button>
                      <Button
                        variant="outline-success"
                        size="sm"
                        onClick={() => {
                          setSelectedTester(tester);
                          setShowAssignModal(true);
                        }}
                      >
                        มอบหมายงาน
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

      {/* Assign Test Steps Modal */}
      <Modal
        show={showAssignModal}
        onHide={() => setShowAssignModal(false)}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>มอบหมายงานทดสอบ</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedTester && (
            <div className="assign-test-steps">
              <div className="tester-info mb-4">
                <h6>ผู้ทดสอบ: {selectedTester.name}</h6>
                <p className="text-muted mb-0">แผนก: {selectedTester.department}</p>
              </div>

              <Form.Group className="mb-4">
                <Form.Label>เลือกโครงการ</Form.Label>
                <Form.Select
                  value={selectedProject}
                  onChange={(e) => setSelectedProject(e.target.value)}
                >
                  <option value="">เลือกโครงการ</option>
                  {testRequests.map((project) => (
                    <option key={project.id} value={project.id}>
                      {project.title}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              {selectedProject && (
                <div className="test-steps-list">
                  <h6 className="mb-3">ขั้นตอนการทดสอบ</h6>
                  {testRequests
                    .find((p) => p.id === selectedProject)
                    ?.testSteps.map((step) => (
                      <Form.Check
                        key={step.id}
                        type="checkbox"
                        id={`step-${step.id}`}
                        label={step.name}
                        checked={selectedTestSteps.includes(step.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedTestSteps([...selectedTestSteps, step.id]);
                          } else {
                            setSelectedTestSteps(
                              selectedTestSteps.filter((id) => id !== step.id)
                            );
                          }
                        }}
                        className="mb-2"
                      />
                    ))}
                </div>
              )}
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAssignModal(false)}>
            ยกเลิก
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              // Handle assignment logic here
              console.log("Assigning steps:", selectedTestSteps);
              setShowAssignModal(false);
            }}
            disabled={!selectedProject || selectedTestSteps.length === 0}
          >
            มอบหมายงาน
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Testers;
