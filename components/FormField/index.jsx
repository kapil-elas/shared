import React from 'react';
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

// prop-type is a library for typechecking of props
import PropTypes from "prop-types";

// formik components
import { ErrorMessage, Field } from "formik";

// Soft UI Dashboard PRO React components
import SoftBox from "./../../components/SoftBox";
import SoftTypography from "./../../components/SoftTypography";
import SoftInput from "./../../components/SoftInput";
import withTheme from "./../../components/hoc";

function FormField({ label, name, value, ...rest }) {
  return (
    <SoftBox mb={1.5}>
      <SoftBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
        <SoftTypography
          component="label"
          variant="caption"
          fontWeight="bold"
          textTransform="capitalize"
          style={{ fontSize: "13px", color: "black" }} 
        >
          {label}
        </SoftTypography>
      </SoftBox>
      <Field {...rest} name={name} value={value} as={SoftInput} />
      <SoftBox mt={0.75}>
        <SoftTypography component="div" variant="caption" color="error">
          <ErrorMessage name={name} />
        </SoftTypography>
      </SoftBox>
    </SoftBox>
  );
}

// typechecking props for FormField
FormField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
};

export default withTheme(FormField);
