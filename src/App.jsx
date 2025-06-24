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
import UsageHistory from "./components/History";
import SystemSettings from "./components/Setting";
import Documents from "./components/document";
import Manual from "./components/Manual";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./components/Sidebar.css";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>

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
                  <Route path="/history" element={<UsageHistory/>} />
                  <Route path="/calendar" element={<Calendar/>} />
                  <Route path="/documents" element={<Documents/>} />
                  <Route path="/manual" element={<Manual/>} />
                  <Route path="/guide" element={<div>แนวทาง</div>} />
                  <Route path="/notifications" element={<div>แจ้งเตือน</div>} />
                  <Route path="/logout" element={<div>ออกจากระบบ</div>} />
                  <Route path="/setting" element={<SystemSettings />} />
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
