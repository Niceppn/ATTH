import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';


Chart.register(...registerables);

const ReportComponent = () => {
  const elevatorChartRef = useRef(null);
  const categoryChartRef = useRef(null);
  const progressChartRef = useRef(null);

  useEffect(() => {
    // Chart.js configurations
    Chart.defaults.font.family = 'Kanit';
    
    // Elevator Scores Bar Chart
    const elevatorCtx = elevatorChartRef.current.getContext('2d');
    const elevatorChart = new Chart(elevatorCtx, {
      type: 'bar',
      data: {
        labels: ['ลิฟต์ A1', 'ลิฟต์ A2', 'ลิฟต์ B1', 'ลิฟต์ B2', 'ลิฟต์ C1', 'ลิฟต์ C2', 'ลิฟต์ D1', 'ลิฟต์ D2'],
        datasets: [{
          label: 'คะแนน',
          data: [92, 89, 94, 85, 88, 91, 86, 90],
          backgroundColor: '#16a085',
          borderColor: '#16a085',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            max: 100
          }
        },
        plugins: {
          legend: {
            display: false
          }
        }
      }
    });

    // Category Distribution Pie Chart
    const categoryCtx = categoryChartRef.current.getContext('2d');
    const categoryChart = new Chart(categoryCtx, {
      type: 'pie',
      data: {
        labels: ['การเข้าถึงได้ทางกายภาพ', 'ระบบควบคุม', 'ป้ายและสัญลักษณ์', 'ระบบเสียง', 'อื่นๆ'],
        datasets: [{
          data: [35, 25, 20, 12, 8],
          backgroundColor: ['#16a085', '#3498db', '#2ecc71', '#e74c3c', '#f39c12'],
          borderWidth: 2,
          borderColor: '#fff'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom'
          }
        }
      }
    });

    // Monthly Progress Line Chart
    const progressCtx = progressChartRef.current.getContext('2d');
    const progressChart = new Chart(progressCtx, {
      type: 'line',
      data: {
        labels: ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.'],
        datasets: [{
          label: 'แก้ไขแล้ว',
          data: [12, 15, 18, 22, 25, 28],
          borderColor: '#2ecc71',
          backgroundColor: 'rgba(46, 204, 113, 0.1)',
          tension: 0.4,
          fill: true
        }, {
          label: 'รอดำเนินการ',
          data: [3, 2, 1, 0, 1, 0],
          borderColor: '#e74c3c',
          backgroundColor: 'rgba(231, 76, 60, 0.1)',
          tension: 0.4,
          fill: true
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

    // Cleanup function
    return () => {
      elevatorChart.destroy();
      categoryChart.destroy();
      progressChart.destroy();
    };
  }, []);

  const downloadPDF = () => {
  const fileURL = process.env.PUBLIC_URL + '../WCAG_Level_A_Checklist.pdf';
  window.open(fileURL, "_blank");
};

  return (
    <div className="container-fluid bg-light min-vh-100 pt-5" style={{ fontFamily: 'Kanit, sans-serif' }}>
      {/* Header */}
      

      <div className="container py-4">
        {/* Project Overview */}
        <div className="row mb-4">
          <div className="col-lg-8">
            <div className="card h-100">
              <div className="card-header">
                <h5 className="card-title mb-2">🏢 ข้อมูลโครงการ</h5>
                <button className="btn btn-outline-secondary btn-sm" > <a href="https://drive.google.com/file/d/1mOitBGyfDOun1kX2pf5Xkunnk84-AkRe/view?usp=sharing"> ดาวน์โหลด PDF </a></button>
              </div>
              <div className="card-body">
                <div className="row g-3">
                  <div className="col-md-6">
                    <small className="text-muted">รหัสโครงการ</small>
                    <div className="fw-semibold">ATTH-2024-001</div>
                  </div>
                  <div className="col-md-6">
                    <small className="text-muted">ลูกค้า</small>
                    <div className="fw-semibold">บริษัท กรุงเทพธุรกิจ จำกัด</div>
                  </div>
                  <div className="col-md-6">
                    <small className="text-muted">วันที่ทดสอบ</small>
                    <div className="fw-semibold">📅 15 มีนาคม 2567</div>
                  </div>
                  <div className="col-md-6">
                    <small className="text-muted">สถานที่</small>
                    <div className="fw-semibold">📍 เขตสาทร กรุงเทพฯ</div>
                  </div>
                  <div className="col-md-6">
                    <small className="text-muted">จำนวนชั้น</small>
                    <div className="fw-semibold">25 ชั้น</div>
                  </div>
                  <div className="col-md-6">
                    <small className="text-muted">จำนวนลิฟต์</small>
                    <div className="fw-semibold">8 ตัว</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="card h-100">
              <div className="card-header">
                <h5 className="card-title mb-0">คะแนนรวม</h5>
              </div>
              <div className="card-body text-center">
                <div className="display-3 fw-bold text-success mb-2">87%</div>
                <div className="d-flex align-items-center justify-content-center gap-2 text-success fw-semibold mb-3">
                  <span>ผ่านการทดสอบ</span>
                </div>
                <div className="progress" style={{ height: '12px' }}>
                  <div className="progress-bar bg-success" style={{ width: '87%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="row mb-4">
          <div className="col-lg-6">
            <div className="card h-100">
              <div className="card-header">
                <h5 className="card-title mb-0">คะแนนการทดสอบแต่ละลิฟต์</h5>
                <small className="text-muted">คะแนนและจำนวนปัญหาที่พบในแต่ละลิฟต์</small>
              </div>
              <div className="card-body">
                <div style={{ height: '300px' }}>
                  <canvas ref={elevatorChartRef}></canvas>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="card h-100">
              <div className="card-header">
                <h5 className="card-title mb-0">การแจกแจงปัญหาตามหมวดหมู่</h5>
                <small className="text-muted">สัดส่วนปัญหาที่พบในแต่ละหมวดหมู่</small>
              </div>
              <div className="card-body">
                <div style={{ height: '300px' }}>
                  <canvas ref={categoryChartRef}></canvas>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Progress and Issues Charts */}
        <div className="row mb-4">
          <div className="col-lg-6">
            <div className="card h-100">
              <div className="card-header">
                <h5 className="card-title mb-0">ความคืบหน้าการแก้ไขปัญหา</h5>
                <small className="text-muted">จำนวนปัญหาที่แก้ไขแล้วและรอดำเนินการ</small>
              </div>
              <div className="card-body">
                <div style={{ height: '300px' }}>
                  <canvas ref={progressChartRef}></canvas>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="card h-100">
              <div className="card-header">
                <h5 className="card-title mb-0">ปัญหาจำแนกตามระดับความรุนแรง</h5>
                <small className="text-muted">จำนวนปัญหาในแต่ละระดับความรุนแรง</small>
              </div>
              <div className="card-body">
                <div className="d-grid gap-3">
                  <div className="d-flex justify-content-between align-items-center p-3 rounded" style={{ backgroundColor: 'rgba(220, 53, 69, 0.1)' }}>
                    <div className="d-flex align-items-center gap-2">
                      <div className="bg-danger rounded-circle" style={{ width: '16px', height: '16px' }}></div>
                      <span className="fw-medium">ความรุนแรงสูง</span>
                    </div>
                    <span className="fw-bold text-danger">5</span>
                  </div>
                  <div className="d-flex justify-content-between align-items-center p-3 rounded" style={{ backgroundColor: 'rgba(255, 193, 7, 0.1)' }}>
                    <div className="d-flex align-items-center gap-2">
                      <div className="bg-warning rounded-circle" style={{ width: '16px', height: '16px' }}></div>
                      <span className="fw-medium">ความรุนแรงปานกลาง</span>
                    </div>
                    <span className="fw-bold text-warning">12</span>
                  </div>
                  <div className="d-flex justify-content-between align-items-center p-3  rounded" style={{ backgroundColor: 'rgba(46, 204, 113, 0.1)' }}>
                    <div className="d-flex align-items-center gap-2">
                      <div className="bg-success rounded-circle" style={{ width: '16px', height: '16px' }}></div>
                      <span className="fw-medium">ความรุนแรงต่ำ</span>
                    </div>
                    <span className="fw-bold text-success">8</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Issues Table */}
        <div className="card mb-4">
          <div className="card-header">
            <h5 className="card-title mb-0">รายละเอียดปัญหาที่พบ</h5>
            <small className="text-muted">รายการปัญหาทั้งหมดพร้อมสถานะการแก้ไข</small>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-hover">
                <thead className="table-light">
                  <tr>
                    <th>ลิฟต์</th>
                    <th>ปัญหาที่พบ</th>
                    <th>ความรุนแรง</th>
                    <th>สถานะ</th>
                    <th>วันที่พบ</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="fw-semibold">ลิฟต์ A1</td>
                    <td>ปุ่มกดชั้นไม่มีอักษรเบรลล์</td>
                    <td><span className="badge bg-warning">ปานกลาง</span></td>
                    <td>
                      <div className="d-flex align-items-center gap-2">
                        <span>แก้ไขแล้ว</span>
                      </div>
                    </td>
                    <td>10 มี.ค. 67</td>
                  </tr>
                  <tr>
                    <td className="fw-semibold">ลิฟต์ A2</td>
                    <td>ประกาศเสียงไม่ชัดเจน</td>
                    <td><span className="badge bg-danger">สูง</span></td>
                    <td>
                      <div className="d-flex align-items-center gap-2">
                        <span>กำลังแก้ไข</span>
                      </div>
                    </td>
                    <td>12 มี.ค. 67</td>
                  </tr>
                  <tr>
                    <td className="fw-semibold">ลิฟต์ B1</td>
                    <td>แสงไฟในลิฟต์ไม่เพียงพอ</td>
                    <td><span className="badge bg-success">ต่ำ</span></td>
                    <td>
                      <div className="d-flex align-items-center gap-2">
                        <span>รอดำเนินการ</span>
                      </div>
                    </td>
                    <td>14 มี.ค. 67</td>
                  </tr>
                  <tr>
                    <td className="fw-semibold">ลิฟต์ C1</td>
                    <td>ราวจับไม่เหมาะสม</td>
                    <td><span className="badge bg-warning">ปานกลาง</span></td>
                    <td>
                      <div className="d-flex align-items-center gap-2">
                        <span>แก้ไขแล้ว</span>
                      </div>
                    </td>
                    <td>11 มี.ค. 67</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Summary and Recommendations */}
        <div className="row">
          <div className="col-lg-6">
            <div className="card h-100">
              <div className="card-header">
                <h5 className="card-title mb-0">สรุปผลการทดสอบ</h5>
              </div>
              <div className="card-body">
                <div className="d-grid gap-3">
                  <div className="d-flex justify-content-between align-items-center p-3 rounded" style={{ backgroundColor: 'rgba(46, 204, 113, 0.1)' }}>
                    <span>ปัญหาที่แก้ไขแล้ว</span>
                    <span className="fw-bold text-success">15 ปัญหา</span>
                  </div>
                  <div className="d-flex justify-content-between align-items-center p-3 rounded" style={{ backgroundColor: 'rgba(255, 193, 7, 0.1)' }}>
                    <span>ปัญหาที่กำลังแก้ไข</span>
                    <span className="fw-bold text-warning">7 ปัญหา</span>
                  </div>
                  <div className="d-flex justify-content-between align-items-center p-3 rounded" style={{ backgroundColor: 'rgba(220, 53, 69, 0.1)' }}>
                    <span>ปัญหาที่รอดำเนินการ</span>
                    <span className="fw-bold text-danger">3 ปัญหา</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="card h-100">
              <div className="card-header">
                <h5 className="card-title mb-0">ข้อเสนอแนะ</h5>
              </div>
              <div className="card-body">
                <div className="d-grid gap-2">
                  <div className="d-flex align-items-start gap-2">
                    <span className="text-success flex-shrink-0">✓</span>
                    <small>ติดตั้งป้ายอักษรเบรลล์ให้ครบทุกปุ่มกดชั้น</small>
                  </div>
                  <div className="d-flex align-items-start gap-2">
                    <span className="text-success flex-shrink-0">✓</span>
                    <small>ปรับปรุงระบบประกาศเสียงให้ชัดเจนยิ่งขึ้น</small>
                  </div>
                  <div className="d-flex align-items-start gap-2">
                    <span className="text-success flex-shrink-0">✓</span>
                    <small>เพิ่มแสงไฟภายในลิฟต์ให้เพียงพอ</small>
                  </div>
                  <div className="d-flex align-items-start gap-2">
                    <span className="text-success flex-shrink-0">✓</span>
                    <small>ปรับปรุงราวจับให้เหมาะสมกับผู้พิการ</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportComponent;
