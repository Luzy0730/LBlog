module.exports = (err, res) => {
  let status = 500;
  switch (err.code) {
    case '10000':
      status = 400;
      break;
    case '10001':
      status = 401;
      break;
    case '10003':
      status = 403;
      break;
    case '10009':
      status = 409;
      break;
    default:
      status = 500;
  }
  res.status(status);
  res.send(err);
};
