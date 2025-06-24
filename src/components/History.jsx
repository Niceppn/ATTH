import React, { useState, useEffect } from "react";
import './history.css'
import { Container, Row, Col, Table, Form, Button, InputGroup } from "react-bootstrap";

const mockUsageData = [
    {
        id: 1,
        action: "เข้าสู่ระบบ",
        description: "เข้าสู่ระบบผ่าน Chrome Browser",
        timestamp: "2024-06-17 09:15:23",
        status: "waite",
        ip: "192.168.1.100",
        device: "Windows 10 - Chrome",
        location: "Bangkok, Thailand"
    },
    {
        id: 2,
        action: "ทำแบบทดสอบ",
        description: "ทำแบบทดสอบ: JavaScript Fundamentals",
        timestamp: "2024-06-17 09:30:45",
        status: "test",
        score: 85,
        duration: "25 นาที",
        questions: 20
    },
    {
        id: 3,
        action: "ดูผลการทดสอบ",
        description: "ดูรายงานผลการทดสอบ JavaScript Fundamentals",
        timestamp: "2024-06-17 10:00:12",
        status: "viewed",
        ip: "192.168.1.100"
    },
    {
        id: 4,
        action: "ดาวน์โหลดใบประกาศนียบัตร",
        description: "ดาวน์โหลดใบประกาศนียบัตรการทดสอบ",
        timestamp: "2024-06-17 10:05:30",
        status: "downloaded",
        fileSize: "2.5 MB"
    },
    {
        id: 5,
        action: "อัปเดตโปรไฟล์",
        description: "แก้ไขข้อมูลส่วนตัวและรูปโปรไฟล์",
        timestamp: "2024-06-16 14:22:18",
        status: "test",
        changedFields: ["ชื่อ", "รูปโปรไฟล์"]
    },
    {
        id: 6,
        action: "ล้มเหลวในการทดสอบ",
        description: "ความพยายามที่ล้มเหลวในการทดสอบ: React Advanced",
        timestamp: "2024-06-16 11:45:33",
        status: "waite",
        score: 45,
        duration: "30 นาที"
    },
    {
        id: 7,
        action: "ออกจากระบบ",
        description: "ออกจากระบบปกติ",
        timestamp: "2024-06-16 16:30:00",
        status: "logout",
        sessionDuration: "2 ชั่วโมง 15 นาที"
    }
];

const statsData = {
    totalSessions: 24,
    totalTests: 12,
    avgScore: 78,
    totalHours: 45.5,
    successRate: 85,
    lastLogin: "2024-06-17 09:15:23"
};

