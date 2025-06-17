import React from "react";
import { Box } from "@mui/material";
import { DataGridPro, DataGridProProps, GridSlots } from "@mui/x-data-grid-pro";
import Filters from "../Filters";
import colors from "@elas/shared/assets/theme/base/colors";

export interface CommonDataGridProps extends DataGridProProps {
  hideHeaderCheckbox?: boolean;
  title?: string;
  description?: string;
  containerStyles?: object;
  showCheckboxSelection?: boolean;
  pageSize?: number;
  rowsPerPageOptions?: number[];
  enableFilters?: boolean;
  enableSearch?: boolean;
  filters?: any;
  children?: React.ReactNode;
  handleFilterClick?: (name: string, value?: any) => void;
  filterConfig?: any;
  customRowClassName?: DataGridProProps["getRowClassName"];
}

type SlotsProps = {
  children?: React.ReactNode;
  enableFilters?: boolean;
  enableSearch?: boolean;
  config?: any;
  filters?: any;
  handleClick?: (name: string, value?: any) => void;
};

const Slots: React.FC<SlotsProps> = (props) => {
  const { children, config, filters, enableFilters = false, enableSearch = false, handleClick } = props;

  return (
    <Box p={2} display="flex" justifyContent="flex-start" alignItems="center" sx={{
      p: 1,
      backgroundColor: "#fff",
      borderRadius: 2,
      // maxWidth: 1000,
    }}>
      <Filters
        filters={filters}
        handleClick={handleClick || (() => {})}
        config={config}
        enableFilters={enableFilters}
        enableSearch={enableSearch}
      />
      {children}
    </Box>
  );
};

const CommonDataGrid: React.FC<CommonDataGridProps> = (props) => {
  const {
    containerStyles,
    sx,
    showCheckboxSelection,
    enableFilters = false,
    enableSearch = false,
    filters = {},
    handleFilterClick = () => {},
    filterConfig = [],
    customRowClassName,
    hideHeaderCheckbox,
    children,
    slotProps = {},
    ...rest
  } = props;
  const filtersProps = { filters, handleClick: handleFilterClick, config: filterConfig } ;
  const mergedSlotProps = { toolbar: { children, enableFilters, enableSearch, ...filtersProps}, ...slotProps };
  return (
    <Box
      sx={{
        width: "100%",
        border: "1px solid #e0e0e0",
        overflowX: "hidden",
        transition: "width 0.4s ease-in-out",
        "& .MuiInputBase-colorPrimary": {
          padding: "3px 20px 3px 0px",
          width: "auto !important",
        },
        // "& .Mui-selected": {
        //   backgroundColor: "white !important",
        // },
        ...containerStyles,
      }}
    >
      <DataGridPro
        autoHeight
        checkboxSelection={!!showCheckboxSelection}
        disableRowSelectionOnClick={!!showCheckboxSelection}
        columnHeaderHeight={35}
        rowHeight={40}
        {...rest}
        slots={{ toolbar: Slots as GridSlots["toolbar"] }}
        slotProps={mergedSlotProps}
        getRowClassName={customRowClassName || rest.getRowClassName}
        sx={{
          "& .MuiDataGrid-cell": { display: "flex", alignItems: "center" },
          border: "none",
          "& .MuiDataGrid-columnSeparator": { display: "none" },
          "& .MuiDataGrid-row:last-of-type": { borderBottom: "none" },
          "& .MuiDataGrid-cell:focus, & .MuiDataGrid-cell:focus-within": { outline: "none" },
          "& .MuiDataGrid-row.Mui-selected": { backgroundColor: "#f0f0f0 !important" },
          "& .MuiDataGrid-row.Mui-selected:hover": { backgroundColor: "#f0f0f0 !important" },
          "& .MuiDataGrid-columnHeaders": { fontWeight: "bold" },
          "& .MuiDataGrid-columnHeaderTitle": { fontWeight: "bold" },
          "& .MuiButtonBase-root.MuiCheckbox-root[aria-disabled='true']": {
            backgroundColor: colors.grey[400],
          },
          ...(hideHeaderCheckbox && {
            "& .MuiDataGrid-columnHeaderTitleContainerContent .MuiButtonBase-root.MuiCheckbox-root": {
              display: "none !important",
            },
          }),
          "& .MuiDataGrid-virtualScroller": { overflowX: "hidden" },
          ...sx,
        }}
      />
    </Box>
  );
};

export default CommonDataGrid;
