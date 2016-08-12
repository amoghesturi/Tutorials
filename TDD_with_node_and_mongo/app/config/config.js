var config = {
  port: process.env.port || 8000,
  db: 'mongodb://localhost/todoapi',
  test_port: 8001,
  test_db: 'mongodb://localhost/todoapi_test'
}

module.exports = config;