function UsageHistory() {
    const [usageData, setUsageData] = useState(mockUsageData);
    const [filteredData, setFilteredData] = useState(mockUsageData);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    useEffect(() => {
        let filtered = usageData;

        if (searchTerm) {
            filtered = filtered.filter(item =>
                item.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (filterStatus !== 'all') {
            filtered = filtered.filter(item => item.status === filterStatus);
        }

        setFilteredData(filtered);
        setCurrentPage(1);
    }, [searchTerm, filterStatus, usageData]);

    const getStatusBadge = (status) => {
        const badges = {
            success: 'badge bg-success',
            waite: 'badge bg-primary',
            test: 'badge bg-warning',
            downloaded: 'badge bg-info',
            failed: 'badge bg-danger',
            logout: 'badge bg-warning'
        };
        return badges[status] || 'badge bg-secondary';
    };

    const getStatusIcon = (action) => {
        const icons = {
            'เข้าสู่ระบบ': 'fas fa-sign-in-alt text-success',
            'ทำแบบทดสอบ': 'fas fa-clipboard-check text-primary',
            'ดูผลการทดสอบ': 'fas fa-chart-bar text-info',
            'ดาวน์โหลดใบประกาศนียบัตร': 'fas fa-download text-warning',
            'อัปเดตโปรไฟล์': 'fas fa-user-edit text-secondary',
            'ล้มเหลวในการทดสอบ': 'fas fa-times-circle text-danger',
            'ออกจากระบบ': 'fas fa-sign-out-alt text-warning'
        };
        return icons[action] || 'fas fa-info-circle text-muted';
    };

    const formatDateTime = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleDateString('th-TH', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const currentItems = filteredData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );
    return (
        <div className="container-fluid py-4">
            {/* Header */}
            <div className="row mb-4">
                <div className="col-12">
                    <div className="d-flex justify-content-between align-items-center">
                        <div>
                            <h2 className="text-dark mb-1">
                                <i className="fas fa-history me-2"></i>
                                ประวัติการใช้งาน
                            </h2>
                            <p className="text-muted">ติดตามกิจกรรมและการใช้งานของผู้ทดสอบ</p>
                        </div>
                        <div className="text-end">
                            <small className="text-muted">อัปเดตล่าสุด: {formatDateTime(new Date())}</small>
                        </div>
                    </div>
                </div>
            </div>

            {/* Statistics Cards */}
            <div className="row mb-4">
                <div className="col-md-2 mb-3">
                    <div className="card stats-card h-100">
                        <div className="card-body text-center">
                            <i className="fas fa-clock fa-2x mb-2"></i>
                            <h4 className="fw-bold">{statsData.totalSessions}</h4>
                            <small>จำนวนครั้งที่เข้าใช้</small>
                        </div>
                    </div>
                </div>
                <div className="col-md-2 mb-3">
                    <div className="card bg-primary text-white h-100">
                        <div className="card-body text-center">
                            <i className="fas fa-clipboard-list fa-2x mb-2"></i>
                            <h4 className="fw-bold">{statsData.totalTests}</h4>
                            <small>แบบทดสอบที่ทำ</small>
                        </div>
                    </div>
                </div>
                <div className="col-md-2 mb-3">
                    <div className="card bg-success text-white h-100">
                        <div className="card-body text-center">
                            <i className="fas fa-star fa-2x mb-2"></i>
                            <h4 className="fw-bold">{statsData.avgScore}%</h4>
                            <small>คะแนนเฉลี่ย</small>
                        </div>
                    </div>
                </div>
                <div className="col-md-2 mb-3">
                    <div className="card bg-info text-white h-100">
                        <div className="card-body text-center">
                            <i className="fas fa-hourglass-half fa-2x mb-2"></i>
                            <h4 className="fw-bold">{statsData.totalHours}</h4>
                            <small>ชั่วโมงใช้งาน</small>
                        </div>
                    </div>
                </div>
                <div className="col-md-2 mb-3">
                    <div className="card bg-warning text-white h-100">
                        <div className="card-body text-center">
                            <i className="fas fa-chart-line fa-2x mb-2"></i>
                            <h4 className="fw-bold">{statsData.successRate}%</h4>
                            <small>อัตราสำเร็จ</small>
                        </div>
                    </div>
                </div>
                <div className="col-md-2 mb-3">
                    <div className="card bg-secondary text-white h-100">
                        <div className="card-body text-center">
                            <i className="fas fa-calendar-check fa-2x mb-2"></i>
                            <div style={{ fontSize: '0.8rem' }} className="fw-bold">
                                {formatDateTime(statsData.lastLogin).split(' ')[0]}
                            </div>
                            <small>เข้าใช้ครั้งล่าสุด</small>
                        </div>
                    </div>
                </div>
            </div>

            {/* Filters and Search */}
            <div className="row mb-4">
                <div className="col-12">
                    <div className="card">
                        <div className="card-body">
                            <div className="row align-items-center">
                                <div className="col-md-6 mb-3 mb-md-0">
                                    <div className="search-box">
                                        <div className="input-group">
                                            <span className="input-group-text">
                                                <i className="fas fa-search"></i>
                                            </span>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="ค้นหากิจกรรม..."
                                                value={searchTerm}
                                                onChange={(e) => setSearchTerm(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="filter-buttons d-flex flex-wrap">
                                        <button
                                            className={`btn btn-sm ${filterStatus === 'all' ? 'btn-info' : 'btn-outline-info'}`}
                                            onClick={() => setFilterStatus('all')}
                                        >
                                            ทั้งหมด

                                        </button>
                                        <button
                                            className={`btn btn-sm ${filterStatus === 'waite' ? 'btn-primary' : 'btn-outline-primary'}`}
                                            onClick={() => setFilterStatus('waite')}
                                        >
                                            รอการทดสอบ
                                        </button>
                                        <button
                                            className={`btn btn-sm ${filterStatus === 'success' ? 'btn-success' : 'btn-outline-success'}`}
                                            onClick={() => setFilterStatus('success')}
                                        >
                                            ทดสอบเสร็จสิ้น
                                        </button>
                                        <button
                                            className={`btn btn-sm ${filterStatus === 'test' ? 'btn-warning' : 'btn-outline-warning'}`}
                                            onClick={() => setFilterStatus('test')}
                                        >
                                            กำลังทดสอบ
                                        </button>


                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Activity Timeline */}
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card-header bg-white">
                            <h5 className="card-title mb-0">
                                <i className="fas fa-list me-2"></i>
                                รายการกิจกรรม
                                <span className="badge bg-primary ms-2">{filteredData.length}</span>
                            </h5>
                        </div>
                        <div className="card-body">
                            {currentItems.length === 0 ? (
                                <div className="text-center py-5">
                                    <i className="fas fa-search fa-3x text-muted mb-3"></i>
                                    <h5 className="text-muted">ไม่พบข้อมูลที่ค้นหา</h5>
                                    <p className="text-muted">ลองเปลี่ยนคำค้นหาหรือตัวกรองดู</p>
                                </div>
                            ) : (
                                <div className="activity-timeline">
                                    {currentItems.map((item) => (
                                        <div key={item.id} className="activity-item p-3">
                                            <div className="d-flex align-items-start">
                                                <div className="flex-shrink-0 me-3">
                                                    <i className={`${getStatusIcon(item.action)} fa-lg`}></i>
                                                </div>
                                                <div className="flex-grow-1">
                                                    <div className="d-flex justify-content-between align-items-start mb-2">
                                                        <div>
                                                            <h6 className="mb-1 fw-bold">{item.action}</h6>
                                                            <p className="mb-1 text-muted">{item.description}</p>
                                                        </div>
                                                        <div className="text-end">
                                                            <span className={`badge ${getStatusBadge(item.status)} mb-2`}>
                                                                {item.status}
                                                            </span>
                                                            <div className="activity-time">
                                                                {formatDateTime(item.timestamp)}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Additional Details */}
                                                    <div className="row g-2 mt-2">
                                                        {item.ip && (
                                                            <div className="col-auto">
                                                                <small className="text-muted">
                                                                    <i className="fas fa-globe me-1"></i>
                                                                    IP: {item.ip}
                                                                </small>
                                                            </div>
                                                        )}
                                                        {item.device && (
                                                            <div className="col-auto">
                                                                <small className="text-muted">
                                                                    <i className="fas fa-desktop me-1"></i>
                                                                    {item.device}
                                                                </small>
                                                            </div>
                                                        )}
                                                        {item.score && (
                                                            <div className="col-auto">
                                                                <small className="text-muted">
                                                                    <i className="fas fa-star me-1"></i>
                                                                    คะแนน: {item.score}%
                                                                </small>
                                                            </div>
                                                        )}
                                                        {item.duration && (
                                                            <div className="col-auto">
                                                                <small className="text-muted">
                                                                    <i className="fas fa-clock me-1"></i>
                                                                    ระยะเวลา: {item.duration}
                                                                </small>
                                                            </div>
                                                        )}
                                                        {item.location && (
                                                            <div className="col-auto">
                                                                <small className="text-muted">
                                                                    <i className="fas fa-map-marker-alt me-1"></i>
                                                                    {item.location}
                                                                </small>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <nav className="mt-4">
                                    <ul className="pagination justify-content-center">
                                        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                            <button
                                                className="page-link"
                                                onClick={() => setCurrentPage(currentPage - 1)}
                                                disabled={currentPage === 1}
                                            >
                                                ก่อนหน้า
                                            </button>
                                        </li>
                                        {[...Array(totalPages)].map((_, index) => (
                                            <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                                                <button
                                                    className="page-link"
                                                    onClick={() => setCurrentPage(index + 1)}
                                                >
                                                    {index + 1}
                                                </button>
                                            </li>
                                        ))}
                                        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                            <button
                                                className="page-link"
                                                onClick={() => setCurrentPage(currentPage + 1)}
                                                disabled={currentPage === totalPages}
                                            >
                                                ถัดไป
                                            </button>
                                        </li>
                                    </ul>
                                </nav>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default UsageHistory;