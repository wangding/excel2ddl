const path = require('path'),
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

module.exports = {
  metaData,
};
