import request from "../utils/request";

export const getReply = (
  parentCommentId: number,
  id: number,
  type: number = 0,
) => {
  return request.get("/comment/floor", {
    params: {
      parentCommentId,
      id,
      type,
    },
  });
};
