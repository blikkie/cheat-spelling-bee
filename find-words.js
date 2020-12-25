#!/usr/bin/env node

const argv = require('yargs')
  .usage('Usage: $0 <command> [options]')
  .help('h')
  .alias('h', 'help')
  .example("$0 -q qwertyu", "show all spelling bee combos. The first character is the required letter")
  .alias('q', 'query')
  .nargs('q', 1)
  .describe('q', 'Puzzle query string')
  .demandOption(['q']).argv

const dictionary = require('./dictionary.json')

function run() {
  const query = argv.query;
  if (query.length !== 7) {
    console.log(`Query length should be 7, not ${argv.query.length}`);
  } else {
    let foundKeys = Object.keys(dictionary);

    // The first character in the query need to be in every solution
    foundKeys = foundKeys.filter(key => key.includes(argv.query[0]));

    let exclusionString = '[abcdefghijklmnopqrstuvwxyz]';
    [...query].forEach(letter => {
      exclusionString = exclusionString.replace(letter, '');
    });
    [...exclusionString].forEach(letter => {
      foundKeys = foundKeys.filter(key => !key.includes(letter));
    });

    let result = []
    for (const foundKey of foundKeys) {
      result = result.concat(dictionary[foundKey])
    }
    console.log(result.sort())
  }

}

run()
