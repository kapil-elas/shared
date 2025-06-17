import React from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import "./styles.css";
import PropTypes from 'prop-types';

const CustomExpandButton = (node) => {
  return (
    <>
      {node && (
        <div className="expand-btn" data-id={`expand-btn-${node.data.id}`}>
          <span>{node.data._directSubordinates}</span>
          <span>{node.children ? <FaAngleUp /> : <FaAngleDown />}</span>
        </div>
      )}
    </>
  );
};

CustomExpandButton.propTypes = {
  hasChild: PropTypes.bool.isRequired,
  expanded: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
};

CustomExpandButton.defaultProps = {
  hasChild: false,
  expanded: false,
  onClick: () => {}
};

export default CustomExpandButton;
