// 自定义封装的中间件函数
module.exports = {
  customSend,
};
// 自定义封装的中间件函数
function customSend(req, res, next) {
  // 自定义的响应对象
  res.customSend = function (data, code = 200, msg = "success") {
    const modifiedData = {
      code: code, // 自定义的 code 值
      msg: msg, // 自定义的 msg 值
      data: data, // 原始的数据
    };

    res.send(modifiedData);
  };

  next();
}
