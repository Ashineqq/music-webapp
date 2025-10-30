import request from "../utils/request";

//首页-发现
export const getSwipePics = () => {
  return request.get("/homepage/block/page");
};

//推荐歌单
export const selectedList = (num: number) => {
  return request.get(`/personalized?limit=${num}`);
};

//每日推荐歌曲
export const recommendList = (num: number) => {
  return request.get(`/personalized/newsong?limit=${num}`);
};
