import React, { useState } from "react";
import {
  Card,
  Row,
  Col,
  Button,
  Form,
  Badge,
  Modal,
  Alert,
} from "react-bootstrap";

const FieldCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0],
  );
  const [showEventModal, setShowEventModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  // Sample events data
  const events = [
    {
      id: 1,
      title: "การทดสอบ Mobile Banking App",
      date: "2024-01-15",
      time: "09:00-12:00",
      location: "ธนาคารกรุงเทพ สาขาสีลม",
      tester: "สมชาย ใจดี",
      client: "ธนาคารกรุงเทพ",
      type: "field",
      status: "confirmed",
      description: "ทดสอบการเข้าถึงระบบแอปพลิเคชันธนาคารบนมือถือ",
    },
    {
      id: 2,
      title: "การทดสอบเว็บไซต์ E-Government",
      date: "2024-01-16",
      time: "13:00-17:00",
      location: "กรมการปกครอง กระทรวงมหาดไทย",
      tester: "สมหญิง รักงาน",
      client: "กรมการปกครอง",
      type: "field",
      status: "pending",
      description: "ทดสอบความสอดคล้องกับมาตรฐาน WCAG 2.1",
    },
    {
      id: 3,
      title: "การทดสอบระบบจองออนไลน์",
      date: "2024-01-17",
      time: "10:00-15:00",
      location: "บริษัท เทคโนโลยี จำกัด",
      tester: "วิชัย เก่งมาก",
      client: "บริษัท เทคโนโลยี จำกัด",
      type: "field",
      status: "confirmed",
      description: "ทดสอบ UX/UI และการเข้าถึงของระบบจองออนไลน์",
    },
    {
      id: 4,
      title: "ประชุมวางแผนการทดสอบ",
      date: "2024-01-18",
      time: "14:00-16:00",
      location: "สำนักงานใหญ่",
      tester: "ทีมทดสอบ",
      client: "Internal",
      type: "meeting",
      status: "confirmed",
      description: "ประชุมวางแผนการทดสอบสำหรับโครงการใหม่",
    },
  ];

  const monthNames = [
    "มกราคม",
    "กุมภาพันธ์",
    "มีนาคม",
    "เมษายน",
    "พฤษภาคม",
    "มิถุนายน",
    "กรกฎาคม",
    "สิงหาคม",
    "กันยายน",
    "ตุลาคม",
    "พฤศจิกายน",
    "ธันวาคม",
  ];

  const dayNames = ["อา", "จ", "อ", "พ", "พฤ", "ศ", "ส"];

  // Get calendar days
  const getDaysInMonth = (month, year) => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startDate = firstDay.getDay();

    const days = [];

    // Add empty cells for days before the first day of month
    for (let i = 0; i < startDate; i++) {
      days.push(null);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }

    return days;
  };

  const getEventsForDate = (date) => {
    const dateString = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(date).padStart(2, "0")}`;
    return events.filter((event) => event.date === dateString);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "confirmed":
        return <Badge bg="success">ยืนยันแล้ว</Badge>;
      case "pending":
        return <Badge bg="warning">รอยืนยัน</Badge>;
      case "cancelled":
        return <Badge bg="danger">ยกเลิก</Badge>;
      default:
        return <Badge bg="secondary">ไม่ทราบ</Badge>;
    }
  };

  const getTypeBadge = (type) => {
    switch (type) {
      case "field":
        return <Badge bg="primary">ภาคสนาม</Badge>;
      case "meeting":
        return <Badge bg="info">ประชุม</Badge>;
      case "training":
        return <Badge bg="warning">อบรม</Badge>;
      default:
        return <Badge bg="secondary">อื่นๆ</Badge>;
    }
  };

  const navigateMonth = (direction) => {
    if (direction === "prev") {
      if (currentMonth === 0) {
        setCurrentMonth(11);
        setCurrentYear(currentYear - 1);
      } else {
        setCurrentMonth(currentMonth - 1);
      }
    } else {
      if (currentMonth === 11) {
        setCurrentMonth(0);
        setCurrentYear(currentYear + 1);
      } else {
        setCurrentMonth(currentMonth + 1);
      }
    }
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setShowEventModal(true);

    // Navigate calendar to the event's date
    const eventDate = new Date(event.date);
    setCurrentMonth(eventDate.getMonth());
    setCurrentYear(eventDate.getFullYear());
  };

  const todayEvents = events.filter(
    (event) => event.date === new Date().toISOString().split("T")[0],
  );

  return (
    <div className="calendar-container">
      {/* Page Header */}
      <div className="calendar-header">
        <h1 className="calendar-title">ปฏิทินงานภาคสนาม</h1>
        <p className="calendar-subtitle">
          จัดการตารางงาน นัดหมาย และกิจกรรมการทดสอบภาคสนาม
        </p>
      </div>

      {/* Real-time Status */}
      <Alert variant="info" className="mb-4">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <strong>เวลาปัจจุบัน:</strong> {new Date().toLocaleString("th-TH")}
            <span className="ms-3">
              <strong>กิจกรรมวันนี้:</strong> {todayEvents.length} รายการ
            </span>
          </div>
          <Button variant="primary" onClick={() => setShowAddModal(true)}>
            เพิ่มนัดหมาย
          </Button>
        </div>
      </Alert>

      <Row>
        {/* Calendar */}
        <Col lg={8} className="mb-4">
          <Card className="calendar-card">
            <Card.Header className="calendar-card-header">
              <div className="calendar-nav">
                <Button
                  variant="outline-light"
                  onClick={() => navigateMonth("prev")}
                >
                  ←
                </Button>
                <h5 className="calendar-month-year">
                  {monthNames[currentMonth]} {currentYear + 543}
                </h5>
                <Button
                  variant="outline-light"
                  onClick={() => navigateMonth("next")}
                >
                  →
                </Button>
              </div>
            </Card.Header>
            <Card.Body className="p-0">
              <div className="calendar-grid">
                {/* Day headers */}
                <div className="calendar-days-header">
                  {dayNames.map((day) => (
                    <div key={day} className="calendar-day-header">
                      {day}
                    </div>
                  ))}
                </div>

                {/* Calendar days */}
                <div className="calendar-days">
                  {getDaysInMonth(currentMonth, currentYear).map(
                    (day, index) => {
                      if (!day) {
                        return (
                          <div key={index} className="calendar-day empty"></div>
                        );
                      }

                      const dayEvents = getEventsForDate(day);
                      const isToday =
                        new Date().getDate() === day &&
                        new Date().getMonth() === currentMonth &&
                        new Date().getFullYear() === currentYear;

                      return (
                        <div
                          key={index}
                          className={`calendar-day ${isToday ? "today" : ""} ${dayEvents.length > 0 ? "has-events" : ""}`}
                        >
                          <div className="day-number">{day}</div>
                          <div className="day-events">
                            {dayEvents.slice(0, 2).map((event) => (
                              <div
                                key={event.id}
                                className={`event-dot ${event.status}`}
                                onClick={() => handleEventClick(event)}
                                title={event.title}
                              >
                                {event.title.substring(0, 15)}...
                              </div>
                            ))}
                            {dayEvents.length > 2 && (
                              <div className="more-events">
                                +{dayEvents.length - 2} เพิ่มเติม
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    },
                  )}
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Event List */}
        <Col lg={4} className="mb-4">
          <Card className="events-list-card">
            <Card.Header className="card-header-events">
              <h5 className="card-title">กิจกรรมที่กำลังจะมาถึง</h5>
            </Card.Header>
            <Card.Body>
              <div className="upcoming-events">
                {events.slice(0, 5).map((event) => (
                  <div
                    key={event.id}
                    className="event-item"
                    onClick={() => handleEventClick(event)}
                  >
                    <div className="event-header">
                      <div className="event-badges">
                        {getTypeBadge(event.type)}
                        {getStatusBadge(event.status)}
                      </div>
                      <div className="event-date">{event.date}</div>
                    </div>
                    <h6 className="event-title">{event.title}</h6>
                    <div className="event-details">
                      <div className="event-time">⏰ {event.time}</div>
                      <div className="event-location">📍 {event.location}</div>
                      <div className="event-tester">👤 {event.tester}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Event Detail Modal */}
      <Modal
        show={showEventModal}
        onHide={() => setShowEventModal(false)}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>รายละเอียดกิจกรรม</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedEvent && (
            <div className="event-detail">
              <div className="event-detail-header">
                <h5>{selectedEvent.title}</h5>
                <div className="event-detail-badges">
                  {getTypeBadge(selectedEvent.type)}
                  {getStatusBadge(selectedEvent.status)}
                </div>
              </div>

              <Row className="mt-3">
                <Col md={6}>
                  <div className="detail-item">
                    <strong>วันที่:</strong> {selectedEvent.date}
                  </div>
                  <div className="detail-item">
                    <strong>เวลา:</strong> {selectedEvent.time}
                  </div>
                  <div className="detail-item">
                    <strong>สถานที่:</strong> {selectedEvent.location}
                  </div>
                </Col>
                <Col md={6}>
                  <div className="detail-item">
                    <strong>ผู้ทดสอบ:</strong> {selectedEvent.tester}
                  </div>
                  <div className="detail-item">
                    <strong>ลูกค้า:</strong> {selectedEvent.client}
                  </div>
                </Col>
              </Row>

              <div className="detail-item mt-3">
                <strong>รายละเอียด:</strong>
                <p className="mt-2">{selectedEvent.description}</p>
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEventModal(false)}>
            ปิด
          </Button>
          <Button variant="warning">แก้ไข</Button>
          <Button variant="danger">ยกเลิก</Button>
        </Modal.Footer>
      </Modal>

      {/* Add Event Modal */}
      <Modal
        show={showAddModal}
        onHide={() => setShowAddModal(false)}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>เพิ่มนัดหมายใหม่</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col md={8} className="mb-3">
                <Form.Label>ชื่อกิจกรรม</Form.Label>
                <Form.Control type="text" placeholder="กรอกชื่อกิจกรรม" />
              </Col>
              <Col md={4} className="mb-3">
                <Form.Label>ประเภท</Form.Label>
                <Form.Select>
                  <option value="field">ภาคสนาม</option>
                  <option value="meeting">ประชุม</option>
                  <option value="training">อบรม</option>
                </Form.Select>
              </Col>
            </Row>
            <Row>
              <Col md={4} className="mb-3">
                <Form.Label>วันที่</Form.Label>
                <Form.Control type="date" />
              </Col>
              <Col md={4} className="mb-3">
                <Form.Label>เวลาเริ่ม</Form.Label>
                <Form.Control type="time" />
              </Col>
              <Col md={4} className="mb-3">
                <Form.Label>เวลาสิ้นสุด</Form.Label>
                <Form.Control type="time" />
              </Col>
            </Row>
            <div className="mb-3">
              <Form.Label>สถานที่</Form.Label>
              <Form.Control type="text" placeholder="กรอกสถานที่" />
            </div>
            <Row>
              <Col md={6} className="mb-3">
                <Form.Label>ผู้ทดสอบ</Form.Label>
                <Form.Select>
                  <option>เลือกผู้ทดสอบ</option>
                  <option>สมชาย ใจดี</option>
                  <option>สมหญิง รักงาน</option>
                  <option>วิชัย เก่งมาก</option>
                </Form.Select>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Label>ลูกค้า</Form.Label>
                <Form.Control type="text" placeholder="กรอกชื่อลูกค้า" />
              </Col>
            </Row>
            <div className="mb-3">
              <Form.Label>รายละเอียด</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="กรอกรายละเอียดกิจกรรม"
              />
            </div>
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

export default FieldCalendar;
