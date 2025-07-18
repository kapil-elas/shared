import React from 'react';
/**
=========================================================
* Soft UI Dashboard PRO React - v4.0.3
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-pro-react
* Copyright 2024 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// react-router-dom components
import { Link } from "react-router-dom";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard PRO React components
import { SoftBox, SoftTypography, SoftButton } from "./../../../../components";

function BackgroundBlogCard({ color = "dark", image, title, description, action }) {
  return (
    <Card raised sx={{ p: 2 }}>
      <SoftBox
        sx={({
          functions: { linearGradient, rgba },
          palette: { gradients },
          borders: { borderRadius },
        }) => ({
          backgroundImage: gradients[color]
            ? `${linearGradient(
              rgba(gradients[color].main, 0.8),
              rgba(gradients[color].state, 0.8)
            )}, url(${image})`
            : `${linearGradient(
              rgba(gradients.dark.main, 0.8),
              rgba(gradients.dark.state, 0.8)
            )}, url(${image})`,
          backgroundSize: "cover",
          borderRadius: borderRadius.lg,
          p: 2,
        })}
      >
        <SoftBox mb={2}>
          <SoftTypography variant="h6" color="white" fontWeight="bold" textTransform="capitalize">
            {title}
          </SoftTypography>
        </SoftBox>
        <SoftBox mb={2}>
          <SoftTypography variant="body2" color="white">
            {description}
          </SoftTypography>
        </SoftBox>
        {action.type === "internal" ? (
          <SoftButton component={Link} to={action.route} variant="outlined" color="white" circular>
            {action.label} &nbsp; <Icon>arrow_forward</Icon>
          </SoftButton>
        ) : (
          <SoftButton
            component="a"
            href={action.route}
            target="_blank"
            rel="noreferrer"
            variant="outlined"
            color="white"
            circular
          >
            {action.label} &nbsp; <Icon>arrow_forward</Icon>
          </SoftButton>
        )}
      </SoftBox>
    </Card>
  );
}


// Typechecking props for the BackgroundBlogCard
BackgroundBlogCard.propTypes = {
  color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"]),
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.node.isRequired,
  action: PropTypes.shape({
    type: PropTypes.oneOf(["external", "internal"]).isRequired,
    route: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }).isRequired,
};

export default BackgroundBlogCard;
