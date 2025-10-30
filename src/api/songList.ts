import request from "../utils/request";

export const getSongList = (id: number, limit: number) => {
  return request.get("/playlist/track/all", {
    params: {
      id,
      limit,
    },
  });
};
