import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import WebsiteSection from "./WebsitesSection";
import { useNavigate } from "react-router-dom";

const WebsiteForm = () => {
    const sections = [
        {
            title: "ข้อความแสดงแทน (Alt Text)",
            description:
                "ทุกภาพต้องมีคำอธิบาย (Alt) เพื่อให้ผู้ใช่งานที่มองไม่เห็นเข้าใจเนื้อหา",
            defaultFound: true,
        },
        {
            title: "คำบรรยายสื่อไม่เป็นเสียง",
            description:
                "หากมีวิดีโอแต่ไม่มีเสียง ต้องมีคำบรรยายข้อความ",
            defaultFound: true,
        },
        {
            title: "คำบรรยายเสียง",
            description:
                "วิดีโอที่มีเสียงต้องมีคำบรรยาย (เช่น subtitle)",
            defaultFound: false,
        },
        {
            title: "คำอธิบายเสียง (Audio Description)",
            description:
                "ต้องมีคำอธิบายเสริมสำหรับวิดีโอ (เช่น คำพูดอธิบายฉาก)",
            defaultFound: true,
        },
        {
            title: "ลำดับข้อมูลที่มีความหมาย",
            description:
                "ใช้เเท็ก HTML ให้ถูกต้อง (เช่น <h1>, <ul>, <table>)",
            defaultFound: false,
        },

    ];

    const navigator = useNavigate();

    const handleNextPage = () => {
        window.scrollTo({ top: 0, behavior: "smooth" })
        navigator("/work/Test-website/1");
        console.log("Navigate to next page");
    };

    // ประกาศฟังก์ชัน chunkArray ก่อนใช้งาน
    const chunkArray = (arr, size) => {
        const result = [];
        for (let i = 0; i < arr.length; i += size) {
            result.push(arr.slice(i, i + size));
        }
        return result;
    };

    // เรียกใช้งานหลังประกาศฟังก์ชัน
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
                                    <WebsiteSection
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
                            className="rounded-pill px-4 "
                        >
                            ถัดไป →
                        </Button>
                    </Col>
                </Row>
            </Container>

        </div>
    );
};

export default WebsiteForm;
