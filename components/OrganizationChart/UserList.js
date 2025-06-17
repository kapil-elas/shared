import React from "react";
import PropTypes from "prop-types";
import Avatar from '@mui/material/Avatar';

export const UserList = ({ users, position, onUserProfile }) => {
  const style = position ? {
    position: 'absolute',
    left: `${position.x}px`,
    top: `${position.y}px`
  } : {};

  return (
    <div
      id={`id-${users[0]?.position_id}`}
      data-id={`cls-${users[0]?.position_id}`}
      className={`user-list-popup cls-${users[0]?.position_id}`}
      style={style}
      onClick={(e) => e.stopPropagation()}
    >
      {users.slice(3).map((user) => (
        <div key={user.id} className="user-list-item" onClick={(e) => onUserProfile(user.id, e)}>
          <Avatar 
            src={user.profile_pic_url}
            alt={user.full_name}
            sx={{ width: 25, height: 25, marginRight: 1 }}
          >
            {user.full_name.charAt(0).toUpperCase()}
          </Avatar>
          <span className="user-list-name">{user.full_name}</span>
        </div>
      ))}
    </div>
  );
};

UserList.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      full_name: PropTypes.string.isRequired,
      profile_pic_url: PropTypes.string.isRequired,
      position_id: PropTypes.number.isRequired,
    })
  ).isRequired,
  position: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired
  }),
  onUserProfile: PropTypes.func.isRequired,
};

UserList.defaultProps = {
  position: null,
  onUserProfile: () => {},
};
