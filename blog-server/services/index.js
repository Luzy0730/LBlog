const tagService = require("./tag");
const categoryService = require("./category");
function serviceMount(app) {
  app.use("/tag", tagService);
  app.use("/category", categoryService);
}
module.exports = serviceMount;
