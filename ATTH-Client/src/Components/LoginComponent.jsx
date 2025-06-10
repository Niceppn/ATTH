import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../LoginComponent.css'; 

const LoginComponent = () => {
  const [userType, setUserType] = useState('customer');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showMobileNav, setShowMobileNav] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Handle user type selection
  const handleUserTypeChange = (type) => {
    setUserType(type);
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setShowMobileNav(!showMobileNav);
  };

  // Handle form submission
  

  // Feature animation on mount
  useEffect(() => {
    const features = document.querySelectorAll('.feature-item');
    features.forEach((feature, index) => {
      setTimeout(() => {
        feature.style.animation = `slideUp 0.6s ease-out`;
      }, index * 200);
    });
  }, []);
  
const handleLogin = (e) => {
  e.preventDefault();
  setIsLoading(true);
  
  let redirectPath;
  
  if (userType === 'admin') {
    // ตรวจสอบอีเมลและรหัสผ่านสำหรับผู้ดูแลระบบ
    const email = formData.email.toLowerCase().trim();
    const password = formData.password;
    
    if (email === 'tester@friendlydev.com' && password === '1234') {
      redirectPath = '/home/tester';
      console.log('Redirecting to tester page:', redirectPath);
    } else if (email === 'admin@friendlydev.com' && password === '123admin') {
      redirectPath = '/home/admin';
      console.log('Redirecting to admin page:', redirectPath);
    } else {
      // อีเมลหรือรหัสผ่านไม่ถูกต้องสำหรับผู้ดูแลระบบ
      setIsLoading(false);
      let errorMessage = 'ข้อมูลเข้าสู่ระบบไม่ถูกต้อง';
      alert(errorMessage);
      return;
    }
  } else {
    // ตรวจสอบอีเมลและรหัสผ่านสำหรับลูกค้า
    const email = formData.email.toLowerCase().trim();
    const password = formData.password;
    
    if (email === 'client@friendlydev.com' && password === 'friendlydev') {
      redirectPath = '/home';
      console.log('Redirecting to customer page:', redirectPath);
    } else {
      // อีเมลหรือรหัสผ่านไม่ถูกต้องสำหรับลูกค้า
      setIsLoading(false);
      let errorMessage = 'ข้อมูลเข้าสู่ระบบไม่ถูกต้อง';
      alert(errorMessage);
      return;
    }
  }
  

  setTimeout(() => {
    setIsLoading(false);
    console.log('Final redirect path:', redirectPath);
    window.location.href = redirectPath;
  }, 1000);
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
        }
      `}
      </style>

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

    <div className="pt-5">
        <div className="login-page">
      <div className="login-container">
        {/* Login Form Section */}
        <div className="login-form-section">
          {/* Brand Logo */}
          <div className="brand-logo">
            <h1>ATTH</h1>
            <p>Assistive Tech Test Hub</p>
          </div>

          {/* Login Title */}
          <div className="login-title">
            <h2>เข้าสู่ระบบ</h2>
            <p>เข้าถึงรายงานและข้อมูลโครงการของท่าน</p>
          </div>

          {/* User Type Selection */}
          <div className="user-type-selector">
            <div className="d-flex gap-3">
              <button 
                type="button" 
                className={`type-btn ${userType === 'customer' ? 'active' : ''}`}
                onClick={() => handleUserTypeChange('customer')}
              >
                <i className="fas fa-building"></i>
                ลูกค้า
              </button>
              <button 
                type="button" 
                className={`type-btn ${userType === 'admin' ? 'active' : ''}`}
                onClick={() => handleUserTypeChange('admin')}
              >
                <i className="fas fa-user-shield"></i>
                ผู้ดูแลระบบ
              </button>
            </div>
          </div>

          {/* Login Form */}
          <div className="login-form">
            {/* Email */}
            <div className="form-group">
              <label className="form-label">อีเมล</label>
              <div className="input-group">
                <i className="fas fa-envelope input-icon"></i>
                <input 
                  type="email" 
                  className="form-control" 
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="กรอกอีเมลของท่าน" 
                  required 
                />
              </div>
            </div>

            {/* Password */}
            <div className="form-group">
              <label className="form-label">รหัสผ่าน</label>
              <div className="input-group">
                <i className="fas fa-lock input-icon"></i>
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  className="form-control" 
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="กรอกรหัสผ่าน" 
                  required 
                />
                <button 
                  type="button" 
                  className="password-toggle"
                  onClick={togglePasswordVisibility}
                >
                  <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                </button>
              </div>
            </div>

            {/* Remember & Forgot */}
            <div className="remember-forgot">
              <div className="form-check">
                <input 
                  className="form-check-input" 
                  type="checkbox" 
                  id="rememberMe"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleInputChange}
                />
                <label className="form-check-label" htmlFor="rememberMe">
                  จดจำการเข้าสู่ระบบ
                </label>
              </div>
              <button type="button" className="forgot-link">ลืมรหัสผ่าน?</button>
            </div>

            {/* Login Button */}
            <button     
                    type="submit" 
                    className="login-btn" 
                    onClick={handleLogin}
                    disabled={isLoading}
                    >
                    {isLoading ? (
                        <>
                        <i className="fas fa-spinner fa-spin"></i> กำลังเข้าสู่ระบบ...
                        </>
                    ) : (
                        <>เข้าสู่ระบบ</>
                    )}
                    </button>


            {/* Signup Link */}
            <div className="signup-link">
              ยังไม่มีบัญชี? <button type="button" className="signup-btn">ติดต่อขอใช้งาน</button>
            </div>
          </div>
        </div>

        {/* Info Section */}
        <div className="login-info-section">
          <div className="info-content">
            {/* Icon */}
            <div className="info-icon">
              <i className="fas fa-shield-alt fa-2x"></i>
            </div>

            {/* Title & Subtitle */}
            <h3 className="info-title">ระบบจัดการโครงการ</h3>
            <p className="info-subtitle">
              เข้าถึงข้อมูลโครงการ รายงานผลการทดสอบ และติดตามความคืบหน้า
              ของการทดสอบการเข้าถึงได้อย่างครบถ้วน
            </p>

            {/* Features List */}
            <div className="features-list">
              <div className="feature-item">
                <div className="feature-icon">
                  <i className="fas fa-check-circle"></i>
                </div>
                <span>รายงานผลการทดสอบแบบเรียลไทม์</span>
              </div>
              <div className="feature-item">
                <div className="feature-icon">
                  <i className="fas fa-shield-alt"></i>
                </div>
                <span>ระบบความปลอดภัยระดับสูง</span>
              </div>
              <div className="feature-item">
                <div className="feature-icon">
                  <i className="fas fa-clock"></i>
                </div>
                <span>ติดตามสถานะโครงการตลอด 24 ชั่วโมง</span>
              </div>
            </div>

            {/* Contact Info */}
            <div className="contact-info">
              <h6 style={{ fontWeight: 600, marginBottom: '15px' }}>ต้องการความช่วยเหลือ?</h6>
              <div className="contact-item">
                <i className="fas fa-phone"></i>
                <span>02-123-4567</span>
              </div>
              <div className="contact-item">
                <i className="fas fa-envelope"></i>
                <span>support@atth.co.th</span>
              </div>
            </div>

            {/* System Status */}
            <div className="status-badge">
              <i className="fas fa-check-circle"></i>
              ระบบพร้อมใช้งาน
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="footer-text">
        © 2024 ATTH - Assistive Tech Test Hub. สงวนลิขสิทธิ์.
      </div>
    </div>
    </div>
    </>
  );
};

export default LoginComponent;