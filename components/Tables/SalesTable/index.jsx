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

import React, { useMemo } from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

// Soft UI Dashboard PRO React components
import SoftTypography from "./../../../components/SoftTypography";
import SoftBox from "./../../../components/SoftBox";

// Soft UI Dashboard PRO React example components
import SalesTableCell from "./SalesTableCell";

function SalesTable({ title, rows = [{}] }) {
  const renderTableCells = rows.map((row, key) => {
    const tableRows = [];
    const rowKey = `row-${key}`;

    Object.entries(row).map(([cellTitle, cellContent]) =>
      Array.isArray(cellContent)
        ? tableRows.push(
          <SalesTableCell
            key={cellContent[1]}
            title={cellTitle}
            content={cellContent[1]}
            image={cellContent[0]}
            noBorder={key === rows.length - 1}
          />
        )
        : tableRows.push(
          <SalesTableCell
            key={cellContent}
            title={cellTitle}
            content={cellContent}
            noBorder={key === rows.length - 1}
          />
        )
    );

    return <TableRow key={rowKey}>{tableRows}</TableRow>;
  });

  return (
    <TableContainer sx={{ height: "100%" }}>
      <Table>
        <TableHead>
          <SoftBox component="tr" width="max-content" display="block" mb={1.5}>
            <SoftTypography variant="h6" component="td">
              {title}
            </SoftTypography>
          </SoftBox>
        </TableHead>
        <TableBody>{useMemo(() => renderTableCells, [rows])}</TableBody>
      </Table>
    </TableContainer>
  );
}


// Typechecking props for the SalesTable
SalesTable.propTypes = {
  title: PropTypes.string.isRequired,
  rows: PropTypes.arrayOf(PropTypes.object),
};

export default SalesTable;
