const { queryAboutMain, queryBannerMain, querySiteInfoMain } = require('../main/custom')

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
  querySiteInfo: (req, res) => {
    querySiteInfoMain().then(data => {
      res.customSend(...data);
    })
  },
}