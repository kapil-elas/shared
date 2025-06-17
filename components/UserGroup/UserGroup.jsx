import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import './styles.css';
import { Avatar } from '@mui/material';

export const UserGroup = ({
    users = [],
    id,
    maxVisibleUsers = 3,
    hasEditPerms = true
}) => {
    const popupRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                setIsPopupVisible(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    const visibleUsers = users.slice(0, maxVisibleUsers);
    const hiddenUsersCount = Math.max(0, users.length - maxVisibleUsers);

    return (
        <div className="user-group-container" ref={containerRef}>
            <div className={`user-group ${hiddenUsersCount > 0 ? 'has-hidden-users' : ''}`}>
                {visibleUsers.map((user) => (
                    <Avatar
                        key={user.id}
                        data-id={user.id}
                        src={user.profile_pic_url}
                        className="user-avatar"
                        alt={user.full_name}
                        sx={{ width: 25, height: 25, marginRight: 1 }}
                    >
                        {user.full_name.charAt(0).toUpperCase()}
                    </Avatar>
                ))}
                
                {hiddenUsersCount > 0 && (
                    <div 
                        className="view-all"
                        data-id={users[0]?.position_id}
                    >
                        +{hiddenUsersCount}
                    </div>
                )}
                
                {hasEditPerms && <div className="add-user" data-id={id}>+</div>}
            </div>
        </div>
    );
};

UserGroup.propTypes = {
    users: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.number
            ]).isRequired,
            full_name: PropTypes.string.isRequired,
            profile_pic_url: PropTypes.string.isRequired,
            position_id: PropTypes.number.isRequired
        })
    ).isRequired,
    id: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired,
    onUserClick: PropTypes.func.isRequired,
    onAddUser: PropTypes.func.isRequired,
    maxVisibleUsers: PropTypes.number,
    hasEditPerms: PropTypes.bool,
};

UserGroup.defaultProps = {
    maxVisibleUsers: 3
};

export default React.memo(UserGroup);