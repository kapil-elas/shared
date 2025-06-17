import React from "react";
import DepartmentView from "./DepartmentView";
import PositionView from "./PositionView";
import "./styles.css";
import PropTypes from 'prop-types';

const CustomNodeContent = (props) => {
  return (
    <>
      <div className={`node-container container-${props.data.type.toLowerCase()}`} data-id={props.data.id}>
        <div className="node-details">
          {props.data.type === 'department' ? (
            <DepartmentView {...props} />
          ) : (
            <PositionView {...props}/>
          )}
        </div>
      </div>
    </>
  );
};

CustomNodeContent.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['department', 'position']).isRequired,
    description: PropTypes.string,
    position: PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string
    }),
    user: PropTypes.shape({
      full_name: PropTypes.string.isRequired,
      profile_pic_url: PropTypes.string.isRequired
    }),
    users: PropTypes.arrayOf(PropTypes.shape({
      full_name: PropTypes.string.isRequired,
      profile_pic_url: PropTypes.string.isRequired
    }))
  }).isRequired
};

CustomNodeContent.defaultProps = {
  data: {}
};

export default CustomNodeContent;
