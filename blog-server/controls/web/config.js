const { queryAboutMain, queryBannerMain, querySiteInfoMain, queryIntroductionMain } = require('../main/config')

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
  queryIntroduction: (req, res) => {
    queryIntroductionMain().then(data => {
      res.customSend(...data);
    })
  },
}