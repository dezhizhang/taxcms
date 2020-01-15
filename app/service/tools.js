'use strict';
const md5 = require('md5');
const path = require('path');
const Jimp = require('jimp');
const Service = require('egg').Service;
const svgCaptcha = require('svg-captcha');
const sd = require('silly-datetime');
const nodemailer = require('nodemailer');
const mkdirp = require('mz-modules/mkdirp');

const transporter = nodemailer.createTransport({
    service: 'qq',
    secureConnection: true,
    port: 465,
    auth: {
      user: '1018158888@qq.com', // 账号
      pass: 'jmdclhovjarrbfea'
  
    },
  });

class ToolsService extends Service {
    //生成验证码
    async captcha(params) {
        let captcha = svgCaptcha.create({
            size:params&&params.size || 4,
            fontSize:params&&params.fontSize || 50,
            width:params&&params.width || 120,
            height:params&&params.height || 30,
            background:params&&params.background || '#f60'
        });
        this.ctx.session.code = captcha.text;
        return captcha;
    }
    //生成加密码
    async md5(str) {
        return md5(str);
    }
    //生成时间
    async getTime() {
        let t = new Date();
        return t.getTime();

    }
    //生成上传文件
    async getUploadFile(filename) {
        let day = sd.format(new Date(),'YYYY-MM-DD');
        let dir = path.join(this.config.uploadDir,day);
        await mkdirp(dir);
        let d = await this.getTime();
        let uploadDir = path.join(dir,d+path.extname(filename));
        return {
            uploadDir:uploadDir,
            saveDir:uploadDir.slice(3).replace(/\\/g,'/')
        }
    }
    //生成缩略图
    async jimpImg(target,width,height){
        //上传图片成功以后生成缩略图
        Jimp.read(target, (err, lenna) => {
            if (err) throw err;  		
            lenna.resize(width, height) // resize
                .quality(90) // set JPEG quality                  
                .write(target+'_200x200'+path.extname(target)); // save
         });
    }
    async sendEmail(email,subject,text,html) {
        const mailOptions = {
            from:email,
            to:'2669412663@qq.com,1076106474qq.com,799859431@qq.com,1541609448@qq.com',
            subject,
            text,
            html
        }
        try {
            await transporter.sendMail(mailOptions);
            return true;
          } catch (err) {
            return false;
        }
    }
    //生成随机字符串
    async randomStr() {
        let str = '';
        let arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
        for(let i=1;i<=32;i++){
            let random = Math.floor(Math.random()*arr.length);
            str += arr[random];
        }
    
        return str;
    }
    //生成签名算法
    async createSign(obj) {
        let stringA = 'appid='+obj.appid+'&body='+obj.body+'&mch_id='+obj.mch_id+'&nonce_str='+obj.nonce_str+'&notify_url='+obj.notify_url+'&openid='+obj.openid+'&out_trade_no='+obj.out_trade_no+'&spbill_create_ip='+obj.spbill_create_ip+'&total_fee='+obj.total_fee+'&trade_type='+obj.trade_type+'sign_type='+obj.sign_type;
        console.log(stringA);
	    let stringSignTemp = stringA+'&key=208DBD224FCB5ECCC87D64DD837EA823';
        stringSignTemp = md5(stringSignTemp);
        let signValue = stringSignTemp.toUpperCase();
	    return signValue
    }
    
}

module.exports = ToolsService;
