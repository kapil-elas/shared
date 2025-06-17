import React from "react";
import PropTypes from "prop-types";
import { FaBuilding } from "react-icons/fa";
import { getUserProfileIcon, getUserNameAndPosition } from "./utils";
import "./styles.css";

const DepartmentView = (props) => {
  const { name, positionName } = getUserNameAndPosition(props.data);
  return (
    <>
      <div className="node-content">
          {getUserProfileIcon(props.data)}
          <div className="node-info">
            <div className="node-name">{name}</div>
            <div className="node-role">{positionName}</div>
            {props.data.position && (
              <div className="node-department">
                <FaBuilding />
                <div>{props.data.department}</div>
              </div>
            )}
          </div>
        </div>
    </>
  );
};

DepartmentView.propTypes = {
    data: PropTypes.shape({
        name: PropTypes.string,
        department: PropTypes.string,
        position: PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            description: PropTypes.string
        }),
        user: PropTypes.shape({
            id: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.number
            ]).isRequired,
            full_name: PropTypes.string.isRequired,
            profile_pic_url: PropTypes.string.isRequired
        })
    }).isRequired
};

DepartmentView.defaultProps = {
    data: {
        name: '',
        department: '',
        position: null,
        user: null
    }
};

export default DepartmentView;
