const mysqlPool = require("../../mysql");

module.exports = {
    queryAbout: (req, res) => {
        mysqlPool.query({
            sql: 'SELECT `about_audio`, `about_content` FROM custom'
        }).then(data => {
            res.customSend(...data);
        })
    },
    updateAbout: (req, res) => {
        const { aboutAudio,aboutContent} = req.body
        mysqlPool.query({
            sql: 'UPDATE `custom` SET `about_audio` = ?, `about_content` = ?',
            params: [aboutAudio,aboutContent]
        }).then(data => {
            res.customSend(data);
        })
    }
}