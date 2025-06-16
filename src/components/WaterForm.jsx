import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import PipeSection from "./PipeSection";
import LeakageSection from "./LeakSection.jsx";
import WaterSection from "./SystemSection.jsx";
import EquSection from "./EquSection.jsx";
import { useNavigate } from "react-router-dom";
import QuanSection from "./QuanlitySection.jsx";

const WaterForm = () => {
    const sections = [
        {
            title: "ระบบท่อน้ำ",
            description:
                "น้ำไม่ไหลลงท่อน้ำ, มีน้ำขังในห้องน้ำ, ระบบดูดซึมทำงานผิดปกติ, มีกลิ่นมาจากท่อและ เสียงน้ำไหลดังผิดปกติ หากมีสิ่งเหล่านี้ควรเร่งดำเนินการตรวจสอบโดยหน่วยงานการควบคุมมลพิษ(Pollution Control Department -PCD)เพื่อประเมินความเสี่ยงเเละวางแผนซ่อมเเซมอย่างเร่งด่วน",
            defaultFound: true,
            Component: "PipeSection"
        },
        {
            title: "น้ำรั่วซึมผ่านท่อ ",
            description:
                "ผนังมีรอยคราบน้ำหรือ รอยชื้น, พื้นมีน้ำรั่วซึ่ม, เพดานมีคราบเปียก, ข้อต่อท่อรั่วเเละ ฐานโถส้มรั่ว หากพบสิ่งผิดปกติแบบนี้ควรดำเนินการตรวจสอบโดยวิศวกรโครงสร้างเพื่อประเมินความเสี่ยงเเละวางแผนซ่อมเเซมอย่างเร่งด่วน",
            defaultFound: true,
            Component: "LeakageSection"
        },
        {
            title: "ระบบปะปา",
            description:
                "เเรงดันน้ำไม่เพียงพอทุกจุด, น้ำมีกลิ่น สี รสที่ผิดปกติ, ก๊อกน้ำรั่วหยด, ท่อน้ำมีเสียงแปลกหรือ วาล์วน้ำเปิด-ปิดไม่ได้ มาตรวัดน้ำอ่านค่าได้ไม่ชัดเจน ตู้มิเตอร์ไม่มีน้ำเข้า หากพบสิ่งปกติเหล่านี้ควรเร่งดำเนอนการตรวจสอบโดยหน่วยงานการควบคุมมลพิษ(Pollution Control Department -PCD)เพื่อประเมินความเสี่ยงเเละวางแผนซ่อมเเซมอย่างเร่งด่วน",
            defaultFound: false,
            Component: "WaterSection"
        },
        {
            title: "ระบบเก็บน้ำ",
            description:
                "ถังเก็บน้ำสกปรกมีสิ่งเจือปนม ถังน้ำเเตกมีรอยรั่วม ระบบปั๊มน้ำทำงานผิดปกติหรือ ท่อน้ำขาเข้า-ออกผิดปกติ หากพบสิ่งปกติเหล่านี้ควรเร่งดำเนอนการตรวจสอบโดยหน่วยงานการควบคุมมลพิษ",
            defaultFound: true,
            Component: "EquSection"
        },
        {
            title: "คุณภาพน้ำ",
            description:
                "น้ำดื่มใสมีกลิ่น, ค่าPHน้ำต่ำกปกติ(6.5-8.5), ไม่มีสนิมหรือตระกันหรือ น้ำอุณหภูมิปกติไม่มีเเบที่เรียปนเปื้อน หากพบสิ่งนอกเหนือจากหล่านี้ควรเร่งดำเนอนการตรวจสอบโดยหน่วยงานการควบคุมมลพิษ",
            defaultFound: false,
            Component: "QuanSection"
        },
    ];

    const navigator = useNavigate();

    const handleSave = () => {
        alert("Saved Success!")
        navigator("/work");
    };

    const componentMap = {
        PipeSection: PipeSection,
        LeakageSection: LeakageSection,
        WaterSection: WaterSection,
        EquSection: EquSection,
        QuanSection: QuanSection,
    }
    return (
        <div className="file-upload-form">
            <div className="form-header">
                <h4 className="form-title">โครงสร้างอาคาร/ตึก</h4>
            </div>

            <Container fluid>
                <Row>
                    {sections.map((section, index) => {
                        const SectionComponent = componentMap[section.Component];
                        return (
                            <Col key={index} xs={12} className="mb-4">
                                <SectionComponent
                                    sectionNumber={index + 1}
                                    title={section.title}
                                    description={section.description}
                                    defaultFound={section.defaultFound}
                                />
                            </Col>
                        );
                    })}
                </Row>

                <Row className="justify-content-between mt-4">
                    <Col xs="auto">
                        <Button
                            variant="outline-success"
                            onClick={() => navigator(-1)}
                            size="lg"
                            className="rounded-pill px-4"
                        >
                            ← ย้อนกลับ
                        </Button>
                    </Col>
                    <Col xs="auto">
                        <Button
                            variant="primary"
                            onClick={handleSave}
                            size="lg"
                            className="rounded-pill px-5 py-2 shadow-sm fw-bold text-white"
                        >
                            💾 บันทึก
                        </Button>

                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default WaterForm;
