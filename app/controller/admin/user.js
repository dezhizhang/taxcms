'use strict';

const BaseController = require('./base');
class UserController extends BaseController {
    async index() {
       console.log("1");
    }

   
    
}

module.exports = UserController