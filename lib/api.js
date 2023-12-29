const fs = require('fs');
const log = console.log;

function createModels(tables) {
  log(tables);
}

function createRouters(tables) {
}

function createProject(appName) {
  log(appName);
  fs.mkdirSync(appName);
}

function httpAPI(data) {
  const { dbName, tables } = data;
  createProject(dbName);
  createModels(tables);
  createRouters(tables);
}

module.exports = httpAPI;
