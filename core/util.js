const jwt = require('jsonwebtoken');

const findMembers = function (instance, { prefix, specifiedType, filter }) {
  // 递归函数
  // eslint-disable-next-line no-shadow
  function find(instance) {
    // 基线条件（跳出递归）
    // eslint-disable-next-line no-proto
    if (instance.__proto__ === null) return [];

    let names = Reflect.ownKeys(instance);
    names = names.filter((name) => {
      // 过滤掉不满足条件的属性或方法名
      return shouldKeep(name);
    });

    // eslint-disable-next-line no-proto
    return [...names, ...find(instance.__proto__)];
  }

  // eslint-disable-next-line consistent-return
  function shouldKeep(value) {
    if (filter) {
      if (filter(value)) {
        return true;
      }
    }
    if (prefix) if (value.startsWith(prefix)) return true;
    if (specifiedType)
      if (instance[value] instanceof specifiedType) return true;
  }

  return find(instance);
};

const generateToken = function (uid, scope) {
  const { secretKey } = global.config.security;
  const { expiresIn } = global.config.security;
  const token = jwt.sign(
    {
      uid,
      scope,
    },
    secretKey,
    {
      expiresIn,
    }
  );
  return token;
};

module.exports = {
  findMembers,
  generateToken,
};

// const generateToken = function (uid, scope) {
//     const secretKey = global.config.security.secretKey
//     const expiresIn = global.config.security.expiresIn
//     const token = jwt.sign({
//         uid,
//         scope
//     }, secretKey, {
//         expiresIn: expiresIn
//     })
//     return token
// }
