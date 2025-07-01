import React, { useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Table,
  Badge,
  ProgressBar,
  Modal,
  Form,
} from "react-bootstrap";
import { classNames } from "../utils/classNames";
import Pagination from "./Pagination";

const TestResults = ({ projectData, onBack }) => {
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedTestCase, setSelectedTestCase] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const navigate = useNavigate();
  const location = useLocation();
  const { projectId } = useParams();

  // Get project data from navigation state or use default/props
  const currentProjectData = location.state?.projectData || projectData;

  // Mock detailed test cases for the selected project
  const detailedTestCases = [
    {
      id: 1,
      testId: "TC001",
      category: "Navigation",
      testName: "Keyboard Navigation Test",
      description: "ทดสอบการนำทางด้วยปุ่ม Tab และ Enter",
      status: "Pass",
      result: "pass",
      severity: "High",
      completedDate: "2024-01-15",
      tester: "นางสาว สมใจ ทดสอบ",
      duration: "45 นาที",
      notes: "การนำทางด้วยคีย์บอร์ดทำงานได้ปกติทุกส่วน",
      screenshots: ["nav-test-1.png", "nav-test-2.png"],
      wcagCriteria: "WCAG 2.1 AA - 2.1.1",
    },
    {
      id: 2,
      testId: "TC002",
      category: "Visual",
      testName: "Color Contrast Test",
      description: "ทดสอบอัตราส่วนความคมชัดของสี",
      status: "Fail",
      result: "fail",
      severity: "Medium",
      completedDate: "2024-01-14",
      tester: "นาย วิเคราะห์ สีสัน",
      duration: "30 นาที",
      notes: "พบปัญหาความคมชัดของสีในบางส่วน อัตราส่วน 3.2:1 ควรปรับเป็น 4.5:1",
      screenshots: ["color-test-1.png"],
      wcagCriteria: "WCAG 2.1 AA - 1.4.3",
    },
    {
      id: 3,
      testId: "TC003",
      category: "Screen Reader",
      testName: "NVDA Screen Reader Test",
      description: "ทดสอบการอ่านเนื้อหาด้วย NVDA",
      status: "Pass",
      result: "pass",
      severity: "High",
      completedDate: "2024-01-13",
      tester: "นาย อ่าน เสียง",
      duration: "60 นาที",
      notes: "Screen reader สามารถอ่านเนื้อหาได้ครบถ้วน มี alt text ครบ",
      screenshots: ["screen-reader-1.png"],
      wcagCriteria: "WCAG 2.1 AA - 1.1.1",
    },
    {
      id: 4,
      testId: "TC004",
      category: "Forms",
      testName: "Form Validation Test",
      description: "ทดสอบการแจ้งเตือนและการตรวจสอบฟอร์ม",
      status: "Fail",
      result: "fail",
      severity: "High",
      completedDate: "2024-01-12",
      tester: "นางสาว ตรวจ ฟอร์ม",
      duration: "40 นาที",
      notes: "ไม่มีการแจ้งเตือนผิดพลาดที่ชัดเจน ควรเพิ่ม error message",
      screenshots: ["form-test-1.png", "form-test-2.png"],
      wcagCriteria: "WCAG 2.1 AA - 3.3.2",
    },
    {
      id: 5,
      testId: "TC005",
      category: "Mobile",
      testName: "Touch Target Size Test",
      description: "ทดสอบขนาดของปุ่มและลิงก์สำหรับการสัมผัส",
      status: "Pass",
      result: "pass",
      severity: "Medium",
      completedDate: "2024-01-11",
      tester: "นาย สัมผัส หน้าจอ",
      duration: "35 นาที",
      notes: "ขนาดปุ่มและลิงก์เหมาะสมสำหรับการสัมผัส ไม่น้อยกว่า 44px",
      screenshots: ["touch-test-1.png"],
      wcagCriteria: "WCAG 2.1 AA - 2.5.5",
    },
    {
      id: 6,
      testId: "TC006",
      category: "Content",
      testName: "Heading Structure Test",
      description: "ทดสอบโครงสร้างของ heading และลำดับ",
      status: "Fail",
      result: "fail",
      severity: "Medium",
      completedDate: "2024-01-10",
      tester: "นางสาว หัวข้อ ชัดเจน",
      duration: "25 นาที",
      notes: "พบการข้าม heading level (จาก h2 ไป h4) ควรแก้ไขให้เป็นลำดับ",
      screenshots: ["heading-test-1.png"],
      wcagCriteria: "WCAG 2.1 AA - 1.3.1",
    },
    {
      id: 7,
      testId: "TC007",
      category: "Images",
      testName: "Image Alternative Text Test",
      description: "ทดสอบ alt text ของรูปภาพ",
      status: "Pass",
      result: "pass",
      severity: "High",
      completedDate: "2024-01-09",
      tester: "นาย อธิบาย รูปภาพ",
      duration: "50 นาที",
      notes: "รูปภาพทุกรูปมี alt text ที่เหมาะสมและสื่อความหมาย",
      screenshots: ["image-test-1.png"],
      wcagCriteria: "WCAG 2.1 AA - 1.1.1",
    },
    {
      id: 8,
      testId: "TC008",
      category: "Performance",
      testName: "Page Load Speed Test",
      description: "ทดสอบความเร็วในการโหลดหน้าเว็บ",
      status: "Pass",
      result: "pass",
      severity: "Low",
      completedDate: "2024-01-08",
      tester: "นาย เร็ว ใจ",
      duration: "20 นาที",
      notes: "หน้าเว็บโหลดได้ภายใน 3 วินาที ตามมาตรฐาน",
      screenshots: ["speed-test-1.png"],
      wcagCriteria: "Performance Best Practice",
    },
    {
      id: 9,
      testId: "TC009",
      category: "Responsive",
      testName: "Mobile Responsive Test",
      description: "ทดสอบการแสดงผลบนอุปกรณ์มือถือ",
      status: "Pass",
      result: "pass",
      severity: "Medium",
      completedDate: "2024-01-07",
      tester: "นาง รีสปอนซีฟ ดีไซน์",
      duration: "55 นาที",
      notes: "เว็บไซต์แสดงผลได้ดีบนหน้าจอขนาดต่างๆ",
      screenshots: ["responsive-test-1.png", "responsive-test-2.png"],
      wcagCriteria: "WCAG 2.1 AA - 1.4.10",
    },
    {
      id: 10,
      testId: "TC010",
      category: "Audio",
      testName: "Audio Content Test",
      description: "ทดสอบเนื้อหาเสียงและ subtitle",
      status: "Fail",
      result: "fail",
      severity: "High",
      completedDate: "2024-01-06",
      tester: "นาย เสียง ชัดเจน",
      duration: "40 นาที",
      notes: "ไม่มี subtitle สำหรับเนื้อหาเสียง ควรเพิ่มคำบรรยาย",
      screenshots: ["audio-test-1.png"],
      wcagCriteria: "WCAG 2.1 AA - 1.2.2",
    },
    {
      id: 11,
      testId: "TC011",
      category: "Links",
      testName: "Link Purpose Test",
      description: "ทดสอบความชัดเจนของจุดประสงค์ลิงก์",
      status: "Pass",
      result: "pass",
      severity: "Medium",
      completedDate: "2024-01-05",
      tester: "นางสาว ลิงก์ ชัดเจน",
      duration: "30 นาที",
      notes: "ลิงก์ทุกตัวมีคำอธิบายที่ชัดเจนและเข้าใจได้",
      screenshots: ["link-test-1.png"],
      wcagCriteria: "WCAG 2.1 AA - 2.4.4",
    },
    {
      id: 12,
      testId: "TC012",
      category: "Focus",
      testName: "Focus Management Test",
      description: "ทดสอบการจัดการ focus และ tab order",
      status: "Fail",
      result: "fail",
      severity: "Medium",
      completedDate: "2024-01-04",
      tester: "นาย โฟกัส จัดการ",
      duration: "35 นาที",
      notes: "พบปัญหา tab order ที่ไม่เป็นตามลำดับตรรกะ",
      screenshots: ["focus-test-1.png"],
      wcagCriteria: "WCAG 2.1 AA - 2.4.3",
    },
  ];

  const totalPages = Math.ceil(detailedTestCases.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTestCases = detailedTestCases.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const getStatusBadgeClass = (status) => {
    return status.toLowerCase() === "pass" ? "bg-success" : "bg-danger";
  };

  const getSeverityBadgeClass = (severity) => {
    switch (severity.toLowerCase()) {
      case "high":
        return "bg-danger";
      case "medium":
        return "bg-warning";
      case "low":
        return "bg-secondary";
      default:
        return "bg-secondary";
    }
  };

  const getResultIcon = (result) => {
    return result === "pass" ? (
      <svg
        width="20"
        height="20"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="8" cy="8" r="8" fill="#28a745" />
        <path
          d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"
          fill="white"
        />
      </svg>
    ) : (
      <svg
        width="20"
        height="20"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="8" cy="8" r="8" fill="#dc3545" />
        <path
          d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
          fill="white"
        />
      </svg>
    );
  };

  const handleViewDetails = (testCase) => {
    setSelectedTestCase(testCase);
    setShowDetailsModal(true);
  };

  const handleCloseModal = () => {
    setShowDetailsModal(false);
    setSelectedTestCase(null);
  };

  const passCount = detailedTestCases.filter(
    (tc) => tc.result === "pass",
  ).length;
  const failCount = detailedTestCases.filter(
    (tc) => tc.result === "fail",
  ).length;
  const completionRate = Math.round(
    (passCount / detailedTestCases.length) * 100,
  );

  return (
    <Container fluid className="test-results-container">
      <div className="test-results-content">
        {/* Header */}
        <div className="test-results-header">
          <div className="header-top">
            <Button
              variant="outline-primary"
              className="back-btn"
              onClick={() => (onBack ? onBack() : navigate("/reports"))}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19 12H5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 19L5 12L12 5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              กลับไปรายงาน
            </Button>
          </div>

          <div className="project-info">
            <h2 className="project-title">
              {currentProjectData?.title || "รายการผลการทดสอบ"}
            </h2>
            <p className="project-subtitle">
              {currentProjectData?.subtitle ||
                "รายละเอียดผลการทดสอบแต่ละรายการ"}
            </p>
          </div>

          {/* Summary Stats */}
          <Row className="summary-stats">
            <Col md={3}>
              <Card className="stat-card">
                <Card.Body>
                  <div className="stat-icon success">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M20 6L9 17L4 12"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div className="stat-info">
                    <h3 className="stat-number">{passCount}</h3>
                    <p className="stat-label">ผ่านการทดสอบ</p>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="stat-card">
                <Card.Body>
                  <div className="stat-icon danger">
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
                  </div>
                  <div className="stat-info">
                    <h3 className="stat-number">{failCount}</h3>
                    <p className="stat-label">ไม่ผ่านการทดสอบ</p>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="stat-card">
                <Card.Body>
                  <div className="stat-icon info">
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
                      />
                      <path
                        d="M8 14s1.5 2 4 2 4-2 4-2"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                      <line
                        x1="9"
                        y1="9"
                        x2="9.01"
                        y2="9"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                      <line
                        x1="15"
                        y1="9"
                        x2="15.01"
                        y2="9"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                  <div className="stat-info">
                    <h3 className="stat-number">{detailedTestCases.length}</h3>
                    <p className="stat-label">รายการทั้งหมด</p>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="stat-card">
                <Card.Body>
                  <div className="stat-icon warning">
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
                      />
                      <path
                        d="M12 8v4"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                      <path
                        d="M12 16h.01"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                  <div className="stat-info">
                    <h3 className="stat-number">{completionRate}%</h3>
                    <p className="stat-label">อัตราความสำเร็จ</p>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>

        {/* Test Cases Table */}
        <Card className="test-results-table-card">
          <Card.Header className="table-header">
            <h5 className="mb-0">รายละเอียดการทดสอบ</h5>
          </Card.Header>
          <Card.Body className="p-0">
            <div className="table-responsive">
              <Table className="test-results-table" hover>
                <thead>
                  <tr>
                    <th>รหัสทดสอบ</th>
                    <th>หมวดหมู่</th>
                    <th>ชื่อการทดสอบ</th>
                    <th className="text-center">ผลลัพธ์</th>
                    <th>ระดับความสำคัญ</th>
                    <th>วันที่ทดสอบ</th>
                    <th>ผู้ทดสอบ</th>
                    <th className="text-center">การดำเนินการ</th>
                  </tr>
                </thead>
                <tbody>
                  {currentTestCases.map((testCase) => (
                    <tr key={testCase.id}>
                      <td className="test-id-cell">
                        <span className="test-id">{testCase.testId}</span>
                      </td>
                      <td>
                        <Badge
                          bg="light"
                          text="dark"
                          className="category-badge"
                        >
                          {testCase.category}
                        </Badge>
                      </td>
                      <td className="test-name-cell">
                        <div className="test-name">{testCase.testName}</div>
                        <div className="test-description">
                          {testCase.description}
                        </div>
                      </td>
                      <td className="text-center">
                        {getResultIcon(testCase.result)}
                      </td>
                      <td>
                        <Badge
                          className={classNames(
                            "severity-badge",
                            getSeverityBadgeClass(testCase.severity),
                          )}
                        >
                          {testCase.severity}
                        </Badge>
                      </td>
                      <td className="date-cell">{testCase.completedDate}</td>
                      <td className="tester-cell">{testCase.tester}</td>
                      <td className="text-center">
                        <Button
                          size="sm"
                          variant="outline-primary"
                          onClick={() => handleViewDetails(testCase)}
                        >
                          ดูรายละเอียด
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Card.Body>

          <Card.Footer className="table-footer">
            <Row className="align-items-center">
              <Col>
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </Col>
              <Col xs="auto">
                <small className="text-muted">
                  แสดง {startIndex + 1}-
                  {Math.min(endIndex, detailedTestCases.length)} จาก{" "}
                  {detailedTestCases.length} รายการ
                </small>
              </Col>
            </Row>
          </Card.Footer>
        </Card>

        {/* Test Case Details Modal */}
        <Modal show={showDetailsModal} onHide={handleCloseModal} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>
              รายละเอียดการทดสอบ - {selectedTestCase?.testId}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedTestCase && (
              <div className="test-case-details">
                <Row>
                  <Col md={6}>
                    <div className="detail-section">
                      <h6 className="detail-title">ข้อมูลทั่วไป</h6>
                      <div className="detail-item">
                        <strong>ชื่อการทดสอบ:</strong>{" "}
                        {selectedTestCase.testName}
                      </div>
                      <div className="detail-item">
                        <strong>รายละเอียด:</strong>{" "}
                        {selectedTestCase.description}
                      </div>
                      <div className="detail-item">
                        <strong>หมวดหมู่:</strong> {selectedTestCase.category}
                      </div>
                      <div className="detail-item">
                        <strong>ระดับความสำคัญ:</strong>
                        <Badge
                          className={classNames(
                            "ms-2",
                            getSeverityBadgeClass(selectedTestCase.severity),
                          )}
                        >
                          {selectedTestCase.severity}
                        </Badge>
                      </div>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="detail-section">
                      <h6 className="detail-title">ผลการทดสอบ</h6>
                      <div className="detail-item">
                        <strong>สถานะ:</strong>
                        <Badge
                          className={classNames(
                            "ms-2",
                            getStatusBadgeClass(selectedTestCase.status),
                          )}
                        >
                          {selectedTestCase.status}
                        </Badge>
                      </div>
                      <div className="detail-item">
                        <strong>วันที่ทดสอบ:</strong>{" "}
                        {selectedTestCase.completedDate}
                      </div>
                      <div className="detail-item">
                        <strong>ผู้ทดสอบ:</strong> {selectedTestCase.tester}
                      </div>
                      <div className="detail-item">
                        <strong>ระยะเวลา:</strong> {selectedTestCase.duration}
                      </div>
                    </div>
                  </Col>
                </Row>

                <div className="detail-section">
                  <h6 className="detail-title">หมายเหตุ</h6>
                  <p className="notes-text">{selectedTestCase.notes}</p>
                </div>

                <div className="detail-section">
                  <h6 className="detail-title">มาตรฐาน WCAG</h6>
                  <Badge bg="info" className="wcag-badge">
                    {selectedTestCase.wcagCriteria}
                  </Badge>
                </div>

                {selectedTestCase.screenshots &&
                  selectedTestCase.screenshots.length > 0 && (
                    <div className="detail-section">
                      <h6 className="detail-title">ไฟล์แนบ</h6>
                      <div className="screenshot-list">
                        {selectedTestCase.screenshots.map(
                          (screenshot, index) => (
                            <Badge
                              key={index}
                              bg="light"
                              text="dark"
                              className="me-2 mb-2"
                            >
                              📷 {screenshot}
                            </Badge>
                          ),
                        )}
                      </div>
                    </div>
                  )}
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              ปิด
            </Button>
            <Button variant="primary">ดาวน์โหลดรายงาน</Button>
          </Modal.Footer>
        </Modal>
      </div>
    </Container>
  );
};

export default TestResults;
