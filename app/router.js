'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  // router.get('/admin',controller.admin.main.index);
  // router.get('/admin/welcome',controller.admin.main.welcome);
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

  //广告
  router.get('/admin/advert',controller.admin.advert.index);
  router.get('/admin/advert/add',controller.admin.advert.add);
  router.post('/admin/advert/doAdd',controller.admin.advert.doAdd);
  router.get('/admin/advert/edit',controller.admin.advert.edit);
  router.get('/admin/advert/delete',controller.admin.base.delete);
  router.post('/admin/advert/doEdit',controller.admin.advert.doEdit);

  //商品管理
  router.get('/admin/goodsType',controller.admin.goodsType.index);
  router.get('/admin/goodsType/add',controller.admin.goodsType.add);
  router.post('/admin/goodsType/doAdd',controller.admin.goodsType.doAdd);
  router.get('/admin/goodsType/edit',controller.admin.goodsType.edit);
  router.post('/admin/goodsType/doEdit',controller.admin.goodsType.doEdit);
  router.get('/admin/goodsType/delete',controller.admin.base.delete);

  //商品属性
  router.get('/admin/goodsTypeAttr',controller.admin.goodsTypeAttr.index);
  router.get('/admin/goodsTypeAttr/add',controller.admin.goodsTypeAttr.add);
  router.post('/admin/goodsTypeAttr/doAdd',controller.admin.goodsTypeAttr.doAdd);
  router.get('/admin/goodsTypeAttr/edit',controller.admin.goodsTypeAttr.edit);
  router.post('/admin/goodsTypeAttr/doEdit',controller.admin.goodsTypeAttr.doEdit);
  router.get('/admin/goodsTypeAttr/delete',controller.admin.base.delete)

  //商品分类
  router.get('/admin/goodsCate',controller.admin.goodsCate.index);
  router.get('/admin/goodsCate/add',controller.admin.goodsCate.add);
  router.post('/admin/goodsCate/doAdd',controller.admin.goodsCate.doAdd);
  router.get('/admin/goodsCate/edit',controller.admin.goodsCate.edit);
  router.post('/admin/goodsCate/doEdit',controller.admin.goodsCate.doEdit);
  router.get('/admin/goodsCate/delete',controller.admin.base.delete);

  //商品颜色
  router.get('/admin/goodsColor',controller.admin.goodsColor.index);
  router.get('/admin/goodsColor/add',controller.admin.goodsColor.add);
  router.post('/admin/goodsColor/doAdd',controller.admin.goodsColor.doAdd);
  router.get('/admin/goodsColor/edit',controller.admin.goodsColor.edit);
  router.post('/admin/goodsColor/doEdit',controller.admin.goodsColor.doEdit);
  router.get('/admin/goodsColor/delete',controller.admin.base.delete);

  //商品
  router.get('/admin/goods',controller.admin.goods.index);
  router.get('/admin/goods/add',controller.admin.goods.add);
  router.post('/admin/goods/doAdd',controller.admin.goods.doAdd);
  router.get('/admin/goods/edit',controller.admin.goods.edit);
  router.post('/admin/goods/doEdit',controller.admin.goods.doEdit);
  router.get('/admin/goods/delete',controller.admin.base.delete);
  router.get('/admin/goods/goodsTypeAttr',controller.admin.goods.goodsTypeAttr);
  router.post('/admin/goods/goodsUploadImage',controller.admin.goods.goodsUploadImage); //上传商品图片
  router.post('/admin/goods/goodsUploadPhoto',controller.admin.goods.goodsUploadPhoto);

  //产品
  router.get('/admin/product',controller.admin.product.index);
  router.get('/admin/product/add',controller.admin.product.add);
  router.post('/admin/product/doAdd',controller.admin.product.doAdd);
  router.get('/admin/product/edit',controller.admin.product.edit);
  router.post('/admin/product/doEdit',controller.admin.product.doEdit);
  router.get('/admin/product/delete',controller.admin.base.delete);
  
  //维修改
  router.get('/admin/maintain',controller.admin.maintain.index);
  router.get('/admin/maintain/edit',controller.admin.maintain.edit);
  router.get('/admin/maintain/delete',controller.admin.base.delete);
  router.post('/admin/mantain/doEdit',controller.admin.maintain.doEdit);

  //联系我们
  router.get('/admin/contact',controller.admin.contact.index);
  router.get('/admin/contact/edit',controller.admin.contact.edit);
  router.post('/admin/contact/doEdit',controller.admin.contact.doEdit)

  //主打管理 
  router.get('/admin/main',controller.admin.main.index);
  router.get('/admin/main/add',controller.admin.main.add);
  router.post('/admin/main/doAdd',controller.admin.main.doAdd);
  router.get('/admin/main/edit',controller.admin.main.edit);
  router.post('/admin/main/doEdit',controller.admin.main.doEdit);
  router.get('/admin/main/delete',controller.admin.base.delete);
 

  //详情
  router.get('/admin/detail',controller.admin.detail.index);
  router.get('/admin/detail/add',controller.admin.detail.add);
  router.post('/admin/detail/doAdd',controller.admin.detail.doAdd);
  router.get('/admin/detail/delete',controller.admin.base.delete);
  router.get('/admin/detail/edit',controller.admin.detail.edit);
  router.post('/admin/detail/doEdit',controller.admin.detail.doEdit);
  router.post('/admin/detail/detailUploadImage',controller.admin.detail.detailUploadImage);

  //分类
  router.get('/admin/classify',controller.admin.classify.index);
  router.get('/admin/classify/add',controller.admin.classify.add);
  router.post('/admin/classify/doAdd',controller.admin.classify.doAdd);
  router.get('/admin/classify/edit',controller.admin.classify.edit);
  router.post('/admin/classify/doEdit',controller.admin.classify.doEdit);
  router.get('/admin/classify/delete',controller.admin.base.delete);

  //分类详情
  router.get('/admin/classifyDetail',controller.admin.classifyDetail.index);
  router.get('/admin/classifyDetail/add',controller.admin.classifyDetail.add);
  router.post('/admin/classifyDetail/doAdd',controller.admin.classifyDetail.doAdd);
  router.get('/admin/classifyDetail/edit',controller.admin.classifyDetail.edit);
  router.post('/admin/classifyDetail/doEdit',controller.admin.classifyDetail.doEdit);
  router.get('/admin/classifyDetail/delete',controller.admin.base.delete);




  //前台页面
  // router.get('/',controller.default.index.index);
  //前台验证码
  // router.get('/api/default/verify',controller.default.base.verify);
  // //联系
  // router.get('/contact',controller.default.contact.index);
  // router.post('/contact/doInfo',controller.default.contact.doInfo);

  //前台页面
  router.get("/",controller.default.index.index);
  //前台登录页
  router.get("/login",controller.default.login.index);
  //注册验证验证码
  router.get("/pass/sendCode",controller.default.login.sendCode);
  //注册第一步
  router.get("/register/registerStep1",controller.default.login.registerStep1);
   //注册第二步
  router.get("/register/registerStep2",controller.default.login.registerStep2);
  //前台验证码
  router.get("/api/default/verify",controller.default.base.verify);
  //订单页面
  router.get("/order",controller.default.order.index);




