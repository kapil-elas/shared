import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Card, Typography, Button, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add"; // Import AddIcon
import ListItems from "./ListItems";
import {SoftBox, SoftButton} from "@elas/shared/components";
import './style.css';

export default function ListView({ items = [], title = "Title", nextPage = () => null, className='' }) {
  const [expanded, setExpanded] = useState(Object.fromEntries(items?.map((item) => [item.name, false])));
  const [selectedActions, setSelectedActions] = useState({});
  const [expandedItem, setExpandedItem] = useState({});

  const toggleExpand = (name) => {
    setExpanded((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const toggleAction = (item, action) => {
    setSelectedActions((prev) => {
      const itemActions = prev[item] || [];
      return {
        ...prev,
        [item]: itemActions.includes(action)
          ? itemActions.filter((a) => a !== action)
          : [...itemActions, action],
      };
    });
  };

  return (
    <Card className={className} sx={{ margin: "auto", padding: 2 }}>
      <SoftBox>
        <Typography variant="h5" align="center" gutterBottom>
          {title} ({items?.length})
        </Typography>
        {items &&
          items?.map((item, i) => (
            <ListItems
              item={item}
              key={i}
              expanded={expanded}
              expandedItems={expandedItem}
              setExpandedItems={setExpandedItem}
              selectedActions={selectedActions}
              toggleExpand={toggleExpand}
              toggleAction={toggleAction}
            />
          ))}
        {/* + Button appears at the end of sub-items */}
        {/* <Card
          variant="outlined"
          sx={{ marginTop: 1, padding: 1, display: "flex", justifyContent: "center" }}
        >
          <SoftButton color="info" variant="outlined" onClick={() => console.log(`Add clicked for ${title}`)}>
            <AddIcon />
          </SoftButton>
        </Card> */}
      </SoftBox>
      <SoftButton  color="info" variant="outlined" fullWidth sx={{ marginTop: 2 }} onClick={nextPage}>
        Next page
      </SoftButton>
    </Card>
  );
}

ListView.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      count: PropTypes.number.isRequired,
      subItems: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string.isRequired,
          count: PropTypes.number.isRequired,
          actions: PropTypes.arrayOf(PropTypes.string),
        })
      ),
    })
  ).isRequired,
  title: PropTypes.string,
  className: PropTypes.string,
  nextPage: PropTypes.func,
};
