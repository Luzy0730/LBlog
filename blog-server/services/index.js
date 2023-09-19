const cmsTagService = require("./cms/tag");
const cmsCategoryService = require("./cms/category");
const cmsArticleService = require("./cms/article");
const cmsConfigService = require("./cms/config");
const webArticleService = require("./web/article");
const webCustomService = require("./web/custom");

function cmsServiceMount(app) {
  app.use("/tag", cmsTagService);
  app.use("/category", cmsCategoryService);
  app.use("/article", cmsArticleService);
  app.use("/config", cmsConfigService);
}

function webServiceMount(app) {
  app.use("/article", webArticleService);
  app.use("/custom", webCustomService);
}

module.exports = {
  cmsServiceMount,
  webServiceMount
};
