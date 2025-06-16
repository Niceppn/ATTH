import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import FloorSection from "./FloorSection";
import GroundPlate from "./GroundPlate";
import EleSystem from "./ElesystemSection";
import RCDSystem from "./RDC-Section";
import LineSystem from "./LineEleSection";
import { useNavigate } from "react-router-dom";

const EleForm = () => {
    const sections = [
        {
            title: "พื้นไม่เอียงผิดปกติ",
            description:
                "มีรอยเเตกตามเเนวเหล็กเสริมเนื่องจากสนิมขยายตัวหรือ เหล็กเสริมลดขนาดหน้าตัดจากการกัดกร่อนและเหล็กเสริมเริ่มเกิดสนิมภายใน ดังนั้นควรเร่งดำเนินการตรวจสอบโดยวิศวกรโครงสร้างเพื่อประเมินความเสี่ยงเเละวางแผนซ่อมเเซมอย่างเร่งด่วน",
            defaultFound: true,
            Component: "FloorSection"
        },
        {
            title: "มีการติดตั้งสายดิน ",
            description:
                "มีสายดินติดตั้งที่ตู้เมนเชื่อมต่อำปยังแผ่นดิน(Ground Plate) โดยมีค่าความต้านานไม่เกิน2-5 โอห์ม, เต้ารับต้องมี 3ขา(มีขาสายดิน)เเละ อุปกรณ์ไฟฟ้าใหญ่ต้องมีสายดินเเยก หากไม่พบสิ่งเหล่านี้ควรเร่งดำเนินการตรวจสอบโดยวิศวกรไฟฟ้าเพื่อประเมินความเสี่ยงเเละวางแผนซ่อมเเซมอย่างเร่งด่วน",
            defaultFound: true,
            Component: "GroundPlate"
        },
        {
            title: "ระบบสายไฟ",
            description:
                "สายไฟมีรอยเเตกเเละลอกเปลือย, ฉนวนสายไฟเปราะเเตกหรือผุกร่อน, ข้อต่อสายไฟไม่เเน่นหนา, สายไฟร้อนผิดปกติหรือ มีกลิ่นไหม้จากสายไฟ หากพบความผิดปกติเหล่านี้ควรเร่งดำเนินการตรวจสอบโดยวิศวกรไฟฟ้าเพื่อประเมินความเสี่ยงเเละวางแผนซ่อมเเซมอย่างเร่งด่วน",
            defaultFound: false,
            Component: "EleSystem"
        },
        {
            title: "ระบบตัดไฟรั่ว (RCD/RCBO)",
            description:
                "มีRCDติดตั้งที่ตู้เมนโดยที่สามารถทดสอบปุ่ม Test ทำงานได้โดยที่ไฟจะดับทันทีเมื่อทำการกดปุ่ม Testเเละ Resetกลับไปเป็นปกติได้โดยที่ RCD ไม่เด้งผิดปกติ หากพบความผิดปปกติเหล่านี้ควรเร่งดำเนินการตรวจสอบโดยวิศวกรไฟฟ้าเพื่อประเมินความเสี่ยงเเละวางแผนซ่อมเเซมอย่างเร่งด่วน",
            defaultFound: true,
            Component: "RCDSystem"
        },
        {
            title: "สายไฟชำรุด",
            description:
                "มีสายไฟขาด, สายไฟพันกันรุงรัง, ปลั๊กเเละเต้ารับไม่หลวม, สวิตช์กดได้ปกติไม่ม่ติดขัด หากพบความผิดปกติข้างต้นควรเร่งดำเนินการตรวจสอบโดยวิศวกรไฟฟ้สเพื่อประเมินความเสี่ยงเเละวางแผนซ่อมเเซมอย่างเร่งด่วน",
            defaultFound: false,
            Component: "LineSystem"
        },
    ];

    const navigator = useNavigate();

    const handleNextPage = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        navigator("/work/Test-building/3");
    };

    const componentMap = {
        FloorSection: FloorSection,
        GroundPlate: GroundPlate,
        EleSystem: EleSystem,
        RCDSystem: RCDSystem,
        LineSystem: LineSystem,
    };

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

export default EleForm;
