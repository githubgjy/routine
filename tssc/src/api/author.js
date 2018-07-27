import http from './public'
/*进入主题*/
export const theme = (params) => {
  return http.fetchGet('/index/themeJson/jsonThemIndex', params)
}
/*主题详情*/
export const themeDetail = (params) => {
  return http.fetchGet('/index/themeJson/poemThemeQueryJson', params)
}
/*作者*/
export const author = (params) => {
  return http.fetchGet('/index/writer/writerIndexJson', params)
}
// 作者的详情
export const getPoemList = (params) => {
  return http.fetchGet('/index/details/get/writerJson', params)
}
//诗的信息
export const getPoemInfo = (params) => {
  return http.fetchGet('/index/details/get/poem/part', params)
}
/*诗的详情*/
export const poemDetail = (params) => {
  return http.fetchGet('/index/details/get/poemJson', params)
}
/*必背*/
export const biBei = (params) => {
  return http.fetchGet('/index/poem/necessary', params)
}
/*推荐*/
export const expandpart = (params) => {
  return http.fetchGet('/index/poem/expand', params)
}
//登录后的显示信息
export const personInfo = (params) => {
  return http.fetchGet('/index/user/my', params)
}
// 登陆
export const userLogin = (params) => {
  return http.fetchPost('http://192.168.0.3:8083/user/browse/set/browse', params)
}
// 注册
export const register = (params) => {
  return http.fetchPost('/api/register', params)
}
// 用户信息
export const userInfo = (params) => {
  return http.fetchGet('/api/checkLogin', params)
}
//修改学段
export const infoDegree = (params) => {
  return http.fetchPost('/index/user/changePoemRange', params)
}
