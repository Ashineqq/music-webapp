import request from "../utils/request";

export const getCommentList = (id: number, limit: number) => {
  return request.get("/comment/music", {
    params: {
      id,
      limit,
    },
  });
};
