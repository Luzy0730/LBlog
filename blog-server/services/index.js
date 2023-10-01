const cmsTagService = require("./cms/tag");
const cmsCategoryService = require("./cms/category");
const cmsArticleService = require("./cms/article");
const cmsConfigService = require("./cms/config");
const cmsUserService = require("./cms/user");
const webArticleService = require("./web/article");
const webConfigService = require("./web/config");

function cmsServiceMount(app) {
  app.use("/tag", cmsTagService(app));
  app.use("/category", cmsCategoryService(app));
  app.use("/article", cmsArticleService(app));
  app.use("/config", cmsConfigService(app));
  app.use("/user", cmsUserService(app));
}

function webServiceMount(app) {
  app.use("/article", webArticleService);
  app.use("/config", webConfigService);
}

module.exports = {
  cmsServiceMount,
  webServiceMount
};
