'use strict';
const url = require('url');
module.exports = (opt,app) => {
    return async function auth(ctx,next) {
        //配置安全验证
        ctx.state.csrf = ctx.csrf;
        //上一页地址
        ctx.state.prevPage = ctx.request.headers['referer'];
        //获取url
        const pathname =url.parse(ctx.request.url).pathname ;
        if(ctx.session.userInfo) {
            ctx.state.userInfo = ctx.session.userInfo;
            let hasAuth = await ctx.service.admin.checkAuth();
            if(hasAuth) {
                //获取权限列表
                let result = await ctx.service.admin.getAuthList(ctx.session.userInfo.role_id);
                ctx.state.asideList = result;
                await next();
            } else {
                ctx.body = '您没有权限访问当前地址';
            }
        } else {
            if(pathname == '/admin/login' || pathname == '/admin/doLogin' || pathname == '/admin/verify') {
                await next();
            } else {
                ctx.redirect('/admin/login');
            }
        }
    }
}
