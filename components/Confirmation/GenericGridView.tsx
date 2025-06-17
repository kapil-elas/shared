// GenericGridView.tsx
import React, { useState } from "react";
import { Box, Chip, Typography, Slide, Paper, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { GridColDef, GridRowSelectionModel, GridRowParams, GridSlots } from "@mui/x-data-grid-pro";
import CommonDataGrid from "../DataGrid";
import colors from "@elas/shared/assets/theme/base/colors";
import { useDispatch } from "react-redux";
import { Employee, mockEmployeesData } from "@elas/helpers/rolesManagementDataConfig";
const { info } = colors;
const chipStyle = {
  backgroundColor: info.main,
  color: "#ffffff",
  fontSize: "0.75rem",
  height: "24px",
  cursor: "pointer",
  "& .MuiChip-label": { padding: "0 8px", textShadow: "0 0 2px rgba(0,0,0,0.3)" },
  "&:hover": { backgroundColor: info.focus },
  "&.Mui-focusVisible": { backgroundColor: info.focus }
};
export interface GenericGridViewProps {
  searchTerm: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  toolbar?: React.ReactNode;
  gridSlots?: GridSlots;
  gridSlotProps?: any;
  searchPlaceholder?: string;
  selectedLabel: string;
  selectionModel: readonly (string | number)[];
  rows: any[];
  columns: GridColDef[];
  getChipLabel?: (row: any) => string;
  onDeleteChip: (id: string | number) => void;
  filteredRows: any[];
  handleRowSelectionModelChange: (newSelection: GridRowSelectionModel) => void;
  onRowClick: (params: GridRowParams) => void;
  isDetailOpen: boolean;
  detailRow: any | null;
  handleCloseDetail: () => void;
  DetailComponent?: React.ComponentType<{
    row: any;
    onClose: () => void;
    editable?: boolean;
  }>;
}
const DefaultToolbar: React.FC<{
  searchTerm: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  searchPlaceholder?: string;
  selectedLabel: string;
  selectionModel: readonly (string | number)[];
  rows: any[];
  getChipLabel?: (row: any) => string;
  onDeleteChip: (id: string | number) => void;
}> = ({
  searchTerm,
  onSearchChange,
  searchPlaceholder = "Search...",
  selectedLabel,
  selectionModel,
  rows,
  getChipLabel,
  onDeleteChip
}) => (
  <>
    {/* <Box sx={{ padding: "8px 0 4px 16px" }} /> */}
    <Box sx={{ display: "flex", alignItems: "center", padding: "8px 0 4px 16px" }}>
      <Typography variant="subtitle1" sx={{ml:1 }}>
        
        {selectionModel.length === 0 ? (
          <span style={{ fontWeight: "normal", fontSize: "0.875rem" }}>No Role Selected</span>
        ) : (
          ""
        )}
      </Typography>
      {selectionModel.length > 0 && (
        <Box display="flex" flexWrap="wrap" gap={1} sx={{ mt:1}}>
          {selectionModel.map((id) => {
            const row = rows.find((r) => r.id === id);
            if (!row) return null;
            return (
              <Chip
                key={id}
                label={getChipLabel ? getChipLabel(row) : row.value || row.id}
                sx={chipStyle}
                deleteIcon={
                  <CloseIcon
                    sx={{
                      color: "white !important",
                      width: 18,
                      height: 18,
                      background: "#b2b0b0",
                      borderRadius: "100%",
                      padding: "1px"
                    }}
                  />
                }
                onDelete={() => onDeleteChip(id)}
              />
            );
          })}
        </Box>
      )}
    </Box>
  </>
);
const GenericGridView: React.FC<GenericGridViewProps> = ({
  toolbar,
  gridSlots,
  gridSlotProps,
  searchTerm,
  onSearchChange,
  searchPlaceholder = "Search...",
  selectedLabel,
  selectionModel,
  rows,
  columns,
  getChipLabel,
  onDeleteChip,
  filteredRows,
  handleRowSelectionModelChange,
  onRowClick,
  isDetailOpen,
  detailRow,
  handleCloseDetail,
  DetailComponent
}) => {
  const dispatch = useDispatch();
  const [employees, setEmployees] = useState<Employee[]>(mockEmployeesData);
  type FiltersState = { department: string };
  const [filters, setFilters] = useState<FiltersState>({ department: "" });
  const handleFilters = (name: string, value?: any) => {
    if (name === "clear") {
      setFilters({ department: "" });
      setEmployees(mockEmployeesData);
      return;
    }
    setFilters((prev) => ({ ...prev, [name]: value }));
    if (name === "department") {
      const query = typeof value === "string" ? value.toLowerCase() : "";
      const filtered = mockEmployeesData.filter((emp) =>
        emp.department.toLowerCase().includes(query)
      );
      setEmployees(filtered);
    }
  };
  return (
    <>
      {toolbar ? toolbar : (
        <DefaultToolbar
          searchTerm={searchTerm}
          onSearchChange={onSearchChange}
          searchPlaceholder={searchPlaceholder}
          selectedLabel={selectedLabel}
          selectionModel={selectionModel}
          rows={rows}
          getChipLabel={getChipLabel}
          onDeleteChip={onDeleteChip}
        />
      )}
      <Box sx={{ display: "flex", overflow: "hidden", padding: "8px 16px 4px 16px" }}>
        <CommonDataGrid
          rows={filteredRows}
          columns={columns}
          rowSelectionModel={selectionModel}
          onRowSelectionModelChange={handleRowSelectionModelChange}
          showCheckboxSelection
          onRowClick={onRowClick}
          pagination
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]}
          containerStyles={{
            width: isDetailOpen ? "calc(100% - 480px)" : "100%",
            transition: "width 0.4s"
          }}
          enableFilters
          filters={filters}
          handleFilterClick={handleFilters}
          filterConfig={[{ key: "department", name: "department", label: "Department", visible: true, isMulti: true }]}
        />
        {isDetailOpen && (
          <Slide direction="left" in={isDetailOpen} mountOnEnter unmountOnExit>
            <Paper
              elevation={2}
              sx={{
                width: "480px",
                height: "100%",
                flexShrink: 0,
                transition: "all 0.4s ease-in-out",
                overflowY: "auto",
                p: 2,
                pt: 0,
                border: "1px solid #eee",
                display: "flex",
                flexDirection: "column",
                backgroundColor: "#fff",
                ml: 2,
                mr: 2
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  position: "sticky",
                  top: 0,
                  zIndex: 10,
                  backgroundColor: "#fff",
                  pt: 1,
                  pb: 1,
                  px: 0,
                  borderBottom: "2px solid transparent",
                  borderImage: "linear-gradient(to right, #043622, #01BF63)",
                  borderImageSlice: 1
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    ml: 1,
                    fontWeight: "bold",
                    fontSize: "16px",
                    background: info.main,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent"
                  }}
                >
                  {detailRow ? `Details : ${detailRow.value}` : "Details"}
                </Typography>
                <IconButton size="small" onClick={handleCloseDetail}>
                  <CloseIcon sx={{ color: "black" }} />
                </IconButton>
              </Box>
              {detailRow && DetailComponent && (
                <DetailComponent row={detailRow} onClose={handleCloseDetail} editable={false} />
              )}
            </Paper>
          </Slide>
        )}
      </Box>
    </>
  );
};
export default GenericGridView;
