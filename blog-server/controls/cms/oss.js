const mysqlPool = require("../../mysql");
const OSS = require('ali-oss');

async function getOSSClient() {
  const data = await mysqlPool.query({
    sql: 'SELECT `oss` FROM custom'
  })
  const ossConig = data[0].oss ? JSON.parse(data[0].oss) : {}
  const client = new OSS(ossConig)
  return client
}

module.exports = {
  queryOSSConfig: (req, res) => {
    mysqlPool.query({
      sql: 'SELECT `oss` FROM custom'
    }).then(data => {
      res.customSend(...data);
    })
  },
  updateOSSConfig: (req, res) => {
    const { oss } = req.body
    mysqlPool.query({
      sql: 'UPDATE `custom` SET `oss` = ?',
      params: [oss]
    }).then(data => {
      res.customSend(data);
    })
  },
  queryOSSList: (req, res) => {
    const { prefix, delimiter, maxKeys } = req.query
    getOSSClient().then(async client => {
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
      res.customSend([
        ...prefixes,
        ...objects.filter(item => item.name && item.size)
      ])
    })
  },
  downloadOSSFile: async (req, res) => {
    const { name } = req.query
    getOSSClient().then(async client => {
      const result = await client.get(name);
      res.setHeader('Content-Type', 'application/octet-stream');
      res.send(result.content);
    });
  },
  uploadOSS: (req, res) => {
    const { name } = req.body
    const buffer = req.file?.buffer
    getOSSClient().then(async client => {
      try {
        await client.put(name, buffer, {
          headers: { "x-oss-forbid-overwrite": "true" }
        });
        res.customSend(null);
      } catch (error) {
        res.customSend(null, 409, "上传失败,存在同名文件！");
      }
    })
  },
  deleteOSS: async (req, res) => {
    const { name, prefix } = req.body
    getOSSClient().then(async client => {
      if (prefix) {
        const list = await client.list({
          prefix: prefix,
        });
        list.objects = list.objects || [];
        await Promise.all(list.objects.map((v) => handleDel(v.name)));
      } else {
        await client.delete(name);
      }
      res.customSend(null);

      async function handleDel(name, options) {
        try {
          console.log(name)
          await client.delete(name);
        } catch (error) {
          error.failObjectName = name;
          return error;
        }
      }
    });
  }
}