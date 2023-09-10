const articleService = require("./article");
function serviceMount(app) {
  app.use("/article", articleService);
}
module.exports = serviceMount;
