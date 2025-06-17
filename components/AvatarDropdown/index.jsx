import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Popover, Box, IconButton, List, ListItem } from '@mui/material';

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SoftTypography from './../SoftTypography';

import './styles.css';

const AvatarDropdown = ({ actions = [] }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <div >
      <IconButton
        onClick={handleClick}
        // className="avatar"
        size="small"
        aria-controls={open ? 'avatar-popover' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        sx={{
          color: '#344767',
          padding: 0,
          margin: 0,
          '&:hover': {
            backgroundColor: 'transparent',
          },
        }}
      >
        <AccountCircleIcon fontSize="medium" color='#344767 !important' />
        <ArrowDropDownIcon />
      </IconButton>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        disablePortal
        PaperProps={{
          sx: {
            mt: 1,
            zIndex: 9999, // Now applies to actual paper
            // position: 'relative', // <- Make sure this is set
            backgroundColor: '#fff',
          },
        }}
      >
        <Box sx={{ p: 1, minWidth: 160 }}>
          <List disablePadding>
            {actions.map((action, index) => (
              <ListItem
                button
                key={index}
                onClick={() => {
                  action.action();
                  handleClose();
                }}
                sx={{ py: 1 }}
              >
                <SoftTypography
                  variant="button"
                  fontWeight="medium"
                  color="dark"
                  sx={{ fontSize: '11px' }}
                >
                  {action.label}
                </SoftTypography>
              </ListItem>
            ))}
          </List>
        </Box>
      </Popover>

    </div>
  );
};

AvatarDropdown.propTypes = {
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      action: PropTypes.func.isRequired,
    })
  ),
};

export default AvatarDropdown;
