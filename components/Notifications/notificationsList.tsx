import React from "react";
import {
  Box,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";
import { avatarColors } from "../Comments";
import { timeAgo } from "@elas/helpers/timeAgo";
import { SoftBox } from "@elas/shared/components";
import pxToRem from "@elas/shared/assets/theme/functions/pxToRem";
import colors from "@elas/shared/assets/theme/base/colors";
import { Notification } from "@elas/redux/notifications";

type NotificationsListProps = {
  type: string;
  notifications: Notification[];
  showMoreButton?: boolean;
  loader?: boolean;
  handleClickNotification: (id: number) => void;
  selectTimesheetId: (id: number) => void;
  showMore: () => void;
};

const NotificationsList: React.FC<NotificationsListProps> = ({
  notifications,
  showMoreButton,
  loader,
  handleClickNotification,
  selectTimesheetId,
  showMore,
  type = "page",
}) => {
  return (
    <React.Fragment>
      <SoftBox
        display="flex"
        justifyContent="space-between"
        alignItems="flex-start"
        m={1}
        alignSelf="normal"
      >
        Notifications
      </SoftBox>
      <List sx={{ width: type === "page" ? "100%" : pxToRem(400) }}>
        {notifications.length === 0 ? (
          <Typography sx={{ padding: 2 }}>No notifications</Typography>
        ) : (
          notifications.map((notification) => (
            <ListItem
              key={notification.id}
              divider
              alignItems="flex-start"
              style={{
                cursor: notification.state === "NEW" ? "pointer" : "inherit",
                borderRadius: "10px",
                padding: "5px",
              }}
              onClick={() => {
                if (notification.state === "NEW") handleClickNotification(notification.id);
                if (notification.delivery_record?.timesheet_id)
                  selectTimesheetId(notification.delivery_record.timesheet_id);
              }}
            >
              <ListItemAvatar style={{ marginTop: "3px", marginLeft: "1px" }}>
                <Avatar
                  sx={{
                    bgcolor: avatarColors[Math.floor(Math.random() * avatarColors.length)],
                    color: "#ffffff",
                    marginRight: 1,
                    fontSize: "16px",
                    fontWeight: "bold",
                    width: 40,
                    height: 40,
                    boxShadow: "0px 4px 8px rgba(0,0,0,0.2)",
                  }}
                >
                  {notification.sender_name.charAt(0).toUpperCase()}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                className={type === "page" ? "notification-page" : "notification-list"}
                primary={
                  <SoftBox display="flex">
                    <Typography variant="body2">{notification.message}</Typography>
                  </SoftBox>
                }
                secondary={timeAgo(notification.created_at)}
                style={{ width: pxToRem(200), fontSize: "12px", lineHeight: "14.52px" }}
              />
              {notification.state === "NEW" && (
                <Box
                  sx={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    backgroundColor: colors.info.main,
                    alignSelf: "center",
                    marginLeft: 1,
                  }}
                />
              )}
            </ListItem>
          ))
        )}

        {!loader && showMoreButton && (
          <SoftBox style={{ textAlign: "center" }}>
            <Button onClick={showMore}>Show More</Button>
          </SoftBox>
        )}
        {loader && (
          <SoftBox style={{ textAlign: "center" }}>
            <CircularProgress />
          </SoftBox>
        )}
      </List>
    </React.Fragment>
  );
};

export default NotificationsList;
