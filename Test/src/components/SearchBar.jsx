import React, { useState } from "react";
import { Form, InputGroup, Button } from "react-bootstrap";

const SearchBar = ({ onSearch, placeholder = "ค้นหา..." }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const handleClear = () => {
    setSearchTerm("");
    onSearch("");
  };

  return (
    <div style={{ width: "100%" }}>
      <div className="search-bar-container">
        <Form.Control
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={handleInputChange}
          aria-label="Search test cases"
          className="search-input-large"
          size="lg"
        />
        <Button variant="primary" className="search-button-modern" size="lg">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M21 21L15.803 15.803M15.803 15.803C17.2096 14.3964 18 12.4887 18 10.5C18 6.35786 14.6421 3 10.5 3C6.35786 3 3 6.35786 3 10.5C3 14.6421 6.35786 18 10.5 18C12.4887 18 14.3964 17.2096 15.803 15.803Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Button>
        {searchTerm && (
          <Button
            variant="outline-secondary"
            className="search-clear-button"
            onClick={handleClear}
            aria-label="Clear search"
            style={{
              position: "absolute",
              right: "50px",
              top: "50%",
              transform: "translateY(-50%)",
              border: "none",
              background: "transparent",
              padding: "0.25rem",
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
                fill="rgb(127, 140, 141)"
              />
            </svg>
          </Button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
