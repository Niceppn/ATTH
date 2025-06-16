import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import FileUploadSection from "./FileUploadSection";
import { useNavigate } from "react-router-dom";

const FileUploadForm = () => {
  const sections = [
    {
      title: "มีรอยเเตกร้าวที่ผิดปกติบริเวณ เสา คาน พื้น",
      description:
        "มีรอยแตกร้าวขนาดใหญ่และลึกผิดปกติบริเวณเสา คาน และพื้น ซึ่งอาจเกิดจากการทรุดตัวของโครงสร้างหรืวัสดุเสื่อมสภาพตามกาลเวลาควรเร่งดำเนินการตรวจสอบโดยวิศวกรโครงสร้างเพื่อประเมินความเสี่ยงและวางแผนซ่อมแซมอย่างเร่งด่วน",
      defaultFound: true,
    },
    {
      title: "มีรอยเเตกร้าวที่ผิดปกติบริเวณ เสา คาน พื้น",
      description:
        "มีรอยแตกร้าวขนาดใหญ่และลึกผิดปกติบริเวณเสา คาน และพื้น ซึ่งอาจเกิดจากการทรุดตัวของโครงสร้างหรืวัสดุเสื่อมสภาพตามกาลเวลาควรเร่งดำเนินการตรวจสอบโดยวิศวกรโครงสร้างเพื่อประเมินความเสี่ยงและวางแผนซ่อมแซมอย่างเร่งด่วน",
      defaultFound: true,
    },
    {
      title: "มีรอยเเตกร้าวแบบตาข่าย (Honeycomb cracks)",
      description:
        "มีรอยแตกนี้จะปรากฏเป็นแนวแตกหลายเส้นที่ตัดกันในหลายทิศทางสร้างเป็นช่องว่างขนาดเล็กที่มีรูปร่างคล้ายเซลล์รังผึ้งความลึกของรอยแตกมักไม่เท่ากันและอาจแพร่กระจายไปตามพื้นผิวควรเร่งดำเนินการตรวจสอบโดยวิศกรโครงสร้างเพื่อประเมินความเสี่ยงและวางแผนซ่อมแซมอย่างเร่งด่วน",
      defaultFound: false,
    },
    {
      title: "มีการเปลื่อยสลายของคอนกรีต(Spalling)",
      description:
        "มีคอนกรีตหลุดออกเป็นแผ่นหรือชิ้นขนาดตั้งแต่เหรียญไปจนถึงฝ่ามือมีความหนาที่หลุดประมาณ 1-5 ซม.หรือมากกว่าเเละขอบที่มักไม่เรียบมีรอยหยักหรือขรุขระควรเร่งดำเนินการตรวจสอบโดยวิศวกรโครงสร้างเพื่อประเมินความเสี่ยงเเละวางแผนซ่อมเเซมอย่างเร่งด่วน",
      defaultFound: true,
    },
    {
      title: "มีการซึมน้ำผ่านคอนกรีต",
      description:
        "มีลักษณะพื้นผิวคอนกรีตมีสีเข้มกว่าปกติ(เปียกชื้น)คราบน้ำไหลเป็นเส้นหรือรูปแบบไม่สม่ำเสมอ ซึ่งบริเวณที่เปียกอาจขยายกว้างขึ้นเมื่อฝนตกเเละสีของคอนกรีตเทาเข้ม ควรดำเนินการตรวจสอบโดยวิศวกรโครงสร้างเพื่อประเมินความเสี่ยงเเละวางแผนซ่อมแซมอย่างเร่งด่วน ",
      defaultFound: false,
    },
  ];

  const navigator = useNavigate();

  const handleNextPage = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    navigator("/work/Test-building/1");
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

export default FileUploadForm;
