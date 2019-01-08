#!/usr/bin/env node
"use strict";

const hardsub = require("./index");
const argv = require("yargs-parser")(process.argv.slice(2));

async function main() {
  try {
    console.log(argv);
    await hardsub(argv._[0], argv._[1], argv);
  } catch (err) {
    process.exit(1);
  }
}
main();
