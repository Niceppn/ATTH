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
    <div style={{ width: "300px" }}>
      <InputGroup>
        <Form.Control
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={handleInputChange}
          aria-label="Search test cases"
          className="search-input-custom"
        />
        {searchTerm && (
          <Button
            className="search-clear-btn-custom"
            onClick={handleClear}
            aria-label="Clear search"
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
      </InputGroup>
    </div>
  );
};

export default SearchBar;
