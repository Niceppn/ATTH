import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  ProgressBar,
  Badge,
  Form,
  Spinner,
} from "react-bootstrap";
import { classNames } from "../utils/classNames";

const PdfDownload = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { projectId } = useParams();
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [selectedSections, setSelectedSections] = useState({
    summary: true,
    testResults: true,
    detailedResults: true,
    screenshots: true,
    recommendations: true,
  });

  // Get project data from navigation state
  const projectData = location.state?.projectData;

  useEffect(() => {
    if (!projectData && !projectId) {
      navigate("/reports");
    }
  }, [projectData, projectId, navigate]);

  const handleGeneratePdf = async () => {
    setIsGenerating(true);
    setProgress(0);

    // Simulate PDF generation progress
    const intervals = [
      { progress: 20, message: "กำลังเตรียมข้อมูล..." },
      { progress: 40, message: "กำลังสร้างรายงาน..." },
      { progress: 60, message: "กำลังแนบภาพหน้าจอ..." },
      { progress: 80, message: "กำลังจัดรูปแบบ..." },
      { progress: 100, message: "เสร็จสิ้น!" },
    ];

    for (const interval of intervals) {
      await new Promise((resolve) => setTimeout(resolve, 800));
      setProgress(interval.progress);
    }

    // Simulate file download
    setTimeout(() => {
      const link = document.createElement("a");
      link.href = "#";
      link.download = `รายงานการทดสอบ_${projectData?.title || "โปรเจค"}_${new Date().toISOString().split("T")[0]}.pdf`;
      link.click();
      setIsGenerating(false);
      setProgress(0);
    }, 500);
  };

  const handleSectionChange = (section) => {
    setSelectedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const availableSections = [
    { key: "summary", label: "สรุปผลการทดสอบ", icon: "chart" },
    { key: "testResults", label: "ผลการทดสอบแต่ละรายการ", icon: "list" },
    { key: "detailedResults", label: "รายละเอียดข้อผิดพลาด", icon: "detail" },
    { key: "screenshots", label: "ภาพหน้าจอประกอบ", icon: "image" },
    { key: "recommendations", label: "ข้อเสนอแนะการแก้ไข", icon: "bulb" },
  ];

  const getIcon = (iconType) => {
    const icons = {
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
      list: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line
            x1="8"
            y1="6"
            x2="21"
            y2="6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <line
            x1="8"
            y1="12"
            x2="21"
            y2="12"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <line
            x1="8"
            y1="18"
            x2="21"
            y2="18"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <line
            x1="3"
            y1="6"
            x2="3.01"
            y2="6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <line
            x1="3"
            y1="12"
            x2="3.01"
            y2="12"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <line
            x1="3"
            y1="18"
            x2="3.01"
            y2="18"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      detail: (
        <svg
          width="20"
          height="20"
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
        </svg>
      ),
      image: (
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
            width="18"
            height="18"
            rx="2"
            ry="2"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle
            cx="8.5"
            cy="8.5"
            r="1.5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <polyline
            points="21,15 16,10 5,21"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      bulb: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9 21H15M12 3C8.68629 3 6 5.68629 6 9C6 11.973 7.84 14.44 10.5 15.4V17C10.5 17.8284 11.1716 18.5 12 18.5C12.8284 18.5 13.5 17.8284 13.5 17V15.4C16.16 14.44 18 11.973 18 9C18 5.68629 15.3137 3 12 3Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    };
    return icons[iconType] || icons.list;
  };

  const selectedCount = Object.values(selectedSections).filter(Boolean).length;

  return (
    <Container fluid className="pdf-download-container">
      <div className="pdf-download-content">
        {/* Header */}
        <div className="pdf-download-header">
          <div className="header-top">
            <Button
              variant="outline-primary"
              className="back-btn"
              onClick={() => navigate("/reports")}
            >
              <svg
                width="16"
                height="16"
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
            <h2 className="project-title">ดาวน์โหลดรายงาน PDF</h2>
            <p className="project-subtitle">
              {projectData?.title || "โปรเจคที่เลือก"} -
              เลือกส่วนที่ต้องการในรายงาน
            </p>
          </div>
        </div>

        <Row className="pdf-content">
          <Col lg={8}>
            {/* Project Summary Card */}
            <Card className="project-summary-card mb-4">
              <Card.Body>
                <div className="project-summary">
                  <div className="project-icon">
                    {projectData?.icon ? (
                      getIcon(projectData.icon)
                    ) : (
                      <svg
                        width="24"
                        height="24"
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
                      </svg>
                    )}
                  </div>
                  <div className="project-details">
                    <h4 className="project-name">
                      {projectData?.title || "โปรเจคที่เลือก"}
                    </h4>
                    <p className="project-type">
                      {projectData?.subtitle || "การทดสอบการเข้าถึง"}
                    </p>
                    <div className="project-stats">
                      <Badge bg="primary" className="stat-badge">
                        {projectData?.wcagLevel || "WCAG 2.1 AA"}
                      </Badge>
                      <Badge
                        bg={
                          projectData?.completionRate === 100
                            ? "success"
                            : "warning"
                        }
                        className="stat-badge"
                      >
                        {projectData?.completionRate || 75}% เสร็จสิ้น
                      </Badge>
                      <Badge bg="info" className="stat-badge">
                        {projectData?.issuesFound || 23} ปัญหา
                      </Badge>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>

            {/* Section Selection */}
            <Card className="section-selection-card">
              <Card.Header className="selection-header">
                <h5 className="mb-0">เลือกส่วนที่ต้องการในรายงาน</h5>
                <Badge bg="secondary" className="section-count">
                  เลือกแล้ว {selectedCount} จาก {availableSections.length} ส่วน
                </Badge>
              </Card.Header>
              <Card.Body>
                <div className="sections-grid">
                  {availableSections.map((section) => (
                    <div key={section.key} className="section-item">
                      <Form.Check
                        type="checkbox"
                        id={`section-${section.key}`}
                        className="section-checkbox"
                        checked={selectedSections[section.key]}
                        onChange={() => handleSectionChange(section.key)}
                      />
                      <label
                        htmlFor={`section-${section.key}`}
                        className="section-label"
                      >
                        <div className="section-icon">
                          {getIcon(section.icon)}
                        </div>
                        <span className="section-text">{section.label}</span>
                      </label>
                    </div>
                  ))}
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={4}>
            {/* Download Panel */}
            <Card className="download-panel">
              <Card.Header className="download-header">
                <h5 className="mb-0">ข้อมูลการดาวน์โหลด</h5>
              </Card.Header>
              <Card.Body>
                <div className="download-info">
                  <div className="info-item">
                    <span className="info-label">ชื่อไฟล์:</span>
                    <span className="info-value">
                      รายงานการทดสอบ_
                      {projectData?.title?.replace(/\s+/g, "_") || "โปรเจค"}_
                      {new Date().toISOString().split("T")[0]}.pdf
                    </span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">ขนาดประมาณ:</span>
                    <span className="info-value">
                      {selectedCount <= 2
                        ? "2-4"
                        : selectedCount <= 4
                          ? "4-8"
                          : "8-15"}{" "}
                      MB
                    </span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">รูปแบบ:</span>
                    <span className="info-value">PDF</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">ภาษา:</span>
                    <span className="info-value">ไทย</span>
                  </div>
                </div>

                {isGenerating && (
                  <div className="generation-progress">
                    <div className="progress-info">
                      <span className="progress-label">กำลังสร้างรายงาน</span>
                      <span className="progress-percentage">{progress}%</span>
                    </div>
                    <ProgressBar
                      now={progress}
                      variant="primary"
                      className="custom-progress"
                      animated
                    />
                  </div>
                )}

                <div className="download-actions">
                  <Button
                    variant="primary"
                    size="lg"
                    className="download-btn"
                    onClick={handleGeneratePdf}
                    disabled={selectedCount === 0 || isGenerating}
                  >
                    {isGenerating ? (
                      <>
                        <Spinner
                          animation="border"
                          size="sm"
                          className="me-2"
                        />
                        กำลังสร้าง...
                      </>
                    ) : (
                      <>
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <polyline
                            points="7,10 12,15 17,10"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <line
                            x1="12"
                            y1="15"
                            x2="12"
                            y2="3"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        ดาวน์โหลด PDF
                      </>
                    )}
                  </Button>

                  {selectedCount === 0 && (
                    <small className="text-muted mt-2 d-block">
                      กรุณาเลือกอย่างน้อย 1 ส่วนเพื่อดาวน์โหลด
                    </small>
                  )}
                </div>
              </Card.Body>
            </Card>

            {/* Preview Info */}
            <Card className="preview-info mt-4">
              <Card.Body className="text-center">
                <div className="preview-icon">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 12S5 4 12 4S23 12 23 12S19 20 12 20S1 12 1 12Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <circle
                      cx="12"
                      cy="12"
                      r="3"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <h6 className="preview-title">ตัวอย่างรายงาน</h6>
                <p className="preview-text">
                  รายงานจะรวมข้อมูลการทดสอบทั้งหมดในรูปแบบ PDF คุณภาพสูง
                  พร้อมกราฟและตารางที่อ่านง่าย
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default PdfDownload;
