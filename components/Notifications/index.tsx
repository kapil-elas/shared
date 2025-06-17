import React, { useState, MouseEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Badge,
  IconButton,
  Popover,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useDispatch, useSelector } from "react-redux";
import { readNotification } from "@elas/redux/notifications/actions";
import { RootState } from "@elas/redux";
import { Notification } from "@elas/redux/notifications";
import NotificationsList from "./notificationsList";
import "./style.css";

export interface NotificationItem {
  id: number;
  name: string;
  action: string;
  status: string;
  message: string;
  created_at: number;
  read: boolean;
  avatarUrl?: string;
  metadata?: {
    timesheet_id?: number;
  };
}

const Notifications = ({ notificationsData, selectTimesheetId }: any) => {
  const { pagination, loader } = useSelector((state: RootState) => state.notifications);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [notifications, setNotifications] = useState<Notification[]>(notificationsData);
  const [showMoreButton, toggleShowMore] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setPage(pagination.page);
  }, [pagination]);

  useEffect(() => {
    if (pagination?.total_records) toggleShowMore(page * 5 < pagination.total_records);
  }, [page]);

  useEffect(() => {
    setNotifications(notificationsData);
  }, [notificationsData]);

  const handleIconClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickNotification = (id: number) => {
    dispatch(readNotification({ id }));
  };

  const unreadCount = notifications.filter((n) => n.state === "NEW").length;

  return (
    <div style={{ position: "relative", zIndex: 1, padding: "0 10px" }}>
      <IconButton color="inherit" onClick={handleIconClick}>
        <Badge badgeContent={unreadCount} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: {
            backgroundColor: "white !important",
          },
        }}
      >
        <NotificationsList
          type={"list"}
          notifications={notifications.slice(0,5)}
          showMoreButton={showMoreButton}
          loader={loader}
          handleClickNotification={handleClickNotification}
          selectTimesheetId={selectTimesheetId}
          showMore={() => {
            handleClose();
            navigate("/notifications");
          }}
        />
      </Popover>
    </div>
  );
};

export default Notifications;
