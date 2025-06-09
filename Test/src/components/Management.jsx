import React, { useState } from "react";
import { Card, Row, Col, Button, Container } from "react-bootstrap";
import Pagination from "./Pagination";
import { classNames } from "../utils/classNames";

const Management = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Mock data for management items with detailed information
  const managementItems = [
    {
      id: 1,
      name: "System Configuration",
      status: "Active",
      description: "Configure system-wide settings and parameters",
      lastUpdated: "2024-01-15",
      category: "System",
      priority: "High",
    },
    {
      id: 2,
      name: "User Management",
      status: "Active",
      description: "Manage user accounts, roles and permissions",
      lastUpdated: "2024-01-14",
      category: "Security",
      priority: "High",
    },
    {
      id: 3,
      name: "Database Settings",
      status: "Inactive",
      description: "Database configuration and optimization settings",
      lastUpdated: "2024-01-10",
      category: "Database",
      priority: "Medium",
    },
    {
      id: 4,
      name: "Security Settings",
      status: "Active",
      description: "Security policies and access control configuration",
      lastUpdated: "2024-01-16",
      category: "Security",
      priority: "Critical",
    },
    {
      id: 5,
      name: "Backup Configuration",
      status: "Active",
      description: "Automated backup schedules and storage settings",
      lastUpdated: "2024-01-12",
      category: "Maintenance",
      priority: "High",
    },
    {
      id: 6,
      name: "Log Management",
      status: "Active",
      description: "System logs collection and analysis settings",
      lastUpdated: "2024-01-13",
      category: "Monitoring",
      priority: "Medium",
    },
    {
      id: 7,
      name: "Report Settings",
      status: "Inactive",
      description: "Report generation and distribution configuration",
      lastUpdated: "2024-01-08",
      category: "Reports",
      priority: "Low",
    },
    {
      id: 8,
      name: "API Configuration",
      status: "Active",
      description: "API endpoints and integration settings",
      lastUpdated: "2024-01-15",
      category: "Integration",
      priority: "High",
    },
    {
      id: 9,
      name: "Email Settings",
      status: "Active",
      description: "Email server and notification configuration",
      lastUpdated: "2024-01-11",
      category: "Communication",
      priority: "Medium",
    },
    {
      id: 10,
      name: "System Monitoring",
      status: "Active",
      description: "Performance monitoring and alerting system",
      lastUpdated: "2024-01-16",
      category: "Monitoring",
      priority: "High",
    },
  ];

  const totalPages = Math.ceil(managementItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = managementItems.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleInfo = (item) => {
    console.log("Info clicked for:", item.name);
    // Add your info logic here
  };

  const handleDelete = (item) => {
    console.log("Delete clicked for:", item.name);
    // Add your delete logic here
  };

  return (
    <Container fluid className="management-container">
      <div className="management-content">
        <div className="management-header">
          <h2 className="management-title">Managments</h2>
        </div>

        <Row className="management-cards-grid">
          {currentItems.map((item) => (
            <Col key={item.id} xs={12} md={6} lg={4} className="mb-4">
              <Card className="management-card h-100">
                <Card.Body className="management-card-body">
                  <div className="management-card-image">
                    <div className="placeholder-image"></div>
                  </div>
                  <div className="management-card-content">
                    <div className="management-card-info">
                      <h6 className="management-card-title">{item.name}</h6>
                      <p className="management-card-description">
                        {item.description}
                      </p>

                      <div className="management-card-details">
                        <div className="detail-row">
                          <span className="detail-label">Status:</span>
                          <span
                            className={classNames(
                              "status-indicator",
                              item.status.toLowerCase(),
                            )}
                          >
                            {item.status}
                          </span>
                        </div>

                        <div className="detail-row">
                          <span className="detail-label">Category:</span>
                          <span className="detail-value">{item.category}</span>
                        </div>

                        <div className="detail-row">
                          <span className="detail-label">Priority:</span>
                          <span
                            className={classNames(
                              "priority-badge",
                              `priority-${item.priority.toLowerCase()}`,
                            )}
                          >
                            {item.priority}
                          </span>
                        </div>

                        <div className="detail-row">
                          <span className="detail-label">Last Updated:</span>
                          <span className="detail-value">
                            {item.lastUpdated}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="management-card-actions">
                      <Button
                        size="sm"
                        className="management-btn-info"
                        onClick={() => handleInfo(item)}
                      >
                        Info
                      </Button>
                      <Button
                        size="sm"
                        className="management-btn-delete"
                        onClick={() => handleDelete(item)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        <div className="management-pagination">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </Container>
  );
};

export default Management;
