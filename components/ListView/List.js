import { useState } from "react";
import {
  Typography,
  IconButton,
  Accordion,
  AccordionDetails,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { SoftBox } from "@elas/shared/components";
import PropTypes from "prop-types";
import "./style.css";

export default function List({ item }) {
  const [history, setHistory] = useState([item]);
  const [selectedItem, setSelectedItem] = useState(null);

  const currentItem = history[history.length - 1];

  const handleItemClick = (subItem) => {
    if (subItem.subItems && subItem.subItems.length > 0) {
      setHistory([...history, subItem]);
    }
    setSelectedItem(subItem.name === selectedItem ? null : subItem.name);
  };

  const handleBack = () => {
    if (history.length > 1) {
      setHistory(history.slice(0, -1));
    }
  };

  return (
    <Accordion className="accordian">
      <AccordionDetails className="list-item">
        <SoftBox
          display="flex"
          alignItems="center"
          sx={{
            cursor: "pointer",
            backgroundColor: selectedItem === currentItem.name ? "lightgrey" : "white",
            padding: "4px",
            borderRadius: "4px",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          {history.length > 1 && (
            <IconButton onClick={handleBack} sx={{ marginRight: 1 }}>
              <ArrowBackIcon fontSize="small" />
            </IconButton>
          )}
          <Typography
            component="span"
            sx={{ fontSize: "12px" }}
            onClick={() => handleItemClick(currentItem)}
          >
            {currentItem.name}
          </Typography>
        </SoftBox>

        {history.length > 1 && (
          <SoftBox mt={2}>
            {currentItem.subItems?.map((subItem, index) => (
              <Accordion
                className="accordian"
                key={index}
                sx={{
                  backgroundColor: selectedItem === subItem.name ? "lightgrey" : "white",
                }}
              >
                <AccordionDetails
                  onClick={() => (subItem.subItems ? handleItemClick(subItem) : null)}
                  sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
                >
                  <Typography variant="body1" sx={{ fontSize: "10px", cursor: "pointer" }}>
                    {subItem.name}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </SoftBox>
        )}
      </AccordionDetails>
    </Accordion>
  );
}

List.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string.isRequired,
    subItems: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        subItems: PropTypes.array,
      })
    ),
  }).isRequired,
};
