'use strict';

// had enabled by egg
// exports.static = true;

//ejs
exports.ejs = {
    enable: true,
    package: 'egg-view-ejs',
};

exports.mongo = {
    enable:true,
    package:'egg-mongo-native'
}
//配置数据库
exports.mongoose = {
    enable:true,
    package:'egg-mongoose'
}
//开启redis
exports.redis = {
    enable: true,
    package: 'egg-redis',
};


