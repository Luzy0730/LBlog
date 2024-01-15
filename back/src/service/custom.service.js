const CustomModel = require('../model/custom.model');

class CustomService {
  async getCustomInfo(attributes = []) {
    const ret = await CustomModel.findOne({ attributes }, { where: { id: 1 } });
    return ret ? ret.dataValues : null;
  }

  async updateCustomInfo({
    aboutAudio,
    aboutContent,
    banner,
    siteInfo,
    introduction,
    oss,
  }) {
    const fieldOpt = {};
    aboutAudio && Object.assign(fieldOpt, { aboutAudio });
    aboutContent && Object.assign(fieldOpt, { aboutContent });
    banner && Object.assign(fieldOpt, { banner });
    siteInfo && Object.assign(fieldOpt, { siteInfo });
    introduction && Object.assign(fieldOpt, { introduction });
    oss && Object.assign(fieldOpt, { oss });
    console.log(fieldOpt)
    let ret = await CustomModel.update(fieldOpt, { where: { id: 1 } });
    return ret ? ret[0] : null;
  }
}

module.exports = new CustomService();
