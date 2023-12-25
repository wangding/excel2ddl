#!/usr/bin/env node

const log  = console.log,
      path = require('path'),
      fs   = require('fs'),
      xls  = require('xlsx');

// input:  excel file with xlsx extension
// output: metaData
function metaData(file) {
  const workbook = xls.readFile(file);
  const arr2obj = ([tableName, sheet]) => ({
    tableName,
    fields: xls.utils.sheet_to_json(sheet)
  });
  return {
    dbName: path.basename(file, '.xlsx'),
    tables: Object.entries(workbook.Sheets).map(arr2obj),
  };
}

const ddlCreateDB = dbName => '' +
  `drop database if exists ${dbName};\n` +
  `create database ${dbName} default character set utf8mb4;\n` +
  `\nuse ${dbName};\n\n`;

function columnDefinition(field) {
  const primaryKey = () => (field.Key === 'PK') ? 'primary key' : '';
  const autoIncrement = () => (field.Field.includes('id') && field.Key === 'PK') ? 'auto_increment ' : '';
  function defaultValue(arg) {
    if(typeof arg === 'undefined') return '';
    if(arg.toLowerCase() === 'null') return `default ${arg}`;
    if(typeof Number(arg) === 'number' && !isNaN(Number(arg))) return `default ${arg}`;

    return `default '${arg}'`;
  }

  return '  ' +
    (`${field.Field} ` +
    `${field.Type} ` +
    `${field.Null == 'No' ? 'not null ': ''}` +
    defaultValue(field.Default) +
    autoIncrement() +
    primaryKey()).trim();
}

const ddlCreateTB = table => '' +
  `drop table if exists ${table.tableName};\n` +
  `create table ${table.tableName} (\n` +
  table.fields.map(columnDefinition).join(',\n') +
  `\n) engine=innodb default charset=utf8mb4;\n`;

// input: metaData
// output: SQL DDL statements
const genDDL = metaData => '' +
  ddlCreateDB(metaData.dbName) +
  metaData.tables.map(ddlCreateTB).join('\n');

function main() {
  const argc = process.argv.length,
        file = process.argv[2];

  if(argc !== 3) {
    log('Usage: cmd database-name.xls');
    return;
  }

  const data = metaData(file);
  fs.writeFileSync(`./${data.dbName}.sql`, genDDL(data));
}

main();
