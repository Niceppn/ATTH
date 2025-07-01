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

const UserPermissions = () => {
  const [activeTab, setActiveTab] = useState("users");
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("all");

  // Users Data
  const users = [
    {
      id: 1,
      username: "admin.somchai",
      fullName: "สมชาย ผู้ดูแลระบบ",
      email: "admin@company.com",
      role: "admin",
      department: "IT",
      status: "active",
      lastLogin: "2024-01-15 09:30",
      createdDate: "2024-01-01",
      permissions: ["all"],
    },
    {
      id: 2,
      username: "coord.somying",
      fullName: "สมหญิง ผู้ประสานงาน",
      email: "somying@company.com",
      role: "coordinator",
      department: "Testing",
      status: "active",
      lastLogin: "2024-01-15 08:45",
      createdDate: "2024-01-02",
      permissions: ["manage_projects", "view_reports", "manage_testers"],
    },
    {
      id: 3,
      username: "research.wichai",
      fullName: "วิชัย นักวิจัย",
      email: "wichai@company.com",
      role: "researcher",
      department: "Research",
      status: "active",
      lastLogin: "2024-01-14 16:20",
      createdDate: "2024-01-03",
      permissions: ["view_data", "create_reports", "manage_documents"],
    },
    {
      id: 4,
      username: "tester.nuchnat",
      fullName: "นุชนาฏ ผู้ทดสอบ",
      email: "nuchnat@company.com",
      role: "tester",
      department: "Testing",
      status: "active",
      lastLogin: "2024-01-15 07:15",
      createdDate: "2024-01-04",
      permissions: ["conduct_tests", "view_assignments", "upload_results"],
    },
    {
      id: 5,
      username: "viewer.prayuth",
      fullName: "ประยุทธ์ ผู้ดู",
      email: "prayuth@company.com",
      role: "viewer",
      department: "Management",
      status: "inactive",
      lastLogin: "2024-01-10 14:00",
      createdDate: "2024-01-05",
      permissions: ["view_reports", "view_dashboard"],
    },
  ];

  // Roles Data
  const roles = [
    {
      id: 1,
      name: "admin",
      displayName: "ผู้ดูแลระบบ",
      description: "มีสิทธิ์เต็มในการจัดการระบบทั้งหมด",
      permissions: [
        "all",
        "manage_users",
        "manage_roles",
        "system_settings",
        "view_all_data",
        "backup_restore",
        "security_settings",
      ],
      userCount: 1,
      color: "danger",
    },
    {
      id: 2,
      name: "coordinator",
      displayName: "ผู้ประสานงาน",
      description: "จัดการโครงการและผู้ทดสอบ",
      permissions: [
        "manage_projects",
        "manage_testers",
        "view_reports",
        "manage_schedule",
        "manage_customers",
        "create_assignments",
      ],
      userCount: 1,
      color: "primary",
    },
    {
      id: 3,
      name: "researcher",
      displayName: "นักวิจัย",
      description: "วิเคราะห์ข้อมูลและสร้างรายงาน",
      permissions: [
        "view_data",
        "create_reports",
        "analyze_results",
        "manage_documents",
        "export_data",
        "research_tools",
      ],
      userCount: 1,
      color: "info",
    },
    {
      id: 4,
      name: "tester",
      displayName: "ผู้ทดสอบ",
      description: "ดำเนินการทดสอบและบันทึกผลลัพธ์",
      permissions: [
        "conduct_tests",
        "upload_results",
        "view_assignments",
        "manage_test_cases",
        "update_status",
        "use_tools",
      ],
      userCount: 1,
      color: "success",
    },
    {
      id: 5,
      name: "viewer",
      displayName: "ผู้ดู",
      description: "ดูข้อมูลและรายงานเท่านั้น",
      permissions: [
        "view_dashboard",
        "view_reports",
        "view_projects",
        "view_results",
      ],
      userCount: 1,
      color: "secondary",
    },
  ];

  // Permissions Data
  const allPermissions = [
    {
      id: 1,
      category: "ระบบ",
      permissions: [
        { key: "all", name: "สิทธิ์เต็ม", description: "เข้าถึงทุกฟังก์ชัน" },
        {
          key: "system_settings",
          name: "ตั้งค่าระบบ",
          description: "แก้ไขการตั้งค่าระบบ",
        },
        {
          key: "backup_restore",
          name: "สำรองข้อมูล",
          description: "สำรองและกู้คืนข้อมูล",
        },
        {
          key: "security_settings",
          name: "ตั้งค่าความปลอดภัย",
          description: "จัดการความปลอดภัย",
        },
      ],
    },
    {
      id: 2,
      category: "ผู้ใช้",
      permissions: [
        {
          key: "manage_users",
          name: "จัดการผู้ใช้",
          description: "เพิ่ม แก้ไข ลบผู้ใช้",
        },
        {
          key: "manage_roles",
          name: "จัดการบทบาท",
          description: "สร้างและแก้ไขบทบาท",
        },
        {
          key: "view_user_activity",
          name: "ดูกิจกรรมผู้ใช้",
          description: "ติดตามการใช้งาน",
        },
      ],
    },
    {
      id: 3,
      category: "โครงการ",
      permissions: [
        {
          key: "manage_projects",
          name: "จัดการโครงการ",
          description: "สร้างและแก้ไขโครงการ",
        },
        {
          key: "manage_testers",
          name: "จัดการผู้ทดสอบ",
          description: "มอบหมายงานผู้ทดสอบ",
        },
        {
          key: "manage_schedule",
          name: "จัดการตารางงาน",
          description: "สร้างและแก้ไขตารางงาน",
        },
        {
          key: "manage_customers",
          name: "จัดการลูกค้า",
          description: "จัดการข้อมูลลูกค้า",
        },
      ],
    },
    {
      id: 4,
      category: "การทดสอบ",
      permissions: [
        {
          key: "conduct_tests",
          name: "ทำการทดสอบ",
          description: "ดำเนินการทดสอบ",
        },
        {
          key: "manage_test_cases",
          name: "จัดการ Test Case",
          description: "สร้างและแก้ไข Test Case",
        },
        {
          key: "upload_results",
          name: "อัปโหลดผลลัพธ์",
          description: "อัปโหลดผลการทดสอบ",
        },
        {
          key: "use_tools",
          name: "ใช้เครื่องมือ",
          description: "เข้าถึงเครื่องมือทดสอบ",
        },
      ],
    },
    {
      id: 5,
      category: "ข้อมูลและรายงาน",
      permissions: [
        {
          key: "view_all_data",
          name: "ดูข้อมูลทั้งหมด",
          description: "เข้าถึงข้อมูลทุกประเภท",
        },
        {
          key: "view_reports",
          name: "ดูรายงาน",
          description: "เข้าถึงรายงานต่างๆ",
        },
        {
          key: "create_reports",
          name: "สร้างรายงาน",
          description: "สร้างรายงานใหม่",
        },
        {
          key: "export_data",
          name: "ส่งออกข้อมูล",
          description: "ส่งออกข้อมูลในรูปแบบต่างๆ",
        },
      ],
    },
  ];

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === "all" || user.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  const getRoleBadge = (role) => {
    const roleData = roles.find((r) => r.name === role);
    return (
      <Badge bg={roleData?.color || "secondary"}>
        {roleData?.displayName || role}
      </Badge>
    );
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "active":
        return <Badge bg="success">ใช้งาน</Badge>;
      case "inactive":
        return <Badge bg="secondary">ไม่ใช้งาน</Badge>;
      case "suspended":
        return <Badge bg="danger">ระงับ</Badge>;
      default:
        return <Badge bg="secondary">ไม่ทราบ</Badge>;
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
    <div className="user-permissions-container">
      {/* Page Header */}
      <div className="permissions-header">
        <h1 className="permissions-title">สิทธิ์ผู้ใช้งาน</h1>
        <p className="permissions-subtitle">
          กำหนดสิทธิ์สำหรับ Admin, Coordinator, Research Team และอื่นๆ
        </p>
      </div>

      {/* Statistics */}
      <Row className="mb-4">
        <Col lg={3} md={6} className="mb-3">
          <Card className="stat-card h-100">
            <Card.Body>
              <div className="stat-card-content">
                <div className="stat-icon stat-icon-primary">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="stat-info">
                  <div className="stat-value">{users.length}</div>
                  <div className="stat-label">ผู้ใช้ทั้งหมด</div>
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
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="3"
                      y="11"
                      width="18"
                      height="11"
                      rx="2"
                      ry="2"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <circle
                      cx="12"
                      cy="16"
                      r="1"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M7 11V7C7 5.67392 7.52678 4.40215 8.46447 3.46447C9.40215 2.52678 10.6739 2 12 2C13.3261 2 14.5979 2.52678 15.5355 3.46447C16.4732 4.40215 17 5.67392 17 7V11"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="stat-info">
                  <div className="stat-value">{roles.length}</div>
                  <div className="stat-label">บทบาท</div>
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
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M22 11.08V12C21.9988 14.1564 21.3005 16.2547 20.0093 17.9818C18.7182 19.7088 16.9033 20.9725 14.8354 21.5839C12.7674 22.1953 10.5573 22.1219 8.53447 21.3746C6.51168 20.6273 4.78465 19.2461 3.61096 17.4371C2.43727 15.628 1.87979 13.4898 2.02168 11.3363C2.16356 9.18288 2.99721 7.13471 4.39828 5.49618C5.79935 3.85766 7.69279 2.71539 9.79619 2.24618C11.8996 1.77697 14.1003 1.98981 16.07 2.85999"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M22 4L12 14.01L9 11.01"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="stat-info">
                  <div className="stat-value">
                    {users.filter((u) => u.status === "active").length}
                  </div>
                  <div className="stat-label">ผู้ใช้ที่ใช้งาน</div>
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
                  <svg
                    width="32"
                    height="32"
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
                      cx="9"
                      cy="9"
                      r="2"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M21 15L16 10L5 21"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="stat-info">
                  <div className="stat-value">
                    {allPermissions.reduce(
                      (total, cat) => total + cat.permissions.length,
                      0,
                    )}
                  </div>
                  <div className="stat-label">สิทธิ์ทั้งหมด</div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Permissions Tabs */}
      <Tabs
        activeKey={activeTab}
        onSelect={setActiveTab}
        className="settings-tabs mb-4"
      >
        {/* Users Tab */}
        <Tab eventKey="users" title="ผู้ใช้งาน">
          {/* Search and Filter */}
          <Row className="mb-4">
            <Col lg={8}>
              <Card className="filter-card">
                <Card.Body>
                  <Row className="align-items-end">
                    <Col md={8} className="mb-3">
                      <Form.Label>ค้นหาผู้ใช้</Form.Label>
                      <div className="search-bar-container">
                        <Form.Control
                          type="text"
                          placeholder="ค้นหาชื่อ, username, หรืออีเมล..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="search-input-large"
                          size="lg"
                        />
                        <Button
                          variant="primary"
                          className="search-button-modern"
                          size="lg"
                        >
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
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
                      </div>
                    </Col>
                    <Col md={4} className="mb-3">
                      <Form.Label>บทบาท</Form.Label>
                      <Form.Select
                        value={selectedRole}
                        onChange={(e) => setSelectedRole(e.target.value)}
                        className="form-select-large"
                        size="lg"
                      >
                        <option value="all">ทุกบทบาท</option>
                        {roles.map((role) => (
                          <option key={role.name} value={role.name}>
                            {role.displayName}
                          </option>
                        ))}
                      </Form.Select>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={4}>
              <Card className="quick-actions-card">
                <Card.Body>
                  <h6>การดำเนินการด่วน</h6>
                  <div className="quick-actions">
                    <Button
                      variant="primary"
                      className="w-100 mb-2"
                      onClick={() => handleAddNew("user")}
                    >
                      เพิ่มผู้ใช้
                    </Button>
                    <Button
                      variant="outline-warning"
                      size="sm"
                      className="w-100 mb-2"
                    >
                      รีเซ็ตรหัสผ่าน
                    </Button>
                    <Button variant="outline-info" size="sm" className="w-100">
                      ส่งออกรายชื่อ
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Card className="users-table-card">
            <Card.Header className="card-header-permissions">
              <h5 className="card-title">รายชื่อผู้ใช้งาน</h5>
            </Card.Header>
            <Card.Body className="p-0">
              <Table responsive className="permissions-table mb-0">
                <thead>
                  <tr>
                    <th>ผู้ใช้</th>
                    <th>บทบาท</th>
                    <th>แผนก</th>
                    <th>สถานะ</th>
                    <th>เข้าใช้ล่าสุด</th>
                    <th>การดำเนินการ</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user.id}>
                      <td>
                        <div className="user-info">
                          <div className="user-name">{user.fullName}</div>
                          <div className="user-details">
                            <div className="user-username">
                              @{user.username}
                            </div>
                            <div className="user-email">{user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td>{getRoleBadge(user.role)}</td>
                      <td>{user.department}</td>
                      <td>{getStatusBadge(user.status)}</td>
                      <td>{user.lastLogin}</td>
                      <td>
                        <div className="action-buttons">
                          <Button
                            variant="outline-primary"
                            size="sm"
                            onClick={() => handleEdit("user", user)}
                          >
                            แก้ไข
                          </Button>
                          <Button variant="outline-warning" size="sm">
                            รีเซ็ต
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

        {/* Roles Tab */}
        <Tab eventKey="roles" title="บทบาท">
          <Card className="roles-card">
            <Card.Header className="card-header-permissions">
              <div className="header-with-actions">
                <h5 className="card-title">บทบาทและสิทธิ์</h5>
                <Button variant="light" onClick={() => handleAddNew("role")}>
                  เพิ่มบทบาท
                </Button>
              </div>
            </Card.Header>
            <Card.Body>
              <Row>
                {roles.map((role) => (
                  <Col lg={6} key={role.id} className="mb-4">
                    <Card className="role-card">
                      <Card.Body>
                        <div className="role-header">
                          <div className="role-info">
                            <h6 className="role-name">
                              <Badge bg={role.color} className="me-2">
                                {role.displayName}
                              </Badge>
                              <small className="text-muted">
                                ({role.userCount} คน)
                              </small>
                            </h6>
                            <p className="role-description">
                              {role.description}
                            </p>
                          </div>
                        </div>

                        <div className="role-permissions">
                          <h6>สิทธิ์ที่ได้รับ:</h6>
                          <div className="permissions-list">
                            {role.permissions.slice(0, 4).map((perm, idx) => (
                              <Badge
                                key={idx}
                                bg="light"
                                text="dark"
                                className="me-1 mb-1"
                              >
                                {perm}
                              </Badge>
                            ))}
                            {role.permissions.length > 4 && (
                              <Badge bg="secondary">
                                +{role.permissions.length - 4} อื่นๆ
                              </Badge>
                            )}
                          </div>
                        </div>

                        <div className="role-actions mt-3">
                          <Button
                            variant="outline-primary"
                            size="sm"
                            onClick={() => handleEdit("role", role)}
                          >
                            แก้ไข
                          </Button>
                          <Button
                            variant="outline-info"
                            size="sm"
                            className="ms-2"
                          >
                            ดูรายละเอียด
                          </Button>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Card.Body>
          </Card>
        </Tab>

        {/* Permissions Tab */}
        <Tab eventKey="permissions" title="สิทธิ์ทั้งหมด">
          <Card className="permissions-card">
            <Card.Header className="card-header-permissions">
              <h5 className="card-title">รายการสิทธิ์ทั้งหมด</h5>
            </Card.Header>
            <Card.Body>
              {allPermissions.map((category) => (
                <div key={category.id} className="permission-category mb-4">
                  <h6 className="category-title">{category.category}</h6>
                  <Table responsive className="permissions-detail-table">
                    <thead>
                      <tr>
                        <th>สิทธิ์</th>
                        <th>คำอธิบาย</th>
                        <th>บทบาทที่มีสิทธิ์</th>
                      </tr>
                    </thead>
                    <tbody>
                      {category.permissions.map((perm) => (
                        <tr key={perm.key}>
                          <td>
                            <code>{perm.key}</code>
                            <div className="permission-name">{perm.name}</div>
                          </td>
                          <td>{perm.description}</td>
                          <td>
                            <div className="roles-with-permission">
                              {roles
                                .filter((role) =>
                                  role.permissions.includes(perm.key),
                                )
                                .map((role) => (
                                  <Badge
                                    key={role.name}
                                    bg={role.color}
                                    className="me-1 mb-1"
                                  >
                                    {role.displayName}
                                  </Badge>
                                ))}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              ))}
            </Card.Body>
          </Card>
        </Tab>
      </Tabs>

      {/* Design Button Bar (Footer) */}
      <div className="project-selection-footer">
        <div className="footer-info">
          <p className="footer-text">
            🔐 <strong>เคล็ดลับการจัดการสิทธิ์:</strong>{" "}
            กำหนดสิทธิ์ตามหน้าที่และความรับผิดชอบของแต่ละบทบาท
            เพื่อความปลอดภัยของระบบและข้อมูล
            อย่าลืมตรวจสอบสิทธิ์การเข้าถึงเป็นประจำ
          </p>
        </div>
      </div>

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
            {modalType === "user" ? "ผู้ใช้งาน" : "บทบาท"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {modalType === "user" && (
              <>
                <Row>
                  <Col md={6} className="mb-3">
                    <Form.Label>ชื่อ-นามสกุล</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="กรอกชื่อ-นามสกุล"
                      defaultValue={selectedItem?.fullName || ""}
                    />
                  </Col>
                  <Col md={6} className="mb-3">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="กรอก username"
                      defaultValue={selectedItem?.username || ""}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={6} className="mb-3">
                    <Form.Label>อีเมล</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="กรอกอีเมล"
                      defaultValue={selectedItem?.email || ""}
                    />
                  </Col>
                  <Col md={6} className="mb-3">
                    <Form.Label>แผนก</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="กรอกแผนก"
                      defaultValue={selectedItem?.department || ""}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={6} className="mb-3">
                    <Form.Label>บทบาท</Form.Label>
                    <Form.Select defaultValue={selectedItem?.role || ""}>
                      <option value="">เลือกบทบาท</option>
                      {roles.map((role) => (
                        <option key={role.name} value={role.name}>
                          {role.displayName}
                        </option>
                      ))}
                    </Form.Select>
                  </Col>
                  <Col md={6} className="mb-3">
                    <Form.Label>สถานะ</Form.Label>
                    <Form.Select
                      defaultValue={selectedItem?.status || "active"}
                    >
                      <option value="active">ใช้งาน</option>
                      <option value="inactive">ไม่ใช้งาน</option>
                      <option value="suspended">ระงับ</option>
                    </Form.Select>
                  </Col>
                </Row>
                {!selectedItem && (
                  <Row>
                    <Col md={6} className="mb-3">
                      <Form.Label>รหัสผ่าน</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="กรอกรหัสผ่าน"
                      />
                    </Col>
                    <Col md={6} className="mb-3">
                      <Form.Label>ยืนยันรหัสผ่าน</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="ยืนยันรหัสผ่าน"
                      />
                    </Col>
                  </Row>
                )}
              </>
            )}

            {modalType === "role" && (
              <>
                <div className="mb-3">
                  <Form.Label>ชื่อบทบาท</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="กรอกชื่อบทบาท"
                    defaultValue={selectedItem?.displayName || ""}
                  />
                </div>
                <div className="mb-3">
                  <Form.Label>คำอธิบาย</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    placeholder="อธิบายบทบาทนี้"
                    defaultValue={selectedItem?.description || ""}
                  />
                </div>
                <div className="mb-3">
                  <Form.Label>สี</Form.Label>
                  <Form.Select defaultValue={selectedItem?.color || "primary"}>
                    <option value="primary">น้ำเงิน</option>
                    <option value="success">เขียว</option>
                    <option value="warning">เหลือง</option>
                    <option value="danger">แดง</option>
                    <option value="info">ฟ้าอ่อน</option>
                    <option value="secondary">เทา</option>
                  </Form.Select>
                </div>
                <div className="mb-3">
                  <Form.Label>สิทธิ์</Form.Label>
                  <div className="permissions-checkboxes">
                    {allPermissions.map((category) => (
                      <div
                        key={category.id}
                        className="permission-category-checkbox mb-3"
                      >
                        <h6>{category.category}</h6>
                        {category.permissions.map((perm) => (
                          <Form.Check
                            key={perm.key}
                            type="checkbox"
                            label={`${perm.name} - ${perm.description}`}
                            value={perm.key}
                            defaultChecked={selectedItem?.permissions?.includes(
                              perm.key,
                            )}
                            className="mb-2"
                          />
                        ))}
                      </div>
                    ))}
                  </div>
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

export default UserPermissions;
