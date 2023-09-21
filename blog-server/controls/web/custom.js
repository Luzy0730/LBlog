const { queryAboutMain, queryBannerMain } = require('../main/custom')

module.exports = {
  queryAbout: (req, res) => {
    queryAboutMain().then(data => {
      res.customSend(...data);
    })
  },
  queryBanner: (req, res) => {
    queryBannerMain().then(data => {
      res.customSend(...data);
    })
  },
}