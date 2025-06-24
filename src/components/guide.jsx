import React, { useState } from 'react';
import './TestingGuidelines.css'; // สไตล์เพิ่มเติม

const TestingGuidelines = () => {
    // State สำหรับจัดการ accordion (ถ้าไม่ใช้ Bootstrap accordion)
    const [activeSection, setActiveSection] = useState('auto');

    const testingMethods = [
        {
            id: 'auto',
            title: 'การทดสอบอัตโนมัติ',
            description:
                'ใช้เครื่องมืออัตโนมัติเพื่อตรวจสอบปัญหาการเข้าถึงพื้นฐาน เช่น ข้อความทางเลือกที่ขาดหายหรือความคมชัดของสีไม่เพียงพอ',
            tools: [
                { name: 'WAVE', url: 'https://wave.webaim.org/' },
                { name: 'Axe DevTools', url: 'https://www.deque.com/axe/' },
                { name: 'Lighthouse (ใน Chrome DevTools)', url: 'https://developer.chrome.com/docs/lighthouse/overview/' },
            ],
            steps: [
                'ติดตั้งส่วนขยายของเครื่องมือ เช่น WAVE หรือ Axe ในเบราว์เซอร์',
                'รันการสแกนหน้าเว็บและตรวจสอบรายงานปัญหา',
                'บันทึกปัญหาที่พบ เช่น ข้อความ Alt ที่ขาดหายหรือลิงก์ที่ไม่มีความหมาย',
            ],
            note: 'การทดสอบอัตโนมัติครอบคลุมเพียง 30-50% ของปัญหา ต้องใช้ควบคู่กับวิธีอื่น',
        },
        {
            id: 'manual',
            title: 'การทดสอบด้วยตนเอง',
            description:
                'ตรวจสอบด้วยตนเองเพื่อยืนยันว่าเว็บไซต์ใช้งานได้จริง เช่น การนำทางด้วยคีย์บอร์ดหรือการอ่านด้วย Screen Reader',
            tools: [
                { name: 'NVDA (Windows)', url: 'https://www.nvaccess.org/download/' },
                { name: 'VoiceOver (macOS)', url: 'https://www.apple.com/accessibility/vision/' },
                { name: 'Contrast Checker', url: 'https://webaim.org/resources/contrastchecker/' },
            ],
            steps: [
                'ทดสอบการนำทางด้วยคีย์บอร์ด: กด Tab เพื่อเลื่อนโฟกัส และ Enter เพื่อเลือก',
                'ใช้ Screen Reader เพื่อตรวจสอบว่าข้อความ Alt และ ARIA labels อ่านได้ถูกต้อง',
                'ตรวจสอบความคมชัดของสีด้วย Contrast Checker (ต้องได้อย่างน้อย 4.5:1 สำหรับข้อความปกติ)',
                'ทดสอบฟอร์ม: ตรวจสอบว่ามีข้อความแจ้งข้อผิดพลาดที่ชัดเจนหรือไม่',
            ],
            note: 'เน้นการทดสอบในบริบทจริง เช่น การใช้งานโดยไม่ใช้เมาส์',
        },
        {
            id: 'user',
            title: 'การทดสอบกับผู้ใช้จริง',
            description:
                'รวมผู้ใช้ที่มีความหลากหลาย เช่น ผู้พิการทางสายตา ผู้สูงอายุ หรือผู้ที่มีความบกพร่องทางการเคลื่อนไหว เพื่อทดสอบประสบการณ์จริง',
            tools: [],
            steps: [
                'คัดเลือกกลุ่มผู้ใช้ที่หลากหลาย เช่น ผู้ใช้ Screen Reader หรือผู้ที่มีปัญหาการมองเห็นสี',
                'กำหนดสถานการณ์การใช้งาน เช่น การกรอกฟอร์มหรือการค้นหาข้อมูล',
                'สังเกตและบันทึกปัญหาที่ผู้ใช้พบ เช่น การอ่านข้อความที่ไม่ชัดเจน',
                'สัมภาษณ์ผู้ใช้เพื่อเก็บข้อเสนอแนะ',
            ],
            note: 'การทดสอบนี้ช่วยค้นหาปัญหาที่เครื่องมืออัตโนมัติหรือการทดสอบด้วยตนเองมองข้าม',
        },
        {
            id: 'assistive',
            title: 'การทดสอบเทคโนโลยีช่วยเหลือ',
            description:
                'ตรวจสอบว่าเว็บไซต์เข้ากันได้กับเทคโนโลยีช่วยเหลือ เช่น Screen Reader หรือซอฟต์แวร์สั่งงานด้วยเสียง',
            tools: [
                { name: 'JAWS', url: 'https://www.freedomscientific.com/products/software/jaws/' },
                { name: 'Dragon NaturallySpeaking', url: 'https://www.nuance.com/dragon.html' },
            ],
            steps: [
                'ทดสอบ Screen Reader เพื่อยืนยันว่าโครงสร้าง HTML อ่านได้ถูกต้อง (เช่น การใช้ <h1> ถึง <h6> อย่างเหมาะสม)',
                'ตรวจสอบ ARIA roles และ labels เช่น aria-label สำหรับปุ่มที่ไม่มีข้อความ',
                'ทดสอบการสั่งงานด้วยเสียงเพื่อยืนยันว่าฟังก์ชันหลักใช้งานได้',
            ],
            note: 'ต้องใช้โค้ดที่เป็นมาตรฐาน เช่น semantic HTML และ ARIA เพื่อความเข้ากันได้',
        },
    ];

    return (
        <section id="testing-guidelines" className="container my-5" aria-labelledby="testing-guidelines-heading">
            <h2 id="testing-guidelines-heading" className="h2 mb-4 text-center">
                แนวทางการทดสอบตาม WCAG
            </h2>
            <p className="lead mb-5 text-center">
                แนวทางการทดสอบต่อไปนี้ช่วยให้คุณตรวจสอบว่าเว็บไซต์สอดคล้องกับ WCAG 2.1 ระดับ A และ AA
                โดยรวมทั้งการทดสอบอัตโนมัติ ด้วยตนเอง และกับผู้ใช้จริง
            </p>

            {/* Accordion for Testing Methods */}
            <div className="accordion" id="testingMethodsAccordion">
                {testingMethods.map((method, index) => (
                    <div key={method.id} className="accordion-item">
                        <h3 className="accordion-header" id={`heading-${method.id}`}>
                            <button
                                className={`accordion-button ${activeSection === method.id ? '' : 'collapsed'}`}
                                type="button"
                                onClick={() => setActiveSection(method.id)}
                                data-bs-toggle="collapse"
                                data-bs-target={`#collapse-${method.id}`}
                                aria-expanded={activeSection === method.id}
                                aria-controls={`collapse-${method.id}`}
                            >
                                {method.title}
                            </button>
                        </h3>
                        <div
                            id={`collapse-${method.id}`}
                            className={`accordion-collapse collapse ${activeSection === method.id ? 'show' : ''}`}
                            aria-labelledby={`heading-${method.id}`}
                            data-bs-parent="#testingMethodsAccordion"
                        >
                            <div className="accordion-body">
                                <p>{method.description}</p>
                                {method.tools.length > 0 && (
                                    <>
                                        <h4 className="h5 mt-4">เครื่องมือที่แนะนำ</h4>
                                        <ul className="list-group list-group-flush">
                                            {method.tools.map((tool, idx) => (
                                                <li key={idx} className="list-group-item">
                                                    <a
                                                        href={tool.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-decoration-underline"
                                                    >
                                                        {tool.name}
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    </>
                                )}
                                <h4 className="h5 mt-4">ขั้นตอนการทดสอบ</h4>
                                <ol className="list-group list-group-numbered">
                                    {method.steps.map((step, idx) => (
                                        <li key={idx} className="list-group-item">{step}</li>
                                    ))}
                                </ol>
                                <div className="alert alert-warning mt-3" role="alert">
                                    <strong>หมายเหตุ:</strong> {method.note}
                                </div>
                            </div>
                        </div>
                    </div>

      {/* Testing Workflow */ }
    < div className = "mt-5" >
        <h3 className="h3 mb-4">ขั้นตอนการทดสอบโดยรวม (Testing Workflow)</h3>
        <div className="card">
          <div className="card-body">
            <ol className="list-group list-group-numbered">
              <li className="list-group-item">
                <strong>กำหนดขอบเขต:</strong> เลือกหน้าเว็บหรือส่วนที่ต้องการทดสอบ (เช่น หน้าแรก, ฟอร์ม, เมนูนำทาง)
              </li>
              <li className="list-group-item">
                <strong>รันการทดสอบอัตโนมัติ:</strong> ใช้เครื่องมือ เช่น WAVE หรือ Axe เพื่อระบุปัญหาพื้นฐาน
              </li>
              <li className="list-group-item">
                <strong>ทดสอบด้วยตนเอง:</strong> ตรวจสอบการนำทางด้วยคีย์บอร์ดและ Screen Reader
              </li>
              <li className="list-group-item">
                <strong>ทดสอบกับผู้ใช้จริง:</strong> รวมกลุ่มผู้ใช้ที่มีความหลากหลายเพื่อเก็บข้อเสนอแนะ
              </li>
              <li className="list-group-item">
                <strong>แก้ไขและทดสอบซ้ำ:</strong> แก้ปัญหาที่พบและรันการทดสอบใหม่
              </li>
              <li className="list-group-item">
                <strong>รายงานผล:</strong> จัดทำรายงานระบุปัญหาและการแก้ไข พร้อมยืนยันระดับการปฏิบัติตาม (A/AA)
              </li>
            </ol>
          </div>
        </div>
      {/* Example Checklist */ }
                    < div className = "mt-5" >
        <h3 className="h3 mb-4">ตัวอย่างเช็กลิสต์การทดสอบ</h3>
        <div className="table-responsive">
          <table className="table table-striped table-bordered" aria-labelledby="ตารางเช็กลิสต์">
            <thead>
              <tr>
                <th scope="col">เกณฑ์ (WCAG)</th>
                <th scope="col">วิธีตรวจสอบ</th>
                <th scope="col">ผลลัพธ์ที่คาดหวัง</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1.1.1 Non-text Content</td>
                <td>ตรวจสอบรูปภาพด้วย WAVE หรือ Screen Reader</td>
                <td>ทุกภาพมีข้อความทางเลือก (Alt Text) ที่สื่อความหมาย</td>
              </tr>
              <tr>
                <td>1.1.4.3 Contrast Minimum</td>
                <td>ใช้ Contrast Checker</td>
                <td>อัตราส่วนความคมชัดอย่างน้อย 4.5:1 สำหรับข้อความปกติ</td>
              </tr>
              <tr>
                <td>2.1.1 Keyboard</td>
                <td>นำทางด้วยคีย์บอร์ด (Tab, Enter)</td>
                <td>ทุกฟังก์ชันใช้งานได้โดยไม่ต้องใช้เมาส์</td>
              </tr>
            </tbody>
          </table>
        </div>
      </>
        </section>
    );
};

export default TestingGuidelines;