//小程序接口
//轮播图
router.get('/api/focus/info',controller.api.focus.index);
//广告图
router.get('/api/advert/info',controller.api.advert.index);
//维修接口
router.post('/api/maintain/upload',controller.api.maintain.upload);
//热门产品
router.get('/api/product/hot',controller.api.product.hot);
//主打产品
router.get('/api/product/list',controller.api.product.list);
//主打产品分类
router.get('/api/product/main',controller.api.main.index);
//详情列表
router.get('/api/detail/info',controller.api.detail.index);
//获取分类
router.get('/api/category/list',controller.api.classify.index);
//获取分类详情
router.get('/api/categoryDetail/list',controller.api.classifyDetail.index);
//用户登录
router.get('/api/userInfo/login',controller.api.login.index);
//保存用户信息
router.get('/api/userInfo/save',controller.api.login.save);
//上传购物车
router.post('/api/cart/save',controller.api.cart.save);
//获取购物车信息
router.get('/api/userInfo/cartList',controller.api.cart.list);
//更新商品数量
router.get('/api/cart/update',controller.api.cart.update);
//删除购物车 
router.get('/api/cart/delete',controller.api.cart.delete);
//改变购物车状态的方法
router.get('/api/cart/status',controller.api.cart.status);
//调起微信支付
router.post('/api/userInfo/pay',controller.api.login.pay);





   


 




};


