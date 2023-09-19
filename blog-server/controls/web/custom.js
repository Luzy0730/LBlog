const { queryAboutMain } = require('../main/custom')

module.exports = {
  queryAbout: (req, res) => {
    queryAboutMain().then(data => {
      res.customSend(...data);
    })
  }
}