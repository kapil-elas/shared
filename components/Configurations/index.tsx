import React, { useState, MouseEvent } from "react";
import { IconButton, Popover, Icon } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ConfigurationsList from "./ConfigurationsList";

const Configurations: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();

  const handleIconClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onItemClick = (route: string) => {
    handleClose();
    navigate(route);
  };

  return (
    <div style={{ position: "relative", zIndex: 1, padding: "0 10px" }}>
      <IconButton color="inherit" onClick={handleIconClick}>
        <Icon>settings</Icon>
      </IconButton>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: {
            overflow: "visible",
            mt: 1.5,
            "&::before": {
              content: '""',
              position: "absolute",
              top: -8,
              left: "calc(50% + 278px)",
              borderLeft: "8px solid transparent",
              borderRight: "8px solid transparent",
              borderBottom: "8px solid white",
              zIndex: 0,
            },
            backgroundColor: "white !important",
          },
        }}
      >
        <ConfigurationsList onItemClick={onItemClick} />
      </Popover>
    </div>
  );
};

export default Configurations;
