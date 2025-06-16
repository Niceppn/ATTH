import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import WebsiteSection from "./WebsitesSection";
import { useNavigate } from "react-router-dom";
import OperableSection from "./OperableSection";

const WebsiteForm1 = () => {
    const sections = [
        {
            title: "ลำดับการอ่าน",
            description:
                "ลำดับของเนื้อหาควรเข้าใจได้แม้ใช้ screen reader หรือ keyboard",
            defaultFound: true,
            component: "WebsiteSection",
        },
        {
            title: "คำแนะนำภายในฟอร์ม",
            description: "ฟอร์มต้องมี label ชัดเจนบอกว่าช่องกรอกคืออะไร",
            defaultFound: true,
            component: "WebsiteSection",
        },
        {
            title: "ไม่พึ่งพาสีอย่างเดียว",
            description: "ห้ามใช้สีเพียงอย่างเดียวแสดงสถานะ (เช่น ข้อความสีแดง)",
            defaultFound: false,
            component: "WebsiteSection",
        },
        {
            title: "ควบคุมเสียงอัตโนมัติ",
            description: "หากมีเสียงอัตโนมัติ ต้องสามารถปิดเสียงได้",
            defaultFound: true,
            component: "OperableSection",
        },
        {
            title: "ควบคุมด้วยคีย์บอร์ดได้",
            description:
                "ทุกฟังก์ชันในเว็บต้องใช้งานได้ด้วยแค่คีย์บอร์ด (ไม่ต้องใช้เมาส์)",
            defaultFound: false,
            component: "OperableSection",
        },
    ];

    // เชื่อม component string กับ component จริง
    const componentMap = {
        WebsiteSection: WebsiteSection,
        OperableSection: OperableSection,
        // เพิ่ม Component อื่นๆ ถ้ามี เช่น:
        // CreamSection: CreamSection
    };

    const navigator = useNavigate();

    const handleNextPage = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        navigator("/work/Test-website/2");
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

export default WebsiteForm1;
