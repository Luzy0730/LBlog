const mysqlPool = require("../../mysql");

module.exports = {
	queryAboutMain
}

async function queryAboutMain() {
	return mysqlPool.query({
		sql: 'SELECT `about_audio`, `about_content` FROM custom'
	})
}
