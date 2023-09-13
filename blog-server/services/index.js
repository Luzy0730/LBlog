const tagService = require("./tag");
const categoryService = require("./category");
const articleService = require("./article");

function serviceMount(app) {
  app.use("/tag", tagService);
  app.use("/category", categoryService);
  app.use("/article", articleService);
}
module.exports = serviceMount;
