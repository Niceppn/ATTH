import React, { useState } from 'react';

const NotificationPage = () => {
    const [notifications, setNotifications] = useState([
        {
            id: 1,
            title: 'ยินดีต้อนรับสู่ระบบ',
            message: 'บัญชีของคุณได้รับการยืนยันเรียบร้อยแล้ว',
            type: 'success',
            time: '5 นาทีที่แล้ว',
            read: false,
            avatar: 'https://via.placeholder.com/40/28a745/ffffff?text=✓'
        },
        {
            id: 2,
            title: 'การทำเเบบทดสอบ',
            message: 'คุณทำการทดสอบเว็บไซต์',
            type: 'info',
            time: '10 นาทีที่แล้ว',
            read: false,
            avatar: 'https://via.placeholder.com/40/007bff/ffffff?text=🛒'
        },
        {
            id: 3,
            title: 'ออกจากระบบ',
            message: 'ทำการออกจากระบบ',
            type: 'success',
            time: '30 นาทีที่แล้ว',
            read: true,
            avatar: 'https://via.placeholder.com/40/28a745/ffffff?text=💳'
        },
        {
            id: 4,
            title: 'แจ้งเตือนระบบ',
            message: 'ระบบจะปิดปรับปรุงในวันอาทิตย์นี้ เวลา 02:00-04:00 น.',
            type: 'warning',
            time: '1 ชั่วโมงที่แล้ว',
            read: false,
            avatar: 'https://via.placeholder.com/40/ffc107/000000?text=⚠️'
        },
        {
            id: 5,
            title: 'ข้อผิดพลาดในการเข้าสู่ระบบ',
            message: 'มีการพยายามเข้าสู่ระบบที่ไม่สำเร็จจากอุปกรณ์ใหม่',
            type: 'danger',
            time: '2 ชั่วโมงที่แล้ว',
            read: true,
            avatar: 'https://via.placeholder.com/40/dc3545/ffffff?text=🔒'
        }
    ]);

    const [filter, setFilter] = useState('all');

    const markAsRead = (id) => {
        setNotifications(notifications.map(notif =>
            notif.id === id ? { ...notif, read: true } : notif
        ));
    };

    const markAllAsRead = () => {
        setNotifications(notifications.map(notif => ({ ...notif, read: true })));
    };

    const deleteNotification = (id) => {
        setNotifications(notifications.filter(notif => notif.id !== id));
    };

    const filteredNotifications = notifications.filter(notif => {
        if (filter === 'unread') return !notif.read;
        if (filter === 'read') return notif.read;
        return true;
    });

    const unreadCount = notifications.filter(notif => !notif.read).length;

    const getTypeIcon = (type) => {
        switch (type) {
            case 'success': return '✅';
            case 'info': return 'ℹ️';
            case 'warning': return '⚠️';
            case 'danger': return '❌';
            default: return '📢';
        }
    };

    return (
        <>
            <link
                href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/css/bootstrap.min.css"
                rel="stylesheet"
            />
            <link
                href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
                rel="stylesheet"
            />

            <div className="min-vh-100" style={{
                background: '#ffff'
            }}>
                <div className="container py-5">
                    {/* Header */}
                    <div className="row mb-4">
                        <div className="col-12">
                            <div className="card shadow-lg border-0" style={{
                                background: 'rgba(255, 255, 255, 0.95)',
                                backdropFilter: 'blur(10px)'
                            }}>
                                <div className="card-body p-4">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div>
                                            <h2 className="card-title mb-1 fw-bold text-primary">
                                                <i className="fas fa-bell me-2"></i>
                                                การแจ้งเตือน
                                            </h2>
                                            <p className="text-muted mb-0">
                                                คุณมีการแจ้งเตือนที่ยังไม่ได้อ่าน {unreadCount} รายการ
                                            </p>
                                        </div>
                                        <button
                                            className="btn btn-outline-primary btn-sm"
                                            onClick={markAllAsRead}
                                            disabled={unreadCount === 0}
                                        >
                                            <i className="fas fa-check-double me-1"></i>
                                            อ่านทั้งหมด
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Filter Tabs */}
                    <div className="row mb-4">
                        <div className="col-12">
                            <div className="card shadow border-0" style={{
                                background: 'rgba(255, 255, 255, 0.9)',
                                backdropFilter: 'blur(10px)'
                            }}>
                                <div className="card-body p-3">
                                    <ul className="nav nav-pills justify-content-center">
                                        <li className="nav-item">
                                            <button
                                                className={`nav-link ${filter === 'all' ? 'active' : ''}`}
                                                onClick={() => setFilter('all')}
                                            >
                                                <i className="fas fa-list me-1"></i>
                                                ทั้งหมด ({notifications.length})
                                            </button>
                                        </li>
                                        <li className="nav-item">
                                            <button
                                                className={`nav-link ${filter === 'unread' ? 'active' : ''}`}
                                                onClick={() => setFilter('unread')}
                                            >
                                                <i className="fas fa-envelope me-1"></i>
                                                ยังไม่ได้อ่าน ({unreadCount})
                                            </button>
                                        </li>
                                        <li className="nav-item">
                                            <button
                                                className={`nav-link ${filter === 'read' ? 'active' : ''}`}
                                                onClick={() => setFilter('read')}
                                            >
                                                <i className="fas fa-envelope-open me-1"></i>
                                                อ่านแล้ว ({notifications.length - unreadCount})
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Notifications List */}
                    <div className="row">
                        <div className="col-12">
                            {filteredNotifications.length === 0 ? (
                                <div className="card shadow border-0 text-center" style={{
                                    background: 'rgba(255, 255, 255, 0.9)',
                                    backdropFilter: 'blur(10px)'
                                }}>
                                    <div className="card-body py-5">
                                        <i className="fas fa-bell-slash fa-3x text-muted mb-3"></i>
                                        <h5 className="text-muted">ไม่มีการแจ้งเตือน</h5>
                                        <p className="text-muted mb-0">ไม่พบการแจ้งเตือนในหมวดหมู่นี้</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="card shadow border-0" style={{
                                    background: 'rgba(255, 255, 255, 0.9)',
                                    backdropFilter: 'blur(10px)'
                                }}>
                                    <div className="list-group list-group-flush">
                                        {filteredNotifications.map((notif) => (
                                            <div
                                                key={notif.id}
                                                className={`list-group-item border-0 position-relative ${!notif.read ? 'bg-light' : ''
                                                    }`}
                                                style={{
                                                    background: notif.read ? 'transparent' : 'rgba(0, 123, 255, 0.05)',
                                                    transition: 'all 0.3s ease'
                                                }}
                                            >
                                                <div className="d-flex align-items-start">
                                                    {/* Avatar/Icon */}
                                                    <div className="flex-shrink-0 me-3">
                                                        <div
                                                            className={`rounded-circle d-flex align-items-center justify-content-center`}
                                                            style={{
                                                                width: '50px',
                                                                height: '50px',
                                                                background: `linear-gradient(135deg, ${notif.type === 'success' ? '#28a745, #20c997' :
                                                                        notif.type === 'info' ? '#007bff, #6610f2' :
                                                                            notif.type === 'warning' ? '#ffc107, #fd7e14' :
                                                                                notif.type === 'danger' ? '#dc3545, #e83e8c' : '#6c757d, #495057'
                                                                    })`,
                                                                color: 'white',
                                                                fontSize: '1.2rem'
                                                            }}
                                                        >
                                                            {getTypeIcon(notif.type)}
                                                        </div>
                                                    </div>

                                                    {/* Content */}
                                                    <div className="flex-grow-1">
                                                        <div className="d-flex justify-content-between align-items-start mb-1">
                                                            <h6 className="mb-1 fw-bold">{notif.title}</h6>
                                                            <div className="d-flex align-items-center">
                                                                {!notif.read && (
                                                                    <span className="badge bg-primary rounded-pill me-2">ใหม่</span>
                                                                )}
                                                                <div className="dropdown">
                                                                    <button
                                                                        className="btn btn-link btn-sm text-muted p-0"
                                                                        data-bs-toggle="dropdown"
                                                                    >
                                                                        <i className="fas fa-ellipsis-v"></i>
                                                                    </button>
                                                                    <ul className="dropdown-menu dropdown-menu-end">
                                                                        {!notif.read && (
                                                                            <li>
                                                                                <button
                                                                                    className="dropdown-item"
                                                                                    onClick={() => markAsRead(notif.id)}
                                                                                >
                                                                                    <i className="fas fa-check me-2"></i>ทำเครื่องหมายว่าอ่านแล้ว
                                                                                </button>
                                                                            </li>
                                                                        )}
                                                                        <li>
                                                                            <button
                                                                                className="dropdown-item text-danger"
                                                                                onClick={() => deleteNotification(notif.id)}
                                                                            >
                                                                                <i className="fas fa-trash me-2"></i>ลบ
                                                                            </button>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <p className="mb-1 text-muted">{notif.message}</p>
                                                        <small className="text-muted">
                                                            <i className="fas fa-clock me-1"></i>
                                                            {notif.time}
                                                        </small>
                                                    </div>
                                                </div>

                                                {/* Unread indicator */}
                                                {!notif.read && (
                                                    <div
                                                        className="position-absolute top-50 start-0 translate-middle-y bg-primary rounded-end"
                                                        style={{ width: '4px', height: '60%' }}
                                                    ></div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="row mt-4">
                        <div className="col-12 text-center">
                            <div className="card shadow border-0" style={{
                                background: 'rgba(255, 255, 255, 0.8)',
                                backdropFilter: 'blur(10px)'
                            }}>
                                <div className="card-body p-3">
                                    <small className="text-muted">
                                        <i className="fas fa-info-circle me-1"></i>
                                        การแจ้งเตือนจะถูกลบอัตโนมัติหลังจาก 30 วัน
                                    </small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/js/bootstrap.bundle.min.js"></script>
        </>
    );
};

export default NotificationPage;