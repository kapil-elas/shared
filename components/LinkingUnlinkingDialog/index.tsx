import React from "react";
import { AppBar, Box, Dialog, IconButton, Paper, Slide, Toolbar, Typography } from "@mui/material";
import { SoftBox } from "@elas/shared/components";
import { GridCloseIcon } from "@mui/x-data-grid";
import DragAndDropSelector from "../DragDropSelector";
import { TransitionProps } from "@mui/material/transitions";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children: React.ReactElement },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const LinkingUnlinkingDialog = ({
  open,
  name,
  maxWidth,
  title,
  assignedDetails,
  unAssignedDetails,
  onChange,
  handleClose,
}: any) => {
  return (
    <Dialog
      maxWidth={false}
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
      sx={{
        "& .MuiDialog-paper": {
          width: "80vw", // Adjust this value as needed
          maxWidth: "none", // Override default max-width constraints
        },
      }}
    >
      <AppBar
        sx={{
          position: "relative",
          borderBottom: "2px solid transparent",
          borderImage: "linear-gradient(to right, #043622, #01BF63)",
          borderImageSlice: 1,
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* Close Icon */}
          <div>
            <Typography variant="h5" component="div" sx={{ fontWeight: "bold" }}>
              {name}
            </Typography>
          </div>
          <SoftBox display="flex">
            <IconButton
              edge="end"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
              sx={{ marginLeft: "auto" }}
            >
              <GridCloseIcon />
            </IconButton>
          </SoftBox>
        </Toolbar>
      </AppBar>

      <Paper elevation={0} sx={{ p: 3, width: "100%", overflowY: "auto" }}>
        <Box sx={{}}>
          <DragAndDropSelector
            title={title}
            selectedItems={assignedDetails}
            nonSelectedItems={unAssignedDetails}
            onChange={(selected, nonSelected) => {
              onChange(selected, nonSelected);
            }}
          />
        </Box>
      </Paper>
    </Dialog>
  );
};

export default LinkingUnlinkingDialog;
