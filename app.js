#!/usr/bin/env node

const commands = require('./lib/cmds');
const { metaData } = require('./lib/metadata');

function main() {
  const argc = process.argv.length,
        cmd  = process.argv[2],
        file = process.argv[3];

  if(argc !== 4) {
    console.log('Usage: cmd subcmd database-name.xls');
    return;
  }

  if(!Reflect.has(commands, cmd)) {
    console.log(`${cmd} not support!`);
    return;
  }

  const data = metaData(file);
  commands[cmd](data);
}

main();
