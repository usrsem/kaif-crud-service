'use strict';

module.exports = class FakeRepository {
  constructor(cache) {
    this._cache = cache;
  }

  create(entity) {
    return new Promise((resolve, reject) => {
      if (this._cache.has(entity.id)) {
        reject(new Error('Record already exists'));
      } else {
        this._cache.set(entity.id, entity);
        resolve();
      }
    });
  }

  read(id) {
    return new Promise((resolve, reject) => {
      if (!this._cache.has(id)) {
        reject(new Error('Record not found'));
      } else {
        resolve(this._cache.get(id));
      }
    });
  }

  update(entity) {
    return new Promise((resolve, reject) => {
      if (!this._cache.has(entity.id)) {
        reject(new Error('Record not found'));
      } else {
        this._cache.set(entity.id, entity);
        resolve();
      }
    });
  }

  delete(id) {
    return new Promise((resolve) => {
      if (this._cache.has(id)) this._cache.delete(id);
      resolve();
    });
  }
};
