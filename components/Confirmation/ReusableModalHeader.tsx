import React from "react";
import { Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { SoftTypography } from "@elas/shared/components";
import colors from "@elas/shared/assets/theme/base/colors";
export interface ReusableModalHeaderProps {
  title: string;
  onClose: () => void;
}

const ReusableModalHeader: React.FC<ReusableModalHeaderProps> = ({ title, onClose }) => {
  const { info } = colors;
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      sx={{ borderBottom: 1, borderColor: "#eee", p: 2 }}
    >
      <SoftTypography
        fontWeight="bold"
        sx={{
          background: info.main,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          fontSize: "1.25rem",
        }}
      >
        {title}
      </SoftTypography>
      <IconButton size="small" onClick={onClose}>
        <CloseIcon />
      </IconButton>
    </Box>
  );
};

export default ReusableModalHeader;
