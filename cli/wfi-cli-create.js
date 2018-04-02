#!usr/bin/env node
'use strict';

const program = require('commander');
const faker = require('faker');

const db = require('../src/lib/db');
const logger = require('../src/lib/logger');

program
  .version('1.0.0')
  .description('Create models within the connected database');

program
  .command('user <name>')
  .description('Creates a new user with email and password')
  .option('-e, --email [email]', 'Manually specified email')
  .option('-p, --password [password]', 'Manually specified password')
  .action((name, options) => {
    db.connect()
      .then((conn) => {
        const params = {
          name,
          email: options.email || faker.internet.email(),
          password: options.password || faker.internet.password(),
        };

        db.UserModel
          .create(params)
          .then((user) => {
            logger.info(`User with id ${user._id} created successfully: `, params);
          })
          .catch((error) => {
            logger.error(`Error when creating user: ${error}`);
          })
          .finally(() => {
            conn.disconnect();
          });
      })
      .catch((err) => {
        logger.error('Problem while creating user: ', err.message);
      });
  });

program.parse(process.argv);
