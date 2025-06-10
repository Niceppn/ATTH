import React, { useState, useMemo } from "react";
import {
  Table,
  Card,
  Row,
  Col,
  Badge,
  Button,
  Modal,
  Form,
} from "react-bootstrap";
import SearchBar from "./SearchBar";
import Pagination from "./Pagination";
import { classNames } from "../utils/classNames";

const TestCaseTable = ({ testCases, selectedProject, onBack }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [selectedTestCase, setSelectedTestCase] = useState(null);
  const [commentText, setCommentText] = useState("");
  const [attachments, setAttachments] = useState([]);
  const itemsPerPage = 10;

  const filteredTestCases = useMemo(() => {
    if (!searchTerm) return testCases;

    return testCases.filter(
      (testCase) =>
        testCase.section.toLowerCase().includes(searchTerm.toLowerCase()) ||
        testCase.function.toLowerCase().includes(searchTerm.toLowerCase()) ||
        testCase.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        testCase.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
        testCase.comment.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [testCases, searchTerm]);

  const totalPages = Math.ceil(filteredTestCases.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTestCases = filteredTestCases.slice(startIndex, endIndex);

  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleCommentClick = (testCase) => {
    setSelectedTestCase(testCase);
    setCommentText(testCase.comment || "");
    setAttachments(testCase.attachments || []);
    setShowCommentModal(true);
  };

  const handleCommentSave = () => {
    // Here you would typically update the test case with new comment and attachments
    console.log("Saving comment:", commentText);
    console.log("Attachments:", attachments);
    setShowCommentModal(false);
  };

  const handleSelectTester = (testCase) => {
    // Here you would implement tester selection functionality
    console.log("Selecting tester for:", testCase.function);
    // This could open a modal with tester list or navigate to a tester selection page
  };

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    const fileNames = files.map((file) => file.name);
    setAttachments([...attachments, ...fileNames]);
  };

  const removeAttachment = (index) => {
    const newAttachments = attachments.filter((_, i) => i !== index);
    setAttachments(newAttachments);
  };

  const getResultIcon = (result) => {
    const iconClass =
      result === "pass" ? "result-icon-custom pass" : "result-icon-custom fail";
    const icon =
      result === "pass" ? (
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"
            fill="white"
          />
        </svg>
      ) : (
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
            fill="white"
          />
        </svg>
      );

    return <span className={iconClass}>{icon}</span>;
  };

  return (
    <>
      <Card className="test-case-card">
        <Card.Header className="card-header-custom">
          {selectedProject && onBack && (
            <div className="test-case-back-section">
              <Button
                variant="outline-light"
                className="back-to-projects-btn"
                onClick={onBack}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19 12H5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 19L5 12L12 5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                กลับไปเลือกโครงการ
              </Button>
            </div>
          )}
          <Row className="align-items-end">
            <Col>
              <h5 className="mb-0">
                {selectedProject
                  ? `รายการผลการทดสอบ - ${selectedProject.title}`
                  : "รายการผลการทดสอบ"}
              </h5>
              <small style={{ opacity: "0.9", fontSize: "14px" }}>
                {selectedProject
                  ? selectedProject.description
                  : "ระบบทดสอบการเข้าถึงและใช้ประโยชน์ได้แบบครบวงจร"}
              </small>
            </Col>
            <Col xs="auto">
              <SearchBar
                onSearch={handleSearch}
                placeholder="ค้นหาผลการทดสอบ..."
              />
            </Col>
          </Row>
        </Card.Header>

        <Card.Body className="p-0">
          <div className="table-responsive">
            <Table
              className="table-custom"
              role="table"
              aria-label="ตารางผลการทดสอบ"
            >
              <thead>
                <tr>
                  <th>หมวดหมู่</th>
                  <th>ฟังก์ชัน</th>
                  <th>รายละเอียด</th>
                  <th>วันที่</th>
                  <th>ความคิดเห็น</th>
                  <th className="text-center">เลือกผู้ทดสอบ</th>
                </tr>
              </thead>
              <tbody>
                {currentTestCases.map((testCase) => (
                  <tr key={testCase.id}>
                    <td
                      className="section-cell-custom"
                      style={{ minWidth: "120px" }}
                    >
                      {testCase.section}
                    </td>
                    <td
                      className="function-cell-custom"
                      style={{ minWidth: "200px", maxWidth: "300px" }}
                    >
                      {testCase.function}
                    </td>
                    <td
                      className="description-cell-custom"
                      style={{ maxWidth: "350px" }}
                    >
                      {testCase.description}
                    </td>
                    <td
                      className="date-cell-custom"
                      style={{ minWidth: "90px" }}
                    >
                      {testCase.date}
                    </td>
                    <td style={{ minWidth: "200px" }}>
                      <div className="comment-cell">
                        <div className="comment-preview">
                          {testCase.comment ? (
                            <span className="comment-text">
                              {testCase.comment.length > 50
                                ? `${testCase.comment.substring(0, 50)}...`
                                : testCase.comment}
                            </span>
                          ) : (
                            <span className="no-comment">ไม่มีความคิดเห็น</span>
                          )}
                        </div>
                        <div className="comment-actions">
                          <Button
                            size="sm"
                            variant="outline-primary"
                            className="comment-btn"
                            onClick={() => handleCommentClick(testCase)}
                          >
                            <svg
                              width="14"
                              height="14"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M21 11.5C21.0034 12.8199 20.6951 14.1219 20.1 15.3C19.3944 16.7118 18.3098 17.8992 16.9674 18.7293C15.6251 19.5594 14.0782 19.9994 12.5 20C11.1801 20.0035 9.87812 19.6951 8.7 19.1L3 21L4.9 15.3C4.30493 14.1219 3.99656 12.8199 4 11.5C4.00061 9.92179 4.44061 8.37488 5.27072 7.03258C6.10083 5.69028 7.28825 4.60573 8.7 3.90001C9.87812 3.30493 11.1801 2.99656 12.5 3H13C15.0843 3.11499 17.053 3.99476 18.5291 5.47086C20.0052 6.94695 20.885 8.91565 21 11V11.5Z"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </Button>
                          {testCase.attachments &&
                            testCase.attachments.length > 0 && (
                              <span className="attachment-count">
                                <svg
                                  width="12"
                                  height="12"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M21.44 11.05L12.25 20.24C11.1242 21.3658 9.59722 21.9983 8.005 21.9983C6.41278 21.9983 4.88583 21.3658 3.76 20.24C2.63417 19.1142 2.00167 17.5872 2.00167 15.995C2.00167 14.4028 2.63417 12.8758 3.76 11.75L12.95 2.56C13.7006 1.80944 14.7186 1.38795 15.78 1.38795C16.8414 1.38795 17.8594 1.80944 18.61 2.56C19.3606 3.31056 19.782 4.32856 19.782 5.39C19.782 6.45144 19.3606 7.46944 18.61 8.22L9.41 17.41C9.03494 17.7851 8.52544 17.9961 7.995 17.9961C7.46456 17.9961 6.95506 17.7851 6.58 17.41C6.20494 17.0349 5.99394 16.5254 5.99394 15.995C5.99394 15.4646 6.20494 14.9551 6.58 14.58L15.07 6.1"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                                {testCase.attachments.length}
                              </span>
                            )}
                        </div>
                      </div>
                    </td>
                    <td className="text-center" style={{ minWidth: "130px" }}>
                      <Button
                        size="sm"
                        variant="outline-success"
                        className="select-tester-btn"
                        onClick={() => handleSelectTester(testCase)}
                      >
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <circle
                            cx="12"
                            cy="7"
                            r="4"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        เลือกผู้ทดสอบ
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Card.Body>

        <Card.Footer className="card-footer-custom">
          <Row className="align-items-center">
            <Col>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </Col>
            <Col xs="auto">
              <small style={{ color: "var(--text-secondary)" }}>
                แสดง {startIndex + 1}-
                {Math.min(endIndex, filteredTestCases.length)} จาก{" "}
                {filteredTestCases.length} รายการ
              </small>
            </Col>
          </Row>
        </Card.Footer>
      </Card>

      {/* Comment Modal */}
      <Modal
        show={showCommentModal}
        onHide={() => setShowCommentModal(false)}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>ความคิดเห็นและไฟล์แนบ</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedTestCase && (
            <div>
              <h6 className="mb-3">
                {selectedTestCase.section} - {selectedTestCase.function}
              </h6>

              <Form.Group className="mb-3">
                <Form.Label>ความคิดเห็น</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="เพิ่มความคิดเห็นของคุณ..."
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>แนบไฟล์</Form.Label>
                <Form.Control
                  type="file"
                  multiple
                  onChange={handleFileUpload}
                  accept=".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg,.xlsx,.json"
                />
                <Form.Text className="text-muted">
                  รองรับไฟล์: PDF, DOC, TXT, PNG, JPG, XLSX, JSON
                </Form.Text>
              </Form.Group>

              {attachments.length > 0 && (
                <div className="attachments-list">
                  <h6>ไฟล์แนบ:</h6>
                  <div className="attachment-items">
                    {attachments.map((file, index) => (
                      <div key={index} className="attachment-item">
                        <span className="attachment-name">{file}</span>
                        <Button
                          size="sm"
                          variant="outline-danger"
                          onClick={() => removeAttachment(index)}
                        >
                          ลบ
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowCommentModal(false)}
          >
            ยกเลิก
          </Button>
          <Button variant="primary" onClick={handleCommentSave}>
            บันทึก
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default TestCaseTable;
