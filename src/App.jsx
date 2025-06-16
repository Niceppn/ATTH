import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { Sidebar, FileUploadForm } from "./components";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Assignment from "./components/Assignment";
import WebsiteForm from "./components/WebsiteForm";
import WebsiteForm1 from "./components/WebsiteForm-1";
import OperableForm from "./components/OperableForm";
import UnderstandForm from "./components/ี์๊UnderstandForm";
import RobustForm from "./components/RobustForm";
import BuildingForm from "./components/BuildindForm";
import EleForm from "./components/EleForm";
import WaterForm from "./components/WaterForm";
import Calendar from "./components/Calendar";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./components/Sidebar.css";
import { FaBars } from "react-icons/fa";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      {/* ปุ่มเปิด sidebar แสดงเฉพาะเมื่อ sidebar ปิด */}
      {!sidebarOpen && (
        <div
          className="sidebar-logo-open-button"
          style={{
            position: "fixed",
            top: "1rem",
            left: "1rem",
            zIndex: 1200,
          }}
        >
          <button
            onClick={toggleSidebar}
            aria-label="เปิดเมนู"
            style={{
              width:"50px",
              height:"50px",
              background: "#2d9b8c",
              cursor: "pointer",
              padding: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontSize: "1.5rem",
              borderRadius:"8px"
              
            }}
          >
            <FaBars />
          </button>
        </div>
      )}

      <BrowserRouter>
        <div className="app">
          <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
          <div className={`main-content ${sidebarOpen ? "shifted" : ""}`}>
            <main className="main-body">
              <Container fluid>
                <Routes>
                  <Route path="/" element={<Assignment />} />
                  <Route path="/work" element={<Assignment />} />
                  <Route path="/work/Test-website" element={<WebsiteForm />} />
                  <Route path="/work/Test-website/1" element={<WebsiteForm1/>}/>
                  <Route path="/work/Test-website/2" element={<OperableForm/>}/>
                  <Route path="/work/Test-website/3" element={<UnderstandForm/>}/>
                  <Route path="/work/Test-website/4" element={<RobustForm/>}/>
                  <Route path="/work/Test-building" element={<FileUploadForm />} />
                  <Route path="/work/Test-building/1" element={<BuildingForm />} />
                  <Route path="/work/Test-building/2" element={<EleForm />} />
                  <Route path="/work/Test-building/3" element={<WaterForm />} />
                  <Route path="/history" element={<div>ประวัติการทดสอบ</div>} />
                  <Route path="/calendar" element={<Calendar/>} />
                  <Route path="/documents" element={<div>เอกสาร</div>} />
                  <Route path="/manual" element={<div>คู่มือ</div>} />
                  <Route path="/guide" element={<div>แนวทาง</div>} />
                  <Route path="/notifications" element={<div>แจ้งเตือน</div>} />
                  <Route path="/logout" element={<div>ออกจากระบบ</div>} />

                </Routes>
              </Container>
            </main>
          </div>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
