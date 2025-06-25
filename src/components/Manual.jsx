import React, { useState, useEffect } from 'react';
import { CheckCircle, AlertCircle, Eye, Keyboard, Brain, Shield, Monitor, User, Target, BookOpen, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';
import './Manual.css'
const Manual = () => {
    const [activeAccordion, setActiveAccordion] = useState('auto');
    const [currentTip, setCurrentTip] = useState(0);

    const tips = [
        "การใช้ Alt text ที่มีความหมายช่วยให้ผู้ใช้ Screen Reader เข้าใจภาพได้",
        "ตรวจสอบ Color Contrast ให้มีอัตราส่วนอย่างน้อย 4.5:1 สำหรับข้อความปกติ",
        "ทุกองค์ประกอบต้องสามารถเข้าถึงได้ด้วยแป้นพิมพ์เพียงอย่างเดียว",
        "ใช้ Semantic HTML Tags เช่น <nav>, <main>, <section> เพื่อโครงสร้างที่ชัดเจน"
    ];

    const toggleAccordion = (id) => {
        setActiveAccordion(activeAccordion === id ? '' : id);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTip((prev) => (prev + 1) % tips.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [tips.length]);

    return (
        <div>
            {/* Navigation */}
            <main>
                {/* Hero Section */}
                <section id="introduction" className="hero-section">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-10">
                                <h1 className="hero-title">
                                    คู่มือการทดสอบเว็บไซต์ตาม WCAG
                                </h1>
                                <p className="hero-description">
                                    Web Content Accessibility Guidelines (WCAG) เป็นมาตรฐานสากลที่พัฒนาโดย W3C
                                    เพื่อให้เว็บไซต์สามารถเข้าถึงได้สำหรับทุกคน รวมถึงผู้พิการ คู่มือนี้ช่วยให้คุณทดสอบและปรับปรุงเว็บไซต์
                                    ให้สอดคล้องกับ WCAG ระดับ A และ AA
                                </p>

                                {/* Animated Tip Box */}
                                <div className="tip-box">
                                    <div className="d-flex align-items-center justify-content-center mb-2">
                                        <AlertCircle className="me-3" size={24} />
                                        <h3>💡 เคล็ดลับ WCAG วันนี้</h3>
                                    </div>
                                    <p>
                                        {tips[currentTip]}
                                    </p>
                                </div>

                                {/* Stats Cards */}
                                <div className="row g-4 mb-5">
                                    {[
                                        { number: "1.3B", label: "ผู้พิการทั่วโลก", icon: "🌍" },
                                        { number: "78", label: "กฎเกณฑ์ WCAG", icon: "📋" },
                                        { number: "3", label: "ระดับมาตรฐาน", icon: "⭐" }
                                    ].map((stat, index) => (
                                        <div key={index} className="col-md-4">
                                            <div className="card stats-card">
                                                <div className="card-body">
                                                    <div className="stats-icon">{stat.icon}</div>
                                                    <div className="stats-number">{stat.number}</div>
                                                    <div className="stats-label">{stat.label}</div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* POUR Principles */}
                <section id="principles" className="py-5">
                    <div className="container">
                        <h2 className="section-header">
                            🎯 หลักการพื้นฐานของ WCAG (POUR)
                        </h2>
                        <div className="row g-4">
                            {[
                                {
                                    title: 'Perceivable (รับรู้ได้)',
                                    description: 'เนื้อหาต้องนำเสนอในรูปแบบที่ผู้ใช้รับรู้ได้',
                                    details: 'ข้อความทางเลือกสำหรับรูปภาพ, คำบรรยายสำหรับวิดีโอ, สีที่มี contrast เพียงพอ',
                                    icon: <Eye size={32} />,
                                    iconClass: 'perceivable',
                                    examples: ['Alt text สำหรับรูปภาพ', 'Captions สำหรับวิดีโอ', 'Color contrast ratio 4.5:1']
                                },
                                {
                                    title: 'Operable (ใช้งานได้)',
                                    description: 'ผู้ใช้ต้องควบคุมส่วนต่างๆ ได้',
                                    details: 'รองรับการนำทางด้วยคีย์บอร์ด, ไม่มีเนื้อหาที่กระพริบเร็วเกินไป',
                                    icon: <Keyboard size={32} />,
                                    iconClass: 'operable',
                                    examples: ['Keyboard navigation', 'Focus indicators', 'No seizure triggers']
                                },
                                {
                                    title: 'Understandable (เข้าใจได้)',
                                    description: 'เนื้อหาและการนำทางต้องชัดเจน',
                                    details: 'ภาษาที่เข้าใจง่าย, การนำทางที่สม่ำเสมอ, ข้อผิดพลาดที่ระบุชัดเจน',
                                    icon: <Brain size={32} />,
                                    iconClass: 'understandable',
                                    examples: ['Clear language', 'Consistent navigation', 'Error identification']
                                },
                                {
                                    title: 'Robust (ทนทาน)',
                                    description: 'เข้ากันได้กับเทคโนโลยีช่วยเหลือ',
                                    details: 'ใช้ HTML ที่ถูกต้อง, รองรับ Screen Reader และอุปกรณ์ช่วยเหลืออื่นๆ',
                                    icon: <Shield size={32} />,
                                    iconClass: 'robust',
                                    examples: ['Valid HTML', 'ARIA labels', 'Screen reader compatible']
                                },
                            ].map((principle, index) => (
                                <div key={index} className="col-md-6">
                                    <div className="card principle-card">
                                        <div className="card-body">
                                            <div className={`principle-icon ${principle.iconClass}`}>
                                                {principle.icon}
                                            </div>
                                            <h3 className="principle-title">{principle.title}</h3>
                                            <p className="principle-description">{principle.description}</p>
                                            <p className="principle-details">{principle.details}</p>
                                            <div className="principle-examples">
                                                <h4>ตัวอย่าง:</h4>
                                                {principle.examples.map((example, i) => (
                                                    <div key={i} className="example-item">
                                                        <CheckCircle className="example-icon" size={16} />
                                                        <span className="example-text">{example}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Testing Methods */}
                <section id="testing-methods" className="py-5">
                    <div className="container">
                        <h2 className="section-header">
                            🔍 วิธีการทดสอบ
                        </h2>
                        <div className="accordion-custom">
                            {[
                                {
                                    id: 'auto',
                                    title: '🤖 การทดสอบอัตโนมัติ',
                                    subtitle: 'ครอบคลุม 30-50% ของปัญหา',
                                    content: 'ใช้เครื่องมือเช่น WAVE, Axe หรือ Lighthouse เพื่อตรวจสอบปัญหาการเข้าถึงพื้นฐาน',
                                    tools: ['WAVE Browser Extension', 'axe DevTools', 'Lighthouse Accessibility Audit', 'Pa11y Command Line'],
                                    pros: ['รวดเร็วและง่าย', 'ตรวจสอบได้หลายหน้าพร้อมกัน', 'รายงานผลแบบ Real-time'],
                                    className: 'auto'
                                },
                                {
                                    id: 'manual',
                                    title: '👨‍💻 การทดสอบด้วยตนเอง',
                                    subtitle: 'ครอบคลุม 50-70% ของปัญหา',
                                    content: 'ตรวจสอบการนำทางด้วยคีย์บอร์ดและการใช้งาน Screen Reader เช่น NVDA หรือ VoiceOver',
                                    tools: ['NVDA (Windows)', 'VoiceOver (macOS)', 'JAWS', 'TalkBack (Android)'],
                                    pros: ['ตรวจสอบ UX จริง', 'พบปัญหาเชิงลึก', 'ทดสอบ Keyboard Navigation'],
                                    className: 'manual'
                                },
                                {
                                    id: 'user',
                                    title: '👥 การทดสอบกับผู้ใช้จริง',
                                    subtitle: 'ครอบคลุม 90-100% ของปัญหา',
                                    content: 'รวมผู้ใช้ที่มีความหลากหลาย เช่น ผู้พิการทางสายตา เพื่อทดสอบประสบการณ์จริง',
                                    tools: ['User Interview', 'Usability Testing', 'Focus Groups', 'Accessibility Consulting'],
                                    pros: ['ผลลัพธ์แม่นยำที่สุด', 'เข้าใจ Pain Points จริง', 'ได้ Feedback คุณภาพ'],
                                    className: 'user'
                                },
                            ].map((method, index) => (
                                <div key={index} className={`accordion-item-custom ${method.className}`}>
                                    <button
                                        className="accordion-button-custom"
                                        onClick={() => toggleAccordion(method.id)}
                                        aria-expanded={activeAccordion === method.id}
                                        aria-controls={`panel-${method.id}`}
                                    >
                                        <div className="accordion-header w-100">
                                            <div>
                                                <h3 className="accordion-title">{method.title}</h3>
                                                <p className="accordion-subtitle">{method.subtitle}</p>
                                            </div>
                                            <div className="ms-auto">
                                                {activeAccordion === method.id ?
                                                    <ChevronUp size={24} /> :
                                                    <ChevronDown size={24} />
                                                }
                                            </div>
                                        </div>
                                    </button>
                                    <div
                                        id={`panel-${method.id}`}
                                        className={`accordion-content ${activeAccordion === method.id ? 'expanded' : 'collapsed'}`}
                                    >
                                        <p className="accordion-description">{method.content}</p>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="tools-section">
                                                    <h4 className="tools-title">
                                                        <Monitor size={20} />
                                                        เครื่องมือแนะนำ:
                                                    </h4>
                                                    <ul className="list-unstyled">
                                                        {method.tools.map((tool, i) => (
                                                            <li key={i} className="tool-item">
                                                                <div className="tool-bullet"></div>
                                                                <span className="tool-text">{tool}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="tools-section">
                                                    <h4 className="tools-title">
                                                        <Target size={20} />
                                                        ข้อดี:
                                                    </h4>
                                                    <ul className="list-unstyled">
                                                        {method.pros.map((pro, i) => (
                                                            <li key={i} className="tool-item">
                                                                <CheckCircle className="example-icon" size={16} />
                                                                <span className="tool-text">{pro}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Quick Checklist */}
                <section id="checklist" className="py-5">
                    <div className="container">
                        <h2 className="section-header">
                            ✅ Checklist ด่วน WCAG
                        </h2>
                        <div className="row g-4">
                            {[
                                {
                                    category: "🎨 Visual & Color",
                                    items: [
                                        "Color contrast อย่างน้อย 4.5:1",
                                        "ไม่ใช้สีเป็นตัวบ่งชี้เพียงอย่างเดียว",
                                        "Text สามารถขยายได้ถึง 200%",
                                        "Focus indicators ชัดเจน"
                                    ]
                                },
                                {
                                    category: "⌨️ Keyboard & Navigation",
                                    items: [
                                        "ทุกองค์ประกอบเข้าถึงได้ด้วย keyboard",
                                        "Tab order เป็นตรรกะ",
                                        "Skip links สำหรับเนื้อหาหลัก",
                                        "ไม่มี keyboard trap"
                                    ]
                                },
                                {
                                    category: "📝 Content & Structure",
                                    items: [
                                        "Heading structure ถูกต้อง (h1-h6)",
                                        "Alt text สำหรับรูปภาพทุกรูป",
                                        "Form labels ชัดเจน",
                                        "Error messages อธิบายชัดเจน"
                                    ]
                                },
                                {
                                    category: "🔊 Media & Interactive",
                                    items: [
                                        "Captions สำหรับวิดีโอ",
                                        "Audio descriptions เมื่อจำเป็น",
                                        "ไม่มีเนื้อหากระพริบเกิน 3 ครั้ง/วินาที",
                                        "Time limits สามารถปรับได้"
                                    ]
                                }
                            ].map((section, index) => (
                                <div key={index} className="col-md-6">
                                    <div className="card checklist-card">
                                        <div className="card-body">
                                            <h3 className="checklist-category">{section.category}</h3>
                                            <ul className="list-unstyled">
                                                {section.items.map((item, i) => (
                                                    <li key={i} className="checklist-item">
                                                        <input
                                                            type="checkbox"
                                                            className="checklist-checkbox"
                                                            id={`${section.category}-${i}`}
                                                        />
                                                        <label
                                                            htmlFor={`${section.category}-${i}`}
                                                            className="checklist-label"
                                                        >
                                                            {item}
                                                        </label>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Resources */}
                <section id="resources" className="py-5">
                    <div className="container">
                        <h2 className="section-header">
                            🔗 แหล่งข้อมูลเพิ่มเติม
                        </h2>
                        <div className="row g-4">
                            {[
                                {
                                    title: "เอกสาร WCAG อย่างเป็นทางการ",
                                    description: "มาตรฐานและแนวทางจาก W3C",
                                    url: "https://www.w3.org/WAI/standards-guidelines/wcag/",
                                    category: "Official",
                                    icon: "📚"
                                },
                                {
                                    title: "สภาดิจิทัลเพื่อเศรษฐกิจและสังคมแห่งประเทศไทย",
                                    description: "ข้อมูลและกฎหมายในประเทศไทย",
                                    url: "https://dct.or.th/",
                                    category: "Thailand",
                                    icon: "🇹🇭"
                                },
                                {
                                    title: "WAVE Web Accessibility Evaluation Tool",
                                    description: "เครื่องมือตรวจสอบการเข้าถึงออนไลน์",
                                    url: "https://wave.webaim.org/",
                                    category: "Tools",
                                    icon: "🌊"
                                },
                                {
                                    title: "WebAIM: Web Accessibility In Mind",
                                    description: "บทความและคู่มือการใช้งาน",
                                    url: "https://webaim.org/",
                                    category: "Learning",
                                    icon: "🎓"
                                },
                                {
                                    title: "Axe Accessibility Checker",
                                    description: "Extension สำหรับ Developer Tools",
                                    url: "https://www.deque.com/axe/",
                                    category: "Tools",
                                    icon: "🔧"
                                },
                                {
                                    title: "A11y Project",
                                    description: "Community-driven accessibility resources",
                                    url: "https://www.a11yproject.com/",
                                    category: "Community",
                                    icon: "👥"
                                }
                            ].map((resource, index) => (
                                <div key={index} className="col-md-6">
                                    <a
                                        href={resource.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="resource-card"
                                    >
                                        <div className="resource-header">
                                            <div className="resource-icon">{resource.icon}</div>
                                            <span className="resource-category">
                                                {resource.category}
                                            </span>
                                        </div>
                                        <h3 className="resource-title">
                                            {resource.title}
                                        </h3>
                                        <p className="resource-description">{resource.description}</p>
                                        <div className="resource-link">
                                            <span>เยี่ยมชมเว็บไซต์</span>
                                            <ExternalLink size={16} />
                                        </div>
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>

        </div>
    );
};

export default Manual;
