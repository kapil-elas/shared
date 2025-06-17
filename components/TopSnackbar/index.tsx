import React from "react";
import { Snackbar, SnackbarContent, Button, IconButton, Box } from "@mui/material";
import CancelIcon from '@mui/icons-material/Cancel';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import GppBadIcon from '@mui/icons-material/GppBad';

interface SnackbarProps {
  open?: boolean;
  type?: "error" | "warning";
  message?: string;
  handleClose: () => void;
  openChangePassword: (arg: boolean) => void;
}

const TopSnackbar: React.FC<SnackbarProps> = ({
  open = false,
  type = "error",
  message = "PasswordChange",
  handleClose,
  openChangePassword,
}) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      style={{
        position: "fixed",
        top: 0,
        width: "100%",
        opacity: 1,
        zIndex: 20000,
        height: "30px",
      }}
    >
      <SnackbarContent
        message={
          <Box sx={{ display: "flex", alignItems: "center", padding: 0, fontSize: "15px", fontWeight:600  }}>
            {type === "error" ? <GppBadIcon fontSize="medium" sx={{paddingRight: "5px"}} /> : <NewReleasesIcon fontSize="medium" sx={{paddingRight: "5px"}} />}
            {message}
          </Box>
        }
        action={
          <>
            <Button size="medium" onClick={()=>openChangePassword(true)} style={{ color: "white", cursor: "pointer" }}>
              Change Password
            </Button>
            {!(type === 'error') && <IconButton size="small" onClick={handleClose} sx={{ color: "white !important" }}>
              <CancelIcon color="inherit" sx={{ color: "white" }} />
            </IconButton>}
          </>
        }
        sx={{
          backgroundColor: type === "error" ? "#d94a38 !important" : "#cfb456 !important",
          color: "white !important",
          width: "100%",
          borderRadius: 0,
          boxShadow: "none !important",
          padding: "0 10px",
          height: "30px",
        }}
      />
    </Snackbar>
  );
};

export default TopSnackbar;
