const OSS = require('ali-oss');
const CustomService = require('../service/custom.service');

class OssService {
  async getOssClient() {
    const ret = await CustomService.getCustomInfo(['oss']);
    const ossConig = ret.oss ? JSON.parse(ret.oss) : {}
    const client = new OSS(ossConig)
    return client
  }
}

module.exports = new OssService();