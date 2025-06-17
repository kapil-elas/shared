import React from "react";
import { Grid, Typography, Box } from "@mui/material";
import { gridData } from "./config";
import { Permission } from "@elas/shared/components";

interface ConfigurationsListProps {
  onItemClick: (route: string) => void;
}

const ConfigurationsList: React.FC<ConfigurationsListProps> = ({ onItemClick }) => {
  
  return (
    <Box sx={{ p: 1, width: "100%" }}>
      {gridData.map((row, rowIndex) => (
        <Grid container spacing={0.5} key={rowIndex} sx={{ mb: 1 }}>
          {row.map((column, colIndex) => (
            <Grid item xs={12} key={colIndex}>
              <Typography
                variant="subtitle2"
                sx={{ fontSize: "0.75rem", fontWeight: "bold", mb: 0.3 }}
              >
                {column.header}
              </Typography>
              {column.items.map((item, index) => (
                <Permission
                  key={index}
                  module={item.permissions.module}
                  action={item.permissions.action}
                >
                  <Box
                    key={index}
                    onClick={() => onItemClick(item.route)}
                    sx={{
                      padding: "1px 2.5px 5.5px 4.5px !important",
                      borderRadius: 0.5,
                      cursor: "pointer",
                      lineHeight: "20px",
                      transition: "background-color 0.3s ease",
                      "&:hover": {
                        backgroundColor: "rgba(0,0,0,0.1)",
                      },
                    }}
                  >
                    <Typography variant="caption" sx={{ fontSize: "0.7rem" }}>
                      {item.label}
                    </Typography>
                  </Box>
                </Permission>
              ))}
            </Grid>
          ))}
        </Grid>
      ))}
    </Box>
  );
};

export default ConfigurationsList;
