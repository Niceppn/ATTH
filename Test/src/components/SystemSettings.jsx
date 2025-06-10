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
  Tab,
  Tabs,
  Alert,
} from "react-bootstrap";

const SystemSettings = () => {
  const [activeTab, setActiveTab] = useState("categories");
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);

  // Testing Categories Data
  const testingCategories = [
    {
      id: 1,
      name: "Accessibility Testing",
      description: "การทดสอบการเข้าถึงตามมาตรฐาน WCAG",
      standards: ["WCAG 2.1 AA", "Section 508", "EN 301 549"],
      isActive: true,
      createdDate: "2024-01-01",
    },
    {
      id: 2,
      name: "Performance Testing",
      description: "การทดสอบประสิทธิภาพและความเร็ว",
      standards: ["Load Testing", "Stress Testing", "Volume Testing"],
      isActive: true,
      createdDate: "2024-01-01",
    },
    {
      id: 3,
      name: "Usability Testing",
      description: "การทดสอบความใช้งานง่ายและ UX",
      standards: ["ISO 9241", "Nielsen's Principles", "User-Centered Design"],
      isActive: true,
      createdDate: "2024-01-01",
    },
    {
      id: 4,
      name: "Security Testing",
      description: "การทดสอบความปลอดภัยและช่องโหว่",
      standards: ["OWASP Top 10", "ISO 27001", "NIST Framework"],
      isActive: false,
      createdDate: "2024-01-01",
    },
  ];

  // Facilities Data
  const facilities = [
    {
      id: 1,
      name: "ห้องทดสอบ Accessibility",
      type: "testing-room",
      capacity: 8,
      equipment: [
        "Screen Reader",
        "Voice Recognition",
        "Keyboard Navigation Tools",
      ],
      location: "ชั้น 3 ห้อง 301",
      status: "available",
      bookings: 5,
    },
    {
      id: 2,
      name: "ห้องประชุมใหญ่",
      type: "meeting-room",
      capacity: 20,
      equipment: ["Projector", "Video Conference", "Whiteboard"],
      location: "ชั้น 2 ห้อง 201",
      status: "occupied",
      bookings: 8,
    },
    {
      id: 3,
      name: "เครื่องมือทดสอบ Performance",
      type: "equipment",
      capacity: 1,
      equipment: ["LoadRunner", "JMeter", "Performance Monitoring Tools"],
      location: "IT Department",
      status: "maintenance",
      bookings: 12,
    },
    {
      id: 4,
      name: "อุปกรณ์ช่วยเหลือผู้พิการ",
      type: "assistive-tech",
      capacity: 5,
      equipment: ["JAWS", "NVDA", "Voice Control", "Switch Access"],
      location: "ห้องอุปกรณ์ ชั้น 1",
      status: "available",
      bookings: 3,
    },
  ];

  // Template Forms Data
  const templateForms = [
    {
      id: 1,
      name: "แบบฟอร์มการทดสอบ WCAG 2.1",
      category: "accessibility",
      description: "แบบฟอร์มมาตรฐานสำหรับการทดสอบ WCAG 2.1 AA",
      version: "2.1.0",
      lastUpdated: "2024-01-15",
      downloads: 45,
      isDefault: true,
    },
    {
      id: 2,
      name: "รายงานการทดสอบ Performance",
      category: "performance",
      description: "เทมเพลตรายงานการทดสอบประสิทธิภาพ",
      version: "1.5.2",
      lastUpdated: "2024-01-10",
      downloads: 32,
      isDefault: false,
    },
    {
      id: 3,
      name: "แบบประเมิน Usability Testing",
      category: "usability",
      description: "แบบฟอร์มประเมินความใช้งานง่าย",
      version: "3.0.1",
      lastUpdated: "2024-01-08",
      downloads: 28,
      isDefault: true,
    },
    {
      id: 4,
      name: "Checklist การตรวจสอบความปลอดภัย",
      category: "security",
      description: "รายการตรวจสอบความปลอดภัยพื้นฐาน",
      version: "1.2.0",
      lastUpdated: "2024-01-05",
      downloads: 15,
      isDefault: false,
    },
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case "available":
        return <Badge bg="success">ว่าง</Badge>;
      case "occupied":
        return <Badge bg="warning">ไม่ว่าง</Badge>;
      case "maintenance":
        return <Badge bg="danger">ซ่อมบำรุง</Badge>;
      default:
        return <Badge bg="secondary">ไม่ทราบ</Badge>;
    }
  };

  const getFacilityTypeIcon = (type) => {
    switch (type) {
      case "testing-room":
        return "🧪";
      case "meeting-room":
        return "🏢";
      case "equipment":
        return "⚙️";
      case "assistive-tech":
        return "♿";
      default:
        return "📋";
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case "accessibility":
        return "♿";
      case "performance":
        return "⚡";
      case "usability":
        return "👤";
      case "security":
        return "🔒";
      default:
        return "📄";
    }
  };

  const handleAddNew = (type) => {
    setModalType(type);
    setSelectedItem(null);
    setShowModal(true);
  };

  const handleEdit = (type, item) => {
    setModalType(type);
    setSelectedItem(item);
    setShowModal(true);
  };

  return (
    <div className="system-settings-container">
      {/* Page Header */}
      <div className="settings-header">
        <h1 className="settings-title">ตั้งค่าระบบ</h1>
        <p className="settings-subtitle">
          จัดการหมวดหมู่การทดสอบและเทมเพลตฟอร์ม
        </p>
      </div>

      {/* Settings Tabs */}
      <Tabs
        activeKey={activeTab}
        onSelect={setActiveTab}
        className="settings-tabs mb-4"
      >
        {/* Testing Categories Tab */}
        <Tab eventKey="categories" title="หมวดหมู่การทดสอบ">
          <Card className="settings-card">
            <Card.Header className="card-header-settings">
              <div className="header-with-actions">
                <h5 className="card-title">หมวดหมู่การทดสอบ</h5>
                <Button
                  variant="light"
                  onClick={() => handleAddNew("category")}
                >
                  เพิ่มหมวดหมู่
                </Button>
              </div>
            </Card.Header>
            <Card.Body className="p-0">
              <Table responsive className="settings-table mb-0">
                <thead>
                  <tr>
                    <th>หมวดหมู่</th>
                    <th>คำอธิบาย</th>
                    <th>มาตรฐาน</th>
                    <th>สถานะ</th>
                    <th>วันที่สร้าง</th>
                    <th>การดำเนินการ</th>
                  </tr>
                </thead>
                <tbody>
                  {testingCategories.map((category) => (
                    <tr key={category.id}>
                      <td>
                        <div className="category-name">
                          <span className="category-icon">🧪</span>
                          {category.name}
                        </div>
                      </td>
                      <td>{category.description}</td>
                      <td>
                        <div className="standards-list">
                          {category.standards
                            .slice(0, 2)
                            .map((standard, idx) => (
                              <Badge key={idx} bg="info" className="me-1 mb-1">
                                {standard}
                              </Badge>
                            ))}
                          {category.standards.length > 2 && (
                            <Badge bg="secondary">
                              +{category.standards.length - 2}
                            </Badge>
                          )}
                        </div>
                      </td>
                      <td>
                        {category.isActive ? (
                          <Badge bg="success">ใช้งาน</Badge>
                        ) : (
                          <Badge bg="secondary">ปิดใช้งาน</Badge>
                        )}
                      </td>
                      <td>{category.createdDate}</td>
                      <td>
                        <div className="action-buttons">
                          <Button
                            variant="outline-primary"
                            size="sm"
                            onClick={() => handleEdit("category", category)}
                          >
                            แก้ไข
                          </Button>
                          <Button
                            variant="outline-danger"
                            size="sm"
                          >
                            ลบ
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Tab>

        {/* Template Forms Tab */}
        <Tab eventKey="templates" title="เทมเพลตฟอร์ม">
          <Card className="settings-card">
            <Card.Header className="card-header-settings">
              <div className="header-with-actions">
                <h5 className="card-title">เทมเพลตฟอร์ม</h5>
                <Button
                  variant="light"
                  onClick={() => handleAddNew("template")}
                >
                  เพิ่มเทมเพลต
                </Button>
              </div>
            </Card.Header>
            <Card.Body className="p-0">
              <Table responsive className="settings-table mb-0">
                <thead>
                  <tr>
                    <th>ชื่อเทมเพลต</th>
                    <th>หมวดหมู่</th>
                    <th>เวอร์ชัน</th>
                    <th>อัปเดตล่าสุด</th>
                    <th>ดาวน์โหลด</th>
                    <th>สถานะ</th>
                    <th>การดำเนินการ</th>
                  </tr>
                </thead>
                <tbody>
                  {templateForms.map((template) => (
                    <tr key={template.id}>
                      <td>
                        <div className="template-name">
                          <span className="template-icon">
                            {getCategoryIcon(template.category)}
                          </span>
                          <div>
                            <div className="template-title">
                              {template.name}
                            </div>
                            <div className="template-description">
                              {template.description}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <Badge bg="info">
                          {template.category === "accessibility"
                            ? "การเข้าถึง"
                            : template.category === "performance"
                              ? "ประสิทธิภาพ"
                              : template.category === "usability"
                                ? "ความใช้งานง่าย"
                                : "ความปลอดภัย"}
                        </Badge>
                      </td>
                      <td>
                        <code>{template.version}</code>
                      </td>
                      <td>{template.lastUpdated}</td>
                      <td>
                        <Badge bg="success">{template.downloads}</Badge>
                      </td>
                      <td>
                        {template.isDefault ? (
                          <Badge bg="primary">ค่าเริ่มต้น</Badge>
                        ) : (
                          <Badge bg="secondary">ทั่วไป</Badge>
                        )}
                      </td>
                      <td>
                        <div className="action-buttons">
                          <Button
                            variant="outline-primary"
                            size="sm"
                            onClick={() => handleEdit("template", template)}
                          >
                            แก้ไข
                          </Button>
                          <Button
                            variant="outline-danger"
                            size="sm"
                          >
                            ลบ
                          </Button>
                          <Button
                            variant="outline-info"
                            size="sm"
                          >
                            ดูตัวอย่าง
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Tab>

        {/* General Settings Tab */}
        <Tab eventKey="general" title="การตั้งค่าทั่วไป">
          <Row>
            <Col lg={6}>
              <Card className="settings-card mb-4">
                <Card.Header>
                  <h6>การตั้งค่าระบบ</h6>
                </Card.Header>
                <Card.Body>
                  <Form>
                    <div className="mb-3">
                      <Form.Label>ชื่อระบบ</Form.Label>
                      <Form.Control
                        type="text"
                        defaultValue="Universal Testing Tool"
                      />
                    </div>
                    <div className="mb-3">
                      <Form.Label>เวอร์ชันระบบ</Form.Label>
                      <Form.Control type="text" defaultValue="2.1.0" readOnly />
                    </div>
                    <div className="mb-3">
                      <Form.Label>ภาษาเริ่มต้น</Form.Label>
                      <Form.Select defaultValue="th">
                        <option value="th">ไทย</option>
                        <option value="en">English</option>
                      </Form.Select>
                    </div>
                    <div className="mb-3">
                      <Form.Check
                        type="checkbox"
                        label="เปิดใช้งานการแจ้งเตือนอีเมล"
                        defaultChecked
                      />
                    </div>
                    <div className="mb-3">
                      <Form.Check
                        type="checkbox"
                        label="บันทึกประวัติการใช้งาน"
                        defaultChecked
                      />
                    </div>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={6}>
              <Card className="settings-card mb-4">
                <Card.Header>
                  <h6>การตั้งค่าการสำรองข้อมูล</h6>
                </Card.Header>
                <Card.Body>
                  <Alert variant="info">
                    การสำรองข้อมูลล่าสุด: 2024-01-15 02:00 น.
                  </Alert>
                  <Form>
                    <div className="mb-3">
                      <Form.Label>ความถี่การสำรองข้อมูล</Form.Label>
                      <Form.Select defaultValue="daily">
                        <option value="hourly">ทุกชั่วโมง</option>
                        <option value="daily">ทุกวัน</option>
                        <option value="weekly">ทุกสัปดาห์</option>
                      </Form.Select>
                    </div>
                    <div className="mb-3">
                      <Form.Label>เก็บข้อมูลสำรอง</Form.Label>
                      <Form.Select defaultValue="30">
                        <option value="7">7 วัน</option>
                        <option value="30">30 วัน</option>
                        <option value="90">90 วัน</option>
                        <option value="365">1 ปี</option>
                      </Form.Select>
                    </div>
                    <Button variant="primary">สำรองข้อมูลทันที</Button>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Tab>
      </Tabs>

      {/* Add/Edit Modal */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {selectedItem ? "แก้ไข" : "เพิ่มใหม่"}
            {modalType === "category" ? "หมวดหมู่การทดสอบ" : "เทมเพลตฟอร์ม"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {modalType === "category" && (
              <>
                <div className="mb-3">
                  <Form.Label>ชื่อหมวดหมู่</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="กรอกชื่อหมวดหมู่การทดสอบ"
                    defaultValue={selectedItem?.name || ""}
                  />
                </div>
                <div className="mb-3">
                  <Form.Label>คำอธิบาย</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="อธิบายรายละเอียดของหมวดหมู่"
                    defaultValue={selectedItem?.description || ""}
                  />
                </div>
                <div className="mb-3">
                  <Form.Label>มาตรฐานที่เกี่ยวข้อง</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="เช่น WCAG 2.1 AA, Section 508"
                    defaultValue={selectedItem?.standards?.join(", ") || ""}
                  />
                </div>
                <div className="mb-3">
                  <Form.Check
                    type="checkbox"
                    label="เปิดใช้งาน"
                    defaultChecked={selectedItem?.isActive ?? true}
                  />
                </div>
              </>
            )}

            {modalType === "template" && (
              <>
                <div className="mb-3">
                  <Form.Label>ชื่อเทมเพลต</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="กรอกชื่อเทมเพลต"
                    defaultValue={selectedItem?.name || ""}
                  />
                </div>
                <div className="mb-3">
                  <Form.Label>หมวดหมู่</Form.Label>
                  <Form.Select defaultValue={selectedItem?.category || ""}>
                    <option value="">เลือกหมวดหมู่</option>
                    <option value="accessibility">การเข้าถึง</option>
                    <option value="performance">ประสิทธิภาพ</option>
                    <option value="usability">ความใช้งานง่าย</option>
                    <option value="security">ความปลอดภัย</option>
                  </Form.Select>
                </div>
                <div className="mb-3">
                  <Form.Label>คำอธิบาย</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="อธิบายรายละเอียดของเทมเพลต"
                    defaultValue={selectedItem?.description || ""}
                  />
                </div>
                <Row>
                  <Col md={6} className="mb-3">
                    <Form.Label>เวอร์ชัน</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="เช่น 1.0.0"
                      defaultValue={selectedItem?.version || ""}
                    />
                  </Col>
                  <Col md={6} className="mb-3">
                    <Form.Label>ไฟล์เทมเพลต</Form.Label>
                    <Form.Control type="file" accept=".pdf,.docx,.xlsx" />
                  </Col>
                </Row>
                <div className="mb-3">
                  <Form.Check
                    type="checkbox"
                    label="ตั้งเป็นเทมเพลตเริ่มต้น"
                    defaultChecked={selectedItem?.isDefault ?? false}
                  />
                </div>
              </>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            ยกเลิก
          </Button>
          <Button variant="primary">
            {selectedItem ? "บันทึกการแก้ไข" : "เพิ่มใหม่"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default SystemSettings;
