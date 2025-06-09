import React, { useState } from "react";
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
  const [currentPage, setCurrentPage] = useState("dashboard"); // 'dashboard', 'testcase', 'management', 'reports', or 'testresults'
  const [selectedProject, setSelectedProject] = useState(null);
  const [showTestCases, setShowTestCases] = useState(false); // Track if we're showing test cases or project selection

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleNavigation = (page) => {
    setCurrentPage(page);
    setSidebarOpen(false); // Close sidebar on mobile after navigation
    // Reset states when navigating
    if (page !== "testresults") {
      setSelectedProject(null);
    }
    if (page === "test-requests") {
      setShowTestCases(false); // Reset to project selection when navigating to test requests page
    }
  };

  const handleNavigateToTestResults = (projectData) => {
    setSelectedProject(projectData);
    setCurrentPage("testresults");
    setSidebarOpen(false);
  };

  const handleBackToReports = () => {
    setSelectedProject(null);
    setCurrentPage("reports");
  };

  const handleBackToTestCaseReports = () => {
    setSelectedProject(null);
    setCurrentPage("testcase");
  };

  const handleProjectSelect = (project) => {
    setSelectedProject(project);
    setShowTestCases(true);
  };

  const handleBackToProjectSelection = () => {
    setShowTestCases(false);
    setSelectedProject(null);
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <Dashboard />;
      case "test-requests":
        return <TestRequestManagement />;
      case "testcase":
        // Now shows Reports data instead
        return (
          <Reports onNavigateToTestResults={handleNavigateToTestResults} />
        );
      case "management":
        return <Management />;
      case "reports":
        return (
          <Reports onNavigateToTestResults={handleNavigateToTestResults} />
        );
      case "testresults":
        return (
          <TestResults
            projectData={selectedProject}
            onBack={handleBackToTestCaseReports}
          />
        );
      case "notifications":
        return <Notifications />;
      case "testers":
        return <Testers />;
      case "field-calendar":
        return <FieldCalendar />;
      case "document-system":
        return <DocumentSystem />;
      case "customer-management":
        return <CustomerManagement />;
      case "system-settings":
        return <SystemSettings />;
      case "user-permissions":
        return <UserPermissions />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <AuthProvider>
      <div className="app-layout">
        <Sidebar
          isOpen={sidebarOpen}
          onToggle={toggleSidebar}
          currentPage={currentPage}
          onNavigate={handleNavigation}
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
              <span className="mobile-title">UTT</span>
            </div>
          </div>

          {/* Main content section following AST TestHub structure */}
          <main className="main-content">
            <section className="dashboard-section">
              {renderCurrentPage()}
            </section>
          </main>
        </div>
      </div>
    </AuthProvider>
  );
}

export default App;
