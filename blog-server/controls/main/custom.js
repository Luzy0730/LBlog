const mysqlPool = require("../../mysql");

module.exports = {
	queryAboutMain,
	queryBannerMain,
	querySiteInfoMain
}

async function queryAboutMain() {
	return mysqlPool.query({
		sql: 'SELECT `about_audio`, `about_content` FROM custom'
	})
}

async function queryBannerMain() {
	return mysqlPool.query({
		sql: 'SELECT `banner` FROM custom'
	})
}

async function querySiteInfoMain() {
	return mysqlPool.query({
		sql: 'SELECT `site_info` FROM custom'
	})
}