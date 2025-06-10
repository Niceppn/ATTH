import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const NavBarComponent = () => {
    const [showMobileMenu, setShowMobileMenu] = useState(false);

    const toggleMobileMenu = () => {
        setShowMobileMenu(!showMobileMenu);
    };

    return (
       <>
        <header className='container-fluid fixed-top bg-white bg-opacity-95 border-bottom' style={{ zIndex: 1000 }}>
            <div className='container px-3' style={{ maxWidth: '2000px', height: '64px' }}>
                <div className='d-flex align-items-center justify-content-between h-100'>
                    <div className='d-flex align-items-center'>
                        <div className='me-3'>
                            <h1 className='mb-0 fs-4 fw-bold text-success'>ATTH</h1>
                            <p className='mb-0 small text-muted d-none d-sm-block'>Assistive Tech Test Hub</p>
                        </div>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className='d-none d-lg-flex align-items-center'>
                        <ul className='nav nav-pills mb-1'>
                            <li className="nav-item">
                                <Link to="/home" className="nav-link text-dark">
                                    หน้าหลัก
                                </Link>
                            </li>
                            <li className='nav-item'>
                                <Link to="/Report" className="nav-link text-dark">
                                    รายงานการทดสอบ
                                </Link>
                            </li>
                            <li className='nav-item'>
                                <Link to="/Report" className="nav-link text-dark">
                                    ขอทดสอบใหม่
                                </Link>
                            </li>
                            <li className='nav-item'>
                                <Link to="/Help" className="nav-link text-dark">
                                    ความช่วยเหลือ
                                </Link>
                            </li>
                            <li className='nav-item'>
                                <Link to="/Profile" className='nav-link text-dark'>โปรไฟล์</Link>
                            </li>
                            <li className='nav-item'>
                                <Link to="/Login" className='nav-link text-danger'>ออกจากระบบ</Link>
                            </li>

                        </ul>
                    </nav>

                    {/* Mobile Menu Button */}
                    <button 
                        className='btn btn-outline-secondary d-lg-none'
                        type="button"
                        onClick={toggleMobileMenu}
                        aria-label="Toggle navigation"
                    >
                        <span className={`navbar-toggler-icon ${showMobileMenu ? 'd-none' : ''}`}>☰</span>
                        <span className={`${showMobileMenu ? '' : 'd-none'}`}>✕</span>
                    </button>
                </div>

                {/* Mobile Menu */}
                <div className={`d-lg-none ${showMobileMenu ? 'd-block' : 'd-none'}`}>
                    <div className='bg-white border-top py-3'>
                        <ul className='nav nav-pills flex-column'>
                            <li className="nav-item mb-2">
                                <Link to="/" className="nav-link text-dark" onClick={() => setShowMobileMenu(false)}>
                                    หน้าหลัก
                                </Link>
                            </li>
                           
                            <li className="nav-item mb-2">
                               <a className='nav-link text-dark' href="#about" onClick={() => setShowMobileMenu(false)}>รายงานการทดสอบ</a>   
                            </li>
                            <li className='nav-item mb-2'>
                                <a className='nav-link text-dark' href="#help" onClick={() => setShowMobileMenu(false)}>ความช่วยเหลือ</a>
                            </li>
                            <li className='nav-item mb-2'>
                                <a className='nav-link text-dark' href="#profile" onClick={() => setShowMobileMenu(false)}>โปรไฟล์</a>
                            </li>
                            <li className='nav-item'>
                                <Link to="/Login" className='btn btn-danger w-100'>ออกจากระบบ</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </header>
       </>
    );
};

export default NavBarComponent;