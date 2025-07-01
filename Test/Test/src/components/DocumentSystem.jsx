import React, { useState } from "react";
import {
  Card,
  Row,
  Col,
  Button,
  Table,
  Badge,
  Form,
  InputGroup,
  ButtonGroup,
  Dropdown,
} from "react-bootstrap";

const DocumentSystem = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("list"); // 'list' or 'details'

  // Sample documents data
  const documents = [
    {
      id: 1,
      name: "รายงานการทดสอบ Mobile Banking",
      type: "PDF",
      size: "2.5 MB",
      uploadDate: "2024-01-15",
      category: "reports",
      project: "Mobile Banking App",
      uploader: "สมชาย ใจดี",
      thumbnail: "📄",
      downloads: 15,
      status: "approved",
    },
    {
      id: 2,
      name: "ภาพหน้าจอการทดสอบ",
      type: "PNG",
      size: "1.2 MB",
      uploadDate: "2024-01-14",
      category: "screenshots",
      project: "E-Commerce Platform",
      uploader: "สมหญิง รักงาน",
      thumbnail: "🖼️",
      downloads: 8,
      status: "pending",
    },
    {
      id: 3,
      name: "วิดีโอการทดสอบ Screen Reader",
      type: "MP4",
      size: "15.3 MB",
      uploadDate: "2024-01-13",
      category: "videos",
      project: "Government Portal",
      uploader: "วิชัย เก่งมาก",
      thumbnail: "🎥",
      downloads: 22,
      status: "approved",
    },
    {
      id: 4,
      name: "แบบฟอร์มการทดสอบ WCAG",
      type: "DOCX",
      size: "850 KB",
      uploadDate: "2024-01-12",
      category: "forms",
      project: "Healthcare System",
      uploader: "นุชนาฏ ใส่ใจ",
      thumbnail: "📝",
      downloads: 31,
      status: "approved",
    },
    {
      id: 5,
      name: "ข้อมูลการทดสอบภาคสนาม",
      type: "XLSX",
      size: "3.8 MB",
      uploadDate: "2024-01-11",
      category: "data",
      project: "Field Testing Data",
      uploader: "ประยุทธ์ ทดสอบ",
      thumbnail: "📊",
      downloads: 12,
      status: "approved",
    },
    {
      id: 6,
      name: "การบันทึกเสียงการทดสอบ",
      type: "MP3",
      size: "5.2 MB",
      uploadDate: "2024-01-10",
      category: "audio",
      project: "Voice Interface Testing",
      uploader: "สมชาย ใจดี",
      thumbnail: "🎵",
      downloads: 7,
      status: "approved",
    },
  ];

  // Function to extract unique projects and their document counts
  const getProjectData = () => {
    const projectMap = new Map();
    documents.forEach((doc) => {
      if (projectMap.has(doc.project)) {
        projectMap.set(doc.project, projectMap.get(doc.project) + 1);
      } else {
        projectMap.set(doc.project, 1);
      }
    });
    return Array.from(projectMap).map(([name, count]) => ({
      name,
      documentCount: count,
    }));
  };

  const projects = getProjectData();

  // Function to get documents for selected project
  const getProjectDocuments = () => {
    return documents.filter(doc => doc.project === selectedProject);
  };

  // Function to get status badge
  const getStatusBadge = (status) => {
    switch (status) {
      case "approved":
        return <Badge bg="success">อนุมัติแล้ว</Badge>;
      case "pending":
        return <Badge bg="warning">รออนุมัติ</Badge>;
      case "rejected":
        return <Badge bg="danger">ปฏิเสธ</Badge>;
      default:
        return <Badge bg="secondary">ไม่ทราบ</Badge>;
    }
  };

  // Function to get file type icon
  const getFileTypeIcon = (type) => {
    switch (type.toLowerCase()) {
      case "pdf":
        return "📄";
      case "png":
      case "jpg":
      case "jpeg":
      case "gif":
        return "🖼️";
      case "mp4":
      case "avi":
      case "mov":
        return "🎥";
      case "mp3":
      case "wav":
      case "m4a":
        return "🎵";
      case "docx":
      case "doc":
        return "📝";
      case "xlsx":
      case "xls":
        return "📊";
      case "pptx":
      case "ppt":
        return "📽️";
      default:
        return "��";
    }
  };

  // Action Handlers
  const handleDownload = (docId) => {
    console.log(`Downloading document with ID: ${docId}`);
    // Implement actual download logic here
  };

  const handleEditDocument = (docId) => {
    console.log(`Editing document with ID: ${docId}`);
    // Implement actual edit logic here (e.g., open a modal for editing)
  };

  const handleDeleteDocument = (docId) => {
    console.log(`Deleting document with ID: ${docId}`);
    // Implement actual delete logic here (e.g., show a confirmation modal)
  };

  // Filter projects based on search term
  const filteredProjects = projects.filter(project =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filter documents based on search term
  const filteredDocuments = getProjectDocuments().filter(doc =>
    doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.uploader.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="document-system-container">
      {/* Page Header */}
      <div className="document-header">
        <h1 className="document-title">ระบบจัดเก็บเอกสาร/ฟอร์ม</h1>
        <p className="document-subtitle">
          จัดการไฟล์ PDF รูปภาพ วิดีโอ และข้อมูลการทดสอบภาคสนาม
        </p>
      </div>

      {/* Search Bar */}
      <div className="mb-4">
        <InputGroup>
          <Form.Control
            type="text"
            placeholder={selectedProject ? "ค้นหาเอกสาร..." : "ค้นหาโครงการ..."}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input-custom"
          />
          <Button variant="outline-primary" className="search-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
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
      </div>

      {selectedProject ? (
        // Project Documents View
        <div className="project-documents-view">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="project-title">{selectedProject}</h2>
            <div className="d-flex align-items-center gap-3">
              <ButtonGroup>
                <Button
                  variant={viewMode === "list" ? "primary" : "outline-primary"}
                  onClick={() => setViewMode("list")}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="me-2">
                    <path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  รายการ
                </Button>
                <Button
                  variant={viewMode === "details" ? "primary" : "outline-primary"}
                  onClick={() => setViewMode("details")}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="me-2">
                    <path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  รายละเอียด
                </Button>
              </ButtonGroup>
              <Button 
                variant="outline-primary" 
                onClick={() => {
                  setSelectedProject(null);
                  setSearchTerm("");
                }}
                className="back-button"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="me-2">
                  <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                กลับไปเลือกโครงการ
              </Button>
            </div>
          </div>

          <Card>
            <Card.Body className="p-0">
              {viewMode === "list" ? (
                <Table hover responsive className="documents-table mb-0">
                  <thead>
                    <tr>
                      <th style={{ width: '5%', minWidth: '50px' }}>#</th>
                      <th style={{ width: '25%', minWidth: '200px' }}>ชื่อเอกสาร</th>
                      <th style={{ width: '15%', minWidth: '100px' }}>ประเภท</th>
                      <th style={{ width: '15%', minWidth: '120px' }}>โครงการ</th>
                      <th style={{ width: '10%', minWidth: '80px' }}>ขนาด</th>
                      <th style={{ width: '10%', minWidth: '120px' }}>อัปโหลดเมื่อ</th>
                      <th style={{ width: '10%', minWidth: '100px' }}>ผู้รับผิดชอบ</th>
                      <th style={{ width: '10%', minWidth: '120px' }}>การดำเนินการ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredDocuments.map((doc, index) => (
                      <tr key={doc.id}>
                        <td data-label="#" style={{ width: '5%', minWidth: '50px' }}>{index + 1}</td>
                        <td data-label="ชื่อเอกสาร" style={{ width: '25%', minWidth: '200px' }}>
                          <div className="document-name-list">
                            {getFileTypeIcon(doc.type)}{' '}
                            <span>{doc.name}</span>
                          </div>
                        </td>
                        <td data-label="ประเภท" style={{ width: '15%', minWidth: '100px' }}>
                          <Badge bg="secondary" className="file-type-badge-list">{doc.type}</Badge>
                        </td>
                        <td data-label="โครงการ" style={{ width: '15%', minWidth: '120px' }}>{doc.project}</td>
                        <td data-label="ขนาด" style={{ width: '10%', minWidth: '80px' }}>{doc.size}</td>
                        <td data-label="อัปโหลดเมื่อ" style={{ width: '10%', minWidth: '120px' }}>{doc.uploadDate}</td>
                        <td data-label="ผู้รับผิดชอบ" style={{ width: '10%', minWidth: '100px' }}>{doc.uploader}</td>
                        <td data-label="การดำเนินการ" style={{ width: '10%', minWidth: '120px' }}>
                          <Dropdown align="end">
                            <Dropdown.Toggle variant="link" id={`dropdown-document-actions-${doc.id}`} className="text-decoration-none p-0">
                              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-more-vertical"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                              <Dropdown.Item onClick={() => handleDownload(doc.id)}>ดาวน์โหลด</Dropdown.Item>
                              <Dropdown.Item onClick={() => handleEditDocument(doc.id)}>แก้ไข</Dropdown.Item>
                              <Dropdown.Item onClick={() => handleDeleteDocument(doc.id)}>ลบ</Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : (
                <div className="documents-grid">
                  {filteredDocuments.map((doc) => (
                    <Card key={doc.id} className="document-card">
                      <Card.Body>
                        <div className="document-thumbnail mb-3">
                          <div className="file-icon">{getFileTypeIcon(doc.type)}</div>
                          <div className="file-type-badge">{doc.type}</div>
                        </div>
                        <h6 className="document-name" title={doc.name}>
                          {doc.name}
                        </h6>
                        <div className="document-meta">
                          <div className="document-size">{doc.size}</div>
                          <div className="document-date">{doc.uploadDate}</div>
                        </div>
                        <div className="document-uploader">{doc.uploader}</div>
                        <div className="document-footer">
                          <div className="document-downloads">
                            ดาวน์โหลด: {doc.downloads}
                          </div>
                          {getStatusBadge(doc.status)}
                          <Dropdown align="end">
                            <Dropdown.Toggle variant="outline-secondary" size="sm">
                              ⋮
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <Dropdown.Item onClick={() => handleDownload(doc.id)}>ดาวน์โหลด</Dropdown.Item>
                              <Dropdown.Item onClick={() => handleEditDocument(doc.id)}>แก้ไข</Dropdown.Item>
                              <Dropdown.Divider />
                              <Dropdown.Item onClick={() => handleDeleteDocument(doc.id)} className="text-danger">ลบ</Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </div>
                      </Card.Body>
                    </Card>
                  ))}
                </div>
              )}
            </Card.Body>
          </Card>
        </div>
      ) : (
        // Project Selection View
        <Row className="project-cards-grid">
          {filteredProjects.map((project, index) => (
            <Col lg={4} md={6} sm={12} key={index} className="mb-4">
              <Card 
                className="project-selection-card h-100"
                onClick={() => setSelectedProject(project.name)}
                style={{ cursor: 'pointer' }}
              >
                <Card.Body className="project-selection-card-body d-flex flex-column">
                  <div className="project-card-header align-items-center justify-content-center text-center">
                    <div className="project-icon mb-3">
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22 13V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3H12L14 5H21C21.5523 5 22 5.44772 22 6V13ZM20 13H14C13.4477 13 13 12.5523 13 12V6H3V19H21V13H20Z" fill="currentColor"/>
                        <path d="M17 10C17 10.5523 16.5523 11 16 11H8C7.44772 11 7 10.5523 7 10C7 9.44772 7.44772 9 8 9H16C16.5523 9 17 9.44772 17 10Z" fill="currentColor"/>
                      </svg>
                    </div>
                    <h5 className="project-card-title text-center">{project.name}</h5>
                  </div>
                  <div className="project-card-content flex-grow-1 text-center">
                    <p className="project-card-subtitle">เอกสารทั้งหมด: {project.documentCount} ไฟล์</p>
                  </div>
                  <div className="project-card-action text-center mt-auto">
                    <small className="action-hint">
                      คลิกเพื่อดูเอกสาร
                    </small>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default DocumentSystem;
