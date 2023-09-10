const express = require("express");
const app = express();
const port = 3000;
const serviceMount = require("./services");

app.use(express.static("public"));

// 配置解析post参数
app.use(express.urlencoded({ extended: false }));

serviceMount(app);

app.use((req, res) => {
  res.status(404).send("访问资源不存在");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
