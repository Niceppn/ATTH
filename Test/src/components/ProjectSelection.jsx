import React from "react";
import { Container, Row, Col, Card, Badge, ProgressBar } from "react-bootstrap";

const ProjectSelection = ({ onProjectSelect }) => {
  const projects = [
    {
      id: 1,
      title: "เว็บไซต์ใช้สอบการกรุงเทพ",
      subtitle: "Website",
      type: "website",
      completionRate: 75,
      lastUpdate: "2025-06-15",
      status: "กำลังดำเนิน",
      wcagLevel: "WCAG 2.1 AA",
      description: "การทดสอบการเข้าถึงเว็บไซต์ตามมาตรฐาน WCAG 2.1",
      icon: "document",
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
    },
  ];

  const getIcon = (iconType) => {
    const icons = {
      document: (
        <svg
          width="48"
          height="48"
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
      mobile: (
        <svg
          width="48"
          height="48"
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
          width="48"
          height="48"
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

  const handleProjectClick = (project) => {
    if (onProjectSelect) {
      onProjectSelect(project);
    }
  };

  return (
    <Container fluid className="project-selection-container">
      <div className="project-selection-content">
        <div className="project-selection-header">
          <h2 className="project-selection-title">โครงการทั้งหมด</h2>
          <p className="project-selection-subtitle">
            เลือกโครงการเพื่อดูเอกสารและไฟล์ของโครงการนั้น
          </p>
        </div>

        <Row className="project-cards-grid">
          {projects.map((project) => (
            <Col key={project.id} xs={12} lg={4} className="mb-4">
              <Card
                className="project-selection-card h-100"
                onClick={() => handleProjectClick(project)}
                style={{ cursor: "pointer" }}
              >
                <Card.Body className="project-selection-card-body">
                  <div className="project-card-header">
                    <div className="project-icon">{getIcon(project.icon)}</div>
                    <div className="project-status-badge">
                      <Badge
                        bg={getStatusBadgeColor(project.status)}
                        className="status-badge"
                      >
                        {project.status}
                      </Badge>
                    </div>
                  </div>

                  <div className="project-card-content">
                    <h5 className="project-card-title">{project.title}</h5>
                    <p className="project-card-subtitle">{project.subtitle}</p>
                    <p className="project-card-description">
                      {project.description}
                    </p>

                    <div className="project-progress-section">
                      <div className="progress-header">
                        <span className="progress-label">ความคืบหน้า</span>
                        <span className="progress-percentage">
                          {project.completionRate}%
                        </span>
                      </div>
                      <ProgressBar
                        now={project.completionRate}
                        variant={getCompletionColor(project.completionRate)}
                        className="custom-progress-bar"
                      />
                    </div>

                    <div className="project-details">
                      <div className="detail-row">
                        <span className="detail-label">วันที่อัปเดต:</span>
                        <span className="detail-value">
                          {project.lastUpdate}
                        </span>
                      </div>
                      <div className="detail-row">
                        <span className="detail-label">มาตรฐาน:</span>
                        <Badge bg="info" className="wcag-badge">
                          {project.wcagLevel}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="project-card-action">
                    <div className="action-hint">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9 18L15 12L9 6"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span>คลิกเพื่อดูรายละเอียด</span>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        <div className="project-selection-footer">
          <div className="footer-info">
            <p className="footer-text">
              💡 <strong>คำแนะนำ:</strong>{" "}
              เลือกโครงการเพื่อดูเอกสารและไฟล์ของแต่ละโครงการ
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ProjectSelection;
