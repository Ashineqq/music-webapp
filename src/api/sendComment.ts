import request from "../utils/request";

export const sendComment = (
  id: number,
  content: string,
  t: number = 1,
  type: number = 0,
) => {
  return request.get("/comment", {
    params: {
      t,
      type,
      id,
      content,
    },
  });
};
