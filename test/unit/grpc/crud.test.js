'use strict';

const assert = require('assert').strict;
const { describe, it, afterEach } = require('mocha');
const GrpcCrudService = require('../../../application/grpc-crud-service.js');
const FakeRepository = require('../../fakes/repository.js');

const cache = new Map();
const fakeRepository = new FakeRepository(cache);

module.exports = () => describe('CRUD service', () => {
  const service = new GrpcCrudService(fakeRepository);
  const id = 0;
  const call = { request: { id } };
  const callbackWithError = (err) => assert(err === null);

  afterEach(() => cache.clear());

  it('Creates entity', () => {
    service.create(call, () => {});
    assert(cache.has(id));
  });

  it('Fails when creating existing entity', () => {
    service.create(call, () => {});
    service.create(call, callbackWithError);
  });

  it('Reads existing entity', () => {
    cache.set(id, call.request);
    service.read(call, () => {});
  });

  it('Fails when reading not existing entity', () => {
    service.read(call, callbackWithError);
  });

  it('Updating existing entity', () => {
    const newCall = { request: { id, foo: 5 } };
    cache.set(id, call.request);
    service.update(newCall, () => {});
    assert.deepStrictEqual(newCall.request, cache.get(id));
  });

  it('Fails on updating not existing entity', () => {
    service.update(call, callbackWithError);
  });

  it('Deletes existing entity', () => {
    cache.set(id, call.request);
    service.delete(call, () => {});
    assert(!cache.has(id));
  });

  it('Not fails on deleting not existing entity', () => {
    const callback = (err, res) => {
      assert.ifError(err);
    };
    service.delete(call, callback);
  });
});
