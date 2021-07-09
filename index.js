#!/usr/bin/env node
const program = require("commander");
const chalk = require("chalk");
const Clipboardy = require("clipboardy");
const log = console.log;
const createPassword = require("./utils/createPassword");
const savePassword = require("./utils/savePassword");

program
  .version("1.1.0")
  .description(chalk.bold.hsl(298, 70, 36)("Simple Password Generator"));

program.option("-l, --length <number>", "length of password", "8");
program.option("-nn, --no-numbers", "remove numbers");
program.option("-ns, --no-symbols", "remove symbols");
program.option("-s, --save", "save passwords to passwords.txt");
program.option("-n, --name <string>", "name of the password").parse();

const { length, save, numbers, symbols, name } = program.opts();
// Get generated password
const generatedPassword = createPassword(length, numbers, symbols);

//Save to file
if (save) {
  savePassword(name, generatedPassword);
}

//Copy to clipboard
Clipboardy.writeSync(generatedPassword);

// output generated password
log(chalk.blue("Generated Password: ") + chalk.bold(generatedPassword));

log(chalk.yellow("Password copied to clipboard"));
