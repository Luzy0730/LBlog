const app = require('./src/app/index.js');

const { APP_PORT } = require('./src/config/config_default');

app.listen(APP_PORT, () => {
  console.log(`start at ${APP_PORT}`);
});
