#!/usr/bin/env node
'use strict';

const path = require('path');
const program = require('commander');

require('dotenv').config({ path: path.join(__dirname, '/./../.env') });

program
  .version('1.0.0')
  .description('Command line tools for Weight-For-It development')
  .command('create', 'Create a new model')
  .parse(process.argv);
