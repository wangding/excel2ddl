const fs = require('fs');
const genDDL = require('./ddl');
const table2json = require('./json');

const commands = {
  ddl(data) {
    fs.writeFileSync(`./${data.dbName}.sql`, genDDL(data));
  },

  json(data) {
    data.tables.forEach(table2json);
  },
  api() {},
  fe() {},
};

module.exports = commands;
