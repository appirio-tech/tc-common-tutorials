/*
 * Copyright (C) 2016 TopCoder Inc., All Rights Reserved.
 */

/**
 * The configuration file.
 * All settings should be configured with env variables
 */
const assert = require('assert');

const config = {
  PORT: process.env.PORT || 8080,
  UPLOAD_PATH: process.env.UPLOAD_PATH || '/tmp',
  BASE_URL: process.env.BASE_URL || 'http://localhost:8080'
};

assert.ok(config.PORT, 'PORT required');
assert.ok(config.UPLOAD_PATH, 'UPLOAD_PATH required');
assert.ok(config.BASE_URL, 'BASE_URL required');

module.exports = config;
