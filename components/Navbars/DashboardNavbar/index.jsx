/**
=========================================================
* Soft UI Dashboard React - v4.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import React, { useState, useEffect } from "react";

// react-router components
import { useLocation, Link } from "react-router-dom";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @material-ui core components
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Icon from "@mui/material/Icon";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

// Soft UI Dashboard React components
import SoftBox from "./../../SoftBox";
import SoftInput from "./../../SoftInput";

// Soft UI Dashboard React examples
import Breadcrumbs from "./../../Breadcrumbs";
import NotificationItem from "./../../Items/NotificationItem";

// Custom styles for DashboardNavbar
import { navbar, navbarContainer, navbarRow, navbarIconButton, navbarMobileMenu } from "./styles";
import { aiIconLogo } from "@elas/shared/assets/images";
// Soft UI Dashboard React context
import {
  useSoftUIController,
  setTransparentNavbar,
  setMiniSidenav,
  setOpenConfigurator,
  setSidenavManualToggle,
  setFixedNavbar,
} from "./../../../context";

// Images
import team2 from "./../../../assets/images/team-2.jpg";
import logoSpotify from "./../../../assets/images/small-logos/logo-spotify.svg";
import AvatarDropdown from "./../../AvatarDropdown";
import SoftTypography from "./../../../components/SoftTypography";
import colors from "./../../../assets/theme/base/colors";
import { Button, Popover, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function DashboardNavbar({
  absolute,
  light,
  isMini,
  logout,
  username,
  brand,
  fixedNavbarStatus,
  notification,
  configurations,
  roles,
  actions,
}) {
  const [navbarType, setNavbarType] = useState();
  const [controller, dispatch] = useSoftUIController();
  const { miniSidenav, transparentNavbar, fixedNavbar, openConfigurator } = controller;
  const [openMenu, setOpenMenu] = useState(false);
  const route = useLocation().pathname.split("/").slice(1);
  const [isOpen, setIsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false); // State to track search bar toggle
  const navigate = useNavigate();
  const location = useLocation();
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  // Navbar type and transparency effect
  useEffect(() => {
    if (fixedNavbar) {
      setNavbarType("fixed");
    } else {
      setNavbarType("static");
    }
    function handleTransparentNavbar() {
      setTransparentNavbar(dispatch, (fixedNavbar && window.scrollY === 0) || !fixedNavbar);
    }

    window.addEventListener("scroll", handleTransparentNavbar);
    handleTransparentNavbar();

    return () => window.removeEventListener("scroll", handleTransparentNavbar);
  }, [dispatch, fixedNavbar]);

  // Handle mini sidenav state based on URL
  useEffect(() => {
    // Collapse the sidenav if the URL is `/timesheet/current`
    if (
      location.pathname === "/timesheet/current" ||
      location.pathname === "/timesheet/approval" ||
      location.pathname === "/timesheet/history" ||
      location.pathname === "/location" ||
      // location.pathname === "/roles-management" ||
      location.pathname === "/roles-management" ||
      location.pathname === "/departments-positions" ||
      location.pathname === "/department-positions"
    ) {
      setMiniSidenav(dispatch, true); // Collapse sidenav
    } else {
      setMiniSidenav(dispatch, false); // Expand sidenav for other routes
    }
  }, [location.pathname, dispatch]);

  // Handle mini sidenav toggle
  const handleMiniSidenav = () => {
    if (
      location.pathname === "/timesheet/current" ||
      location.pathname === "/timesheet/approval" ||
      location.pathname === "/timesheet/history" ||
      location.pathname === "/location" ||
      location.pathname === "/roles-management" ||
      location.pathname === "/departments-positions" ||
      location.pathname === "/role-management" ||
      location.pathname === "/department-positions"
    ) {
      setMiniSidenav(dispatch, !miniSidenav); // Toggle only on `/timesheet/current`
    }
  };

  const handleMiniSidenavToggle = () => {
    setMiniSidenav(dispatch, !miniSidenav);
    setSidenavManualToggle(dispatch, !miniSidenav);
  };

  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);
  const handleOpenMenu = (event) => setOpenMenu(event.currentTarget);
  const handleCloseMenu = () => setOpenMenu(null);

  // Render the notifications menu
  const renderMenu = () => (
    <Popover
      open={Boolean(openMenu)}
      anchorEl={openMenu}
      // anchorReference={null}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      onClose={handleCloseMenu}
      sx={{ mt: 2 }}
    >
      <NotificationItem
        image={<img src={team2} alt="person" />}
        title={["New message", "from Laur"]}
        date="13 minutes ago"
        onClick={handleCloseMenu}
      />
      <NotificationItem
        image={<img src={logoSpotify} alt="person" />}
        title={["New album", "by Travis Scott"]}
        date="1 day"
        onClick={handleCloseMenu}
      />
      <NotificationItem
        color="secondary"
        image={
          <Icon fontSize="small" sx={{ color: ({ palette: { white } }) => white.main }}>
            payment
          </Icon>
        }
        title={["", "Payment successfully completed"]}
        date="2 days"
        onClick={handleCloseMenu}
      />
    </Popover>
  );

  return (
    <>
      <AppBar
        position={absolute ? "absolute" : navbarType}
        color="inherit"
        style={{
          boxShadow: "none",
          backgroundColor: "white !important",
          borderBottom: "1px solid #ececec",
          top: fixedNavbarStatus ? 0 : "30px",
        }}
        sx={(theme) => navbar(theme, { transparentNavbar, absolute, light })}
      >
        <Toolbar sx={(theme) => navbarContainer(theme)}>
          <SoftBox
            color="inherit"
            mb={{ xs: 1, md: 0 }}
            sx={(theme) => navbarRow(theme, { isMini })}
          >
            <IconButton
              onClick={handleMiniSidenavToggle}
              size="small"
              sx={{
                zIndex: 1303,
                borderRadius: "50%",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                border: "2px solid white",
                transition: "transform 0.3s ease, color 0.3s ease",
                "&:hover": {
                  backgroundColor: colors.info.main,
                  color: "white !important",
                  transform: "scale(1.1)",
                },
              }}
            >
              <Icon>{miniSidenav ? "menu_open" : "menu"}</Icon>
            </IconButton>
            <SoftBox
              textAlign="center"
              style={{ display: "flex", justifyContent: "center", cursor: "pointer" }}
            >
              {brand && <img src={brand} alt="brand" width="60%" />}
            </SoftBox>
            <Breadcrumbs icon="home" title={route[route.length - 1]} route={route} light={light} />
          </SoftBox>
          {isMini ? null : (
            <SoftBox sx={(theme) => navbarRow(theme, { isMini })}>
              <SoftBox
                component="button"
                onClick={() => navigate("/artie/chat")}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  background: "none",
                  border: 0,
                  cursor: "pointer",
                  mr: 2,
                  p: 0,
                }}
              >
                <Button startIcon={<AutoAwesomeIcon />}></Button>
                {/* <Typography variant="h6"><img src={aiIconLogo} alt="brand" width="50%" /></Typography> */}
                <SoftTypography variant="button" fontWeight="bold" color="info">
                  Artie
                </SoftTypography>
              </SoftBox>
              <SoftBox pr={1}>
                {/* Wrapper with a width transition */}
                <SoftBox
                  sx={{
                    width: searchOpen ? 200 : 40,
                    transition: "width 0.3s ease",
                    overflow: "hidden",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {searchOpen ? (
                    <SoftInput
                      placeholder="Type here..."
                      icon={{ component: "search", direction: "left" }}
                      autoFocus
                      onBlur={() => setSearchOpen(false)}
                      sx={{ width: "100%" }}
                    />
                  ) : (
                    <IconButton onClick={() => setSearchOpen(true)}>
                      <Icon>search</Icon>
                    </IconButton>
                  )}
                </SoftBox>
              </SoftBox>
              {notification()}
              <SoftBox pr={1}>{configurations()}</SoftBox>
              <SoftBox color={light ? "white" : "inherit"}>
                <AvatarDropdown actions={actions} />
                {/* Render the hamburger icon only when the URL is `/timesheet/current` */}

                {/* {renderMenu()} */}
              </SoftBox>
              <SoftBox pr={1}>
                <SoftTypography style={{ fontSize: "14px", fontWeight: 600 }}>
                  {username}
                </SoftTypography>
                {/* <SoftTypography variant="h6">{roles?.join(', ')}</SoftTypography> */}
              </SoftBox>
            </SoftBox>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
}

// Typechecking props for the DashboardNavbar
DashboardNavbar.propTypes = {
  absolute: PropTypes.bool,
  light: PropTypes.bool,
  isMini: PropTypes.bool,
  logout: PropTypes.func,
  username: PropTypes.string,
  brand: PropTypes.string,
  fixedNavbarStatus: PropTypes.bool,
  notification: PropTypes.func,
  configurations: PropTypes.func,
  roles: PropTypes.arrayOf(PropTypes.string),
  actions: PropTypes.object,
};

export default DashboardNavbar;
