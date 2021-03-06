const util = require('util');
const axios = require('axios');

const { User } = require('../models/user');
const { generateToken } = require('../../core/util');
const { Auth } = require('../../middlewares/auth');

class WXManager {
  static async codeToToken(code) {
    const url = util.format(
      global.config.wx.loginUrl,
      global.config.wx.appId,
      global.config.wx.appSecret,
      code
    );

    const result = await axios.get(url);
    if (result.status !== 200) {
      throw new global.errors.AuthFailed('failed to get openid');
    }
    const { errcode } = result.data;
    const { errmsg } = result.data;
    if (errcode) {
      throw new global.errors.AuthFailed(`failed to get openid: ${errmsg}`);
    }
    // openid
    // 档案 user uid openid 长
    // openid

    let user = await User.getUserByOpenid(result.data.openid);
    if (!user) {
      user = await User.registerByOpenid(result.data.openid);
    }
    return generateToken(user.id, Auth.USER);
  }
}

module.exports = {
  WXManager,
};
