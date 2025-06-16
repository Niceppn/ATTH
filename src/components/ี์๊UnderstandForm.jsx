import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import OperableSection from "./OperableSection";
import UnderstandSection from "./UnderstandSection";

const UnderstandForm = () => {
    const sections = [
        {
            title: "ตั้งชื่อแต่ละหน้าอย่างชัดเจน",
            description:
                "<title> ของแต่ละหน้าต้องสื่อความหมายชัด",
            defaultFound: true,
            component: "OperableSection",
        },
        {
            title: "ลำดับการโฟกัสเป็นธรรมชาติ",
            description: "กด Tab แล้วไฮไลท์ต้องวนไปตามลำดับที่มีความหมาย",
            defaultFound: true,
            component: "OperableSection",
        },
        {
            title: "ลิงค์มีข้อความบ่งบอกจุดหมาย",
            description: "เหลีกเลี่ยงข้อความ (เช่น ข้อความคลิกที่นี่ ควรใช้เป็น อ่านรายละเอียดการสมัคร)",
            defaultFound: false,
            component: "OperableSection",
        },
        {
            title: "ภาษาหลักของเว็บ",
            description: "ต้องกำหนด lang เป็น th หรือ en ให้ถูกต้อง",
            defaultFound: true,
            component: "UnderstandSection",
        },
        {
            title: "ไม่มีการเปลี่ยนหน้าอัตโนมัติ",
            description:
                "เมื่อเปลี่ยนค่าฟอร์ม (เช่น dropdown ไม่ควร redirectทันที)",
            defaultFound: false,
            component: "UnderstandSection",
        },
    ];

    // เชื่อม component string กับ component จริง
    const componentMap = {
        OperableSection: OperableSection,
        UnderstandSection: UnderstandSection,
    };

    const navigator = useNavigate();

    const handleNextPage = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        navigator("/work/Test-website/4");
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
                            variant="outline-success"
                            onClick={handleNextPage}
                            size="lg"
                            className="rounded-pill px-4"
                        >
                            ถัดไป →
                        </Button>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default UnderstandForm;
