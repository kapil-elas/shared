import React from "react";
import { Tabs, Tab, Box } from "@mui/material";
import colors from "@elas/shared/assets/theme/base/colors";

export interface MUITab<T extends string = string> {
  value: T;
  label: string;
  content: React.ReactNode;
  icon?: React.ReactNode;
}

export interface MUITabsProps<T extends string = string> {
  tabs: MUITab<T>[];
  value: T;
  onChange: React.Dispatch<React.SetStateAction<T>>;
  style?: React.CSSProperties;
}

const MUITabs = <T extends string>({
  tabs,
  value,
  onChange,
  style,
}: MUITabsProps<T>) => {
  const handleChange = (event: React.SyntheticEvent, newValue: T) => {
    onChange(newValue);
  };

  return (
    <>
      <Tabs
        value={value}
        onChange={handleChange}
        // variant="fullWidth"
        sx={{
          mt: 2,
          borderRadius: 2,
          backgroundColor: "#f9f9f9",
          minHeight: 40,
          // width: '100%',
          "& .MuiTabs-indicator": {
            display: "none",
          },
        }}
        style={style}
      >
        {tabs.map((tab) => (
          <Tab
            key={tab.value}
            value={tab.value}
            label={tab.icon ? (<>{tab.icon}  {tab.label}</>): tab.label}
            sx={{
              textTransform: "none",
              color: "black",
              fontWeight: 600,
              minHeight: 40,
              fontSize: "12px",
              "&.Mui-selected": {
                // background: "linear-gradient(90deg, #043622, #01BF6366)",
                background: colors.info.focus,
                borderRadius: 1,
                color: "black !important",
              },
            }}
          />
        ))}
      </Tabs>
      <Box sx={{ mt: 2 }}>
        {tabs.map((tab) => tab.value === value && <Box key={tab.value}>{tab.content}</Box>)}
      </Box>
    </>
  );
};

export default MUITabs;
