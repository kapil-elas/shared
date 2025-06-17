import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import { SoftButton } from "@elas/shared/components";

interface DeleteDialogProps {
  open: boolean;
  handleClose: () => void;
  nodeData: { name: string };
  heading: string;
  subheading: string;
  handleSubmit: () => void;
}

const DeleteDialog: React.FC<DeleteDialogProps> = ({
  open,
  handleClose,
  nodeData,
  heading,
  subheading,
  handleSubmit,
}) => {
  const [deleteNodeInput, setDeleteNodeInput] = useState<string>("");

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title">
      <DialogTitle id="alert-dialog-title" sx={{ borderBottom: 1, mb: 2 }}>
        {heading}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <Typography variant="h6" dangerouslySetInnerHTML={{ __html: subheading }} />
          <TextField
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setDeleteNodeInput(e.target.value)
            }
            fullWidth
            variant="outlined"
            size="small"
            sx={{ mt: 2 }}
          />
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <SoftButton
          onClick={handleSubmit}
          variant="contained"
          color="info"
          size="small"
          disabled={nodeData.name !== deleteNodeInput}
        >
          Delete
        </SoftButton>
      </DialogActions>
    </Dialog>
  );
};

export default React.memo(DeleteDialog);
