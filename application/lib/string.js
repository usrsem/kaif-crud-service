'use strict';

const capitalize = (s) => {
  if (typeof s !== 'string') return Error(`${s} is not a string`);
  return s.charAt(0).toUpperCase() + s.slice(1);
};

module.exports = {
  capitalize
};
