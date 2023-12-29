const fs         = require('fs'),
      genDDL     = require('./ddl'),
      httpAPI    = require('./api'),
      table2json = require('./json');

const commands = {
  ddl(data) {
    fs.writeFileSync(`./${data.dbName}.sql`, genDDL(data));
  },

  json(data) {
    data.tables.forEach(table2json);
  },

  api: httpAPI,
  fe() {},
};

module.exports = commands;
