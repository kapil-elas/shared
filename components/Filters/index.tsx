import React, { useState, useEffect } from "react";
import { Grid, Button, TextField, Box, InputAdornment, IconButton } from "@mui/material";
import DropdownComponent, { StateOption } from "./PopoutFilter";
import ClearIcon from "@mui/icons-material/Clear";
import "./filters.css";

export interface FilterConfig {
  key: string;
  name: string;
  label: string;
  visible: boolean;
  isMulti: boolean;
}

export interface FiltersProps {
  filters: { Name?: string; [key: string]: any };
  handleClick: (name: string, value?: any) => void;
  config: FilterConfig[];
  enableSearch: boolean;
  enableFilters: boolean; // Added this property
}

function getFilterOptions(filterName: string) {
  switch (filterName) {
  case "location":
    return [
      { label: "Sydney", value: "Sydney" },
      { label: "Melobourne", value: "Melobourne" },
      { label: "London", value: "London" },
      { label: "Los Angeles", value: "Los Angeles" },
      { label: "Las Vegas", value: "Las Vegas" },
      { label: "Washington DC", value: "Washington DC" },
    ];
  case "department":
    return [
      { label: "Finance", value: "Finance" },
      { label: "Human Resources", value: "Human Resources" },
      { label: "Operations", value: "Operations" },
      { label: "Accounting", value: "Accounting" },
      { label: "Costing", value: "Costing" },
      { label: "IT", value: "IT" },
    ];
  case "role":
    return [
      { label: "Finance Manager", value: "Finance Manager" },
      { label: "Operation Inventory Manager", value: "Operation Inventory Manager" },
      { label: "HR Manager", value: "HR Manager" },
      { label: "Accounting Manager", value: "Accounting Manager" },
      { label: "Accounting Supervisor", value: "Accounting Supervisor" },
    ];
  case "roleType":
    return [
      { label: "Default Role Type", value: "default" },
      { label: "Custom Role Type", value: "custom" },
    ];
  default:
    return [];
  }
}

interface FilterInputProps {
  configItem: FilterConfig;
  handleClick: (name: string, value: StateOption[]) => void;
  selectedValue: StateOption[];
}

const FilterInput = ({ configItem, selectedValue, handleClick }: FilterInputProps) => {
  const [selectedFilter, setSelectedFilter] = useState<StateOption[]>([]);

  useEffect(() => {
    if (selectedValue) {
      setSelectedFilter(selectedValue);
    }
  }, [selectedValue]);

  return (
    <DropdownComponent
      options={getFilterOptions(configItem.name)}
      value={selectedFilter}
      isMulti={configItem.isMulti}
      placeholder={configItem.label}
      onChange={(newValues) => {
        setSelectedFilter(newValues);
        handleClick(configItem.name, newValues);
      }}
    />
  );
};

const Filters = ({ filters, enableFilters, enableSearch, handleClick, config }: FiltersProps) => {
  // Always show the first filter, hide others unless explicitly activated
  const initialConfigState = config.map((item, index) => ({
    ...item,
    visible: index === 0,
  }));

  const [configState, setConfigState] = useState<FilterConfig[]>(initialConfigState);
  const alwaysVisibleName = configState.length > 0 ? configState[0].name : "";
  const visibleFilters = configState.filter(
    (f) => f.name === alwaysVisibleName || f.visible
  );
  const moreFilters = configState.filter((f) => f.name !== alwaysVisibleName);
  const selectedInMore = moreFilters
    .filter((f) => f.visible)
    .map((f) => ({ label: f.label, value: f.name }));
  const moreOptions = moreFilters.map((f) => ({
    label: f.label,
    value: f.name,
  }));
  const hasFilters =
    (filters.Name && filters.Name.trim() !== "") ||
    configState.some((f) => Array.isArray(filters[f.name]) && filters[f.name].length > 0);

  const handleMoreChange = (selectedOptions: StateOption[]) => {
    setConfigState((prev) =>
      prev.map((cfg) => {
        if (cfg.name === alwaysVisibleName) return cfg;
        const isSelected = selectedOptions.some((opt) => opt.value === cfg.name);
        if (!isSelected && cfg.visible) {
          handleClick(cfg.name, []);
        }
        return { ...cfg, visible: isSelected };
      })
    );
  };

  const handleClearAll = () => {
    setConfigState((prev) =>
      prev.map((cfg, index) => {
        if (index === 0) {
          return { ...cfg, visible: true };
        }
        return { ...cfg, visible: false };
      })
    );
    handleClick("clear");
  };

  return (
    // <Box
    //   sx={{
    //     p: 1,
    //     backgroundColor: "#fff",
    //     borderRadius: 2,
    //     maxWidth: 1000,
    //   }}
    // >
    <Grid spacing={2} alignItems="center" sx={{padding: '0 30px 0 0'}}>
      {enableSearch && <Grid item xs="auto" sx={{ maxWidth: 220 }}>
        <TextField
          placeholder="Search"
          variant="outlined"
          size="small"
          fullWidth
          value={filters.Name || ""}
          onChange={(e) => handleClick("Name", e.target.value)}
          sx={{
            // width:"220px",
            backgroundColor: "#fff",
            "& .MuiOutlinedInput-root": {
              padding: "8px",
              border: "1px solid rgb(204, 204, 204)",
              borderRadius: "4px !important",
              fontSize: "14px",
              height: "35px !important",
            },
            "& .MuiOutlinedInput-input": {
              fontSize: "14px",
            },
          }}
          InputProps={{
            endAdornment: filters.Name ? (
              <InputAdornment position="end">
                <IconButton onClick={()=> handleClick("Name", "")} size="small">
                  <ClearIcon fontSize="small" />
                </IconButton>
              </InputAdornment>
            ) : null,
          }}
        />
      </Grid>}
      {enableFilters && (<>
        {/* Render visible dropdown filters */}
        {visibleFilters.map((filterItem) => (
          <Grid key={filterItem.key} item xs={12} sm={6} md={3}>
            <FilterInput
              configItem={filterItem}
              selectedValue={filters[filterItem.name] || []}
              handleClick={handleClick}
            />
          </Grid>
        ))}

        {/* More filters dropdown and Clear Filters button */}
        {moreFilters.length > 0 && (
          <>
            <Grid item xs="auto" sm={6} md="auto">
              <DropdownComponent
                options={moreOptions}
                value={selectedInMore}
                isMulti
                onChange={handleMoreChange}
                variant="More"
                color="info"
                size="small"
                sx={{ mr: 2 }}
              />
            </Grid>
            <Grid item xs="auto" sm={6} md="auto">
              <Button
                fullWidth
                size="small"
                variant="text"
                color="primary"
                onClick={handleClearAll}
                disabled={!hasFilters}
                sx={{
                  textTransform: "none",
                  mt: { xs: 1, sm: 0 },
                }}
              >
                Clear Filters
              </Button>
            </Grid>
          </>
        )}

        {/* If no extra filters, show just Clear Filters */}
        {moreFilters.length === 0 && (
          <Grid item xs="auto" sm={6} md="auto">
            <Button
              fullWidth
              size="small"
              variant="text"
              color="primary"
              onClick={handleClearAll}
              disabled={!hasFilters}
              sx={{
                textTransform: "none",
                mt: { xs: 1, sm: 0 },
              }}
            >
              Clear Filters
            </Button>
          </Grid>
        )}
      </>)}
    </Grid>
    // </Box>
  );
};

export default Filters;
