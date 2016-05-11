/*
 * Copyright (C) 2016 TopCoder Inc., All Rights Reserved.
 */
/**
 * Contains validation functions
 */
'use strict';

const validator = require('rox').validator;

module.exports = {
  validate
};

/**
 * Define a global function used for validation.
 * @param {Object} input the object to validate
 * @param {Object} definition the definition object. Refer to rox module for more details.
 * @param {String} [prefix] the prefix for error message.
 * @throws {Error} error if validation failed.
 */
function validate(input, definition, prefix) {
  const error = validator.validate(prefix || 'prefix-to-remove', input, definition);
  if (!error) {
    return;
  }
    // remove prefix in error message
  error.message = error.message.replace('prefix-to-remove.', '');
    // if input is invalid then change the name to input
  error.message = error.message.replace('prefix-to-remove', 'input');
  error.status = 400;
  throw error;
}

validator.registerAlias('String?', { type: 'String', required: false, nullable: true });
validator.registerAlias('bool?', { type: 'Bool', required: false, nullable: true });
