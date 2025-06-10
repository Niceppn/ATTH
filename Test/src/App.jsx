import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import TestRequestManagement from "./components/TestRequestManagement";
import TestCaseTable from "./components/TestCaseTable";
import ProjectSelection from "./components/ProjectSelection";
import Management from "./components/Management";
import Reports from "./components/Reports";
import TestResults from "./components/TestResults";
import Notifications from "./components/Notifications";
import Testers from "./components/Testers";
import FieldCalendar from "./components/FieldCalendar";
import DocumentSystem from "./components/DocumentSystem";
import CustomerManagement from "./components/CustomerManagement";
import SystemSettings from "./components/SystemSettings";
import UserPermissions from "./components/UserPermissions";
import { testCases } from "./data/testCases";
import { AuthProvider } from "./context/AuthContext";
import "./App.css";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <AuthProvider>
      <Router>
        <div className="app-layout">
          <Sidebar
            isOpen={sidebarOpen}
            onToggle={toggleSidebar}
          />

          {/* Mobile overlay with AST TestHub styling */}
          {sidebarOpen && (
            <div
              className="sidebar-overlay"
              onClick={() => setSidebarOpen(false)}
            />
          )}

          <div className="main-wrapper">
            {/* Mobile header with modern design */}
            <div className="mobile-header">
              <button
                className="hamburger-btn"
                onClick={toggleSidebar}
                aria-label="เปิด/ปิดเมนู"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 12H21"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M3 6H21"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M3 18H21"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <div className="mobile-logo">
                <span className="mobile-title">ATTH</span>
              </div>
            </div>

            {/* Main content section following AST TestHub structure */}
            <main className="main-content">
              <section className="dashboard-section">
                <Routes>
                  <Route path="/" element={<Navigate to="/dashboard" replace />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/test-requests" element={<TestRequestManagement />} />
                  <Route path="/testcase" element={<Reports />} />
                  <Route path="/management" element={<Management />} />
                  <Route path="/reports" element={<Reports />} />
                  <Route path="/testresults/:projectId" element={<TestResults />} />
                  <Route path="/notifications" element={<Notifications />} />
                  <Route path="/testers" element={<Testers />} />
                  <Route path="/field-calendar" element={<FieldCalendar />} />
                  <Route path="/document-system" element={<DocumentSystem />} />
                  <Route path="/customer-management" element={<CustomerManagement />} />
                  <Route path="/system-settings" element={<SystemSettings />} />
                  <Route path="/user-permissions" element={<UserPermissions />} />
                </Routes>
              </section>
            </main>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
