const CustomService = require('../service/custom.service');

class CustomControl {
  // 获取关于
  async getCustomAbout(req, res) {
    try {
      const ret = await CustomService.getCustomInfo([
        'about_audio',
        'about_content',
      ]);
      req.app.locals.handleData(res, ret);
    } catch (error) {
      req.app.locals.handleError(res, error);
    }
  }

  // 更新关于
  async updateCustomAbout(req, res) {
    const { aboutAudio, aboutContent } = req.body;
    try {
      const ret = await CustomService.updateCustomInfo({
        aboutAudio,
        aboutContent,
      });
      req.app.locals.handleData(res, ret);
    } catch (error) {
      req.app.locals.handleError(res, error);
    }
  }

  // 获取轮播
  async getCustomBanner(req, res) {
    try {
      const ret = await CustomService.getCustomInfo(['banner']);
      req.app.locals.handleData(res, ret);
    } catch (error) {
      req.app.locals.handleError(res, error);
    }
  }

  // 更新轮播
  async updateCustomBanner(req, res) {
    const { banner } = req.body;
    try {
      const ret = await CustomService.updateCustomInfo({ banner });
      req.app.locals.handleData(res, ret);
    } catch (error) {
      req.app.locals.handleError(res, error);
    }
  }

  // 获取站点信息
  async getCustomSite(req, res) {
    try {
      const ret = await CustomService.getCustomInfo(['siteInfo']);
      req.app.locals.handleData(res, ret);
    } catch (error) {
      req.app.locals.handleError(res, error);
    }
  }

  // 更新站点信息
  async updateCustomSite(req, res) {
    const { siteInfo } = req.body;
    try {
      const ret = await CustomService.updateCustomInfo({ siteInfo });
      req.app.locals.handleData(res, ret);
    } catch (error) {
      req.app.locals.handleError(res, error);
    }
  }

  // 获取个人介绍
  async getCustomIntroduction(req, res) {
    try {
      const ret = await CustomService.getCustomInfo(['introduction']);
      req.app.locals.handleData(res, ret);
    } catch (error) {
      req.app.locals.handleError(res, error);
    }
  }

  // 更新个人介绍
  async updateCustomIntroduction(req, res) {
    const { introduction } = req.body;
    try {
      const ret = await CustomService.updateCustomInfo({ introduction });
      req.app.locals.handleData(res, ret);
    } catch (error) {
      req.app.locals.handleError(res, error);
    }
  }

  // 获取oss
  async getCustomOSS(req, res) {
    try {
      const ret = await CustomService.getCustomInfo(['oss']);
      req.app.locals.handleData(res, ret);
    } catch (error) {
      req.app.locals.handleError(res, error);
    }
  }

  // 更新oss
  async updateCustomOSS(req, res) {
    const { oss } = req.body;
    try {
      const ret = await CustomService.updateCustomInfo({ oss });
      req.app.locals.handleData(res, ret);
    } catch (error) {
      req.app.locals.handleError(res, error);
    }
  }
}

module.exports = new CustomControl();
