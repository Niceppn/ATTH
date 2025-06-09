import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Badge,
  ProgressBar,
  Button,
} from "react-bootstrap";

const Reports = ({ onNavigateToTestResults }) => {
  const [selectedReport, setSelectedReport] = useState(null);

  // Project data for reports (same as TestResults)
  const reportProjects = [
    {
      id: 1,
      title: "เว็บไซต์ใช้สอบการกรุง��ทพ",
      subtitle: "Website",
      type: "website",
      completionRate: 75,
      lastUpdate: "2025-06-15",
      status: "กำลังดำเนิน",
      wcagLevel: "WCAG 2.1 AA",
      description: "การทดสอบการเข้าถึงเว็บไซต์ตามมาตรฐาน WCAG 2.1",
      icon: "document",
      issuesFound: 23,
      duration: "14 วัน",
      riskLevel: "ปานกลาง",
      features: [
        "การทดสอบกับ Screen Reader",
        "การทดสอบการนำทางด้วยคีย์บอร์ด",
        "การทดสอบความคมชัดของสี",
        "การทดสอบ Responsive Design",
      ],
    },
    {
      id: 2,
      title: "แอป Mobile Banking",
      subtitle: "Mobile App",
      type: "mobile",
      completionRate: 100,
      lastUpdate: "2025-06-01",
      status: "เสร็จสิ้น",
      wcagLevel: "WCAG 2.1 AAA",
      description: "การทดสอบแอปพลิเคชันธนาคารบนมือถือ",
      icon: "mobile",
      issuesFound: 12,
      duration: "10 วัน",
      riskLevel: "ต่ำ",
      features: [
        "การทดสอบ Voice Over/TalkBack",
        "การทดสอบ Touch Gesture",
        "การทดสอบขนาดอักษรและปุ่ม",
        "การทดสอบการใช้งานด้วยมือเดียว",
      ],
    },
    {
      id: 3,
      title: "อาคารศูนย์การค้า",
      subtitle: "Physical Space",
      type: "location",
      completionRate: 0,
      lastUpdate: "2025-06-20",
      status: "รอดำเนิน",
      wcagLevel: "Universal Design",
      description: "การประเมินความเข้าถึงได้ของสถานที่",
      icon: "building",
      issuesFound: 31,
      duration: "21 วัน",
      riskLevel: "สูง",
      features: [
        "การทดสอบสิ่งอำนวยการเดิน",
        "การทดสอบลิฟต์และปุ่มไฟ",
        "การทดสอบห้องน้ำและห้องครัว",
        "การทดส��บป้ายบอกทางและการแสดงผล",
      ],
    },
  ];

  const getIcon = (iconType) => {
    const icons = {
      document: (
        <svg
          width="60"
          height="60"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <polyline
            points="14,2 14,8 20,8"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <line
            x1="16"
            y1="13"
            x2="8"
            y2="13"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <line
            x1="16"
            y1="17"
            x2="8"
            y2="17"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <polyline
            points="10,9 9,9 8,9"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      mobile: (
        <svg
          width="60"
          height="60"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="5"
            y="2"
            width="14"
            height="20"
            rx="2"
            ry="2"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <line
            x1="12"
            y1="18"
            x2="12.01"
            y2="18"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      building: (
        <svg
          width="60"
          height="60"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6 22V4C6 3.46957 6.21071 2.96086 6.58579 2.58579C6.96086 2.21071 7.46957 2 8 2H16C16.5304 2 17.0391 2.21071 17.4142 2.58579C17.7893 2.96086 18 3.46957 18 4V22H6Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <line
            x1="10"
            y1="6"
            x2="10"
            y2="6.01"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <line
            x1="14"
            y1="6"
            x2="14"
            y2="6.01"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <line
            x1="10"
            y1="10"
            x2="10"
            y2="10.01"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <line
            x1="14"
            y1="10"
            x2="14"
            y2="10.01"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <line
            x1="10"
            y1="14"
            x2="10"
            y2="14.01"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <line
            x1="14"
            y1="14"
            x2="14"
            y2="14.01"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <line
            x1="10"
            y1="18"
            x2="14"
            y2="18"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    };
    return icons[iconType] || icons.document;
  };

  const getCompletionColor = (rate) => {
    if (rate >= 90) return "success";
    if (rate >= 70) return "warning";
    if (rate > 0) return "info";
    return "secondary";
  };

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case "เสร็จสิ้น":
        return "success";
      case "กำลังดำเนิน":
        return "warning";
      case "รอดำเนิน":
        return "secondary";
      default:
        return "secondary";
    }
  };

  const getRiskColor = (level) => {
    switch (level) {
      case "ต่ำ":
        return "success";
      case "ปานกลาง":
        return "warning";
      case "สูง":
        return "danger";
      default:
        return "secondary";
    }
  };

  const handleViewDetails = (report) => {
    console.log("Viewing details for:", report.title);
    setSelectedReport(report);
    // Call parent navigation function to show TestResults page
    if (onNavigateToTestResults) {
      onNavigateToTestResults(report);
    }
  };

  const handleDownloadReport = (report) => {
    console.log("Downloading report:", report.title);
    // Implement download functionality
  };

  return (
    <Container fluid className="reports-container">
      <div className="reports-content">
        <div className="reports-header">
          <h2 className="reports-title">รายงานการทดสอบ</h2>
          <p className="reports-subtitle">
            เลือกโครงการเพื่อดูรายงานผลการทดสอบที่ค���บถ้วนและละเอียด
          </p>
        </div>

        <Row className="reports-grid">
          {reportProjects.map((report) => (
            <Col key={report.id} xs={12} lg={4} className="mb-4">
              <Card className="report-card h-100">
                <Card.Body className="report-card-body">
                  <div className="report-card-header">
                    <div className="report-icon">{getIcon(report.icon)}</div>
                    <div className="report-status-badge">
                      <Badge
                        bg={getStatusBadgeColor(report.status)}
                        className="status-badge"
                      >
                        {report.status}
                      </Badge>
                    </div>
                  </div>

                  <div className="report-title-section">
                    <h5 className="report-card-title">{report.title}</h5>
                    <p className="report-card-subtitle">{report.subtitle}</p>
                    <p className="report-card-description">
                      {report.description}
                    </p>
                  </div>

                  <div className="report-stats">
                    <h6 className="stats-title">ตัวอย่างผลการทดสอบ:</h6>

                    <div className="stat-row">
                      <div className="stat-item">
                        <span className="stat-label">คะแนน:</span>
                        <span
                          className={`stat-value completion-${getCompletionColor(report.completionRate)}`}
                        >
                          {report.completionRate}%
                        </span>
                      </div>
                      <div className="stat-item">
                        <span className="stat-label">ปัญหาที่พบ:</span>
                        <span className="stat-value issues">
                          {report.issuesFound} จุด
                        </span>
                      </div>
                    </div>

                    <div className="stat-row">
                      <div className="stat-item">
                        <span className="stat-label">ระดับความรุนแรง:</span>
                        <span className="stat-value">
                          <Badge
                            bg={getRiskColor(report.riskLevel)}
                            className="risk-badge"
                          >
                            {report.riskLevel}
                          </Badge>
                        </span>
                      </div>
                      <div className="stat-item">
                        <span className="stat-label">ระยะเวลา:</span>
                        <span className="stat-value duration">
                          {report.duration}
                        </span>
                      </div>
                    </div>

                    <div className="completion-bar">
                      <div className="progress-header">
                        <span className="progress-label">ความคืบหน้า</span>
                        <span className="progress-percentage">
                          {report.completionRate}%
                        </span>
                      </div>
                      <ProgressBar
                        now={report.completionRate}
                        variant={getCompletionColor(report.completionRate)}
                        className="custom-progress"
                      />
                    </div>

                    <div className="detail-row">
                      <span className="detail-label">วันที่อัปเดต:</span>
                      <span className="detail-value">{report.lastUpdate}</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">มาตรฐาน:</span>
                      <Badge bg="info" className="wcag-badge">
                        {report.wcagLevel}
                      </Badge>
                    </div>
                  </div>

                  <div className="report-features">
                    <h6 className="features-title">สิ่งที่ทดสอบ:</h6>
                    <ul className="features-list">
                      {report.features.slice(0, 3).map((feature, index) => (
                        <li key={index} className="feature-item">
                          <svg
                            width="16"
                            height="16"
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
                          {feature}
                        </li>
                      ))}
                      {report.features.length > 3 && (
                        <li className="feature-more">
                          และอีก {report.features.length - 3} รายการ...
                        </li>
                      )}
                    </ul>
                  </div>

                  <div className="report-actions">
                    <Button
                      variant="outline-primary"
                      className="action-btn view-btn"
                      onClick={() => handleViewDetails(report)}
                    >
                      ดูรายละเอียด
                    </Button>
                    <Button
                      variant="primary"
                      className="action-btn download-btn"
                      onClick={() => handleDownloadReport(report)}
                    >
                      ดาวน์โหลดตัวอย่าง
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        <div className="reports-footer">
          <div className="footer-info">
            <p className="footer-text">
              💡 <strong>คำแนะนำ:</strong>{" "}
              เลือกโครงการเพื่อดูรายงานผลการทดสอบที่ครบถ้วนและรายละเอียดของแต่ละการทดสอบ
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Reports;
