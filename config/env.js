const path = require('path');

module.exports = {
  env: process.env.NODE_ENV,
  port: process.env.PORT || 3900,
  mongo: {
    uri: "mongodb://127.0.0.1:27017/ecommerce-store",
  },
  logs: process.env.NODE_ENV === 'production' ? 'combined' : 'dev',
  emailConfig: {
    host: process.env.EMAIL_HOST,
    port: 3900,
    username: process.env.EMAIL_USERNAME,
    password: process.env.EMAIL_PASSWORD,
  },
};