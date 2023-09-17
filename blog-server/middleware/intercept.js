// 自定义封装的中间件函数
module.exports = middleware;

function middleware(app) {
  app.use(customSend)
  app.use(customLimitSend)
}

// 自定义主体
function customSendMain(res, data, code, msg) {
  const modifiedData = {
    code: code, // 自定义的 code 值
    msg: msg, // 自定义的 msg 值
    data: data, // 原始的数据
  };
  res.send(modifiedData);
}

// 自定义封装的中间件函数
function customSend(req, res, next) {
  // 自定义的响应对象
  res.customSend = function (data, code = 200, msg = "success") {
    customSendMain(res, data, code, msg)
  };

  next();
}

// 自定义分页封装的中间件函数
function customLimitSend(req, res, next) {
  // 自定义的响应对象
  res.customLimitSend = function (data, page, size, code = 200, msg = "success") {
    const modifiedData = {
      list: data,
      page,
      size,
      total: data.length
    }
    customSendMain(res, modifiedData, code = 200, msg = "success");
  };
  next()
}
