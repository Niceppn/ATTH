import React, { useState } from "react";
import "./Assignment.css"
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
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
const Assignment = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [viewMode, setViewMode] = useState("grid");
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState([]);

    // Sample documents data
    const documents = [
        {
            id: 1,
            name: "ทดสอบเว็บไซต์",
            type: "PDF",
            uploadDate: "2024-01-15",
            category: "reports",
            project: "Test Website",
            uploader: "สมชาย ใจดี",
            thumbnail: "📄",
            downloads: 15,
            status: "approved",
        },
        {
            id: 2,
            name: "ทดสอบเเอพลิเคชั่น",
            type: "PNG",
            uploadDate: "2024-01-14",
            category: "screenshots",
            project: "Test Application",
            uploader: "สมหญิง รักงาน",
            thumbnail: "🖼️",
            downloads: 8,
            status: "pending",
        },
        {
            id: 3,
            name: "ทดสอบโครงสรางอาคาร/ตึก",
            type: "MP4",
            uploadDate: "2024-01-13",
            category: "videos",
            project: "Test Building",
            uploader: "วิชัย เก่งมาก",
            thumbnail: "🎥",
            downloads: 22,
            status: "approved",
        },
        {
            id: 4,
            name: "ทดสอบลิฟต์",
            type: "DOCX",
            uploadDate: "2024-01-12",
            category: "forms",
            project: "Invator Test",
            uploader: "นุชนาฏ ใส่ใจ",
            thumbnail: "📝",
            downloads: 31,
            status: "approved",
        },
        {
            id: 5,
            name: "ทดสอบ",
            type: "XLSX",
            uploadDate: "2024-01-11",
            category: "data",
            project: "Test",
            uploader: "ประยุทธ์ ทดสอบ",
            thumbnail: "📊",
            downloads: 12,
            status: "approved",
        },
        {
            id: 6,
            name: "ทดสอบ",
            type: "MP3",
            uploadDate: "2024-01-10",
            category: "audio",
            project: "Test",
            uploader: "สมชาย ใจดี",
            thumbnail: "🎵",
            downloads: 7,
            status: "approved",
        },
        {
            id: 7,
            name: "ทดสอบ",
            type: "MP3",
            uploadDate: "2024-01-10",
            category: "audio",
            project: "Test",
            uploader: "สมชาย ใจดี",
            thumbnail: "🎵",
            downloads: 7,
            status: "approved",
        },
        {
            id: 8,
            name: "ทดสอบ",
            type: "MP3",
            uploadDate: "2024-01-10",
            category: "audio",
            project: "Test",
            uploader: "สมชาย ใจดี",
            thumbnail: "🎵",
            downloads: 7,
            status: "approved",
        },
        {
            id: 9,
            name: "ทดสอบ",
            type: "MP3",
            uploadDate: "2024-01-10",
            category: "audio",
            project: "Test",
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
                return "🌐";
            case "png":
            case "jpg":
            case "jpeg":
            case "gif":
                return "📱";
            case "mp4":
            case "avi":
            case "mov":
                return "🏢";
            case "mp3":
            case "wav":
            case "m4a":
                return "📊";
            case "docx":
            case "doc":
                return "🛗";
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


    const navigate = useNavigate();
    return (
        <div className="document-system-container">
            <h3>งานที่ได้รับมอบหมายทั้งหมด</h3><br /><br />
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
                                <div key={doc.id} className="document-card" style={{ cursor: "pointer" }}
                                    onClick={() => {
                                        if (doc.id === 1) {//เพิ่มคลิกไปที่ไหนตรงนี้
                                            navigate("/work/Test-website");
                                        } else if (doc.id === 3) {
                                            navigate("/work/Test-building");
                                        }
                                    }} >
                                    <div className="document-thumbnail">
                                        <div className="file-icon">{getFileTypeIcon(doc.type)}</div>
                                    </div>
                                    <div className="document-info">
                                        <h6 className="document-name" title={doc.name}>
                                            {doc.name.length > 30
                                                ? doc.name.substring(0, 30) + "..."
                                                : doc.name}
                                        </h6>
                                        <div className="document-meta">
                                            <div className="document-project">{doc.project}</div>

                                        </div>

                                        <div className="document-footer">
                                            <div className="document-date">{doc.uploadDate}</div>
                                            {/*{getStatusBadge(doc.status)}*/}
                                            <Dropdown onClick={(e) => e.stopPropagation()}>
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
                                        {/*<td>{doc.size}</td>*/}
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

export default Assignment;
