/**
=========================================================
* Soft UI Dashboard PRO React - v4.0.2
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-pro-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import React, { useEffect, useState } from "react";

// react-router-dom components
import { useLocation, NavLink } from "react-router-dom";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @mui material components
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import Icon from "@mui/material/Icon";
import { IconButton } from "@mui/material";
// Soft UI Dashboard PRO React components
import SoftBox from "./../SoftBox";
import SoftTypography from "./../SoftTypography";

// Soft UI Dashboard PRO React example components
import SidenavCollapse from "./SidenavCollapse";
import SidenavList from "./SidenavList";
import SidenavItem from "./SidenavItem";
import SidenavCard from "./SidenavCard";

// Custom styles for the Sidenav
import SidenavRoot from "./SidenavRoot";
import sidenavLogoLabel from "./styles/sidenav";

// Soft UI Dashboard PRO React context
import { useSoftUIController, setMiniSidenav, setSidenavManualToggle, setMouseEnter } from "./../../context";
import withTheme from "./../../components/hoc";
import pxToRem from "./../../assets/theme/functions/pxToRem";

function Sidenav({ color, brand, routes, ...rest }) {
  const [openCollapse, setOpenCollapse] = useState(false);
  const [openNestedCollapse, setOpenNestedCollapse] = useState(false);
  const [controller, dispatch] = useSoftUIController();
  const { miniSidenav, transparentSidenav, isToggledManually } = controller;
  const location = useLocation();
  const { pathname } = location;
  const collapseName = pathname.split("/").slice(1)[0];
  const itemName = pathname.split("/").slice(1)[1];

  const closeSidenav = () => setMiniSidenav(dispatch, true);

  const toggleSidenav = () => {
    setMiniSidenav(dispatch, !miniSidenav);
  };

  useEffect(() => {
    if (isToggledManually) {
      setMiniSidenav(dispatch, true);
    } else {
      setMiniSidenav(dispatch, false);
      setSidenavManualToggle(dispatch, false); 
    }
  }, [pathname, dispatch, isToggledManually]);
  
  const handleMouseEnter = () => {
    if (miniSidenav && isToggledManually) {
      setMiniSidenav(dispatch, false); 
      setMouseEnter(dispatch, true);
    }
  };
  
  const handleMouseLeave = () => {
    if (!miniSidenav && isToggledManually) {
      setMiniSidenav(dispatch, true); 
      setMouseEnter(dispatch, false);
    }
  };

  const handleMiniSidenavToggle = () => {
    setMiniSidenav(dispatch, !miniSidenav); 
  };
  useEffect(() => {
    // Collapse sidenav by default for `/timesheet/current`
    if (location.pathname === "/timesheet/current" || location.pathname === "/timesheet/approval" || location.pathname === "/timesheet/history" || location.pathname === "/organizations" || location.pathname === "/location" || location.pathname === "/roles-management" || location.pathname === "/roles-management"  || location.pathname === "/departments-positions" || location.pathname === "/department-positions") {
      setMiniSidenav(dispatch, true);
    } else if (window.innerWidth < 1200) {
      // Collapse sidenav for smaller screens
      setMiniSidenav(dispatch, true);
    } else {
      setMiniSidenav(dispatch, false); // Expand sidenav otherwise
    }
  
    // Add a resize listener to handle sidenav collapsing
    function handleResize() {
      if (window.innerWidth < 1200) {
        setMiniSidenav(dispatch, true);
      } else if (location.pathname === "/timesheet/current" || location.pathname === "/timesheet/approval" || location.pathname === "/timesheet/history" || location.pathname === "/organizations" || location.pathname === "/location" || location.pathname === "/roles-management" || location.pathname === "/roles-management" || location.pathname === "/departments-positions" || location.pathname === "/department-positions") {
        setMiniSidenav(dispatch, false);
      }
    }
  
    window.addEventListener("resize", handleResize);
  
    return () => window.removeEventListener("resize", handleResize);
  }, [dispatch, location.pathname]);
  

  // Render all the nested collapse items from the routes.js
  const renderNestedCollapse = (collapse) => {
    const template = collapse.map(({ name, route, key, href }) =>
      href ? (
        <Link
          key={key}
          href={href}
          target="_blank"
          rel="noreferrer"
          sx={{ textDecoration: "none" }}
        >
          <SidenavItem name={name} nested />
        </Link>
      ) : (
        <NavLink to={route} key={key} sx={{ textDecoration: "none" }}>
          <SidenavItem name={name} active={route === pathname} nested />
        </NavLink>
      )
    );

    return template;
  };

  // Render the all the collpases from the routes.js
  const renderCollapse = (collapses) =>
    collapses.map(({ name, collapse, route, href, key }) => {
      let returnValue;

      if (collapse) {
        returnValue = (
          <SidenavItem
            key={key}
            name={name}
            active={key === itemName}
            open={openNestedCollapse === name}
            onClick={() =>
              openNestedCollapse === name
                ? setOpenNestedCollapse(false)
                : setOpenNestedCollapse(name)
            }
          >
            {renderNestedCollapse(collapse)}
          </SidenavItem>
        );
      } else {
        returnValue = href ? (
          <Link
            href={href}
            key={key}
            target="_blank"
            rel="noreferrer"
            sx={{ textDecoration: "none" }}
          >
            <SidenavItem name={name} active={key === itemName} />
          </Link>
        ) : (
          <NavLink to={route} key={key} sx={{ textDecoration: "none" }}>
            <SidenavItem name={name} active={key === itemName} />
          </NavLink>
        );
      }
      return <SidenavList key={key}>{returnValue}</SidenavList>;
    });

  // Render all the routes from the routes.js (All the visible items on the Sidenav)
  const renderRoutes = routes.map(
    ({ type, name, icon, title, collapse, noCollapse, key, href, route }) => {
      let returnValue;

      if (type === "collapse") {
        if (href) {
          returnValue = (
            <Link
              href={href}
              key={key}
              target="_blank"
              rel="noreferrer"
              sx={{ textDecoration: "none" }}
            >
              <SidenavCollapse
                name={name}
                icon={icon}
                active={key === collapseName}
                noCollapse={noCollapse}
              />
            </Link>
          );
        } else if (noCollapse && route) {
          returnValue = (
            <NavLink to={route} key={key}>
              <SidenavCollapse
                name={name}
                icon={icon}
                noCollapse={noCollapse}
                active={key === collapseName}
              >
                {collapse ? renderCollapse(collapse) : null}
              </SidenavCollapse>
            </NavLink>
          );
        } else {
          returnValue = (
            <SidenavCollapse
              key={key}
              name={name}
              icon={icon}
              active={key === collapseName}
              open={openCollapse === key}
              onClick={() => (openCollapse === key ? setOpenCollapse(false) : setOpenCollapse(key))}
            >
              {collapse ? renderCollapse(collapse) : null}
            </SidenavCollapse>
          );
        }
      } else if (type === "title") {
        returnValue = (
          <SoftTypography
            key={key}
            display="block"
            variant="caption"
            fontWeight="bold"
            textTransform="uppercase"
            opacity={0.6}
            pl={3}
            mt={2}
            mb={1}
            ml={1}
          >
            {title}
          </SoftTypography>
        );
      } else if (type === "divider") {
        returnValue = <Divider key={key} />;
      }

      return returnValue;
    }
  );

  return (
    <SidenavRoot
    {...rest}
    variant="permanent"
    onMouseEnter={handleMouseEnter}
    onMouseLeave={handleMouseLeave}
    ownerState={{ transparentSidenav, miniSidenav }}
    sx={{
      // width: miniSidenav ? "80px" : "100px",
      transition: "width 0.3s ease",
      "& .MuiDrawer-paper": {
        width: miniSidenav ? pxToRem(100) : pxToRem(250),
        paddingTop: pxToRem(15),
        transition: "width 0.3s ease, backdrop-filter 0.3s ease",
        marginTop: pxToRem(rest.fixedNavbarStatus ? 0 : 30),
      },
      height: "-webkit-fill-available",
      // margin: "10px",
      marginTop: pxToRem(95),
      height:0,
    }}
    >
      {/* <SoftBox textAlign="center" py={2}>
        {brand && <img src={brand} alt="brand" width="60%" />}
        <SoftTypography variant="h6" fontWeight="medium" textTransform="uppercase">
          {!miniSidenav && brandName}
        </SoftTypography>
      </SoftBox> */}

  <List style={{width: '100%'}}>{renderRoutes}</List>
</SidenavRoot>

  );
}

// Typechecking props for the Sidenav
Sidenav.propTypes = {
  color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"]),
  brand: PropTypes.string,
  brandName: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default withTheme(Sidenav);
