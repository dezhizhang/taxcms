'use strict';
const xml2js = require('xml2js');
const Controller = require('egg').Controller;
class LoginController extends Controller {
    async index() {
        let { code,appid } = this.ctx.query;
        let data = await this.ctx.curl(`https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=84e57fcbc1036f289c964444f58f16e7&js_code=${code}&grant_type=authorization_code`);
        let json =JSON.parse(data.data.toString()); 
        this.ctx.body = {
            code:200,
            msg:'success',
            data:json
        }
    }
    async save() {
        let { openid } = this.ctx.query;
        let data = await this.ctx.model.UserInfo.find({'openid':openid});
        if(data.length > 0) {
            this.ctx.body = {
                code:200,
                msg:'当前用户以存在',
                data:data
            }
        } else {
            let userInfo = new this.ctx.model.UserInfo({openid:openid});
            userInfo.save();
            this.ctx.body = {
                code:200,
                msg:'保存用户成功',
                data:null
            }
        } 
    }
    async pay() {
        let that = this;
        let result = this.ctx.request.body;
        let time = new Date().getTime();
        let nonce_str = await this.service.tools.randomStr();
        let openid = result.openid;
        
      

        let total_fee = Number(1000)*100;
        let appid = 'wx070d1456a4a9c0fb';
        let mch_id = '1558043371';
        let params = {
            appid: appid,
			body: 'JSAPI支付测试',
			mch_id: mch_id,
			nonce_str: nonce_str,
			notify_url: 'http://2477ii0715.qicp.vip:51075/weChatPaymentApi/orderNotify',
            openid: openid,
            detail:'测试',
			out_trade_no: '20150806125346',
			spbill_create_ip: '127.0.0.1',
			total_fee: total_fee,
            trade_type: 'JSAPI',
            sign_type:'MD5'
        }
        let sign = await this.service.tools.createSign(params);
        console.log(sign);

        let url = 'https://api.mch.weixin.qq.com/pay/unifiedorder';
        let formData = `<xml>
        <appid>${appid}</appid>
        <body>JSAPI支付测试</body>
        <mch_id>${mch_id}</mch_id>
        <detail>测试</detail>
        <nonce_str>${nonce_str}</nonce_str>
        <notify_url>http://2477ii0715.qicp.vip:51075/weChatPaymentApi/orderNotify</notify_url>
        <openid>${openid}</openid>
        <out_trade_no>20150806125346</out_trade_no>
        <spbill_create_ip>127.0.0.1</spbill_create_ip>
        <total_fee>1</total_fee>
        <trade_type>JSAPI</trade_type>
        <sign>${sign}</sign>
     </xml>
        `

        let data = await this.ctx.curl(url,{
            method:'POST',
            data:formData
        });
        let json = data.data.toString();

        console.log(json);





        

        this.ctx.body = {
            code:200,
            msg:'success'
        }

        

    }

}

module.exports = LoginController;