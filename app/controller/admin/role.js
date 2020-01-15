'use strict';

const BaseController = require('./base');

class LoginController extends BaseController {
    //显示角色
    async index() {
        let data = await this.ctx.model.Role.find();
        await this.ctx.render('/admin/role/index',{
            list:data
        });
    }
    //增加
    async add() {
        await this.ctx.render('/admin/role/add');
    }
    //增加角色
    async doAdd() {
        let result = this.ctx.request.body;
        let title = result.title;
        let description = result.description;
        let role = new this.ctx.model.Role({title,description});
        await role.save();
        await this.success('/admin/role','增加角色成功');
    }
    //编辑角色
    async edit() {
        let _id = this.ctx.query.id;
        let data = await this.ctx.model.Role.find({'_id':_id});
        await this.ctx.render('/admin/role/edit',{
            list:data[0]
        })
    }
    //更新角色
    async doEdit() {
        let result = this.ctx.request.body;
        let _id = result._id;
        let title = result.title;
        let description = result.description;
        let role = await this.ctx.model.Role.updateOne({'_id':_id},{title,description});
        await this.success('/admin/role','编辑角色成功');
    }
    //授权
    async auth() {
        let role_id = this.ctx.query.id;
        let result = await this.service.admin.getAuthList(role_id)
        await this.ctx.render('/admin/role/auth',{
            list:result,
            role_id
        });
    } 
    //授权提交数据
    async doAuth() {
        let data = this.ctx.request.body;
        let role_id = data.role_id;
        let access_node = data.access_node;
        //删除当前角色下的所有权限
        await this.ctx.model.RoleAccess.deleteMany({'role_id':role_id});
        for(let i=0;i<access_node.length;i++) {
            let roleAccess = new this.ctx.model.RoleAccess({
                role_id,
                access_id:access_node[i]
            });
            await roleAccess.save();
        };
        await this.success(`/admin/role?role_id=${role_id}`,'授权成功');
    }
    
}

module.exports = LoginController;
