import React, { useState } from 'react';

const ProfileComponent = () => {
  const [companyInfo] = useState({
    companyName: 'บริษัท เฟรนด์ลี่ เดฟ จำกัด',
    contactPerson: 'วสันต์ แปงปวนจู',
    email: 'contact@friendlydev.co.th',
    phone: '02-123-4567',
    address: '214 ถนนริมคลองวัดพระงาม ตำบลพระปฐมเจดีย์ อำเภอเมืองนครปฐม จ.นครปฐม 73000',
    joinedDate: '9/07/2025',
    projects: 5,
    completed: 3
  });

  return (
    <div className="container pt-5">
    <div className='pt-5'></div>

      <div className="card shadow-sm mb-4">
        <div className="card-header  text-white " style={{ backgroundColor: '#16a085' }}>
          ข้อมูลบริษัท
        </div>
        <div className="card-body">
          <h5 className="card-title">{companyInfo.companyName}</h5>
          <p><strong>ผู้ติดต่อ:</strong> {companyInfo.contactPerson}</p>
          <p><strong>อีเมล:</strong> {companyInfo.email}</p>
          <p><strong>เบอร์โทร:</strong> {companyInfo.phone}</p>
          <p><strong>ที่อยู่:</strong> {companyInfo.address}</p>
          <p><strong>เป็นสมาชิกตั้งแต่:</strong> {companyInfo.joinedDate}</p>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 mb-3">
          <div className="card border-success">
            <div className="card-body text-center">
              <h6 className="text-muted">จำนวนโครงการทั้งหมด</h6>
              <h3 className="text-success">{companyInfo.projects}</h3>
            </div>
          </div>
        </div>

        <div className="col-md-6 mb-3">
          <div className="card border-info">
            <div className="card-body text-center">
              <h6 className="text-muted">โครงการที่เสร็จสมบูรณ์</h6>
              <h3 className="text-info">{companyInfo.completed}</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center mt-4">
        <button className="btn btn-outline-primary">
          ดูรายละเอียดโครงการ
        </button>
      </div>
    </div>
  );
};

export default ProfileComponent;
