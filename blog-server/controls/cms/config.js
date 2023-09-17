const mysqlPool = require("../../mysql");

module.exports = {
    queryAbout: (req, res) => {
        mysqlPool.query({
            sql: 'SELECT `about_audio`, `about_content` FROM custom'
        }).then(data => {
            res.customSend(...data);
        })
    }
}