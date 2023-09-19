/**
 * 
 * @param {number} port  端口号
 * @param {Function} serviceMount  端口服务 
 */
module.exports = function generateApp(port, serviceMount, allowCORS) {
  const express = require("express");
  const app = express();
  const middleware = require("../middleware/intercept");

  // 解决跨域问题
  app.all("*", function (req, res, next) {
    if (allowCORS.includes(req.headers.origin)) {
      // 设置允许跨域的域名,*代表允许任意域名跨域
      res.header("Access-Control-Allow-Origin", req.headers.origin);
      // 允许的header类型
      res.header("Access-Control-Allow-Headers", "Content-Type");
      // 跨域允许的请求方式
      res.header("Access-Control-Allow-Methods", "POST,GET,OPTIONS");
    }
    if (req.method.toLowerCase() == "options")
      res.sendStatus(200); // 让options 尝试请求快速结束
    else next();
  });

  // 静态资源
  app.use(express.static("public"));

  // 配置解析post参数
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json())

  // 自定义的响应对象
  middleware(app)

  serviceMount(app);

  app.use((req, res) => {
    res.sendStatus(404).send("访问资源不存在");
  });

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
}