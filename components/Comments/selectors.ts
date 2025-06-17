import { RootState } from "@elas/redux";
import { createSelector } from "@reduxjs/toolkit";

export const selectCommentData = createSelector(
  (state: RootState) => state.comments,
  ({ comments }) => {
    const transformedComments = comments.map((comment: any, index: number) => ({
      id: index,
      username: comment.name || "Anonymous",
      content: comment.comment,
      avatar: comment.email[0]?.toUpperCase() || "A",
      timestamp: new Date(comment.timestamp).toISOString(),
    }));
    return transformedComments;
  }
);
