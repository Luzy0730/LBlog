// const bcrypt = require('bcryptjs');
function handleData(res, data = null, code = 200, message = 'success') {
  const response = {
    code,
    message,
    data,
  };
  res.status(code)
  res.send(response);
}

function handleError(res, error) {
  const sqlError = error.original?.sqlMessage
  const normalError = error.errors ? error.errors[0]?.message : null
  const msg = error.msg || normalError || sqlError || '服务出错';
  handleData(res, null, 500, msg);
}

module.exports = (app) => {
  app.locals['handleData'] = handleData;
  app.locals['handleError'] = handleError
};
