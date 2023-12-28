const fs = require('fs');
const { genDDL }   = require('./ddl');

const commands = {
  ddl(data) {
    fs.writeFileSync(`./${data.dbName}.sql`, genDDL(data));
  },

  json() {},
  api() {},
  fe() {},
};

module.exports = commands;
