const cmsTagService = require("./cms/tag");
const cmsCategoryService = require("./cms/category");
const cmsArticleService = require("./cms/article");
const cmsConfigService = require("./cms/config");
const webArticleService = require("./web/article");

function cmsServiceMount(app) {
  app.use("/tag", cmsTagService);
  app.use("/category", cmsCategoryService);
  app.use("/article", cmsArticleService);
  app.use("/config", cmsConfigService);
}

function webServiceMount(app) {
  app.use("/article", webArticleService);
}

module.exports = {
  cmsServiceMount,
  webServiceMount
};
