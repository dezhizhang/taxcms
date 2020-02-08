'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1532511512428_3477';
  //上传地址
  config.uploadDir = 'app/public/admin/upload';
  // add your config here
  config.middleware = ['auth'];

  config.auth = {
    match:'/admin'
  }
  //配置csrf
  config.security = {
    csrf:{
      enable:false
    }
  }
  //配置session
  config.session={
    key:'SESSION_ID',
    maxAge:864000,
    renew:true,
    httpOnly:true,
    encrypt:true
  }
  //配置模板引擎
  config.view = {
    mapping: {
      '.html': 'ejs',
    },
  };
 //配置数据库连接 
  config.mongoose = {
    client:{
      url:'mongodb://127.0.0.1/tax',
      options:{}
    }
  }
  //配置redis
  config.redis = {
    client: {
    port: 6379, // Redis port
    host: '127.0.0.1', // Redis host
    password: 'auth',
    db: 0,
    },
  }

  config.cluster = {
    listen: {
      path: '',
      port: 8082,
      hostname: '0.0.0.0',
    }
  };

  return config;
};


