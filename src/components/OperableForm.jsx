import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import OperableSection from "./OperableSection";

const OperableForm = () => {
    const sections = [
        {
            title: "ไม่มีคีย์ลัดทำให้สับสน",
            description:
                "หลีกเลี่ยงการใช้ตีย์ลัดที่อาจชนกับระบบ (เช่น Alt+F4)",
            defaultFound: true,
            component: "OperableSection",
        },
        {
            title: "ปรับเวลาได้",
            description: "ถ้าเว็บมีเวลา (เช่น timeout ต้องให้ผู้ใช้ขยายเวลาได้)",
            defaultFound: true,
            component: "OperableSection",
        },
        {
            title: "หยุด/พัก/ซ่อนเนื้อหาเคลื่อนไหว",
            description: "เนื้อหาที่เลื่อนหรือ กระพริบต้องสามารถหยุดได้",
            defaultFound: false,
            component: "OperableSection",
        },
        {
            title: "ไม้มีเนื้อหากระพริบเกิน 3 ครั้ง",
            description: "ป้องกันอาการชักจากการกระตุ้นทางสายตา",
            defaultFound: true,
            component: "OperableSection",
        },
        {
            title: "ข้ามไปยังเนื้อหาหลักได้",
            description:
                "มีลิงค์ข้ามไปยังเนื้อหา ให้ผู้ใช้งานข้ามเมนูได้",
            defaultFound: false,
            component: "OperableSection",
        },
    ];

    // เชื่อม component string กับ component จริง
    const componentMap = {
        OperableSection: OperableSection,
    };

    const navigator = useNavigate();

    const handleNextPage = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        navigator("/work/Test-website/3");
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
                                    <OperableSection
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

export default OperableForm;
