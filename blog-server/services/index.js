const tagService = require("./tag");
const categoryService = require("./category");
const articleService = require("./article");
const configService = require("./config");

function serviceMount(app) {
  app.use("/tag", tagService);
  app.use("/category", categoryService);
  app.use("/article", articleService);
  app.use("/config", configService);
}
module.exports = serviceMount;
