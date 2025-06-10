
const ProgressComponent = () => {
  return (
    <div className="progress-container">
      <div >
        <h2 className="text-center">สถานะการดำเนินงาน</h2>
        <div className="progress-bar">
          <div className="progress-step completed">1. เริ่มต้น</div>
          <div className="progress-step completed">2. กำลังดำเนินการ</div>
          <div className="progress-step current">3. กำลังตรวจสอบ</div>
          <div className="progress-step">4. เสร็จสิ้น</div>
        </div>
      </div>
    </div>
  );
}

export default ProgressComponent;