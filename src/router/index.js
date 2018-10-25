import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const home = r => require.ensure([], () => r(require("@/page/home")), "home");
const login = r => require.ensure([], () => r(require("@/page/login")), "login");
const user = r => require.ensure([], () => r(require("@/page/user")), "user");
const classify = r => require.ensure([], () => r(require("@/page/classify/classify")), "classify");
const course = r => require.ensure([], () => r(require("@/page/course/course")), "course");
const video = r => require.ensure([], () => r(require("@/page/video/video")), "video");
const createClassify = r => require.ensure([], () => r(require("@/page/classify/createClassify")), "createClassify");
const createCourse = r => require.ensure([], () => r(require("@/page/course/createCourse")), "createCourse");
const createVideo = r => require.ensure([], () => r(require("@/page/video/createVideo")), "createVideo");
const editCourse = r => require.ensure([], () => r(require("@/page/course/editCourse")), "editCourse");
const videoDetail = r => require.ensure([], () => r(require("@/page/video/videoDetail")), "videoDetail");
const courseDetail = r => require.ensure([], () => r(require("@/page/course/courseDetail")), "courseDetail");
const notice = r => require.ensure([], () => r(require("@/page/notice/notice")), "notice");

export default new Router({
  routes: [
    {
      path: "/",
      redirect: "/login"
    },
    {
      path: '/home',
      name: 'home',
      component: home,
      children: [
        {
          path: 'user',
          component: user,
        },
        {
          path: 'classify',
          component: classify,
        },
        {
          path: 'video',
          component: video,
        },
        {
          path: 'course',
          component: course,
        },
        {
          path: 'classify/createClassify',
          component: createClassify,
        },
        {
          path: 'video/createVideo',
          component: createVideo,
        },
        {
          path: 'course/createCourse',
          component: createCourse,
        },
        {
          name:'videoDetail',          
          path: 'video/detail/:id',
          component: videoDetail,
        },
        {
          name:'courseDetail',
          path: 'course/detail/:id',
          component: courseDetail,
        },
        {
          name:'editCourse',
          path: 'course/editCourse/:id',
          component: editCourse,
        },
        {
          name:'notice',
          path: 'notice',
          component: notice,
        }
      ]

    },
    {
      path: '/login',
      name: 'login',
      component: login
    }
  ]
})
