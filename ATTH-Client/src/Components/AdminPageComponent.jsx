import React, { useState } from 'react';
import '../HelpComponent.css'; // Assuming you have a CSS file for styles
import { Container, Row, Col, Accordion, Form, Button } from 'react-bootstrap';

const AdminPageComponent = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('ขอบคุณสำหรับข้อความของคุณ เราจะติดต่อกลับไปในเร็วๆ นี้');
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      subject: '',
      message: ''
    });
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="help-component pt-5">
      {/* Hero Section */}
      <section className="hero-section" id="home">
        <Container>
          <Row className="justify-content-center text-center">
            <Col lg={8}>
              <h1 className="display-4 fw-bold mb-4">ความช่วยเหลือ</h1>
              <p className="fs-5 mb-4">ศูนย์ช่วยเหลือและสนับสนุนสำหรับการใช้งาน ATTH</p>
              <p className="lead">พบคำตอบสำหรับคำถามทั่วไป คู่มือการใช้งาน และช่องทางการติดต่อเรา</p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* FAQ Section */}
      <section className="py-5" id="faq">
        <Container>
          <h2 className="section-title text-center">คำถามที่พบบ่อย</h2>
          <Row className="justify-content-center">
            <Col lg={8}>
              <Accordion defaultActiveKey="">
                <Accordion.Item eventKey="0" className="faq-item">
                  <Accordion.Header>
                    <i className="bi bi-clock me-3 text-primary-custom"></i>
                    การทดสอบใช้เวลานานแค่ไหน?
                  </Accordion.Header>
                  <Accordion.Body>
                    ระยะเวลาการทดสอบขึ้นอยู่กับขนาดและความซับซ้อนของโครงการ โดยทั่วไป:
                    <ul className="mt-3">
                      <li>เว็บไซต์ขนาดเล็ก: 1-2 สัปดาห์</li>
                      <li>แอปพลิเคชัน: 2-3 สัปดาห์</li>
                      <li>อาคาร/สถานที่: 1-4 สัปดาห์</li>
                      <li>โครงการขนาดใหญ่: 4-8 สัปดาห์</li>
                    </ul>
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="1" className="faq-item">
                  <Accordion.Header>
                    <i className="bi bi-currency-dollar me-3 text-primary-custom"></i>
                    ค่าใช้จ่ายเป็นอย่างไร?
                  </Accordion.Header>
                  <Accordion.Body>
                    ค่าใช้จ่ายจะขึ้นอยู่กับประเภทการทดสอบและขอบเขตงาน เราให้บริการ:
                    <ul className="mt-3">
                      <li>การให้คำปรึกษาในระยะออกแบบ</li>
                      <li>การทดสอบระหว่างพัฒนา</li>
                      <li>การทดสอบความพร้อมใช้งาน</li>
                      <li>รายงานและข้อเสนอแนะ</li>
                    </ul>
                    กรุณาติดต่อเราเพื่อขอใบเสนอราคาที่เหมาะสมกับโครงการของคุณ
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="2" className="faq-item">
                  <Accordion.Header>
                    <i className="bi bi-people me-3 text-primary-custom"></i>
                    ใครเป็นคนทดสอบ?
                  </Accordion.Header>
                  <Accordion.Body>
                    ทีมผู้ทดสอบของเราประกอบด้วย:
                    <ul className="mt-3">
                      <li>ผู้ใช้จริงจากกลุ่มเป้าหมายต่างๆ (คนพิการ, ผู้สูงอายุ, คนทั่วไป)</li>
                      <li>ผู้เชี่ยวชาญด้านเทคโนโลยีสิ่งอำนวยความสะดวก</li>
                      <li>นักออกแบบ UX/UI ที่มีความเชี่ยวชาญด้าน Accessibility</li>
                      <li>นักพัฒนาที่เข้าใจมาตรฐาน WCAG และ Universal Design</li>
                    </ul>
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="3" className="faq-item">
                  <Accordion.Header>
                    <i className="bi bi-file-text me-3 text-primary-custom"></i>
                    รายงานผลออกมาในรูปแบบไหน?
                  </Accordion.Header>
                  <Accordion.Body>
                    รายงานผลการทดสอบจะประกอบด้วย:
                    <ul className="mt-3">
                      <li>สรุปผลการทดสอบโดยรวม</li>
                      <li>รายละเอียดปัญหาที่พบและระดับความรุนแรง</li>
                      <li>ข้อเสนอแนะการปรับปรุง</li>
                      <li>วิดีโอการทดสอบ (ถ้าจำเป็น)</li>
                      <li>แนวทางการแก้ไขเฉพาะ</li>
                      <li>การประเมินตามมาตรฐาน WCAG</li>
                    </ul>
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="4" className="faq-item">
                  <Accordion.Header>
                    <i className="bi bi-gear me-3 text-primary-custom"></i>
                    สามารถทดสอบระหว่างการพัฒนาได้หรือไม่?
                  </Accordion.Header>
                  <Accordion.Body>
                    ได้แน่นอน! เราแนะนำให้ทดสอบในหลายระยะ:
                    <ul className="mt-3">
                      <li><strong>ระยะออกแบบ:</strong> ให้คำปรึกษาและข้อเสนอแนะ</li>
                      <li><strong>ระยะพัฒนา:</strong> ทดสอบ Prototype และ MVP</li>
                      <li><strong>ก่อนเปิดตัว:</strong> ทดสอบความพร้อมใช้งานจริง</li>
                      <li><strong>หลังเปิดตัว:</strong> ติดตามและปรับปรุงต่อเนื่อง</li>
                    </ul>
                    การทดสอบระหว่างพัฒนาจะช่วยประหยัดเวลาและค่าใช้จ่ายในการแก้ไขปัญหา
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Guide Section */}
      <section className="py-5 bg-light-custom" id="guide">
        <Container>
          <h2 className="section-title text-center">คู่มือการใช้งาน</h2>
          <Row>
            {[
              {
                step: 1,
                title: "ส่งข้อมูลโครงการ",
                content: "ส่งรายละเอียดโครงการของคุณผ่านแบบฟอร์มออนไลน์ หรือติดต่อทีมงานโดยตรง พร้อมแนบเอกสารหรือไฟล์ที่เกี่ยวข้อง",
                items: ["URL เว็บไซต์ หรือไฟล์แอป", "แบบแปลน หรือรูปภาพสถานที่", "เอกสารกระบวนการบริการ"]
              },
              {
                step: 2,
                title: "ประเมินและวางแผน",
                content: "ทีมงานจะประเมินโครงการและจัดทำแผนการทดสอบที่เหมาะสม รวมถึงกำหนดตารางเวลาและทรัพยากรที่จำเป็น",
                items: ["วิเคราะห์ขอบเขตงาน", "เลือกกลุ่มผู้ทดสอบ", "กำหนดวิธีการทดสอบ"]
              },
              {
                step: 3,
                title: "ดำเนินการทดสอบ",
                content: "เริ่มต้นการทดสอบโดยผู้ใช้จริงและผู้เชี่ยวชาญ พร้อมบันทึกผลและข้อสังเกตทุกขั้นตอน",
                items: ["ทดสอบการใช้งานจริง", "บันทึกปัญหาและข้อเสนอแนะ", "จัดทำรายงานเบื้องต้น"]
              },
              {
                step: 4,
                title: "รับรายงานผล",
                content: "รับรายงานผลการทดสอบพร้อมข้อเสนอแนะการปรับปรุง และสามารถนัดหมายชี้แจงรายละเอียดเพิ่มเติมได้",
                items: ["รายงานฉบับสมบูรณ์", "แนวทางการแก้ไข", "การติดตามผลต่อเนื่อง"]
              }
            ].map((step, index) => (
              <Col lg={6} className="mb-4" key={index}>
                <div className="guide-step">
                  <div className="step-number">{step.step}</div>
                  <h5>{step.title}</h5>
                  <p>{step.content}</p>
                  <ul>
                    {step.items.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Contact Section */}
      <section className="py-5" id="contact">
        <Container>
          <h2 className="section-title text-center">ติดต่อเรา</h2>
          <Row>
            {[
              {
                icon: "bi-envelope",
                title: "อีเมล",
                desc: "ส่งคำถามหรือข้อสงสัยมาหาเรา",
                link: "mailto:info@atth.co.th",
                text: "info@atth.co.th"
              },
              {
                icon: "bi-telephone",
                title: "โทรศัพท์",
                desc: "โทรสอบถามได้ในเวลาทำการ",
                link: "tel:02-xxx-xxxx",
                text: "02-xxx-xxxx"
              },
              {
                icon: "bi-chat-dots",
                title: "Line Official",
                desc: "แชทสอบถามได้ตลอด 24 ชั่วโมง",
                link: "https://line.me/R/ti/p/@atth",
                text: "@atth"
              },
              {
                icon: "bi-geo-alt",
                title: "ที่อยู่",
                desc: "มาเยี่ยมชมออฟฟิศของเราได้",
                link: "#",
                text: "ดูแผนที่"
              }
            ].map((contact, index) => (
              <Col lg={3} md={6} className="mb-4" key={index}>
                <div className="contact-card text-center">
                  <div className="contact-icon mx-auto">
                    <i className={`bi ${contact.icon}`}></i>
                  </div>
                  <h5>{contact.title}</h5>
                  <p className="text-muted mb-3">{contact.desc}</p>
                  <a href={contact.link} className="btn btn-outline-custom btn-sm">
                    {contact.text}
                  </a>
                </div>
              </Col>
            ))}
          </Row>

          {/* Contact Form */}
          <Row className="justify-content-center mt-5">
            <Col lg={8}>
              <div className="contact-card">
                <h4 className="text-center mb-4">ส่งข้อความหาเรา</h4>
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col md={6} className="mb-3">
                      <Form.Label>ชื่อ-นามสกุล *</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                      />
                    </Col>
                    <Col md={6} className="mb-3">
                      <Form.Label>อีเมล *</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6} className="mb-3">
                      <Form.Label>เบอร์โทรศัพท์</Form.Label>
                      <Form.Control
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                      />
                    </Col>
                    <Col md={6} className="mb-3">
                      <Form.Label>บริษัท/องค์กร</Form.Label>
                      <Form.Control
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                      />
                    </Col>
                  </Row>
                  <div className="mb-3">
                    <Form.Label>หัวข้อ *</Form.Label>
                    <Form.Select
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">เลือกหัวข้อ</option>
                      <option value="quote">ขอใบเสนอราคา</option>
                      <option value="consultation">ปรึกษาโครงการ</option>
                      <option value="support">ขอความช่วยเหลือ</option>
                      <option value="other">อื่นๆ</option>
                    </Form.Select>
                  </div>
                  <div className="mb-3">
                    <Form.Label>รายละเอียด *</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={5}
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="text-center">
                    <Button type="submit" className="btn-primary-custom">
                      ส่งข้อความ
                    </Button>
                  </div>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Resources Section */}
      <section className="py-5 bg-light-custom" id="resources">
        <Container>
          <h2 className="section-title text-center">ทรัพยากรและบทความ</h2>
          <Row>
            {[
              {
                icon: "bi-book",
                title: "มาตรฐาน WCAG",
                desc: "เรียนรู้เกี่ยวกับมาตรฐานการเข้าถึงเว็บไซต์ที่ใช้ทั่วโลก",
                action: "อ่านเพิ่มเติม"
              },
              {
                icon: "bi-lightbulb",
                title: "Universal Design",
                desc: "หลักการออกแบบที่ทุกคนสามารถใช้งานได้อย่างสะดวก",
                action: "ดูตัวอย่าง"
              },
              {
                icon: "bi-tools",
                title: "เครื่องมือทดสอบ",
                desc: "เครื่องมือและซอฟต์แวร์ที่ใช้ในการทดสอบการเข้าถึง",
                action: "ดูรายการ"
              },
              {
                icon: "bi-graph-up",
                title: "Case Studies",
                desc: "ตัวอย่างโครงการที่เราได้ทำการทดสอบและปรับปรุง",
                action: "ดูผลงาน"
              },
              {
                icon: "bi-people",
                title: "การอบรม",
                desc: "หลักสูตรอบรมเรื่องการออกแบบและพัฒนาที่เข้าถึงได้",
                action: "ลงทะเบียน"
              },
              {
                icon: "bi-newspaper",
                title: "ข่าวสารและบล็อก",
                desc: "อัปเดตข่าวสารและบทความใหม่ๆ เกี่ยวกับการเข้าถึง",
                action: "อ่านบล็อก"
              }
            ].map((resource, index) => (
              <Col lg={4} md={6} className="mb-4" key={index}>
                <div className="resource-card">
                  <div className="text-primary-custom mb-3">
                    <i className={`bi ${resource.icon} fs-1`}></i>
                  </div>
                  <h5>{resource.title}</h5>
                  <p className="text-muted">{resource.desc}</p>
                  <Button variant="outline-custom" size="sm">
                    {resource.action}
                  </Button>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-5">
        <Container>
          <Row className="justify-content-center text-center">
            <Col lg={8}>
              <h2 className="mb-4">ยังมีคำถามอยู่ใช่ไหม?</h2>
              <p className="fs-5 text-muted mb-4">
                ติดต่อทีมงานของเราได้ทันที เราพร้อมช่วยเหลือและให้คำปรึกษาเกี่ยวกับโครงการของคุณ
              </p>
              <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
                <Button 
                  className="btn-primary-custom"
                  onClick={() => scrollToSection('contact')}
                >
                  ติดต่อเราเลย
                </Button>
                <Button 
                  variant="outline-custom"
                  href="tel:02-xxx-xxxx"
                >
                  โทร 02-xxx-xxxx
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default AdminPageComponent;
