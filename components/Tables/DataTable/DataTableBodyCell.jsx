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

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// Soft UI Dashboard PRO React components
import { SoftBox } from "@elas/shared/components";

// Soft UI Dashboard PRO React base styles
import colors from "./../../../assets/theme/base/colors";
import typography from "./../../../assets/theme/base/typography";
import borders from "./../../../assets/theme/base/borders";

function DataTableBodyCell({ noBorder = false, align = "left", children }) {
  const { light } = colors;
  const { size } = typography;
  const { borderWidth } = borders;

  return (
    <SoftBox
      component="td"
      textAlign={align}
      fontSize={size.sm}
      borderBottom={noBorder ? "none" : `${borderWidth[1]} solid ${light.main}`}
      py={1.5}
      px={3}
    >
      <SoftBox
        display="inline-block"
        width="max-content"
        color="text"
        sx={{ verticalAlign: "middle" }}
      >
        {children}
      </SoftBox>
    </SoftBox>
  );
}


// Typechecking props for the DataTableBodyCell
DataTableBodyCell.propTypes = {
  children: PropTypes.node,
  noBorder: PropTypes.bool,
  align: PropTypes.oneOf(["left", "right", "center"]),
};

export default DataTableBodyCell;
