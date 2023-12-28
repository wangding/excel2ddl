function table2json(table) {
  const rows = [{}, {}];
  table.fields.forEach(field => rows[0][field.Field] = field.Sample1);
  table.fields.forEach(field => rows[1][field.Field] = field.Sample2);
  console.log(table.tableName);
  console.log(rows);
  console.log();
}

module.exports = table2json;
