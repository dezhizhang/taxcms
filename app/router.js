'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  
  router.get('/admin/login',controller.admin.login.index);
  router.get('/admin/loginOut',controller.admin.login.loginOut);
  router.get('/admin/verify',controller.admin.base.verify);
  router.post('/admin/doLogin',controller.admin.login.doLogin);
  router.get('/admin/changeStatus',controller.admin.base.changeStatus);
  //改变数量
  router.get('/admin/editNumber',controller.admin.base.editNumber);

  //管理员
  router.get('/admin/manager',controller.admin.manager.index);
  router.get('/admin/manager/add',controller.admin.manager.add);
  router.post('/admin/manager/doAdd',controller.admin.manager.doAdd);
  router.get('/admin/manager/edit',controller.admin.manager.edit);
  router.post('/admin/manager/doEdit',controller.admin.manager.doEdit);
  router.get('/admin/manager/delete',controller.admin.base.delete);

  //角色
  router.get('/admin/role',controller.admin.role.index);
  router.get('/admin/role/add',controller.admin.role.add);
  router.post('/admin/role/doAdd',controller.admin.role.doAdd);
  router.get('/admin/role/edit',controller.admin.role.edit);
  router.post('/admin/role/doEdit',controller.admin.role.doEdit);
  router.get('/admin/role/delete',controller.admin.base.delete);
  router.get('/admin/role/auth',controller.admin.role.auth);
  router.post('/admin/role/doAuth',controller.admin.role.doAuth);

  //权限
  router.get('/admin/access',controller.admin.access.index);
  router.get('/admin/access/add',controller.admin.access.add);
  router.post('/admin/access/doAdd',controller.admin.access.doAdd);
  router.get('/admin/access/edit',controller.admin.access.edit);
  router.post('/admin/access/doEdit',controller.admin.access.doEdit);
  router.get('/admin/access/delete',controller.admin.base.delete);

  //轮播图
  router.get('/admin/focus',controller.admin.focus.index);
  router.get('/admin/focus/add',controller.admin.focus.add);
  router.post('/admin/focus/doAdd',controller.admin.focus.doAdd);
  router.get('/admin/focus/edit',controller.admin.focus.edit);
  router.get('/admin/focus/delete',controller.admin.base.delete);
  router.post('/admin/focus/doEdit',controller.admin.focus.doEdit);

  //媒体
  router.get("/admin/media",controller.admin.media.index);
  router.get("/admin/media/add",controller.admin.media.add);
  router.post("/admin/media/doAdd",controller.admin.media.doAdd);
  router.get("/admin/media/edit",controller.admin.media.edit);
  router.post("/admin/media/doEdit",controller.admin.media.doEdit);
  router.get("/admin/media/delete",controller.admin.base.delete);

  //广告管理
  router.get("/admin/advert",controller.admin.advert.index);
  router.get("/admin/advert/add",controller.admin.advert.add);
  router.post("/admin/advert/doAdd",controller.admin.advert.doAdd);
  router.get("/admin/advert/delete",controller.admin.base.delete);
  router.get("/admin/advert/edit",controller.admin.advert.edit);
  router.post("/admin/advert/doEdit",controller.admin.advert.doEdit);

  //用户管理
  router.get("/admin/user",controller.admin.user.index);
  //公司管理
  router.get("/admin/company",controller.admin.company.index);
  router.get("/admin/company/add",controller.admin.company.add);
  router.post("/admin/company/doAdd",controller.admin.company.doAdd);
  router.get("/admin/company/delete",controller.admin.base.delete);
  router.get("/admin/company/edit",controller.admin.company.edit);
  router.post("/admin/company/doEdit",controller.admin.company.doEdit);

  //小程序接口
  //轮播图
  router.get('/api/v1/focus',controller.api.focus.index);
  //媒体
  router.get("/api/v1/media/list",controller.api.media.list);
  //媒体详情
  router.get("/api/v1/media/detail/info",controller.api.media.detail);
  //广告图
  router.get('/api/v1/advert/info',controller.api.advert.index);
  //验证码
  router.get("/api/v1/user/code",controller.api.user.code);
  //用户注册
  router.post("/api/v1/user/register",controller.api.user.add);
  //用户登录
  router.post("/api/v1/user/login",controller.api.user.login);
  //公司列表
  router.get("/api/v1/company/list",controller.api.company.index);
  //公司详情
  router.get("/api/v1/company/detail",controller.api.company.detail);
  
  //前台
  //首页
  router.get("/",controller.default.home.index);
  router.get("/index",controller.default.home.index);
  //工商
  router.get("/work",controller.default.work.index);
  //代理记帐
  router.get("/account",controller.default.account.index);
  //商标版权
  router.get("/mark",controller.default.mark.index);  
  //专利
  router.get("/patent",controller.default.patent.index);

};


