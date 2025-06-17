import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Typography,
  Box,
} from "@mui/material";
import type { DialogTitleProps, BoxProps, SxProps, Theme } from "@mui/material";
import { SoftButton, SoftTypography } from "@elas/shared/components";
import colors from "@elas/shared/assets/theme/base/colors";

export interface ConfirmationModalProps {
  open: boolean;
  title?: React.ReactNode;
  headerComponent?: React.ReactNode;
  headerIcon?: React.ReactNode;
  contentComponent?: React.ReactNode;
  description?: string;
  children?: React.ReactNode;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  dialogWidth?: string | number;
  dialogHeight?: string | number;
  confirmDisabled?: boolean;
  hideConfirmButton?: boolean;
  dialogTitleProps?: Partial<DialogTitleProps>;
  headerBoxProps?: Partial<BoxProps>;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  open,
  title,
  headerComponent,
  headerIcon,
  contentComponent,
  description,
  children,
  confirmText = "Yes",
  cancelText = "No",
  onConfirm,
  onCancel,
  dialogWidth = "540px",
  dialogHeight = "auto",
  confirmDisabled = false,
  hideConfirmButton = false,
  dialogTitleProps,
  headerBoxProps,
}) => {
  const { info } = colors;

  const defaultTitleSx: SxProps<Theme> = { borderBottom: 1, mb: 2 };
  const defaultBoxSx: SxProps<Theme> = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };

  const { sx: overrideTitleSx, ...restTitleProps } = dialogTitleProps || {};

  const {
    display: overrideDisplay,
    justifyContent: overrideJustify,
    alignItems: overrideAlign,
    sx: overrideBoxSx,
    ...otherBoxProps
  } = headerBoxProps || {};

  const mergedBoxSx: SxProps<Theme> = {
    ...defaultBoxSx,
    ...(overrideBoxSx as object),
    ...(overrideDisplay !== undefined ? { display: overrideDisplay } : {}),
    ...(overrideJustify !== undefined ? { justifyContent: overrideJustify } : {}),
    ...(overrideAlign !== undefined ? { alignItems: overrideAlign } : {}),
  };

  return (
    <Dialog
      open={open}
      onClose={onCancel}
      aria-labelledby="confirmation-dialog-title"
      PaperProps={{
        sx: {
          width: dialogWidth,
          height: dialogHeight,
          maxWidth: "95vw",
          borderRadius: 2,
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      {headerComponent ? (
        headerComponent
      ) : (
        <DialogTitle
          id="confirmation-dialog-title"
          sx={{ ...defaultTitleSx, ...(overrideTitleSx as object) }}
          {...restTitleProps}
        >
          <Box {...otherBoxProps} sx={mergedBoxSx}>
            <SoftTypography
              fontWeight="bold"
              sx={{
                backgroundColor: info.main,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {title}
            </SoftTypography>
            {headerIcon}
          </Box>
        </DialogTitle>
      )}

      {contentComponent ? (
        contentComponent
      ) : children ? (
        <DialogContent>{children}</DialogContent>
      ) : (
        <DialogContent>
          <DialogContentText id="confirmation-dialog-description">
            <Typography variant="h6">{description}</Typography>
          </DialogContentText>
        </DialogContent>
      )}

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onCancel}>{cancelText}</Button>
        {!hideConfirmButton && (
          <SoftButton
            onClick={onConfirm}
            variant="contained"
            color="info"
            size="small"
            disabled={confirmDisabled}
          >
            {confirmText}
          </SoftButton>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationModal;
