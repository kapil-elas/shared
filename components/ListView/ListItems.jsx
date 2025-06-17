import React from "react";
import {
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PropTypes from "prop-types";
import List from "./List";
import "./style.css";

export default function ListItems({
  item,
  level = 1,
  expandedItems,
  setExpandedItems,
  selectedActions,
  toggleExpand,
  toggleAction,
}) {
  const isExpanded = expandedItems ? (expandedItems[level] || null) === item.name : false;

  const handleSelect = (name) => {
    setExpandedItems((prev) => ({
      ...prev,
      [level]: prev[level] === name ? null : name, // Collapse only siblings at the same level
    }));
  };

  return (
    <Accordion
      expanded={isExpanded}
      className="accordian"
      sx={{
        borderRadius: "8px",
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel-content"
        id="panel-header"
        onClick={() => handleSelect(item.name)}
        sx={{
          cursor: "pointer",
          borderRadius: "8px",
          justifyContent: "space-between",
          display: "flex",
          alignItems: "center",
          backgroundColor: isExpanded ? "lightgrey" : "white",
        }}
      >
        <Typography component="span" sx={{ fontSize: `${18 - 2 * level}px` }}>
          {item.name} {item.subItems ? `(${item.subItems.length})` : ""}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        {item.subItems &&
          item.subItems.map((sub, index) =>
            level < 2 ? (
              <ListItems
                key={index}
                item={sub}
                level={level + 1}
                expandedItems={expandedItems}
                setExpandedItems={setExpandedItems}
                selectedActions={selectedActions}
                toggleExpand={toggleExpand}
                toggleAction={toggleAction}
              />
            ) : (
              <List key={index} item={sub} />
            )
          )}
      </AccordionDetails>
    </Accordion>
  );
}

ListItems.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired,
    subItems: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        count: PropTypes.number.isRequired,
        actions: PropTypes.arrayOf(PropTypes.string),
      })
    ),
  }).isRequired,
  level: PropTypes.number,
  expandedItems: PropTypes.object.isRequired, // Object to track expanded state per level
  setExpandedItems: PropTypes.func.isRequired, // Function to update expanded state
  selectedActions: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
  toggleExpand: PropTypes.func.isRequired,
  toggleAction: PropTypes.func.isRequired,
};
