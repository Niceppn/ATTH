import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import UnderstandSection from "./UnderstandSection";
import RobustSection from "./RobustSection";

const RobustForm = () => {
    const sections = [
        {
            title: "เมนูหรีอ ปุ่มสามารถทำงานคาดเดาได้",
            description:
                "ปุ่มควรทำสิ่งที่ผู้ใช้คาดหวัง (เช่น ยืนยัน, ไม่ควร, ลบข้อมูล)",
            defaultFound: true,
            component: "UnderstandSection",
        },
        {
            title: "มีการตรวจสอบข้อผิดพลาด",
            description: "หากผู้ใช้กรอกผิด (เช่น เว้นช่องว่าง ต้องแจ้งว่าเกิดข้อผิดพลาด)",
            defaultFound: true,
            component: "UnderstandSection",
        },
        {
            title: "มีป้ายชื่อช่องกรอกชัดเจน",
            description: " แต่ละช่องในฟอร์มต้องมี label บอกหน้าที่",
            defaultFound: false,
            component: "UnderstandSection",
        },
        {
            title: "โค้ดไม่มีข้อผิดพลาดร้ายเเรง",
            description: "HTML ถูกต้องตามมาตรฐาน ไมมีแท็กผิดซ้อน",
            defaultFound: true,
            component: "RobustSection",
        },
        {
            title: "ส่วนโต้ตอบมีคุณลักษณะที่ช่ยให้เครื่องอ่่านเข้าใจง่าย",
            description:
                "ใช้ ASIA, label, name ให้ปุ่มลิงก์ แบบฟอร์ม",
            defaultFound: false,
            component: "RobustSection",
        },
    ];

    // เชื่อม component string กับ component จริง
    const componentMap = {
        UnderstandSection: UnderstandSection,
        RobustSection: RobustSection,
    };

    const navigator = useNavigate();
    const handleSave = () => {
        alert("Saved Success!")
        navigator("/work")
    };
    const chunkArray = (arr, size) => {
        const result = [];
        for (let i = 0; i < arr.length; i += size) {
            result.push(arr.slice(i, i + size));
        }
        return result;
    };

    const sectionChunks = chunkArray(sections, 2);

    return (

        <div className="file-upload-form">
            <div className="form-header">
                <h4 className="form-title">เว็บไซต์</h4>
            </div>

            <Container fluid>
                {sectionChunks.map((chunk, rowIndex) => (
                    <Row key={rowIndex} className="mb-4">
                        {chunk.map((section, index) => {
                            const SectionComponent = componentMap[section.component];
                            const isLastRow = rowIndex === sectionChunks.length - 1;
                            const isLastItem = chunk.length === 1 && isLastRow;

                            return (
                                <Col
                                    key={index}
                                    xs={12}
                                    md={isLastItem ? 12 : 8}
                                    lg={isLastItem ? 8 : 6}
                                    className={isLastItem ? "mx-auto" : ""}
                                >
                                    <SectionComponent
                                        sectionNumber={rowIndex * 2 + index + 1}
                                        title={section.title}
                                        description={section.description}
                                        defaultFound={section.defaultFound}
                                    />
                                </Col>
                            );
                        })}
                    </Row>
                ))}

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

export default RobustForm;
