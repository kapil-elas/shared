import React from "react";
import { Chip } from "@mui/material";

const statusColorAndName = {
  SUBMITTED: {
    color: "#efef0082",
    textColor: "black",
    name: "Submitted",
  },
  NEW: {
    color: "#4d4343a1",
    textColor: "white",
    name: "New",
  },
  IN_APPROVAL: {
    color: "yellow",
    textColor: "black",
    name: "In Approval",
  },
  IN_REVISION: {
    color: "#ff00009e",
    textColor: "black",
    name: "Edits Needed",
  },
  FORCED_REVISION: {
    color: "#ff00009e",
    textColor: "black",
    name: "Forced Revised",
  },
  REJECTED: {
    color: "darkred",
    textColor: "white",
    name: "Rejected",
  },
  APPROVED: {
    color: "green",
    textColor: "white",
    name: "Manager Approved",
  },
} as any;

export const StatusBadge = ({ status = "NEW" }: any) => {
  const { color, textColor, name } = statusColorAndName[status] || {};

  return (
    <Chip
      variant="outlined"
      label={name}
      style={{
        backgroundColor: color,
        color: textColor,
        height: "24px", // Reduced height for a compact look
        fontSize: "0.75rem", // Smaller font size for a badge look
        fontWeight: "bold", // Bold text for better readability
        padding: "0 8px", // Adjusted padding for a sleeker look
        minWidth: "80px", // Ensure minimum width for consistency
        textAlign: "center",
        borderRadius: "12px", // Rounded corners for a badge style
        overflow: "visible",
        borderColor: "#222",
        opacity:0.8
      }}
      sx={{
        "& .MuiChip-label": {
          overflow: "visible", // Ensure overflow is visible
        },
      }}
    />
  );
};
