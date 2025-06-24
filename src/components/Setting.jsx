import React, { useState } from 'react';
import {
  Card, Row, Col, Button, Form, Tabs, Tab, Alert, Image
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './Setting.css';

const SystemSettings = () => {
  const [activeTab, setActiveTab] = useState('templates');
  const [profilePic, setProfilePic] = useState(null);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [gender, setGender] = useState('');
  const [saving, setSaving] = useState(false);
  const [language, setLanguage] = useState('thai');
  const [theme, setTheme] = useState('light');
  const [fontSize, setFontSize] = useState('medium');
  const [showTable, setShowTable] = useState(true);
  const [notifications, setNotifications] = useState({
    enabled: false,
    email: false,
    sms: false,
    push: false,
  });

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProfilePic(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const toggleNotificationChannel = (channel) => {
    setNotifications((prev) => ({
      ...prev,
      [channel]: !prev[channel],
    }));
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await new Promise((res) => setTimeout(res, 1000));
      alert('บันทึกข้อมูลโปรไฟล์สำเร็จ!');
      navigate('/work');
    } catch (error) {
      alert('เกิดข้อผิดพลาดขณะบันทึกข้อมูล');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="system-settings-container py-5">
      <div className="settings-header">
        <h1 className="settings-title">ตั้งค่าระบบ</h1>
        <p className="settings-subtitle">
          จัดการข้อมูลส่วนตัวและการตั้งค่าการแสดงผล
        </p>
      </div>

      <Tabs
        activeKey={activeTab}
        onSelect={setActiveTab}
        className="settings-tabs mb-4"
      >
        <Tab eventKey="templates" title="ข้อมูลส่วนตัว">
          <Card className="settings-card">
            <div className="card-header-settings">
              <h6>ข้อมูลโปรไฟล์</h6>
            </div>
            <Card.Body className="p-5">
              <Form onSubmit={handleSubmit}>
                <div className="d-flex flex-column align-items-center">
                  <Col md={3} className="text-center">
                    <Image
                      src={profilePic || 'https://via.placeholder.com/120?text=Profile'}
                      roundedCircle
                      fluid
                      alt="โปรไฟล์"
                      className="profile-image"
                    />
                    <Form.Group controlId="profilePic" className="mt-3">
                      <Form.Label className="profile-upload-btn">
                        เปลี่ยนรูปโปรไฟล์
                        <Form.Control
                          type="file"
                          accept="image/*"
                          onChange={handleProfilePicChange}
                          hidden
                        />
                      </Form.Label>
                    </Form.Group>
                  </Col>

                  <Col md={8} className="my-3">
                    <Row className="g-3">
                      <Form.Group as={Col} md="6" controlId="username">
                        <Form.Label className="form-label">ชื่อผู้ใช้</Form.Label>
                        <Form.Control
                          type="text"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          placeholder="กรอกชื่อผู้ใช้"
                          className="shadow-sm"
                        />
                      </Form.Group>
                      <Form.Group as={Col} md="6" controlId="email">
                        <Form.Label className="form-label">อีเมล</Form.Label>
                        <Form.Control
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="กรอกอีเมล"
                          className="shadow-sm"
                        />
                      </Form.Group>
                      <Form.Group as={Col} md="6" controlId="fullName">
                        <Form.Label className="form-label">ชื่อ-นามสกุล</Form.Label>
                        <Form.Control
                          type="text"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="กรอกชื่อ-นามสกุล"
                          className="shadow-sm"
                        />
                      </Form.Group>
                      <Form.Group as={Col} md="6" controlId="birthDate">
                        <Form.Label className="form-label">วันเกิด</Form.Label>
                        <Form.Control
                          type="date"
                          value={birthDate}
                          onChange={(e) => setBirthDate(e.target.value)}
                          className="shadow-sm"
                        />
                      </Form.Group>
                      <Form.Group as={Col} md="6" controlId="phone">
                        <Form.Label className="form-label">เบอร์โทรศัพท์</Form.Label>
                        <Form.Control
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="กรอกเบอร์โทรศัพท์"
                          className="shadow-sm"
                        />
                      </Form.Group>
                      <Form.Group as={Col} md="6" controlId="gender">
                        <Form.Label className="form-label">เพศ</Form.Label>
                        <Form.Select
                          value={gender}
                          onChange={(e) => setGender(e.target.value)}
                          className="shadow-sm"
                        >
                          <option value="">เลือกเพศ</option>
                          <option value="male">ชาย</option>
                          <option value="female">หญิง</option>
                          <option value="other">อื่น ๆ</option>
                        </Form.Select>
                      </Form.Group>
                      <Form.Group as={Col} md="12" controlId="address">
                        <Form.Label className="form-label">ที่อยู่</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={3}
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          placeholder="กรอกที่อยู่"
                          className="shadow-sm"
                        />
                      </Form.Group>
                    </Row>
                  </Col>
                  <Col>
                    <div className="d-flex justify-content-center mt-3">
                      <Button type="submit" disabled={saving} variant="primary">
                        {saving ? 'กำลังบันทึก...' : 'บันทึกข้อมูล'}
                      </Button>
                    </div>
                  </Col>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Tab>
        <Tab eventKey="general" title="การแสดงผล">
          <Row>
            <Col lg={6}>
              <Card className="settings-card mb-4">
                <div className="card-header-settings">
                  <h6>การแสดงผล</h6>
                </div>
                <Card.Body>
                  <section className="mb-5">
                    <h5 className="section-title">การแจ้งเตือน</h5>
                    <Form.Check
                      type="switch"
                      id="notifications-enabled"
                     ilibre

                      label="เปิดการแจ้งเตือนทั้งหมด"
                      checked={notifications.enabled}
                      onChange={() => setNotifications(prev => ({ ...prev, enabled: !prev.enabled }))}
                      className="mb-3"
                    />
                    {notifications.enabled && (
                      <div className="ps-3">
                        <Form.Check
                          type="checkbox"
                          id="notify-email"
                          label="แจ้งเตือนทางอีเมล"
                          checked={notifications.email}
                          onChange={() => toggleNotificationChannel('email')}
                          className="mb-2"
                        />
                        <Form.Check
                          type="checkbox"
                          id="notify-sms"
                          label="แจ้งเตือนทาง SMS"
                          checked={notifications.sms}
                          onChange={() => toggleNotificationChannel('sms')}
                          className="mb-2"
                        />
                        <Form.Check
                          type="checkbox"
                          id="notify-push"
                          label="แจ้งเตือนแบบ Push Notification"
                          checked={notifications.push}
                          onChange={() => toggleNotificationChannel('push')}
                        />
                      </div>
                    )}
                  </section>
                  <section className="mb-5">
                    <h5 className="section-title">ภาษา</h5>
                    <Form.Select
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      className="shadow-sm"
                    >
                      <option value="thai">ไทย</option>
                      <option value="english">English</option>
                    </Form.Select>
                  </section>
                  <section className="mb-5">
                    <h5 className="section-title">ธีมสี</h5>
                    <Form.Select
                      value={theme}
                      onChange={(e) => setTheme(e.target.value)}
                      className="shadow-sm"
                    >
                      <option value="light">โหมดสว่าง</option>
                      <option value="dark">โหมดมืด</option>
                    </Form.Select>
                  </section>
                  <section className="mb-5">
                    <h5 className="section-title">การแสดงผล</h5>
                    <Row className="g-3">
                      <Col md={6}>
                        <Form.Label className="form-label">ขนาดฟอนต์</Form.Label>
                        <Form.Select
                          value={fontSize}
                          onChange={(e) => setFontSize(e.target.value)}
                          className="shadow-sm"
                        >
                          <option value="small">เล็ก</option>
                          <option value="medium">ปานกลาง</option>
                          <option value="large">ใหญ่</option>
                        </Form.Select>
                      </Col>
                      <Col md={6}>
                        <Form.Label className="form-label">การแสดงตาราง</Form.Label>
                        <Form.Check
                          type="switch"
                          id="show-table"
                          label={showTable ? 'แสดงตาราง' : 'ซ่อนตาราง'}
                          checked={showTable}
                          onChange={() => setShowTable(!showTable)}
                          className="mt-2"
                        />
                      </Col>
                    </Row>
                  </section>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={6}>
              <Card className="settings-card mb-4">
                <div className="card-header-settings">
                  <h6>การตั้งค่าการสำรองข้อมูล</h6>
                </div>
                <Card.Body>
                  <Alert variant="info">
                    การสำรองข้อมูลล่าสุด: {new Date().toLocaleString('th-TH')}
                  </Alert>
                  <Form>
                    <div className="mb-3">
                      <Form.Label className="form-label">ความถี่การสำรองข้อมูล</Form.Label>
                      <Form.Select defaultValue="daily" className="shadow-sm">
                        <option value="hourly">ทุกชั่วโมง</option>
                        <option value="daily">ทุกวัน</option>
                        <option value="weekly">ทุกสัปดาห์</option>
                      </Form.Select>
                    </div>
                    <div className="mb-3">
                      <Form.Label className="form-label">เก็บข้อมูลสำรอง</Form.Label>
                      <Form.Select defaultValue="30" className="shadow-sm">
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
    </div>
  );
};

export default SystemSettings;