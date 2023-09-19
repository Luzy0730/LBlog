const mysqlPool = require("../../mysql");
const { queryAboutMain } = require('../main/custom')

module.exports = {
	queryAbout: (req, res) => {
		queryAboutMain().then(data => {
			res.customSend(...data);
		})
	},
	updateAbout: (req, res) => {
		const { aboutAudio, aboutContent } = req.body
		mysqlPool.query({
			sql: 'UPDATE `custom` SET `about_audio` = ?, `about_content` = ?',
			params: [aboutAudio, aboutContent]
		}).then(data => {
			res.customSend(data);
		})
	}
}