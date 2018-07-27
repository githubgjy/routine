import Vue from 'vue'
import Router from 'vue-router'

/*按需加载*/
const index = r => require.ensure([], () => r(require('@/page/index/index.vue')), 'index')
const login = r => require.ensure([], () => r(require('@/page/login/login.vue')), 'login')
const bibei = r => require.ensure([], () => r(require('@/page/bibei.vue')), 'bibei')
const command = r => require.ensure([], () => r(require('@/page/command.vue')), 'command')
const theme = r => require.ensure([], () => r(require('@/page/theme.vue')), 'theme')
const author = r => require.ensure([], () => r(require('@/page/author.vue')), 'author')
const detail = r => require.ensure([], () => r(require('@/page/poemdetail/detail.vue')), 'detail')
const mine = r => require.ensure([], () => r(require('@/page/mine/mine.vue')), 'mine')
const authordetail = r => require.ensure([], () => r(require('@/page/authordetail/detail.vue')), 'authordetail')
const themedetail = r => require.ensure([], () => r(require('@/page/themedetail/themedetail.vue')), 'themedetail')
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '',
      redirect: '/mine'
    },
    {
      path: '/index',
      name: 'index',
      component: index,
      redirect: '/index/bibei',
      children: [{
        path: 'bibei', //必备
        component: bibei,
      },
        {
          path: 'command', //推荐
          component: command,
        },
        {
          path: 'theme', //主题
          component: theme,
        },
        {
          path: 'author', //作者
          component: author,
        }
      ]
    },
    {
      path: '/detail',//诗的详情
      component: detail
    },
    /*诗人的详情*/
    {
      path: '/authordetail',//诗的详情
      component: authordetail
    },
     /*主题的详情*/
     {
      path: '/themedetail',//主题的详情
      component: themedetail
    },
    // 登录
    {
      path: '/login',
      component: login
    },
    // 我的
    {
      path: '/mine',
      component: mine
    }
  ]
})
