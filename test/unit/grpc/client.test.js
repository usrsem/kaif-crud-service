'use strict';

const assert = require('assert').strict;
const { describe, it } = require('mocha');
const FakeRepository = require('../../fakes/repository.js');
const ClientGrpcService = require('../../../application/services/client.js');

const repository = new FakeRepository(new Map());
const service = new ClientGrpcService(repository);
const id = 0;
const call = { request: { id } };

module.exports = () => describe('Client', () => {
  it('On creating adds createdAt field to entity', () => {
    service.create(call, () => {});
    repository.read(id).then((after) => {
      assert(after.createdAt, '' + after);
      assert(after.createdAt instanceof Date);
    });
  });
});
