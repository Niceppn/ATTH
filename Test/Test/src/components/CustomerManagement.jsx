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
  Alert,
} from "react-bootstrap";

const CustomerManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [activeTab, setActiveTab] = useState("info");

  // Sample customers data
  const customers = [
    {
      id: 1,
      name: "ธนาคารกรุงเทพ จำกัด (มหาชน)",
      shortName: "BBL",
      type: "corporate",
      industry: "การเงิน",
      contact: {
        person: "คุณสมชาย ผู้จัดการ",
        email: "somchai@bbl.co.th",
        phone: "02-123-4567",
        address: "333 ถนนสีลม กรุงเทพมหานคร 10500",
      },
      contract: {
        type: "annual",
        startDate: "2024-01-01",
        endDate: "2024-12-31",
        value: "2,500,000",
        status: "active",
      },
      serviceHistory: [
        {
          id: 1,
          service: "Accessibility Testing",
          project: "Mobile Banking App",
          date: "2024-01-15",
          status: "completed",
          tester: "สมชาย ใจดี",
        },
        {
          id: 2,
          service: "WCAG Compliance",
          project: "Internet Banking",
          date: "2024-01-10",
          status: "in-progress",
          tester: "สมหญิง รักงาน",
        },
      ],
      issues: [
        {
          id: 1,
          title: "ปัญหาการเข้าถึงในระบบ Mobile",
          severity: "medium",
          date: "2024-01-12",
          status: "resolved",
          description: "พบปัญหาการเข้าถึงผ่าน Screen Reader",
        },
      ],
      totalProjects: 8,
      completedProjects: 6,
      satisfaction: 4.8,
    },
    {
      id: 2,
      name: "กรมการปกครอง กระทรวงมหาดไทย",
      shortName: "MOI",
      type: "government",
      industry: "ภาครัฐ",
      contact: {
        person: "นายวิชัย ข้าราชการ",
        email: "wichai@moi.go.th",
        phone: "02-234-5678",
        address: "ถนนราชดำเนิน กรุงเทพมหานคร 10200",
      },
      contract: {
        type: "project",
        startDate: "2024-01-01",
        endDate: "2024-06-30",
        value: "1,800,000",
        status: "active",
      },
      serviceHistory: [
        {
          id: 1,
          service: "Government Website Testing",
          project: "E-Government Portal",
          date: "2024-01-08",
          status: "completed",
          tester: "วิชัย เก่งมาก",
        },
      ],
      issues: [
        {
          id: 1,
          title: "ความล่าช้าในการส่งมอบรายงาน",
          severity: "low",
          date: "2024-01-05",
          status: "resolved",
          description: "ขอขยายเวลาส่งรายงาน 2 วัน",
        },
      ],
      totalProjects: 4,
      completedProjects: 3,
      satisfaction: 4.5,
    },
    {
      id: 3,
      name: "บริษัท เทคโนโลยี จำกัด",
      shortName: "TECH",
      type: "private",
      industry: "เทคโนโลยี",
      contact: {
        person: "คุณนุชนาฏ ผู้อำนวยการ",
        email: "nuchnat@tech.com",
        phone: "02-345-6789",
        address: "123 ถนนสุขุมวิท กรุงเทพมหานคร 10110",
      },
      contract: {
        type: "monthly",
        startDate: "2024-01-01",
        endDate: "2024-12-31",
        value: "500,000",
        status: "active",
      },
      serviceHistory: [
        {
          id: 1,
          service: "Performance Testing",
          project: "E-Commerce Platform",
          date: "2024-01-14",
          status: "in-progress",
          tester: "ประยุทธ์ ทดสอบ",
        },
      ],
      issues: [],
      totalProjects: 12,
      completedProjects: 10,
      satisfaction: 4.9,
    },
  ];

  const customerTypes = [
    { value: "all", label: "ทั้งหมด" },
    { value: "corporate", label: "บริษัทมหาชน" },
    { value: "private", label: "บริษัทเอกชน" },
    { value: "government", label: "หน่วยงานราชการ" },
    { value: "sme", label: "SME" },
  ];

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.shortName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.contact.person.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType =
      selectedType === "all" || customer.type === selectedType;
    return matchesSearch && matchesType;
  });

  const getTypeBadge = (type) => {
    switch (type) {
      case "corporate":
        return <Badge bg="primary">บริษัทมหาชน</Badge>;
      case "private":
        return <Badge bg="info">บริษัทเอกชน</Badge>;
      case "government":
        return <Badge bg="success">หน่วยงานราชการ</Badge>;
      case "sme":
        return <Badge bg="warning">SME</Badge>;
      default:
        return <Badge bg="secondary">อื่นๆ</Badge>;
    }
  };

  const getContractStatus = (status) => {
    switch (status) {
      case "active":
        return <Badge bg="success">ใช้งาน</Badge>;
      case "expired":
        return <Badge bg="danger">หมดอายุ</Badge>;
      case "pending":
        return <Badge bg="warning">รอยืนยัน</Badge>;
      default:
        return <Badge bg="secondary">ไม่ทราบ</Badge>;
    }
  };

  const getServiceStatus = (status) => {
    switch (status) {
      case "completed":
        return <Badge bg="success">เสร็จสิ้น</Badge>;
      case "in-progress":
        return <Badge bg="primary">กำลังดำเนินการ</Badge>;
      case "pending":
        return <Badge bg="warning">รอเริ่มงาน</Badge>;
      case "cancelled":
        return <Badge bg="danger">ยกเลิก</Badge>;
      default:
        return <Badge bg="secondary">ไม่ทราบ</Badge>;
    }
  };

  const getIssueSeverity = (severity) => {
    switch (severity) {
      case "high":
        return <Badge bg="danger">สูง</Badge>;
      case "medium":
        return <Badge bg="warning">ปานกลาง</Badge>;
      case "low":
        return <Badge bg="info">ต่ำ</Badge>;
      default:
        return <Badge bg="secondary">ไม่ทราบ</Badge>;
    }
  };

  const getIssueStatus = (status) => {
    switch (status) {
      case "resolved":
        return <Badge bg="success">แก้ไขแล้ว</Badge>;
      case "pending":
        return <Badge bg="warning">กำลังแก้ไข</Badge>;
      case "open":
        return <Badge bg="danger">เปิดอยู่</Badge>;
      default:
        return <Badge bg="secondary">ไม่ทราบ</Badge>;
    }
  };

  const handleCustomerClick = (customer) => {
    setSelectedCustomer(customer);
    setActiveTab("info");
    setShowModal(true);
  };

  const totalRevenue = customers.reduce((total, customer) => {
    return total + parseFloat(customer.contract.value.replace(/,/g, ""));
  }, 0);

  const activeContracts = customers.filter(
    (c) => c.contract.status === "active",
  ).length;

  return (
    <div className="customer-management-container">
      {/* Page Header */}
      <div className="customer-header">
        <h1 className="customer-title">จัดการลูกค้า/องค์กร</h1>
        <p className="customer-subtitle">
          จัดการข้อมูลลูกค้า ประวัติการใช้บริการ สัญญา และบันทึกปัญหา
        </p>
      </div>

      {/* Customer Stats */}
      <Row className="mb-4">
        <Col lg={3} md={6} className="mb-3">
          <Card className="stat-card">
            <Card.Body>
              <div className="stat-content-horizontal">
                <div>
                  <div className="stat-label">ลูกค้าทั้งหมด</div>
                  <div className="stat-number">{customers.length}</div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={3} md={6} className="mb-3">
          <Card className="stat-card">
            <Card.Body>
              <div className="stat-content-horizontal">
                <div>
                  <div className="stat-label">สัญญาใช้งาน</div>
                  <div className="stat-number">{activeContracts}</div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={3} md={6} className="mb-3">
          <Card className="stat-card">
            <Card.Body>
              <div className="stat-content-horizontal">
                <div>
                  <div className="stat-label">มูลค่าสัญญา (บาท)</div>
                  <div className="stat-number">
                    {(totalRevenue / 1000000).toFixed(1)}M
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={3} md={6} className="mb-3">
          <Card className="stat-card">
            <Card.Body>
              <div className="stat-content-horizontal">
                <div>
                  <div className="stat-label">ความพึงพอใจเฉลี่ย</div>
                  <div className="stat-number">4.7</div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Search and Filter */}
      <Row className="mb-4">
        <Col lg={9}>
          <Card className="filter-card">
            <Card.Body>
              <Row className="align-items-end">
                <Col md={6} className="mb-3">
                  <Form.Label>ค้นหาลูกค้า</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="ค้นหาชื่อบริษัท, ชื่อย่อ, หรือผู้ติดต่อ..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input-custom"
                  />
                </Col>
                <Col md={4} className="mb-3">
                  <Form.Label>ประเภทลูกค้า</Form.Label>
                  <Form.Select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="form-select-custom"
                  >
                    {customerTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
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
                    เพิ่มลูกค้า
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={3}>
          <Card className="quick-actions-card">
            <Card.Body>
              <h6>การดำเนินการด่วน</h6>
              <div className="quick-actions">
                <Button
                  variant="outline-primary"
                  size="sm"
                  className="w-100 mb-2"
                >
                  สร้างรายงาน
                </Button>
                <Button variant="outline-success" size="sm" className="w-100">
                  ส่งออกข้อมูล
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Customers Table */}
      <Card className="customers-table-card">
        <Card.Header className="card-header-customers">
          <h5 className="card-title">รายชื่อลูกค้า</h5>
        </Card.Header>
        <Card.Body className="p-0">
          <Table responsive className="customers-table mb-0">
            <thead>
              <tr>
                <th>บริษัท/องค์กร</th>
                <th>ประเภท</th>
                <th>ผู้ติดต่อ</th>
                <th>สัญญา</th>
                <th>โครงการ</th>
                <th>ความพึงพอใจ</th>
                <th>การดำเนินการ</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map((customer) => (
                <tr key={customer.id} className="customer-row">
                  <td>
                    <div className="customer-info">
                      <div className="customer-name">{customer.name}</div>
                      <div className="customer-industry">
                        {customer.industry}
                      </div>
                    </div>
                  </td>
                  <td>{getTypeBadge(customer.type)}</td>
                  <td>
                    <div className="contact-info">
                      <div className="contact-name">
                        {customer.contact.person}
                      </div>
                      <div className="contact-email">
                        {customer.contact.email}
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="contract-info">
                      {getContractStatus(customer.contract.status)}
                      <div className="contract-value">
                        {parseInt(customer.contract.value).toLocaleString()} บาท
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="project-stats">
                      <span className="completed">
                        {customer.completedProjects}
                      </span>
                      <span className="separator">/</span>
                      <span className="total">{customer.totalProjects}</span>
                    </div>
                  </td>
                  <td>
                    <div className="satisfaction-score">
                      ⭐ {customer.satisfaction}
                    </div>
                  </td>
                  <td>
                    <Button
                      variant="outline-primary"
                      size="sm"
                      onClick={() => handleCustomerClick(customer)}
                    >
                      ดูรายละเอียด
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* Customer Detail Modal with Clear Topic Selection */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        size="xl"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>{selectedCustomer && selectedCustomer.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedCustomer && (
            <div className="customer-detail-container">
              {/* Clear Topic Selection Buttons */}
              <div className="topic-selection-buttons">
                <Button
                  variant={activeTab === "info" ? "primary" : "outline-primary"}
                  onClick={() => setActiveTab("info")}
                  className="topic-btn"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 7V9H21ZM15 11H21V13H15V11ZM21 15V17H15V15H21Z"
                      fill="currentColor"
                    />
                  </svg>
                  ข้อมูลทั่วไป
                </Button>

                <Button
                  variant={
                    activeTab === "contract" ? "primary" : "outline-primary"
                  }
                  onClick={() => setActiveTab("contract")}
                  className="topic-btn"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.89 22 5.99 22H18C19.1 22 20 21.1 20 20V8L14 2ZM18 20H6V4H13V9H18V20Z"
                      fill="currentColor"
                    />
                  </svg>
                  สัญญา
                </Button>

                <Button
                  variant={
                    activeTab === "history" ? "primary" : "outline-primary"
                  }
                  onClick={() => setActiveTab("history")}
                  className="topic-btn"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13 3C9.23 3 6 6.23 6 10H1L5.64 14.64L5.74 14.82L10.67 10H6C6 6.69 8.69 4 12 4S18 6.69 18 10S15.31 16 12 16H11V18H12C15.77 18 19 14.77 19 11S15.77 3 12 3H13ZM12 7V11L15.25 13.15L16.19 11.53L13.75 10V7H12Z"
                      fill="currentColor"
                    />
                  </svg>
                  ประวัติการใช้บริการ
                </Button>

                <Button
                  variant={
                    activeTab === "issues" ? "primary" : "outline-primary"
                  }
                  onClick={() => setActiveTab("issues")}
                  className="topic-btn"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 21H23L12 2L1 21ZM13 18H11V16H13V18ZM13 14H11V10H13V14Z"
                      fill="currentColor"
                    />
                  </svg>
                  บันทึกปัญหา
                </Button>
              </div>

              {/* Content based on selected topic */}
              <div className="topic-content">
                {activeTab === "info" && (
                  <div className="tab-content">
                    <Row>
                      <Col md={6}>
                        <h6>ข้อมูลบริษัท</h6>
                        <div className="info-item">
                          <strong>ชื่อเต็ม:</strong> {selectedCustomer.name}
                        </div>
                        <div className="info-item">
                          <strong>ชื่อย่อ:</strong> {selectedCustomer.shortName}
                        </div>
                        <div className="info-item">
                          <strong>ประเภท:</strong>{" "}
                          {getTypeBadge(selectedCustomer.type)}
                        </div>
                        <div className="info-item">
                          <strong>อุตสาหกรรม:</strong>{" "}
                          {selectedCustomer.industry}
                        </div>
                      </Col>
                      <Col md={6}>
                        <h6>ข้อมูลติดต่อ</h6>
                        <div className="info-item">
                          <strong>ผู้ติดต่อ:</strong>{" "}
                          {selectedCustomer.contact.person}
                        </div>
                        <div className="info-item">
                          <strong>อีเมล:</strong>{" "}
                          {selectedCustomer.contact.email}
                        </div>
                        <div className="info-item">
                          <strong>โทรศัพท์:</strong>{" "}
                          {selectedCustomer.contact.phone}
                        </div>
                        <div className="info-item">
                          <strong>ที่อยู่:</strong>{" "}
                          {selectedCustomer.contact.address}
                        </div>
                      </Col>
                    </Row>
                  </div>
                )}

                {activeTab === "contract" && (
                  <div className="tab-content">
                    <Row>
                      <Col md={6}>
                        <h6>รายละเอียดสัญญา</h6>
                        <div className="info-item">
                          <strong>ประเภทสัญญา:</strong>{" "}
                          {selectedCustomer.contract.type}
                        </div>
                        <div className="info-item">
                          <strong>วันที่เริ่ม:</strong>{" "}
                          {selectedCustomer.contract.startDate}
                        </div>
                        <div className="info-item">
                          <strong>วันที่สิ้นสุด:</strong>{" "}
                          {selectedCustomer.contract.endDate}
                        </div>
                        <div className="info-item">
                          <strong>สถานะ:</strong>{" "}
                          {getContractStatus(selectedCustomer.contract.status)}
                        </div>
                      </Col>
                      <Col md={6}>
                        <h6>มูลค่าสัญญา</h6>
                        <div className="contract-value-large">
                          {parseInt(
                            selectedCustomer.contract.value,
                          ).toLocaleString()}{" "}
                          บาท
                        </div>
                        <Alert variant="info" className="mt-3">
                          สัญญานี้จะหมดอายุในอีก 150 วัน
                        </Alert>
                      </Col>
                    </Row>
                  </div>
                )}

                {activeTab === "history" && (
                  <div className="tab-content">
                    <Table responsive>
                      <thead>
                        <tr>
                          <th>บริการ</th>
                          <th>โครงการ</th>
                          <th>วันที่</th>
                          <th>ผู้ทดสอบ</th>
                          <th>สถานะ</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedCustomer.serviceHistory.map((service) => (
                          <tr key={service.id}>
                            <td>{service.service}</td>
                            <td>{service.project}</td>
                            <td>{service.date}</td>
                            <td>{service.tester}</td>
                            <td>{getServiceStatus(service.status)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                )}

                {activeTab === "issues" && (
                  <div className="tab-content">
                    {selectedCustomer.issues.length > 0 ? (
                      <div className="issues-list">
                        {selectedCustomer.issues.map((issue) => (
                          <Card key={issue.id} className="issue-card mb-3">
                            <Card.Body>
                              <div className="issue-header">
                                <h6>{issue.title}</h6>
                                <div className="issue-badges">
                                  {getIssueSeverity(issue.severity)}
                                  {getIssueStatus(issue.status)}
                                </div>
                              </div>
                              <p className="issue-description">
                                {issue.description}
                              </p>
                              <small className="text-muted">
                                วันที่: {issue.date}
                              </small>
                            </Card.Body>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <Alert variant="success">
                        ไม่มีปัญหาที่บันทึกไว้สำหรับลูกค้ารายนี้
                      </Alert>
                    )}
                    <Button variant="primary" className="mt-3">
                      เพิ่มบันทึกปัญหา
                    </Button>
                  </div>
                )}
              </div>
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

      {/* Add Customer Modal */}
      <Modal
        show={showAddModal}
        onHide={() => setShowAddModal(false)}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>เพิ่มลูกค้าใหม่</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col md={8} className="mb-3">
                <Form.Label>ชื่อบริษัท/องค์กร</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="กรอกชื่อบริษัทหรือองค์กร"
                />
              </Col>
              <Col md={4} className="mb-3">
                <Form.Label>ชื่อย่อ</Form.Label>
                <Form.Control type="text" placeholder="เช่น BBL, MOI" />
              </Col>
            </Row>
            <Row>
              <Col md={6} className="mb-3">
                <Form.Label>ประเภทลูกค้า</Form.Label>
                <Form.Select>
                  <option>เลือกประเภท</option>
                  <option value="corporate">บริษัทมหาชน</option>
                  <option value="private">บริษัทเอกชน</option>
                  <option value="government">หน่วยงานราชการ</option>
                  <option value="sme">SME</option>
                </Form.Select>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Label>อุตสาหกรรม</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="เช่น การเงิน, เทคโนโลยี"
                />
              </Col>
            </Row>
            <hr />
            <h6>ข้อมูลติดต่อ</h6>
            <Row>
              <Col md={6} className="mb-3">
                <Form.Label>ชื่อผู้ติดต่อ</Form.Label>
                <Form.Control type="text" placeholder="กรอกชื่อผู้ติดต่อ" />
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
                <Form.Label>ที่อยู่</Form.Label>
                <Form.Control type="text" placeholder="กรอกที่อยู่" />
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

export default CustomerManagement;
