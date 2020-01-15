'use strict';

const Service = require('egg').Service;
const url = require('url');
class AdminService extends Service {
    //是否有权访问
    async checkAuth() {
        let userInfo = this.ctx.session.userInfo;
        let role_id = userInfo.role_id;
        let accessArr = [];
        let pathname = url.parse(this.ctx.request.url).pathname;
        let ignoreUrl = ['/admin/login','/admin/doLogin','/admin/verify','/admin/loginOut'];
        if(ignoreUrl.indexOf(pathname)!=-1 || userInfo.is_super==1) {
            return true;
        }
        let result = await this.ctx.model.RoleAccess.find({'role_id':role_id});
        result.map(item => {
            let access_id = item.access_id.toString();
            accessArr.push(access_id);
        });
        //获取当前用户访问的地址
        let accessUrlResult = await this.ctx.model.Access.find({'url':pathname});
        if(accessUrlResult.length > 0) {
            let id = accessUrlResult[0]._id.toString()
            if(accessArr.indexOf(id)!=-1) {
                return true;
            }
            return false;
        }
        return false;
    }
    //获取权限列表
    async getAuthList(role_id) {
        let result = await this.ctx.model.Access.aggregate([
            {
                $lookup:{
                    from:'access',
                    localField:'_id',
                    foreignField:'module_id',
                    as:'items'
                }
            },
            {
                $match:{
                    'module_id':'0'
                }
            }
        ]);
        //查询当前角色有那些权限
        let accessResult = await this.ctx.model.RoleAccess.find({'role_id':role_id});
        let roleAccessArr = [];
        accessResult.map(item => {
            roleAccessArr.push(item.access_id.toString());
        });
        for(let i=0;i<result.length;i++) {
            //一维
            let id = result[i]._id.toString();
            if(roleAccessArr.indexOf(id)!=-1) {
                result[i].checked = true;
            }
            for(let j=0;j<result[i].items.length;j++) {
                //二维
                let id = result[i].items[j]._id.toString();
                if(roleAccessArr.indexOf(id)) {
                    result[i].items[j].checked = true;
                }
            }
        }
        return result;
    }

}

module.exports = AdminService;
