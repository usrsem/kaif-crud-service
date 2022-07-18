'use strict';

module.exports = {
  client: {
    telegramId: { id: true, type: 'integer' },
    telegramUsername: { type: 'string', optional: true },
    telegramFullname: { type: 'string' },
    createdAt: { type: 'date' },
  },

  event: {
    id: { id: true, type: 'integer' },
    title: { type: 'string' },
    description: { type: 'string' },
    lineup: { type: 'string' },
    mediaPath: { type: 'string' },
    mediaType: { type: 'string' },
    startDate: { type: 'date' },
    postingDate: { type: 'date' },
  },

  story: {
    id: { id: true, type: 'integer' },
    clientId: { type: 'integer' },
    eventId: { type: 'integer' },
    mediaPath: { type: 'string' },
    mediaType: { type: 'string' },
    tags: { type: 'string' },
  },
};
