import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import { SoftButton, SoftTypography } from "@elas/shared/components";
import colors from "@elas/shared/assets/theme/base/colors";
interface ConfirmationInputModalProps {
  open: boolean;
  title: string;
  description: string;
  inputLabel?: string;
  confirmationValue: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmationInputModal: React.FC<ConfirmationInputModalProps> = ({
  open,
  title,
  description,
  inputLabel = "Type the name to confirm",
  confirmationValue,
  confirmText = "Delete",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
}) => {
  const [inputValue, setInputValue] = useState("");
  const { info } = colors;
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleClose = () => {
    setInputValue("");
    onCancel();
  };

  const handleConfirm = () => {
    if (inputValue === confirmationValue?.toString()) {
      onConfirm();
      setInputValue("");
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="input-dialog-title">
      {/* Title with bottom border */}
      <DialogTitle
        id="input-dialog-title"
        sx={{ borderBottom: 1, mb: 2 }}
      >
        <SoftTypography
          variant="h5"
          fontWeight="bold"
          sx={{
            background: info.main,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {title}
        </SoftTypography>
      </DialogTitle>

      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {/* Use Typography variant="h6" for subheading text */}
          <Typography variant="h6">
            {description}
          </Typography>

          {/* TextField for typed confirmation */}
          <TextField
            onChange={handleChange}
            fullWidth
            variant="outlined"
            size="small"
            sx={{ mt: 2 }}
            // label={inputLabel}
          />
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        {/* Cancel Button (plain MUI) */}
        <Button onClick={handleClose}>{cancelText}</Button>

        {/* Confirm Button (SoftButton) - disabled until exact match */}
        <SoftButton
          onClick={handleConfirm}
          variant="contained"
          color="info"
          size="small"
          disabled={inputValue !== confirmationValue?.toString()}
        >
          {confirmText}
        </SoftButton>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationInputModal;
