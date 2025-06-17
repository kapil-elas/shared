import React from "react";
import PropTypes from "prop-types";
import UserGroup from "@elas/shared/components/UserGroup/UserGroup";
import "./styles.css";

const PositionView = (props) => {
  const { id, name, users} = props.data;
  return (
    <>
      <div className="node-team">
          <div className="node-team-name">{name}</div>
          <div className="parent-user-group">
            <div className="user-group" id="userGroup">
              <UserGroup
                id={id}
                users={users}
                maxVisibleUsers={3}
                hasEditPerms={props.hasEditPerms}
            />
            </div>
          </div>
        </div>
    </>
  );
};

PositionView.propTypes = {
    data: PropTypes.shape({
        name: PropTypes.string.isRequired,
        objectId: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
        users: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.number
            ]).isRequired,
            name: PropTypes.string.isRequired,
            imageUrl: PropTypes.string.isRequired
        }))
    }).isRequired,
    hasEditPerms: PropTypes.bool,
};

PositionView.defaultProps = {
    data: {
        name: '',
        objectId: '',
        users: []
    }
};

export default PositionView;
