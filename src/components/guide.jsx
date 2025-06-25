import React, { useState } from 'react';
import './guide.css'
const Guide = () => {
    const [activeSection, setActiveSection] = useState('auto');

    const testingMethods = [
        {
            id: 'auto',
            title: '🤖 การทดสอบอัตโนมัติ (Automated Testing)',
            description: 'การทดสอบด้วยเครื่องมืออัตโนมัติช่วยระบุปัญหาพื้นฐานของการเข้าถึงได้อย่างรวดเร็ว สามารถตรวจพบปัญหาได้ประมาณ 30-40% ของปัญหาทั้งหมด',
            tools: [
                { name: 'WAVE Web Accessibility Evaluator', url: 'https://wave.webaim.org/' },
                { name: 'axe DevTools', url: 'https://www.deque.com/axe/devtools/' },
                { name: 'Lighthouse Accessibility Audit', url: 'https://developers.google.com/web/tools/lighthouse' },
                { name: 'Pa11y Command Line Tool', url: 'https://pa11y.org/' },
                { name: 'AccessiBe', url: 'https://accessibe.com/' }
            ],
            steps: [
                'เปิดเว็บไซต์ที่ต้องการทดสอบในเบราว์เซอร์',
                'ติดตั้งและเปิดใช้งานเครื่องมือทดสอบ (เช่น WAVE Extension)',
                'รันการทดสอบและรอผลลัพธ์',
                'ตรวจสอบรายการข้อผิดพลาดที่พบ (Errors)',
                'ดูคำเตือน (Alerts) และข้อแนะนำ (Features)',
                'บันทึกผลลัพธ์และจัดลำดับความสำคัญของปัญหา',
                'ทำการแก้ไขและทดสอบซ้ำ'
            ],
            note: 'การทดสอบอัตโนมัติไม่สามารถตรวจพบปัญหาทั้งหมดได้ ต้องใช้ร่วมกับการทดสอบด้วยตนเองด้วย'
        },
        {
            id: 'manual',
            title: '👤 การทดสอบด้วยตนเอง (Manual Testing)',
            description: 'การทดสอบด้วยตนเองช่วยตรวจพบปัญหาที่เครื่องมืออัตโนมัติไม่สามารถระบุได้ เช่น การใช้งานจริงและประสบการณ์ผู้ใช้',
            tools: [
                { name: 'Screen Reader (NVDA)', url: 'https://www.nvaccess.org/' },
                { name: 'Screen Reader (JAWS)', url: 'https://www.freedomscientific.com/products/software/jaws/' },
                { name: 'VoiceOver (Mac/iOS)', url: 'https://support.apple.com/guide/voiceover/' },
                { name: 'Colour Contrast Analyser', url: 'https://www.tpgi.com/color-contrast-checker/' },
                { name: 'WebAIM Contrast Checker', url: 'https://webaim.org/resources/contrastchecker/' }
            ],
            steps: [
                'ทดสอบการนำทางด้วยคีย์บอร์ดเท่านั้น (ไม่ใช้เมาส์)',
                'ตรวจสอบลำดับการ Focus และการมองเห็น Focus Indicator',
                'ทดสอบการใช้งาน Screen Reader',
                'ตรวจสอบความคมชัดของสีและข้อความ',
                'ทดสอบการ Zoom ที่ 200% และ 400%',
                'ตรวจสอบการตอบสนองบนอุปกรณ์ต่างๆ',
                'ทดสอบการใช้งานในโหมดมืด/สว่าง'
            ],
            note: 'ควรทดสอบในเบราว์เซอร์และอุปกรณ์ที่หลากหลาย เนื่องจากการทำงานอาจแตกต่างกัน'
        },
        {
            id: 'user',
            title: '👥 การทดสอบกับผู้ใช้จริง (User Testing)',
            description: 'การทดสอบกับผู้ใช้ที่มีความต้องการพิเศษช่วยให้เข้าใจปัญหาและความต้องการจริง เป็นวิธีที่มีประสิทธิภาพที่สุด',
            tools: [
                { name: 'UserTesting Accessibility Panel', url: 'https://www.usertesting.com/' },
                { name: 'Fable Community', url: 'https://makeitfable.com/' },
                { name: 'Access Works', url: 'https://access-works.com/' },
                { name: 'UsableNet Testing Services', url: 'https://usablenet.com/' }
            ],
            steps: [
                'กำหนดกลุ่มเป้าหมายและรับสมัครผู้เข้าร่วมทดสอบ',
                'เตรียมสถานการณ์การทดสอบ (Test Scenarios)',
                'จัดเซสชันทดสอบและบันทึกการใช้งาน',
                'สัมภาษณ์เพื่อเก็บความคิดเห็นและข้อเสนอแนะ',
                'วิเคราะห์ข้อมูลและจัดหมวดหมู่ปัญหา',
                'จัดทำรายงานพร้อมคำแนะนำการปรับปรุง',
                'ติดตามผลการแก้ไขด้วยการทดสอบซ้ำ'
            ],
            note: 'ควรมีผู้เข้าร่วมที่มีความหลากหลายในด้านความพิการและประสบการณ์การใช้เทคโนโลยี'
        },
        {
            id: 'mobile',
            title: '📱 การทดสอบบนอุปกรณ์มือถือ (Mobile Testing)',
            description: 'การทดสอบการเข้าถึงได้บนอุปกรณ์มือถือมีความสำคัญเป็นพิเศษ เนื่องจากมีข้อจำกัดด้านขนาดหน้าจอและวิธีการปฏิสัมพันธ์',
            tools: [
                { name: 'Mobile Accessibility Scanner (Android)', url: 'https://play.google.com/store/apps/details?id=com.google.android.apps.accessibility.auditor' },
                { name: 'VoiceOver (iOS)', url: 'https://support.apple.com/accessibility/iphone/' },
                { name: 'TalkBack (Android)', url: 'https://support.google.com/accessibility/android/answer/6283677' },
                { name: 'Switch Control', url: 'https://support.apple.com/en-us/HT201370' }
            ],
            steps: [
                'ทดสอบการใช้งานด้วยการสัมผัส (Touch) และ Voice Control',
                'ตรวจสอบขนาดของพื้นที่สัมผัส (Touch Target) อย่างน้อย 44x44 pixels',
                'ทดสอบการหมุนหน้าจอ (Portrait/Landscape)',
                'ตรวจสอบการทำงานของ Screen Reader บนมือถือ',
                'ทดสอบการ Zoom และการอ่านข้อความ',
                'ตรวจสอบการนำทางด้วย Gesture',
                'ทดสอบประสิทธิภาพการโหลดและการตอบสนอง'
            ],
            note: 'ควรทดสอบบนทั้ง iOS และ Android เพื่อความครอบคลุม และใช้อุปกรณ์ที่มีขนาดหน้าจอต่างกัน'
        }
    ];

    return (
        <div className="bg-light min-vh-100">
            <section id="testing-guidelines" className="container py-5" aria-labelledby="testing-guidelines-heading">
                {/* Header */}
                <div className="text-center mb-5">
                    <div className="position-relative">
                        <h2 id="testing-guidelines-heading" className="display-4 fw-bold text-gradient mb-4 text-shadow floating-element">
                            <i className="bi bi-clipboard-check me-3 icon-bounce"></i>
                            แนวทางการทดสอบตาม WCAG
                        </h2>
                        <div className="position-absolute top-0 start-50 translate-middle-x w-100 h-1 bg-primary opacity-25 rounded"></div>
                    </div>
                    <p className="lead text-muted fs-5 mx-auto border-gradient rounded-3 p-4 glass-morphism" style={{maxWidth: '800px'}}>
                        แนวทางการทดสอบต่อไปนี้ช่วยให้คุณตรวจสอบว่าเว็บไซต์สอดคล้องกับ WCAG 2.1 ระดับ A และ AA
                        โดยรวมทั้งการทดสอบอัตโนมัติ ด้วยตนเอง และกับผู้ใช้จริง
                    </p>
                </div>

                {/* Testing Methods Accordion */}
                <div className="row justify-content-center mb-5">
                    <div className="col-lg-12">
                        <div className="accordion shadow-lg border-animated" id="testingMethodsAccordion">
                            {testingMethods.map((method, index) => (
                                <div key={method.id} className="accordion-item border-0 mb-3 rounded-3 overflow-hidden glow-on-hover">
                                    <h3 className="accordion-header" id={`heading-${method.id}`}>
                                        <button
                                            className={`accordion-button fs-5 fw-semibold position-relative ${activeSection === method.id ? 'bg-gradient-primary text-white' : 'bg-white text-dark'}`}
                                            type="button"
                                            onClick={() => setActiveSection(activeSection === method.id ? null : method.id)}
                                            aria-expanded={activeSection === method.id}
                                            aria-controls={`collapse-${method.id}`}
                                            style={{
                                                boxShadow: 'none',
                                                borderRadius: activeSection === method.id ? '0.5rem 0.5rem 0 0' : '0.5rem'
                                            }}
                                        >
                                            <span className="position-relative z-index-2">{method.title}</span>
                                        </button>
                                    </h3>
                                    <div
                                        id={`collapse-${method.id}`}
                                        className={`accordion-collapse collapse ${activeSection === method.id ? 'show' : ''}`}
                                        aria-labelledby={`heading-${method.id}`}
                                        data-bs-parent="#testingMethodsAccordion"
                                    >
                                        <div className="accordion-body bg-white p-4 border-animated">
                                            <div className="alert alert-info border-0 mb-4 glass-morphism" role="alert">
                                                <i className="bi bi-info-circle me-2 floating-element"></i>
                                                {method.description}
                                            </div>
                                            
                                            {method.tools.length > 0 && (
                                                <div className="mb-4">
                                                    <h4 className="h5 text-primary mb-3">
                                                        <i className="bi bi-tools me-2"></i>
                                                        เครื่องมือที่แนะนำ
                                                    </h4>
                                                    <div className="row g-2">
                                                        {method.tools.map((tool, idx) => (
                                                            <div key={idx} className="col-md-6">
                                                                <div className="card h-100 border-primary border-opacity-25 hover-shadow glow-on-hover">
                                                                    <div className="card-body p-3 position-relative overflow-hidden">
                                                                        <div className="shimmer position-absolute top-0 start-0 w-100 h-100 opacity-10"></div>
                                                                        <a
                                                                            href={tool.url}
                                                                            target="_blank"
                                                                            rel="noopener noreferrer"
                                                                            className="text-decoration-none fw-semibold text-primary stretched-link position-relative z-index-2"
                                                                        >
                                                                            <i className="bi bi-link-45deg me-2 floating-element"></i>
                                                                            {tool.name}
                                                                        </a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            <div className="mb-4">
                                                <h4 className="h5 text-success mb-3">
                                                    <i className="bi bi-list-check me-2"></i>
                                                    ขั้นตอนการทดสอบ
                                                </h4>
                                                <div className="list-group">
                                                    {method.steps.map((step, idx) => (
                                                        <div key={idx} className="list-group-item border-0 border-start border-success border-4 ps-3 mb-2 bg-light">
                                                            <div className="d-flex align-items-start">
                                                                <span className="badge bg-success rounded-circle me-3 mt-1" style={{width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                                                    {idx + 1}
                                                                </span>
                                                                <span>{step}</span>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="alert alert-warning border-0" role="alert">
                                                <i className="bi bi-exclamation-triangle me-2"></i>
                                                <strong>หมายเหตุ:</strong> {method.note}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Testing Workflow */}
                <div className="row justify-content-center mb-5">
                    <div className="col-lg-12">
                        <div className="card shadow-lg border-0">
                            <div className="card-header bg-gradient text-white text-center py-4" style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}>
                                <h3 className="h3 mb-0">
                                    <i className="bi bi-diagram-3 me-3"></i>
                                    ขั้นตอนการทดสอบโดยรวม (Testing Workflow)
                                </h3>
                            </div>
                            <div className="card-body p-4">
                                <div className="row">
                                    {[
                                        { icon: 'bi-bullseye', title: 'กำหนดขอบเขต', desc: 'เลือกหน้าเว็บหรือส่วนที่ต้องการทดสอบ (เช่น หน้าแรก, ฟอร์ม, เมนูนำทาง)' },
                                        { icon: 'bi-robot', title: 'รันการทดสอบอัตโนมัติ', desc: 'ใช้เครื่องมือ เช่น WAVE หรือ Axe เพื่อระบุปัญหาพื้นฐาน' },
                                        { icon: 'bi-hand-index', title: 'ทดสอบด้วยตนเอง', desc: 'ตรวจสอบการนำทางด้วยคีย์บอร์ดและ Screen Reader' },
                                        { icon: 'bi-people', title: 'ทดสอบกับผู้ใช้จริง', desc: 'รวมกลุ่มผู้ใช้ที่มีความหลากหลายเพื่อเก็บข้อเสนอแนะ' },
                                        { icon: 'bi-arrow-repeat', title: 'แก้ไขและทดสอบซ้ำ', desc: 'แก้ปัญหาที่พบและรันการทดสอบใหม่' },
                                        { icon: 'bi-file-earmark-text', title: 'รายงานผล', desc: 'จัดทำรายงานระบุปัญหาและการแก้ไข พร้อมยืนยันระดับการปฏิบัติตาม (A/AA)' }
                                    ].map((step, idx) => (
                                        <div key={idx} className="col-md-6 col-lg-4 mb-4">
                                            <div className="card h-100 border-primary border-opacity-25 hover-shadow">
                                                <div className="card-body text-center p-4">
                                                    <div className="bg-primary bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{width: '60px', height: '60px'}}>
                                                        <i className={`bi ${step.icon} text-primary fs-3`}></i>
                                                    </div>
                                                    <h5 className="card-title text-primary mb-3">{step.title}</h5>
                                                    <p className="card-text text-muted small">{step.desc}</p>
                                                    <div className="position-absolute top-0 start-0 translate-middle">
                                                        <span className="badge bg-primary rounded-circle" style={{width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                                            {idx + 1}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Example Checklist */}
                <div className="row justify-content-center">
                    <div className="col-lg-12">
                        <div className="card shadow-lg border-0">
                            <div className="card-header bg-success text-white text-center py-4">
                                <h3 className="h3 mb-0">
                                    <i className="bi bi-check2-square me-3"></i>
                                    ตัวอย่างเช็กลิสต์การทดสอบ
                                </h3>
                            </div>
                            <div className="card-body p-0">
                                <div className="table-responsive">
                                    <table className="table table-hover mb-0" aria-labelledby="ตารางเช็กลิสต์">
                                        <thead className="table-dark">
                                            <tr>
                                                <th scope="col" className="py-3">
                                                    <i className="bi bi-bookmark me-2"></i>
                                                    เกณฑ์ (WCAG)
                                                </th>
                                                <th scope="col" className="py-3">
                                                    <i className="bi bi-search me-2"></i>
                                                    วิธีตรวจสอบ
                                                </th>
                                                <th scope="col" className="py-3">
                                                    <i className="bi bi-target me-2"></i>
                                                    ผลลัพธ์ที่คาดหวัง
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className="table-light">
                                                <td className="fw-semibold">
                                                    <span className="badge bg-primary me-2">1.1.1</span>
                                                    Non-text Content
                                                </td>
                                                <td>ตรวจสอบรูปภาพด้วย WAVE หรือ Screen Reader</td>
                                                <td>
                                                    <i className="bi bi-check-circle text-success me-2"></i>
                                                    ทุกภาพมีข้อความทางเลือก (Alt Text) ที่สื่อความหมาย
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="fw-semibold">
                                                    <span className="badge bg-warning text-dark me-2">1.4.3</span>
                                                    Contrast Minimum
                                                </td>
                                                <td>ใช้ Contrast Checker</td>
                                                <td>
                                                    <i className="bi bi-check-circle text-success me-2"></i>
                                                    อัตราส่วนความคมชัดอย่างน้อย 4.5:1 สำหรับข้อความปกติ
                                                </td>
                                            </tr>
                                            <tr className="table-light">
                                                <td className="fw-semibold">
                                                    <span className="badge bg-info me-2">2.1.1</span>
                                                    Keyboard
                                                </td>
                                                <td>นำทางด้วยคีย์บอร์ด (Tab, Enter)</td>
                                                <td>
                                                    <i className="bi bi-check-circle text-success me-2"></i>
                                                    ทุกฟังก์ชันใช้งานได้โดยไม่ต้องใช้เมาส์
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="fw-semibold">
                                                    <span className="badge bg-secondary me-2">3.2.1</span>
                                                    On Focus
                                                </td>
                                                <td>ทดสอบการเปลี่ยนแปลงเมื่อมี Focus</td>
                                                <td>
                                                    <i className="bi bi-check-circle text-success me-2"></i>
                                                    ไม่มีการเปลี่ยนแปลงบริบทโดยอัตโนมัติ
                                                </td>
                                            </tr>
                                            <tr className="table-light">
                                                <td className="fw-semibold">
                                                    <span className="badge bg-danger me-2">4.1.2</span>
                                                    Name, Role, Value
                                                </td>
                                                <td>ตรวจสอบด้วย Screen Reader และ DevTools</td>
                                                <td>
                                                    <i className="bi bi-check-circle text-success me-2"></i>
                                                    ทุกองค์ประกอบมีชื่อ บทบาท และค่าที่เหมาะสม
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="card-footer text-center py-3">
                                <small className="text-muted">
                                    <i className="bi bi-info-circle me-1"></i>
                                    นี่เป็นเพียงตัวอย่างเช็กลิสต์พื้นฐาน สำหรับการทดสอบที่ครอบคลุมควรรวมเกณฑ์ WCAG ทั้งหมด
                                </small>
                            </div>
                        </div>
                    </div>
                </div>

            </section>
        </div>
    );
};

export default Guide;