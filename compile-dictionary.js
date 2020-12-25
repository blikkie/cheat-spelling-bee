#!/usr/bin/env node

const argv = require('yargs')
  .usage('Usage: $0 <command> [options]')
  .help('h')
  .alias('h', 'help')
  .example("$0 -f foo.txt", "compile dictionary from input file foo.txt")
  .alias('i', 'input')
  .nargs('i', 1)
  .describe('i', 'Input file')
  .demandOption(['i'])
  .argv;

const fs = require('fs');
const readline = require('readline');
const { Stream } = require('stream');

const inStream = fs.createReadStream(argv.input)
const outStream = new Stream();

const rl = readline.createInterface(inStream, outStream);

const isUpperCase = (string) => /^[A-Z]*$/.test(string)

const dictionary = {};
let lineCount = 0;
let capitalizedCount = 0;
let shortCount = 0;
let apostropheCount = 0;
let tooManyUniques = 0;

rl.on('line', function (line) {
  lineCount++;
  if (isUpperCase(line[0])){
    capitalizedCount++
  } else if (line.length < 4){
    shortCount++
  } else if (line.includes('\'')) {
    apostropheCount++
  } else {
    const uniques = new Set(line)
    if (uniques.size > 7) {
      tooManyUniques++
    } else {
      const key = [...uniques].sort().join('')
      if (dictionary[key]) {
        dictionary[key].push(line)
      } else {
        dictionary[key] = [line]
      }
    }
  }
})

rl.on('close', function() {
  console.log(`${lineCount} lines read`);
  console.log(`${capitalizedCount} discarded because of proper names`)
  console.log(`${shortCount} discarded because word was too short`)
  console.log(`${apostropheCount} dicarded because of apostrophes`)
  console.log(`${tooManyUniques} discarded because of too many unique letters`)

  fs.writeFileSync('./dictionary.json', JSON.stringify(dictionary))
})
