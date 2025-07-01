import React from "react";
import { Badge } from "react-bootstrap";
import { classNames } from "../utils/classNames";

const StatusBadge = ({ status, result }) => {
  const getResultIcon = (result) => {
    const iconClass = result === "pass" ? "bg-success" : "bg-danger";
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

    return (
      <span
        className={classNames(
          "rounded-circle",
          "d-inline-flex",
          "align-items-center",
          "justify-content-center",
          iconClass,
        )}
        style={{ width: "24px", height: "24px" }}
      >
        {icon}
      </span>
    );
  };

  const getBadgeVariant = (status) => {
    return status.toLowerCase() === "pass" ? "success" : "danger";
  };

  return (
    <div className="d-flex align-items-center gap-2">
      {getResultIcon(result)}
      <Badge
        bg={getBadgeVariant(status)}
        className="text-uppercase fw-bold"
        style={{ fontSize: "0.7rem" }}
      >
        {status}
      </Badge>
    </div>
  );
};

export default StatusBadge;
