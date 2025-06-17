import React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import ViewIcon from "@mui/icons-material/RemoveRedEye";
import Tooltip from "@mui/material/Tooltip";
import SoftTypography from "@elas/shared/components/SoftTypography";
import { BlueBar } from "./BlueBar";
import { GreenBar } from "./GreenBar";

export const CustomLabel = ({ 
  children, 
  childTooltipLabel = 'Add Child Item',
  parentTooltipLabel = 'Add Parent Item',
  isChild, 
  isParent,
  hasParentPerms,
  hasChildPerms,
  selected,
  onAddParent,
  onAddChild,
  onDeleteItem,
  onViewItem,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        width: "100%",
        justifyContent: "space-between",
        pr: 1,
        position: "relative",
        borderRadius: 1,
        py: 0.5,
        backgroundColor: selected ? "rgba(0, 123, 255, 0.08)" : "transparent",
        "&:hover": {
          backgroundColor: "rgba(0, 123, 255, 0.04)",
          "& .custom-label-actions": {
            opacity: 1,
            visibility: "visible",
          },
        },
        transition: "background-color 0.2s ease-in-out",
      }}
    >
      {/* Left Side: Icon and Text */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        {!isParent && isChild && <GreenBar />}
        {isParent && <BlueBar />}
        <SoftTypography
          variant="body2"
          sx={{
            fontWeight: selected ? 600 : 500,
            color: selected ? "info.main" : "inherit",
            transition: "color 0.2s ease-in-out, font-weight 0.2s ease-in-out",
          }}
        >
          {children}
        </SoftTypography>
      </Box>

      {/* Right Side: Actions on Hover */}
      <Box
        className="custom-label-actions"
        sx={{
          display: "flex",
          gap: 0.5,
          opacity: 0,
          visibility: "hidden",
          transition: "all 0.2s ease-in-out",
          position: "absolute",
          right: 8,
          top: "50%",
          transform: "translateY(-50%)",
          borderRadius: 1,
          px: 0.5,
        }}
      >
         <Tooltip title="View" arrow placement="top">
          <IconButton
            size="small"
            color="info"
            onClick={(e) => {
              e.stopPropagation();
              onViewItem?.();
            }}
            sx={{
              "&:hover": {
                backgroundColor: "rgba(211, 47, 47, 0.08)",
              },
            }}
          >
            <ViewIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        {isParent && hasParentPerms && (
          <Tooltip title={parentTooltipLabel} arrow placement="top">
            <IconButton
              size="small"
              color="dark"
              onClick={(e) => {
                e.stopPropagation();
                onAddParent?.();
              }}
              sx={{
                "&:hover": {
                  backgroundColor: "rgba(0, 123, 255, 0.08)",
                },
              }}
            >
              <AddIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        )}
        {hasChildPerms && <Tooltip title={childTooltipLabel} arrow placement="top">
          <IconButton
            size="small"
            color="info"
            onClick={(e) => {
              e.stopPropagation();
              onAddChild?.();
            }}
            sx={{
              "&:hover": {
                backgroundColor: "rgba(0, 123, 255, 0.08)",
              },
            }}
          >
            <AddIcon fontSize="small" />
          </IconButton>
        </Tooltip>}
        {hasParentPerms && <Tooltip title="Delete Item" arrow placement="top">
          <IconButton
            size="small"
            color="error"
            onClick={(e) => {
              e.stopPropagation();
              onDeleteItem?.();
            }}
            sx={{
              "&:hover": {
                backgroundColor: "rgba(211, 47, 47, 0.08)",
              },
            }}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Tooltip>}
      </Box>
    </Box>
  );
};

CustomLabel.propTypes = {
  children: PropTypes.node.isRequired,
  childTooltipLabel: PropTypes.string,
  parentTooltipLabel: PropTypes.string,
  isChild: PropTypes.bool,
  isParent: PropTypes.bool,
  selected: PropTypes.bool,
  onAddParent: PropTypes.func,
  onAddChild: PropTypes.func,
  onDeleteItem: PropTypes.func,
  onViewItem: PropTypes.func,
  hasParentPerms: PropTypes.bool,
  hasChildPerms: PropTypes.bool,
};

CustomLabel.defaultProps = {
  isChild: false,
  isParent: false,
  selected: false,
  hasParentPerms: false,
  hasChildPerms: false,
};
