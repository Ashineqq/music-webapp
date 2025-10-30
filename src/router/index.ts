import { createRouter, createWebHistory } from "vue-router";
import Mylogin from "../views/mylogin.vue";
import Layout from "../views/layout/index.vue";
import Recommend from "../views/layout/recommend/index.vue";
import Find from "../views/layout/find.vue";
import Roaming from "../views/layout/roaming.vue";
import Dynamics from "../views/layout/dynamics.vue";
import user from "../views/layout/user.vue";

import Music from "../views/layout/recommend/music/index.vue";
import Blog from "../views/layout/recommend/blog.vue";
import Listen from "../views/layout/recommend/listen.vue";
import Live from "../views/layout/recommend/live.vue";

import Selected from "../views/layout/recommend/music/selected.vue";
import Rank from "../views/layout/recommend/music/rank.vue";

import RecordMain from "../views/recordMain.vue";
import SongList from "../views/songList.vue";
import Comment from "../views/comment.vue";

import { useRegesterStore } from "../store/token";
import { storeToRefs } from "pinia";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/login", component: Mylogin },
    { path: "/", redirect: "/login" },
    {
      path: "/layout",
      component: Layout,
      children: [
        { path: "", redirect: "/recommend" },
        {
          path: "/recommend",
          component: Recommend,
          children: [
            { path: "", redirect: "/music" },
            {
              path: "/music",
              component: Music,
              children: [
                { path: "", redirect: "/selected" },
                { path: "/selected", component: Selected },
                { path: "/rank", component: Rank },
              ],
            },
            { path: "/blog", component: Blog },
            { path: "/listen", component: Listen },
            { path: "/live", component: Live },
          ],
        },
        { path: "/find", component: Find },
        { path: "/roaming", component: Roaming },
        { path: "/dynamics", component: Dynamics },
        { path: "/user", component: user },
      ],
    },
    { path: "/recordMain", component: RecordMain },
    { path: "/songList", component: SongList },
    { path: "/comment", component: Comment },
  ],
});

router.beforeEach((to) => {
  const regester = useRegesterStore();
  const { token } = storeToRefs(regester);
  const authUrls = ["/user"];
  //去登录
  if (authUrls.includes(to.path)) {
    if (!token.value) {
      return {
        path: "/login",
        query: {
          redirect: to.fullPath,
        },
      };
    }
  }
});

export default router;
