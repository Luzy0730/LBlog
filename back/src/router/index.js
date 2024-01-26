const CustomModel = require('../model/custom.model');

const cmsUser = require('./modules/cms.user.router');
const cmsCategory = require('./modules/cms.category.router');
const cmsTag = require('./modules/cms.tag.router');
const cmsCustom = require('./modules/cms.custom.router');
const cmsArticle = require('./modules/cms.article.router');
const cmsOSS = require('./modules/cms.oss.router');
const frontCustom = require('./modules/front.custom.router');
const frontArticle = require('./modules/front.article.router');

const frontRoutesFns = [frontCustom, frontArticle];
const cmsRoutesFns = [cmsCategory, cmsUser, cmsArticle, cmsTag, cmsCustom, cmsOSS];


module.exports = function createRouter(app) {

  frontRoutesFns.forEach(({ router, prefix = '', v = '1' }) =>
    app.use(`/api/v${v}${prefix}`, router)
  );
  cmsRoutesFns.forEach(({ router, prefix = '', v = '1' }) =>
    app.use(`/cms/v${v}${prefix}`, router)
  );
};
