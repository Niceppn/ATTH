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
  ProgressBar,
  Dropdown,
  InputGroup,
} from "react-bootstrap";

const DocumentSystem = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [viewMode, setViewMode] = useState("grid");
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);

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

  const categories = [
    { value: "all", label: "ทั้งหมด", count: documents.length },
    {
      value: "reports",
      label: "รายงาน",
      count: documents.filter((d) => d.category === "reports").length,
    },
    {
      value: "screenshots",
      label: "ภาพหน้าจอ",
      count: documents.filter((d) => d.category === "screenshots").length,
    },
    {
      value: "videos",
      label: "วิดีโอ",
      count: documents.filter((d) => d.category === "videos").length,
    },
    {
      value: "forms",
      label: "แบบฟอร์ม",
      count: documents.filter((d) => d.category === "forms").length,
    },
    {
      value: "data",
      label: "ข้อมูล",
      count: documents.filter((d) => d.category === "data").length,
    },
    {
      value: "audio",
      label: "เสียง",
      count: documents.filter((d) => d.category === "audio").length,
    },
  ];

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch =
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.project.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || doc.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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
        return "📁";
    }
  };

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

  const getFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFiles(files);
  };

  const totalSize = documents.reduce((total, doc) => {
    const size = parseFloat(doc.size.split(" ")[0]);
    const unit = doc.size.split(" ")[1];
    const bytes = unit === "MB" ? size * 1024 * 1024 : size * 1024;
    return total + bytes;
  }, 0);

  return (
    <div className="document-system-container">
      {/* Page Header */}
      <div className="document-header">
        <h1 className="document-title">ระบบจัดเก็บเอกสาร/ฟอร์ม</h1>
        <p className="document-subtitle">
          จัดการไฟล์ PDF รูปภาพ วิดีโอ และข้อมูลการทดสอบภาคสนาม
        </p>
      </div>

      {/* Storage Stats */}
      <Row className="mb-4">
        <Col lg={3} md={6} className="mb-3">
          <Card className="stat-card h-100">
            <Card.Body>
              <div className="stat-card-content">
                <div className="stat-icon stat-icon-primary">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="3" y="7" width="18" height="13" rx="2" fill="#E6F4EA"/>
                    <rect x="7" y="3" width="10" height="4" rx="1" fill="#34A853"/>
                    <rect x="7" y="3" width="10" height="4" rx="1" stroke="#34A853" strokeWidth="2"/>
                  </svg>
                </div>
                <div className="stat-info">
                  <div className="stat-value">{documents.length}</div>
                  <div className="stat-label">ไฟล์ทั้งหมด</div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={3} md={6} className="mb-3">
          <Card className="stat-card h-100">
            <Card.Body>
              <div className="stat-card-content">
                <div className="stat-icon stat-icon-success">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="3" y="7" width="18" height="13" rx="2" fill="#E6F4EA"/>
                    <rect x="7" y="3" width="10" height="4" rx="1" fill="#34A853"/>
                    <rect x="7" y="3" width="10" height="4" rx="1" stroke="#34A853" strokeWidth="2"/>
                  </svg>
                </div>
                <div className="stat-info">
                  <div className="stat-value">{getFileSize(totalSize)}</div>
                  <div className="stat-label">พื้นที่ใช้งาน</div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={3} md={6} className="mb-3">
          <Card className="stat-card h-100">
            <Card.Body>
              <div className="stat-card-content">
                <div className="stat-icon stat-icon-info">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" fill="#E8F0FE"/>
                    <rect x="10" y="7" width="4" height="8" rx="2" fill="#4285F4"/>
                  </svg>
                </div>
                <div className="stat-info">
                  <div className="stat-value">{documents.filter((d) => d.uploadDate === "2024-01-15").length}</div>
                  <div className="stat-label">อัปโหลดวันนี้</div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={3} md={6} className="mb-3">
          <Card className="stat-card h-100">
            <Card.Body>
              <div className="stat-card-content">
                <div className="stat-icon stat-icon-warning">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="3" y="7" width="18" height="13" rx="2" fill="#FFF4E5"/>
                    <rect x="7" y="3" width="10" height="4" rx="1" fill="#FBBC05"/>
                    <rect x="7" y="3" width="10" height="4" rx="1" stroke="#FBBC05" strokeWidth="2"/>
                  </svg>
                </div>
                <div className="stat-info">
                  <div className="stat-value">{documents.filter((d) => d.status === "pending").length}</div>
                  <div className="stat-label">รออนุมัติ</div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Controls */}
      <Row className="mb-4">
        <Col lg={8}>
          <Card className="filter-card">
            <Card.Body>
              <Row className="align-items-end">
                <Col md={6} className="mb-3">
                  <Form.Label>ค้นหาไฟล์</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type="text"
                      placeholder="ค้นหาชื่อไฟล์หรือโครงการ..."
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
                </Col>
                <Col md={4} className="mb-3">
                  <Form.Label>หมวดหมู่</Form.Label>
                  <Form.Select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="form-select-custom"
                  >
                    {categories.map((cat) => (
                      <option key={cat.value} value={cat.value}>
                        {cat.label} ({cat.count})
                      </option>
                    ))}
                  </Form.Select>
                </Col>
                <Col md={2} className="mb-3">
                  <Button
                    variant="primary"
                    className="w-100"
                    onClick={() => setShowUploadModal(true)}
                  >
                    อัปโหลดไฟล์
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={4}>
          <Card className="storage-usage-card">
            <Card.Body>
              <h6>การใช้พื้นที่จัดเก็บ</h6>
              <ProgressBar
                now={75}
                label="75% ของ 100 GB"
                className="storage-progress"
              />
              <small className="text-muted">
                ใช้งาน {getFileSize(totalSize)} จาก 100 GB
              </small>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Documents Display */}
      <Card className="documents-card">
        <Card.Header className="card-header-documents">
          <h5 className="card-title">เอกสารและไฟล์</h5>
          <div className="results-count">
            แสดง {filteredDocuments.length} จาก {documents.length} ไฟล์
          </div>
        </Card.Header>
        <Card.Body className="p-0">
          {viewMode === "grid" ? (
            <div className="documents-grid">
              {filteredDocuments.map((doc) => (
                <div key={doc.id} className="document-card">
                  <div className="document-thumbnail">
                    <div className="file-icon">{getFileTypeIcon(doc.type)}</div>
                    <div className="file-type-badge">{doc.type}</div>
                  </div>
                  <div className="document-info">
                    <h6 className="document-name" title={doc.name}>
                      {doc.name.length > 30
                        ? doc.name.substring(0, 30) + "..."
                        : doc.name}
                    </h6>
                    <div className="document-meta">
                      <div className="document-size">{doc.size}</div>
                      <div className="document-date">{doc.uploadDate}</div>
                    </div>
                    <div className="document-project">{doc.project}</div>
                    <div className="document-footer">
                      {getStatusBadge(doc.status)}
                      <Dropdown>
                        <Dropdown.Toggle variant="outline-secondary" size="sm">
                          ⋮
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item>ดาวน์โหลด</Dropdown.Item>
                          <Dropdown.Item>แชร์</Dropdown.Item>
                          <Dropdown.Item>แก้ไข</Dropdown.Item>
                          <Dropdown.Divider />
                          <Dropdown.Item className="text-danger">
                            ลบ
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <Table responsive className="documents-table mb-0">
              <thead>
                <tr>
                  <th>ชื่อไฟล์</th>
                  <th>ประเภท</th>
                  <th>ขนาด</th>
                  <th>โครงการ</th>
                  <th>ผู้อัปโหลด</th>
                  <th>วันที่</th>
                  <th>ดาวน์โหลด</th>
                  <th>สถานะ</th>
                  <th>การดำเนินการ</th>
                </tr>
              </thead>
              <tbody>
                {filteredDocuments.map((doc) => (
                  <tr key={doc.id}>
                    <td>
                      <div className="file-name">
                        <span className="file-icon-small">
                          {getFileTypeIcon(doc.type)}
                        </span>
                        {doc.name}
                      </div>
                    </td>
                    <td>
                      <Badge bg="secondary">{doc.type}</Badge>
                    </td>
                    <td>{doc.size}</td>
                    <td>{doc.project}</td>
                    <td>{doc.uploader}</td>
                    <td>{doc.uploadDate}</td>
                    <td>{doc.downloads}</td>
                    <td>{getStatusBadge(doc.status)}</td>
                    <td>
                      <Dropdown>
                        <Dropdown.Toggle variant="outline-primary" size="sm">
                          การดำเนินการ
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item>ดาวน์โหลด</Dropdown.Item>
                          <Dropdown.Item>แชร์</Dropdown.Item>
                          <Dropdown.Item>แก้ไข</Dropdown.Item>
                          <Dropdown.Divider />
                          <Dropdown.Item className="text-danger">
                            ลบ
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>

      {/* Upload Modal */}
      <Modal
        show={showUploadModal}
        onHide={() => setShowUploadModal(false)}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>อัปโหลดไฟล์ใหม่</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <div className="mb-3">
              <Form.Label>เลือกไฟล์</Form.Label>
              <Form.Control
                type="file"
                multiple
                onChange={handleFileUpload}
                accept=".pdf,.png,.jpg,.jpeg,.mp4,.docx,.xlsx,.mp3"
              />
              <Form.Text className="text-muted">
                รองรับ: PDF, รูปภาพ, วิดีโอ, เอกสาร, เสียง (ขนาดสูงสุด 50MB
                ต่อไฟล์)
              </Form.Text>
            </div>

            {selectedFiles.length > 0 && (
              <div className="mb-3">
                <h6>ไฟล์ที่เลือก:</h6>
                {selectedFiles.map((file, index) => (
                  <div key={index} className="selected-file">
                    <span>{file.name}</span>
                    <span className="file-size">
                      ({getFileSize(file.size)})
                    </span>
                  </div>
                ))}
              </div>
            )}

            <Row>
              <Col md={6} className="mb-3">
                <Form.Label>หมวดหมู่</Form.Label>
                <Form.Select>
                  <option>เลือกหมวดหมู่</option>
                  <option value="reports">รายงาน</option>
                  <option value="screenshots">ภาพหน้าจอ</option>
                  <option value="videos">วิดีโอ</option>
                  <option value="forms">แบบฟอร์ม</option>
                  <option value="data">ข้อมูล</option>
                  <option value="audio">เสียง</option>
                </Form.Select>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Label>โครงการ</Form.Label>
                <Form.Control type="text" placeholder="กรอกชื่อโครงการ" />
              </Col>
            </Row>
            <div className="mb-3">
              <Form.Label>คำอธิบาย</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="อธิบายเนื้อหาไฟล์..."
              />
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowUploadModal(false)}>
            ยกเลิก
          </Button>
          <Button variant="primary">อัปโหลด</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DocumentSystem;
