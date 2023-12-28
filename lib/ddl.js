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

const value = sample => (field) => field.Type.includes('char')
  ? `"${field[sample]}"` : field[sample];

// input: table
// output: SQL DML insert statements
const dmlInsert = table => '' +
  `insert into ${table.tableName} values (` +
  table.fields.map(value('Sample1')).join(', ').trim() +
  '), (' +
  table.fields.map(value('Sample2')).join(', ').trim() + ');'

// input: metaData
// output: SQL DDL statements
const genDDL = metaData => '' +
  ddlCreateDB(metaData.dbName) +
  metaData.tables.map(ddlCreateTB).join('\n') + '\n' +
  metaData.tables.map(dmlInsert).join('\n');

module.exports = genDDL;
