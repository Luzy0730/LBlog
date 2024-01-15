const OssService = require('../service/oss.service');
class OssControl {
  async getOssFileList(req, res) {
    const { prefix, delimiter, maxKeys } = req.query
    try {
      const client = await OssService.getOssClient()
      const result = await client.list({
        prefix: prefix, delimiter, 'max-keys': maxKeys
      });
      const prefixes = result.prefixes?.map(dir => ({
        dir: true,
        name: dir.replace(new RegExp(`^${prefix}`), ''),
      })) || []
      const objects = result.objects?.map(object => ({
        dir: false,
        name: object.name.replace(new RegExp(`^${prefix}`), ''),
        size: object.size,
        url: object.url,
        timeModified: new Date(object.lastModified).getTime()
      })) || []
      req.app.locals.handleData(res, [
        ...prefixes,
        ...objects.filter(item => item.name && item.size)
      ]);
    } catch (error) {
      req.app.locals.handleError(res, error);
    }
  }

  async downloadOssFile(req, res) {
    const { name } = req.query
    try {
      const client = await OssService.getOssClient()
      const result = await client.get(name);
      res.setHeader('Content-Type', 'application/octet-stream');
      res.send(result.content);
    } catch (error) {
      req.app.locals.handleError(res, error);
    }
  }

  async uploadOssFile(req, res) {
    const { name } = req.body
    const buffer = req.file?.buffer
    try {
      const client = await OssService.getOssClient()
      const result = await client.put(name, buffer, {
        headers: { "x-oss-forbid-overwrite": "true" }
      });
      req.app.locals.handleData(res, result.url)
    } catch (error) {
      console.log(error)
      req.app.locals.handleError(res, error);
    }
  }

  async deleteOssFile(req, res) {
    const { name, prefix } = req.body
    try {
      const client = await OssService.getOssClient()
      if (prefix) {
        const list = await client.list({
          prefix: prefix,
        });
        list.objects = list.objects || [];
        await Promise.all(list.objects.map((v) => handleDel(v.name)));
      } else {
        await client.delete(name);
      }
      req.app.locals.handleData(res, null)

      async function handleDel(name, options) {
        try {
          console.log(name)
          await client.delete(name);
        } catch (error) {
          error.failObjectName = name;
          return error;
        }
      }
    } catch (error) {
      req.app.locals.handleError(res, error);
    }
  }
}

module.exports = new OssControl();