import React, { useEffect, useState, useCallback } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Paper,
  Avatar,
  Stack,
  Button,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchComments, addComment } from "@elas/redux/comments/actions";
import { RootState } from "@elas/redux/common/reducers";
import {
  deepPurple,
  blue,
  green,
  red,
  yellow,
  orange,
  pink,
  cyan,
  lime,
  indigo,
  teal,
  amber,
} from "@mui/material/colors";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import { formatDistanceToNow } from "date-fns";
import { SoftInput, SoftButton, SoftBox } from "@elas/shared/components";
import {
  HEADING_COMMENTS,
  BUTTON_LABEL_ADD_COMMENTS,
  PLACEHOLDER_ADD_COMMENT,
} from "@elas/cms/cms";
import { selectCommentData } from "./selectors";
import colors from "@elas/shared/assets/theme/base/colors";

interface Comment {
  id: number;
  username: string;
  content: string;
  avatar: string;
  timestamp: string;
}

interface CommentsProps {
  title?: string;
  timesheetId: number;
}

export const avatarColors: string[] = [
  deepPurple[300],
  blue[300],
  green[300],
  red[300],
  yellow[300],
  orange[300],
  pink[300],
  cyan[300],
  lime[300],
  indigo[300],
  teal[300],
  amber[300],
];

export const getAvatarColor = (email: string): string => {
  const hash = Array.from(email).reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return avatarColors[hash % avatarColors.length];
};

const Comments: React.FC<CommentsProps> = ({ title = HEADING_COMMENTS, timesheetId }) => {
  const dispatch = useDispatch();
  const comments: Comment[] = useSelector(selectCommentData);
  const { pagination } = useSelector((state: RootState) => state.comments);

  const [newComment, setNewComment] = useState<string>("");
  const [showMoreButton, toggleShowMore] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);

  const fetchPaginatedComments = useCallback((): void => {
    if (timesheetId && pagination?.total_records !== undefined) {
      dispatch(
        fetchComments({ timesheet_id: timesheetId, pagination: { ...pagination, limit: 5, page } })
      );
    }
  }, [dispatch, timesheetId, page]);

  useEffect(() => {
    fetchPaginatedComments();
  }, [fetchPaginatedComments]);

  useEffect(() => {
    if(pagination?.total_records) toggleShowMore(page * 5 < pagination.total_records);
  }, [pagination, page]);

  const handleAddComment = (): void => {
    if (newComment.trim()) {
      dispatch(addComment({ comment: newComment.trim(), timesheet_id: timesheetId }));
      setNewComment("");
      setPage(1);
      fetchPaginatedComments();
    }
  };

  const showMore = (): void => setPage((prev) => prev + 1);

  return (
    <Paper
      sx={{ padding: 2, margin: "auto", marginBottom: 5, width: "100%", backgroundColor: "white" }}
    >
      <Typography
        variant="h6"
        gutterBottom
        sx={{ fontWeight: "bold", color: colors.info.main, fontSize: "0.75rem" }}
      >
        {title}
      </Typography>
      <Stack direction="row" spacing={2} alignItems="center" sx={{ marginBottom: 2 }}>
        <SoftInput
          value={newComment}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewComment(e.target.value)}
          placeholder={PLACEHOLDER_ADD_COMMENT}
          sx={{
            flex: 1,
            borderRadius: 5,
            border: "1px solid #ccc",
            padding: "10px 15px",
            fontSize: "15px",
            backgroundColor: "#ffffff",
            boxShadow: "inset 0px 2px 5px rgba(0, 0, 0, 0.05)",
          }}
        />
        <SoftButton
          variant="contained"
          startIcon={<ArrowCircleRightIcon />}
          onClick={handleAddComment}
          disabled={!newComment.trim()}
          sx={{
            backgroundColor: "#007acc",
            color: "#ffffff",
            fontWeight: "bold",
            padding: "10px 20px",
            textTransform: "capitalize",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
            "&:hover": {
              backgroundColor: "#005fa3",
            },
            "&:disabled": {
              backgroundColor: "#e0e0e0",
              color: "#a0a0a0",
            },
          }}
        >
          {BUTTON_LABEL_ADD_COMMENTS}
        </SoftButton>
      </Stack>
      <List>
        {comments.map((comment) => (
          <ListItem
            key={comment.id}
            sx={{
              alignItems: "flex-start",
              borderBottom: "1px solid #e0e0e0",
              padding: "15px 10px",
              "&:last-child": {
                borderBottom: "none",
              },
            }}
          >
            <Avatar
              sx={{
                bgcolor: getAvatarColor(comment.avatar),
                color: "#ffffff",
                marginRight: 2,
                fontSize: "16px",
                fontWeight: "bold",
                width: 40,
                height: 40,
                boxShadow: "0px 4px 8px rgba(0,0,0,0.2)",
              }}
            >
              {comment.username.charAt(0).toUpperCase()}
            </Avatar>
            <ListItemText
              primary={
                <Typography
                  variant="subtitle1"
                  fontWeight="bold"
                  sx={{ color: "#005fa3", fontSize: "14px" }}
                >
                  {comment.username}
                </Typography>
              }
              secondary={
                <>
                  <Typography
                    variant="caption"
                    sx={{
                      color: "gray",
                      fontSize: "12px",
                      display: "block",
                      marginBottom: "4px",
                    }}
                  >
                    {formatDistanceToNow(new Date(comment.timestamp))} ago
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ marginTop: 0.5, color: "#333", fontSize: "14px" }}
                  >
                    {comment.content}
                  </Typography>
                </>
              }
            />
          </ListItem>
        ))}
      </List>
      {showMoreButton && (
        <SoftBox style={{textAlign: 'center'}}>
          <Button onClick={showMore}>Show More</Button>
        </SoftBox>)}
    </Paper>
  );
};

export default React.memo(Comments);
