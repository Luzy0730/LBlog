const mysqlPool = require("../../mysql");
const { queryAboutMain, queryBannerMain, querySiteInfoMain, queryIntroductionMain } = require('../main/config')

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
	},
	queryBanner: (req, res) => {
		queryBannerMain().then(data => {
			res.customSend(...data);
		})
	},
	updateBanner: (req, res) => {
		const { banner } = req.body
		mysqlPool.query({
			sql: 'UPDATE `custom` SET `banner` = ?',
			params: [banner]
		}).then(data => {
			res.customSend(data);
		})
	},
	querySiteInfo: (req, res) => {
		querySiteInfoMain().then(data => {
			res.customSend(...data);
		})
	},
	updateSiteInfo: (req, res) => {
		const { siteInfo } = req.body
		mysqlPool.query({
			sql: 'UPDATE `custom` SET `site_info` = ?',
			params: [siteInfo]
		}).then(data => {
			res.customSend(data);
		})
	},
	queryIntroduction: (req, res) => {
		queryIntroductionMain().then(data => {
			res.customSend(...data);
		})
	},
	updateIntroduction: (req, res) => {
		const { introduction } = req.body
		mysqlPool.query({
			sql: 'UPDATE `custom` SET `introduction` = ?',
			params: [introduction]
		}).then(data => {
			res.customSend(data);
		})
	}
}

