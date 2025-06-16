import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import FileUploadSection from "./FileUploadSection";
import { useNavigate } from "react-router-dom";

const BuildingForm = () => {
    const sections = [
        {
            title: "มีสนิมที่เหล็กเสริมโผล่",
            description:
                " มีคราบสนิทเพิ่มขึ้นอย่างต่อเนื่อง, สีเปลี่ยนจากสีส้มอ่อนเป็นสีน้ำตาลเข็มในระยะเวลาอันสั้นซึ่งสนิทจะสามารถไหลออกมาเป็นเเนวยาวเเละกว้าง เกิดพร้อมกันหลายๆจุดในโครงสร้างควรเร่งดำเนินการตรวจสอบโดยวิศวกรโครงสร้างเพื่อประเมินความเสี่ยงเเละวางแผนซ่อมเเซมอย่างเร่งด่วน ",
            defaultFound: true,
        },
        {
            title: "มีเหล็กเสริมเปิดออกมา (Exposed rebar)",
            description:
                "มีเหล็กเส้นโผล่ออกมาจากผิวคอนกรีตเป็นความยาวหลายเซนติเมตรหรือ หลุดมาทั้งก้อนควรเร่งดำเนินการตรวจสอบโดยวิศวกรโครงสร้างเพื่อประเมินความเสี่ยงและวางแผนซ่อมแซมอย่างเร่งด่วน",
            defaultFound: true,
        },
        {
            title: "มีการกัดกร่อนของเหล็กเสริม",
            description:
                "มีรอยเเตกตามเเนวเหล็กเสริมเนื่องจากสนิมขยายตัวหรือ เหล็กเสริมลดขนาดหน้าตัดจากการกัดกร่อนเเละเหล็กเสริมเริ่มเกิดสนิมภายใน ดังนั้นควรเร่งดำเนินการตรวจสอบโดยวิศวกรโครงสร้างเพื่อประเมินความเสี่ยงเเละวางแผนซ่อมเเซมอย่างเร่งด่วน",
            defaultFound: false,
        },
        {
            title: "มีการเอียงของโครงสร้าง",
            description:
                " มีการเอียงเล็กน้อยเเละตัวอาคารมีรอยเเตกเล็กๆตามมุมห้องซึ่งสามารถสังเกตุได้จากประตูหรือหน้าต่างเปิด-ปิดไม่เรียบ ควรเร่งดำเนินการตรวจสอบโดยวิศวกรโครงสร้างเพื่อประเมินความเสี่ยงเเละวางแผนซ่อมเเซมอย่างเร่วงด่วน",
            defaultFound: true,
        },
        {
            title: "มีการทรุดตัวที่ผิดปกติ",
            description:
                "มีรอยเเตกเเนวทะเเยงมุม,เเนวตั้งที่มุมห้อง,เเนวนอนที่ผนังหรือ คานหรือรอยเเตกที่เพดานโดยเฉพาะบริเวณกลางห้อง ควรเร่งดำเนินการตรวจสอบโดยวิศวกรโครงสร้างเพื่อประเมินความเสี่ยงเเละวางแผนซ่อมเเซมอย่างเร่งด่วน",
            defaultFound: false,
        },
    ];

    const navigator = useNavigate();

    const handleNextPage = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });

        navigator("/work/Test-building/2");
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
                <h4 className="form-title">โครงสร้างอาคาร/ตึก</h4>
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
                                    className={isLastItem ? "mx-auto" : ""}
                                >
                                    <FileUploadSection
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

export default BuildingForm;
