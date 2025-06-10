import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Router ,Link} from 'react-router-dom';

const HomePageComponent = () => {
  const [showMobileNav, setShowMobileNav] = useState(false);

  useEffect(() => {
    // Add scroll effect to header
    const handleScroll = () => {
      const header = document.querySelector('.custom-header');
      if (header) {
        if (window.scrollY > 100) {
          header.style.background = 'rgba(255, 255, 255, 0.98)';
          header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
          header.style.background = 'rgba(255, 255, 255, 0.95)';
          header.style.boxShadow = 'none';
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    console.log('Form submitted with data:', data);
    alert('ขอบคุณสำหรับข้อความของคุณ! เราจะติดต่อกลับโดยเร็วที่สุด');
    event.target.reset();
  };
    const toggleMobileMenu = () => {
    setShowMobileNav(!showMobileNav);
  };

  const scrollToSection = (sectionId) => {
    const targetSection = document.querySelector(sectionId);
    if (targetSection) {
      const headerHeight = 64;
      const targetPosition = targetSection.offsetTop - headerHeight;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
    setShowMobileNav(false);
  };

  return (
    <>
      <style jsx>{`
        :root {
          --primary: #16a085;
          --secondary: #3498db;
          --accent: #2ecc71;
          --warning: #f39c12;
          --danger: #e74c3c;
          --text-primary: #2c3e50;
          --text-secondary: #7f8c8d;
          --bg-light: #f8f9fa;
          --white: #ffffff;
        }
          

        .custom-header {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid #e0e0e0;
          position: fixed;
          top: 0;
          width: 100%;
          z-index: 1000;
          transition: all 0.3s ease;
        }

        .hero-section {
          background: linear-gradient(135deg, #16a085 0%, #3498db 50%, #2ecc71 100%);
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }

        .hero-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.2);
        }

        .hero-content {
          position: relative;
          z-index: 10;
          color: white;
        }

        .hero-subtitle {
          color: #ffd700;
        }

        .scroll-indicator {
          position: absolute;
          bottom: 32px;
          left: 50%;
          transform: translateX(-50%);
          color: rgba(255, 255, 255, 0.7);
          animation: bounce 2s infinite;
        }

        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateX(-50%) translateY(0);
          }
          40% {
            transform: translateX(-50%) translateY(-10px);
          }
          60% {
            transform: translateX(-50%) translateY(-5px);
          }
        }

        .service-icon {
          width: 64px;
          height: 64px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 24px;
          font-size: 32px;
        }

        .service-icon.primary {
          background: rgba(22, 160, 133, 0.1);
          color: var(--primary);
        }

        .service-icon.secondary {
          background: rgba(52, 152, 219, 0.1);
          color: var(--secondary);
        }

        .service-icon.accent {
          background: rgba(46, 204, 113, 0.1);
          color: var(--accent);
        }

        .btn-custom-primary {
          background: var(--primary);
          border-color: var(--primary);
          color: white;
        }
          .custom-header {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid #e0e0e0;
          position: fixed;
          top: 0;
          width: 100%;
          z-index: 1000;
          transition: all 0.3s ease;
        }

        .hero-section {
          background: linear-gradient(135deg, #16a085 0%, #3498db 50%, #2ecc71 100%);
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }
        .header {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            border-bottom: 1px solid #e0e0e0;
            position: fixed;
            top: 0;
            width: 100%;
            z-index: 1000;
        }

        .header-container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 72px;
        }

        .logo h1 {
            color: var(--primary);
            font-size: 24px;
            font-weight: 700;
        }

        .logo p {
            color: var(--text-secondary);
            font-size: 12px;
        }

        .nav {
            display: flex;
            gap: 32px;
        }

        .nav a {
            color: var(--text-primary);
            text-decoration: none;
            font-weight: 500;
            transition: color 0.3s;
        }

        .nav a:hover {
            color: var(--primary);
        }

        .header-buttons {
            display: flex;
            gap: 16px;
        }

        .btn {
            padding: 8px 16px;
            border-radius: 8px;
            text-decoration: none;
            font-weight: 500;
            transition: all 0.3s;
            border: 1px solid;
            cursor: pointer;
            background: none;
        }

        .btn-outline {
            color: var(--primary);
            border-color: var(--primary);
            background: transparent;
        }

        .btn-outline:hover {
            background: var(--primary);
            color: white;
        }

        .btn-primary {
            background: var(--primary);
            color: white;
            border-color: var(--primary);
        }

        .btn-primary:hover {
            background: #138f7a;
        }

        .mobile-menu {
            display: none;
            background: none;
            border: none;
            font-size: 24px;
            cursor: pointer;
        }

        .mobile-nav {
            display: none;
            background: white;
            border-top: 1px solid #e0e0e0;
            padding: 16px;
        }

        .mobile-nav.show {
            display: block;
        }

        .mobile-nav a {
            display: block;
            padding: 12px 0;
            color: var(--text-primary);
            text-decoration: none;
        }

        .hero-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.2);
        }

        .hero-content {
          position: relative;
          z-index: 10;
          color: white;
        }

        .hero-subtitle {
          color: #ffd700;
        }

        .scroll-indicator {
          position: absolute;
          bottom: 32px;
          left: 50%;
          transform: translateX(-50%);
          color: rgba(255, 255, 255, 0.7);
          animation: bounce 2s infinite;
        }

        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateX(-50%) translateY(0);
          }
          40% {
            transform: translateX(-50%) translateY(-10px);
          }
          60% {
            transform: translateX(-50%) translateY(-5px);
          }
        }

        .service-icon {
          width: 64px;
          height: 64px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 24px;
          font-size: 32px;
        }

        .service-icon.primary {
          background: rgba(22, 160, 133, 0.1);
          color: var(--primary);
        }

        .service-icon.secondary {
          background: rgba(52, 152, 219, 0.1);
          color: var(--secondary);
        }

        .service-icon.accent {
          background: rgba(46, 204, 113, 0.1);
          color: var(--accent);
        }

        .btn-custom-primary {
          background: var(--primary);
          border-color: var(--primary);
          color: white;
        }

        .btn-custom-primary:hover {
          background: #138f7a;
          border-color: #138f7a;
          color: white;
        }

        .btn-custom-outline {
          color: var(--primary);
          border-color: var(--primary);
          background: transparent;
        }

        .btn-custom-outline:hover {
          background: var(--primary);
          border-color: var(--primary);
          color: white;
        }

        .btn-white {
          background: white;
          color: var(--primary);
          border-color: white;
        }

        .btn-white:hover {
          background: #f8f9fa;
          color: var(--primary);
        }

        .btn-outline-white {
          color: white;
          border-color: white;
          background: transparent;
        }

        .btn-outline-white:hover {
          background: white;
          color: var(--primary);
        }

        .step-number {
          width: 64px;
          height: 64px;
          background: linear-gradient(135deg, var(--primary), var(--secondary));
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          font-weight: 700;
          margin: 0 auto 16px;
        }

        .feature-list {
          list-style: none;
          padding-left: 0;
        }

        .feature-list li {
          display: flex;
          align-items: center;
          margin-bottom: 12px;
          font-size: 14px;
        }

        .feature-list li::before {
          content: '✓';
          color: var(--accent);
          font-weight: bold;
          margin-right: 12px;
          width: 16px;
        }

        .custom-footer {
          background: #2c3e50;
          color: white;
        }

        .stat-number {
          font-size: 2.5rem;
          font-weight: 700;
          color: #ffd700;
        }

        .mission-stat-number {
          font-size: 2rem;
          font-weight: 700;
          color: var(--primary);
        }

        .contact-card.gradient {
          background: linear-gradient(135deg, var(--primary), var(--secondary));
          color: white;
        }

        .login-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
          padding: 80px 20px 20px;
        }

        .login-container {
          background: white;
          border-radius: 16px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          max-width: 1000px;
          width: 100%;
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: 600px;
        }

        .login-form-section {
          padding: 60px 40px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .login-info-section {
          background: linear-gradient(135deg, var(--primary), var(--secondary));
          color: white;
          padding: 60px 40px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .brand-logo h1 {
          color: var(--primary);
          font-size: 28px;
          font-weight: 700;
          margin-bottom: 4px;
        }

        .brand-logo p {
          color: var(--text-secondary);
          font-size: 14px;
          margin-bottom: 40px;
        }

        .login-title h2 {
          color: var(--text-primary);
          font-size: 24px;
          font-weight: 600;
          margin-bottom: 8px;
        }

        .login-title p {
          color: var(--text-secondary);
          margin-bottom: 30px;
        }

        .user-type-selector {
          margin-bottom: 30px;
        }

        .d-flex {
          display: flex;
        }

        .gap-3 {
          gap: 12px;
        }

        .type-btn {
          flex: 1;
          padding: 12px 16px;
          border: 2px solid #e0e0e0;
          border-radius: 8px;
          background: white;
          color: var(--text-secondary);
          cursor: pointer;
          transition: all 0.3s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .type-btn.active {
          border-color: var(--primary);
          background: rgba(22, 160, 133, 0.1);
          color: var(--primary);
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-label {
          display: block;
          margin-bottom: 8px;
          color: var(--text-primary);
          font-weight: 500;
        }

        .input-group {
          position: relative;
        }

        .input-icon {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-secondary);
        }

        .form-control {
          width: 100%;
          padding: 12px 12px 12px 40px;
          border: 2px solid #e0e0e0;
          border-radius: 8px;
          font-size: 14px;
          transition: border-color 0.3s;
        }

        .form-control:focus {
          outline: none;
          border-color: var(--primary);
        }

        .password-toggle {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          color: var(--text-secondary);
          cursor: pointer;
        }

        .remember-forgot {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }

        .form-check {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .form-check-input {
          margin: 0;
        }

        .form-check-label {
          color: var(--text-secondary);
          font-size: 14px;
        }

        .forgot-link {
          background: none;
          border: none;
          color: var(--primary);
          font-size: 14px;
          cursor: pointer;
        }

        .login-btn {
          width: 100%;
          padding: 14px;
          background: var(--primary);
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.3s;
          margin-bottom: 20px;
        }

        .login-btn:hover {
          background: #138f7a;
        }

        .login-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .signup-link {
          text-align: center;
          color: var(--text-secondary);
          font-size: 14px;
        }

        .signup-btn {
          background: none;
          border: none;
          color: var(--primary);
          cursor: pointer;
        }

        .info-content {
          text-align: center;
        }

        .info-icon {
          margin-bottom: 24px;
        }

        .info-title {
          font-size: 24px;
          font-weight: 600;
          margin-bottom: 16px;
        }

        .info-subtitle {
          margin-bottom: 32px;
          opacity: 0.9;
        }

        .features-list {
          text-align: left;
          margin-bottom: 32px;
        }

        .feature-item {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 16px;
        }

        .feature-icon {
          color: #ffd700;
        }

        .contact-info {
          margin-bottom: 24px;
        }

        .contact-item {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 8px;
        }

        .status-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(255, 255, 255, 0.2);
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 14px;
        }

        .footer-text {
          text-align: center;
          padding: 20px;
          color: var(--text-secondary);
          font-size: 14px;
        }

        .pt-5 {
          padding-top: 3rem;
        }

        @media (max-width: 768px) {
          .nav {
            display: none;
          }

          .mobile-menu {
            display: block;
          }

          .mobile-nav.show {
            display: block;
          }

          .login-container {
            grid-template-columns: 1fr;
            margin: 20px;
          }

          .login-info-section {
            display: none;
          }

          .login-form-section {
            padding: 40px 20px;
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }

        .btn-custom-primary:hover {
          background: #138f7a;
          border-color: #138f7a;
          color: white;
        }

        .btn-custom-outline {
          color: var(--primary);
          border-color: var(--primary);
          background: transparent;
        }

        .btn-custom-outline:hover {
          background: var(--primary);
          border-color: var(--primary);
          color: white;
        }

        .btn-white {
          background: white;
          color: var(--primary);
          border-color: white;
        }

        .btn-white:hover {
          background: #f8f9fa;
          color: var(--primary);
        }

        .btn-outline-white {
          color: white;
          border-color: white;
          background: transparent;
        }

        .btn-outline-white:hover {
          background: white;
          color: var(--primary);
        }

        .step-number {
          width: 64px;
          height: 64px;
          background: linear-gradient(135deg, var(--primary), var(--secondary));
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          font-weight: 700;
          margin: 0 auto 16px;
        }

        .feature-list {
          list-style: none;
          padding-left: 0;
        }

        .feature-list li {
          display: flex;
          align-items: center;
          margin-bottom: 12px;
          font-size: 14px;
        }

        .feature-list li::before {
          content: '✓';
          color: var(--accent);
          font-weight: bold;
          margin-right: 12px;
          width: 16px;
        }

        .custom-footer {
          background: #2c3e50;
          color: white;
        }

        .stat-number {
          font-size: 2.5rem;
          font-weight: 700;
          color: #ffd700;
        }

        .mission-stat-number {
          font-size: 2rem;
          font-weight: 700;
          color: var(--primary);
        }

        .contact-card.gradient {
          background: linear-gradient(135deg, var(--primary), var(--secondary));
          color: white;
        }
      `}</style>

      {/* Header */}
       <header className="header">
              <div className="header-container">
                  <div className="logo">
                      <h1>ATTH</h1>
                      <p>Assistive Tech Test Hub</p>
                  </div>
      
                  <nav className="nav">
                      <Link to="/">หน้าแรก</Link>
                      <Link to="#services">บริการ</Link>
                      <Link to="#about">เกี่ยวกับเรา</Link>
                      <Link to="#reports">รายงาน</Link>
                      <Link to="#contact">ติดต่อ</Link>
                  </nav>
      
                  <div className="header-buttons">
                      <Link to="/login" className="btn btn-outline">เข้าสู่ระบบ</Link>
                      <Link to="/test" className="btn btn-primary">เริ่มทดสอบ</Link>
                  </div>
      
                  <button className="mobile-menu" onClick={toggleMobileMenu}>☰</button>
              </div>
      
              <div className={`mobile-nav ${showMobileNav ? 'show' : ''}`}>
                  <a href="#home">หน้าแรก</a>
                  <a href="#services">บริการ</a>
                  <a href="#about">เกี่ยวกับเรา</a>
                  <a href="#reports">รายงาน</a>
                  <a href="#contact">ติดต่อ</a>
                  <div style={{ marginTop: '16px' }}>
                      <Link to="/login" className="btn btn-outline" style={{ display: 'block', marginBottom: '8px', textAlign: 'center' }}>เข้าสู่ระบบ</Link>
                      <Link to="/test" className="btn btn-primary" style={{ display: 'block', textAlign: 'center' }}>เริ่มทดสอบ</Link>
                  </div>
              </div>
          </header>

      {/* Hero Section */}
      <section id="home" className="hero-section">
        <div className="container">
          <div className="hero-content text-center">
            <h1 className="display-3 fw-bold mb-4">
              Assistive Tech<br/>
              <span className="hero-subtitle">Test Hub</span>
            </h1>
            <p className="lead mb-5 px-lg-5">
              บริการทดสอบการเข้าถึงและใช้ประโยชน์ได้จากผู้ใช้ทุกกลุ่ม<br/>
              เพื่อสร้าง Universal Design ที่ทุกคนสามารถใช้งานได้
            </p>
            
            <div className="d-flex flex-column flex-md-row gap-3 justify-content-center mb-5">
              <button className="btn btn-white btn-lg px-4">เริ่มทดสอบเลย</button>
              <button 
                className="btn btn-outline-white btn-lg px-4"
                onClick={() => scrollToSection('#reports')}
              >
                ดูตัวอย่างรายงาน
              </button>
            </div>

            <div className="row justify-content-center">
              <div className="col-md-8">
                <div className="row text-center">
                  <div className="col-4">
                    <div className="stat-number">500+</div>
                    <div className="text-white-50">โครงการที่ทดสอบ</div>
                  </div>
                  <div className="col-4">
                    <div className="stat-number">1000+</div>
                    <div className="text-white-50">ผู้ใช้ที่ทดสอบ</div>
                  </div>
                  <div className="col-4">
                    <div className="stat-number">95%</div>
                    <div className="text-white-50">ความพึงพอใจ</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="scroll-indicator">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="m6 9 6 6 6-6"/>
            </svg>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-5 bg-light">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold text-dark mb-3">บริการของเรา</h2>
            <p className="lead text-muted mx-auto" style={{ maxWidth: '800px' }}>
              เราให้บริการทดสอบการเข้าถึงและใช้ประโยชน์ได้แบบครบวงจร 
              เพื่อให้โครงการของคุณเป็น Universal Design
            </p>
          </div>

          <div className="row g-4 mb-5">
            <div className="col-lg-4 col-md-6">
              <div className="card h-100 shadow-sm">
                <div className="card-body text-center p-4">
                  <div className="service-icon primary">👥</div>
                  <h3 className="h5 fw-semibold">ทดสอบกับผู้ใช้จริง</h3>
                  <p className="text-muted mb-3">ทดสอบโดยคนพิการ ผู้สูงอายุ และกลุ่มที่มีความต้องการพิเศษ</p>
                  <ul className="feature-list text-start">
                    <li>ทดสอบกับผู้พิการทางสายตา</li>
                    <li>ทดสอบกับผู้พิการทางการได้ยิน</li>
                    <li>ทดสอบกับผู้สูงอายุ</li>
                    <li>ทดสอบกับผู้พิการทางร่างกาย</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6">
              <div className="card h-100 shadow-sm">
                <div className="card-body text-center p-4">
                  <div className="service-icon secondary">🔍</div>
                  <h3 className="h5 fw-semibold">การออกแบบระบบ</h3>
                  <p className="text-muted mb-3">ให้คำปรึกษาและร่วมออกแบบตั้งแต่เริ่มต้นโครงการ</p>
                  <ul className="feature-list text-start">
                    <li>Universal Design Consultation</li>
                    <li>Accessibility Audit</li>
                    <li>Design Review</li>
                    <li>Standard Compliance Check</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6">
              <div className="card h-100 shadow-sm">
                <div className="card-body text-center p-4">
                  <div className="service-icon accent">📄</div>
                  <h3 className="h5 fw-semibold">รายงานและการปรับปรุง</h3>
                  <p className="text-muted mb-3">รายงานผลการทดสอบและข้อเสนอแนะการปรับปรุง</p>
                  <ul className="feature-list text-start">
                    <li>รายงานละเอียดครบถ้วน</li>
                    <li>ข้อเสนอแนะการปรับปรุง</li>
                    <li>แผนการพัฒนา</li>
                    <li>การติดตามผล</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="card shadow-sm mb-5">
            <div className="card-body p-4">
              <h3 className="text-center h4 fw-bold mb-4">พื้นที่การทดสอบ</h3>
              <div className="row g-3">
                <div className="col-lg-3 col-md-6">
                  <div className="text-center p-3 rounded" style={{ background: 'linear-gradient(135deg, rgba(22, 160, 133, 0.1), rgba(52, 152, 219, 0.1))' }}>
                    <strong>เว็บไซต์และแอปพลิเคชัน</strong>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6">
                  <div className="text-center p-3 rounded" style={{ background: 'linear-gradient(135deg, rgba(22, 160, 133, 0.1), rgba(52, 152, 219, 0.1))' }}>
                    <strong>อาคารและสถานที่</strong>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6">
                  <div className="text-center p-3 rounded" style={{ background: 'linear-gradient(135deg, rgba(22, 160, 133, 0.1), rgba(52, 152, 219, 0.1))' }}>
                    <strong>บริการและระบบต่างๆ</strong>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6">
                  <div className="text-center p-3 rounded" style={{ background: 'linear-gradient(135deg, rgba(22, 160, 133, 0.1), rgba(52, 152, 219, 0.1))' }}>
                    <strong>ผลิตภัณฑ์เทคโนโลจี</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <h3 className="h4 mb-3">พร้อมเริ่มโครงการแล้วใช่ไหม?</h3>
            <p className="text-muted mb-4">ปรึกษาฟรี! เราจะช่วยวิเคราะห์ความต้องการและแนะนำแผนการทดสอบที่เหมาะสม</p>
            <button 
              className="btn btn-custom-primary btn-lg"
              onClick={() => scrollToSection('#contact')}
            >
              ปรึกษาฟรีเลย
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold text-dark mb-3">เกี่ยวกับ ATTH</h2>
            <p className="lead text-muted mx-auto" style={{ maxWidth: '800px' }}>
              เราเป็นผู้เชี่ยวชาญด้านการทดสอบการเข้าถึงและใช้ประโยชน์ได้ 
              ด้วยทีมงานที่มีประสบการณ์และผู้ใช้จริงจากกลุ่มต่างๆ 
              เพื่อให้ทุกโครงการสามารถรองรับการเข้าสู่สังคมสูงวัยและให้โอกาสทุกคนได้ใช้ชีวิตอย่างอิสระ
            </p>
          </div>

          <div className="card shadow-sm mb-5" style={{ background: 'linear-gradient(135deg, rgba(22, 160, 133, 0.1), rgba(52, 152, 219, 0.1))' }}>
            <div className="card-body p-5">
              <div className="row align-items-center">
                <div className="col-lg-8">
                  <h3 className="h3 fw-bold mb-3">วิสัยทัศน์ของเรา</h3>
                  <p className="lead mb-3">
                    "สร้างสังคมที่ทุกคนสามารถเข้าถึงและใช้ประโยชน์ได้จากเทคโนโลยีและสิ่งแวดล้อมอย่างเท่าเทียมกัน"
                  </p>
                  <p className="text-muted">
                    เราเชื่อมั่นว่าการออกแบบที่ดีควรจะเป็น Universal Design 
                    ที่คำนึงถึงความหลากหลายของผู้ใช้ตั้งแต่เริ่มต้น
                  </p>
                </div>
                <div className="col-lg-4">
                  <div className="row g-3">
                    <div className="col-6">
                      <div className="bg-white p-3 rounded text-center shadow-sm">
                        <div className="mission-stat-number">10+</div>
                        <small className="text-muted">ปีประสบการณ์</small>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="bg-white p-3 rounded text-center shadow-sm">
                        <div className="mission-stat-number">50+</div>
                        <small className="text-muted">ผู้เชี่ยวชาญ</small>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="bg-white p-3 rounded text-center shadow-sm">
                        <div className="mission-stat-number">100%</div>
                        <small className="text-muted">มาตรฐานสากล</small>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="bg-white p-3 rounded text-center shadow-sm">
                        <div className="mission-stat-number">24/7</div>
                        <small className="text-muted">การสนับสนุน</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row g-4 mb-5">
            <div className="col-lg-3 col-md-6">
              <div className="card h-100 shadow-sm">
                <div className="card-header bg-primary" style={{ height: '8px' }}></div>
                <div className="card-body">
                  <h5 className="fw-semibold">ประหยัดงบประมาณ</h5>
                  <p className="text-muted small">ไม่ต้องจ้างพนักงานประจำ ใช้บริการเฉพาะเมื่อต้องการ</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="card h-100 shadow-sm">
                <div className="card-header bg-primary" style={{ height: '8px' }}></div>
                <div className="card-body">
                  <h5 className="fw-semibold">ทีมผู้เชี่ยวชาญ</h5>
                  <p className="text-muted small">ผู้เชี่ยวชาญด้านเทคโนโลยีสิ่งอำนวยความสะดวก</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="card h-100 shadow-sm">
                <div className="card-header bg-primary" style={{ height: '8px' }}></div>
                <div className="card-body">
                  <h5 className="fw-semibold">Universal Design</h5>
                  <p className="text-muted small">ผลงานที่สามารถใช้งานได้กับทุกกลุ่มผู้ใช้</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="card h-100 shadow-sm">
                <div className="card-header bg-primary" style={{ height: '8px' }}></div>
                <div className="card-body">
                  <h5 className="fw-semibold">มาตรฐานสากล</h5>
                  <p className="text-muted small">เป็นไปตามมาตรฐานการเข้าถึงและใช้ประโยชน์ได้</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5">
            <h3 className="text-center h4 fw-bold mb-5">กระบวนการทำงาน</h3>
            <div className="row g-4">
              <div className="col-lg-3 col-md-6 text-center">
                <div className="step-number">01</div>
                <h5 className="fw-semibold">ปรึกษาและวางแผน</h5>
                <p className="text-muted small">วิเคราะห์ความต้องการและวางแผนการทดสอบ</p>
              </div>
              <div className="col-lg-3 col-md-6 text-center">
                <div className="step-number">02</div>
                <h5 className="fw-semibold">ออกแบบการทดสอบ</h5>
                <p className="text-muted small">สร้างแผนการทดสอบที่เหมาะสมกับโครงการ</p>
              </div>
              <div className="col-lg-3 col-md-6 text-center">
                <div className="step-number">03</div>
                <h5 className="fw-semibold">ดำเนินการทดสอบ</h5>
                <p className="text-muted small">ทดสอบกับผู้ใช้จริงและผู้เชี่ยวชาญ</p>
              </div>
              <div className="col-lg-3 col-md-6 text-center">
                <div className="step-number">04</div>
                <h5 className="fw-semibold">รายงานและปรับปรุง</h5>
                <p className="text-muted small">สรุปผลและข้อเสนอแนะการปรับปรุง</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reports Section */}
      <section id="reports" className="py-5 bg-light">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold text-dark mb-3">รายงานการทดสอบ</h2>
            <p className="lead text-muted mx-auto" style={{ maxWidth: '800px' }}>
              รายงานที่ครบถ้วน ละเอียด และใช้งานง่าย เพื่อให้คุณสามารถนำไปปรับปรุงได้อย่างมีประสิทธิภาพ
            </p>
          </div>

          <div className="row g-4 mb-5">
            <div className="col-lg-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body p-4">
                  <div className="service-icon primary">📄</div>
                  <h3 className="h5 fw-semibold text-center">รายงานการทดสอบเว็บไซต์</h3>
                  <p className="text-muted text-center mb-4">การทดสอบการเข้าถึงเว็บไซต์ตามมาตรฐาน WCAG 2.1</p>
                  
                  <div className="bg-light rounded p-3 mb-4">
                    <h6 className="fw-semibold mb-3">ตัวอย่างผลการทดสอบ:</h6>
                    <div className="row g-3 small">
                      <div className="col-6">
                        <span className="text-muted">คะแนน:</span><br/>
                        <strong style={{ color: 'var(--primary)' }}>87%</strong>
                      </div>
                      <div className="col-6">
                        <span className="text-muted">ปัญหาที่พบ:</span><br/>
                        <strong style={{ color: 'var(--warning)' }}>23 จุด</strong>
                      </div>
                      <div className="col-6">
                        <span className="text-muted">ระดับความรุนแรง:</span><br/>
                        <strong>ปานกลาง</strong>
                      </div>
                      <div className="col-6">
                        <span className="text-muted">ระยะเวลา:</span><br/>
                        <strong>14 วัน</strong>
                      </div>
                    </div>
                  </div>
                  
                  <ul className="feature-list mb-4">
                    <li>การทดสอบกับ Screen Reader</li>
                    <li>การทดสอบการนำทางด้วยคีย์บอร์ด</li>
                    <li>การทดสอบความคมชัดของสี</li>
                    <li>การทดสอบ Responsive Design</li>
                  </ul>
                  
                  <button className="btn btn-custom-outline w-100">ดาวน์โหลดตัวอย่าง</button>
                </div>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body p-4">
                  <div className="service-icon secondary">📱</div>
                  <h3 className="h5 fw-semibold text-center">รายงานการทดสอบแอปพลิเคชัน</h3>
                  <p className="text-muted text-center mb-4">การทดสอบ Mobile Application บน iOS และ Android</p>
                  
                  <div className="bg-light rounded p-3 mb-4">
                    <h6 className="fw-semibold mb-3">ตัวอย่างผลการทดสอบ:</h6>
                    <div className="row g-3 small">
                      <div className="col-6">
                        <span className="text-muted">คะแนน:</span><br/>
                        <strong style={{ color: 'var(--primary)' }}>92%</strong>
                      </div>
                      <div className="col-6">
                        <span className="text-muted">ปัญหาที่พบ:</span><br/>
                        <strong style={{ color: 'var(--warning)' }}>12 จุด</strong>
                      </div>
                      <div className="col-6">
                        <span className="text-muted">ระดับความรุนแรง:</span><br/>
                        <strong>ต่ำ</strong>
                      </div>
                      <div className="col-6">
                        <span className="text-muted">ระยะเวลา:</span><br/>
                        <strong>10 วัน</strong>
                      </div>
                    </div>
                  </div>
                  
                  <ul className="feature-list mb-4">
                    <li>การทดสอบ Voice Over/TalkBack</li>
                    <li>การทดสอบ Touch Gesture</li>
                    <li>การทดสอบขนาดตัวอักษรและปุ่ม</li>
                    <li>การทดสอบการใช้งานด้วยมือเดียว</li>
                  </ul>
                  
                  <button className="btn btn-custom-outline w-100">ดาวน์โหลดตัวอย่าง</button>
                </div>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body p-4">
                  <div className="service-icon accent">🏢</div>
                  <h3 className="h5 fw-semibold text-center">รายงานการทดสอบสถานที่</h3>
                  <p className="text-muted text-center mb-4">การทดสอบความเข้าถึงได้ของอาคารและสถานที่</p>
                  
                  <div className="bg-light rounded p-3 mb-4">
                    <h6 className="fw-semibold mb-3">ตัวอย่างผลการทดสอบ:</h6>
                    <div className="row g-3 small">
                      <div className="col-6">
                        <span className="text-muted">คะแนน:</span><br/>
                        <strong style={{ color: 'var(--primary)' }}>78%</strong>
                      </div>
                      <div className="col-6">
                        <span className="text-muted">ปัญหาที่พบ:</span><br/>
                        <strong style={{ color: 'var(--danger)' }}>31 จุด</strong>
                      </div>
                      <div className="col-6">
                        <span className="text-muted">ระดับความรุนแรง:</span><br/>
                        <strong>สูง</strong>
                      </div>
                      <div className="col-6">
                        <span className="text-muted">ระยะเวลา:</span><br/>
                        <strong>21 วัน</strong>
                      </div>
                    </div>
                  </div>
                  
                  <ul className="feature-list mb-4">
                    <li>การทดสอบเส้นทางการเดิน</li>
                    <li>การทดสอบลิฟต์และบันได</li>
                    <li>การทดสอบห้องน้ำและที่จอดรถ</li>
                    <li>การทดสอบป้ายบอกทางและการแสดงผล</li>
                  </ul>
                  
                  <button className="btn btn-custom-outline w-100">ดาวน์โหลดตัวอย่าง</button>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <h3 className="h4 mb-3">ต้องการดูตัวอย่างรายงานแบบเต็ม?</h3>
            <p className="text-muted mb-4">ติดต่อเราเพื่อขอรับตัวอย่างรายงานการทดสอบแบบละเอียด</p>
            <button 
              className="btn btn-custom-primary btn-lg"
              onClick={() => scrollToSection('#contact')}
            >
              ขอตัวอย่างรายงาน
            </button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold text-dark mb-3">ติดต่อเรา</h2>
            <p className="lead text-muted mx-auto" style={{ maxWidth: '800px' }}>
              พร้อมให้คำปรึกษาและเริ่มโครงการทดสอบ เรายินดีที่จะช่วยให้โครงการของคุณเป็น Universal Design
            </p>
          </div>

          <div className="row g-5">
            <div className="col-lg-8">
              <div className="card shadow-sm">
                <div className="card-body p-4">
                  <h3 className="h4 mb-4">ส่งข้อความหาเรา</h3>
                  <form onSubmit={handleSubmit}>
                    <div className="row g-3 mb-3">
                      <div className="col-md-6">
                        <label className="form-label fw-medium">ชื่อ</label>
                        <input 
                          type="text" 
                          className="form-control" 
                          name="firstName"
                          placeholder="ชื่อของคุณ" 
                          required 
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label fw-medium">นามสกุล</label>
                        <input 
                          type="text" 
                          className="form-control" 
                          name="lastName"
                          placeholder="นามสกุลของคุณ" 
                          required 
                        />
                      </div>
                    </div>

                    <div className="mb-3">
                      <label className="form-label fw-medium">อีเมล</label>
                      <input 
                        type="email" 
                        className="form-control" 
                        name="email"
                        placeholder="example@email.com" 
                        required 
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label fw-medium">เบอร์โทร</label>
                      <input 
                        type="tel" 
                        className="form-control" 
                        name="phone"
                        placeholder="xxx-xxx-xxxx" 
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label fw-medium">ประเภทโครงการ</label>
                      <select className="form-select" name="projectType" required>
                        <option value="">เลือกประเภทโครงการ</option>
                        <option value="website">เว็บไซต์</option>
                        <option value="mobile">แอปพลิเคชัน</option>
                        <option value="building">อาคารและสถานที่</option>
                        <option value="service">บริการและระบบ</option>
                        <option value="other">อื่นๆ</option>
                      </select>
                    </div>

                    <div className="mb-4">
                      <label className="form-label fw-medium">รายละเอียดโครงการ</label>
                      <textarea 
                        className="form-control" 
                        rows="4"
                        name="message"
                        placeholder="บอกเราเกี่ยวกับโครงการของคุณ..." 
                        required
                      ></textarea>
                    </div>

                    <button type="submit" className="btn btn-custom-primary w-100 py-3">
                      ส่งข้อความ
                    </button>
                  </form>
                </div>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="d-flex flex-column gap-4">
                <div className="card shadow-sm">
                  <div className="card-body p-4">
                    <h4 className="h5 mb-3">ข้อมูลการติดต่อ</h4>
                    
                    <div className="mb-3">
                      <h6 className="fw-semibold text-dark mb-1">ที่อยู่สำนักงาน</h6>
                      <p className="text-muted mb-0">123 ถนนนวัตกรรม แขวงเทคโนโลยี<br/>เขตดิจิทัล กรุงเทพฯ 10110</p>
                    </div>
                    
                    <div className="mb-3">
                      <h6 className="fw-semibold text-dark mb-1">เบอร์โทรศัพท์</h6>
                      <p className="text-muted mb-0">02-xxx-xxxx</p>
                    </div>
                    
                    <div className="mb-3">
                      <h6 className="fw-semibold text-dark mb-1">อีเมล</h6>
                      <p className="text-muted mb-0">contact@atth.co.th</p>
                    </div>
                    
                    <div className="mb-3">
                      <h6 className="fw-semibold text-dark mb-1">เวลาทำการ</h6>
                      <p className="text-muted mb-0">จันทร์-ศุกร์: 9:00-18:00<br/>เสาร์: 9:00-16:00</p>
                    </div>
                  </div>
                </div>

                <div className="contact-card gradient card shadow-sm">
                  <div className="card-body p-4 text-white">
                    <h4 className="h5 mb-3">ปรึกษาฟรี!</h4>
                    <p className="mb-4" style={{ opacity: 0.9 }}>
                      เรามีบริการให้คำปรึกษาเบื้องต้นฟรี เพื่อช่วยวิเคราะห์ความต้องการและแนะนำแผนการทดสอบที่เหมาะสมกับโครงการของคุณ
                    </p>
                    <button className="btn btn-white w-100">
                      นัดหมายปรึกษา
                    </button>
                  </div>
                </div>

                <div className="card shadow-sm">
                  <div className="card-body p-4">
                    <h4 className="h5 mb-3">บริการเร่งด่วน</h4>
                    <p className="text-muted mb-3">
                      สำหรับโครงการที่ต้องการผลลัพธ์อย่างเร่งด่วน เรามีทีมพิเศษที่สามารถให้บริการได้ตลอด 24 ชั่วโมง
                    </p>
                    <button className="btn btn-outline-danger w-100">
                      ติดต่อบริการเร่งด่วน
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="custom-footer py-5">
        <div className="container">
          <div className="row g-4 mb-4">
            <div className="col-lg-6">
              <h3 className="h4 fw-bold mb-2">ATTH</h3>
              <p className="h6 text-warning mb-3">Assistive Tech Test Hub</p>
              <p className="text-light mb-4">
                ผู้เชี่ยวชาญด้านการทดสอบการเข้าถึงและใช้ประโยชน์ได้ 
                เพื่อสร้างสังคมที่ทุกคนสามารถเข้าถึงเทคโนโลยีและสิ่งแวดล้อมได้อย่างเท่าเทียมกัน
              </p>
              <div className="small text-secondary">
                <p className="mb-1">© 2024 ATTH - Assistive Tech Test Hub</p>
                <p className="mb-0">สงวนลิขสิทธิ์ทุกประการ</p>
              </div>
            </div>

            <div className="col-lg-3">
              <h5 className="fw-semibold mb-3">ลิงก์ด่วน</h5>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <button className="btn btn-link text-light p-0" onClick={() => scrollToSection('#home')}>หน้าแรก</button>
                </li>
                <li className="mb-2">
                  <button className="btn btn-link text-light p-0" onClick={() => scrollToSection('#services')}>บริการ</button>
                </li>
                <li className="mb-2">
                  <button className="btn btn-link text-light p-0" onClick={() => scrollToSection('#about')}>เกี่ยวกับเรา</button>
                </li>
                <li className="mb-2">
                  <button className="btn btn-link text-light p-0" onClick={() => scrollToSection('#reports')}>รายงาน</button>
                </li>
                <li className="mb-2">
                  <button className="btn btn-link text-light p-0" onClick={() => scrollToSection('#contact')}>ติดต่อ</button>
                </li>
              </ul>
            </div>

            <div className="col-lg-3">
              <h5 className="fw-semibold mb-3">บริการ</h5>
              <ul className="list-unstyled">
                <li className="mb-2"><a href="#" className="text-light text-decoration-none">ทดสอบเว็บไซต์</a></li>
                <li className="mb-2"><a href="#" className="text-light text-decoration-none">ทดสอบแอปพลิเคชัน</a></li>
                <li className="mb-2"><a href="#" className="text-light text-decoration-none">ทดสอบสถานที่</a></li>
                <li className="mb-2"><a href="#" className="text-light text-decoration-none">ให้คำปรึกษา</a></li>
                <li className="mb-2"><a href="#" className="text-light text-decoration-none">อบรม</a></li>
              </ul>
            </div>
          </div>

          <hr className="border-secondary my-4" />

          <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
            <div className="small text-secondary">
              เว็บไซต์นี้ออกแบบตาม Universal Design และรองรับการใช้งานของผู้ใช้ทุกกลุ่ม
            </div>
            <div className="d-flex gap-4">
              <a href="#" className="text-light text-decoration-none small">นิยามความเป็นส่วนตัว</a>
              <a href="#" className="text-light text-decoration-none small">เงื่อนไขการใช้งาน</a>
              <a href="#" className="text-light text-decoration-none small">แผนที่เว็บไซต์</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default HomePageComponent;