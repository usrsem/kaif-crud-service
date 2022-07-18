'use strict';

module.exports = class DefaultMap extends Map {
  constructor(defaultFunction, entries) {
    if (!defaultFunction && !entries) throw new Error(
      'Default function should be passed');
    super(entries);
    this._default = defaultFunction;
  }

  get(key) {
    if (!this.has(key)) this.set(key, this._default());
    return super.get(key);
  }
};
