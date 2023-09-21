const mysqlPool = require("../../mysql");

module.exports = {
	queryAboutMain,
	queryBannerMain
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