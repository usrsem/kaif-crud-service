'use strict';

const pg = require('pg');
const config = require('../config');

const pool = new pg.Pool(config.db.postgres);

module.exports = (tableName) => ({
  async query(sql, args) {
    return pool.query(sql, args);
  },

  async read(id, fields = ['*']) {
    const names = fields.join(', ');
    const sql = `SELECT ${names} FROM ${tableName}`;
    if (!id) return pool.query(sql);
    return pool.query(`${sql} WHERE id = $1`, [id]);
  },

  async create(record) {
    const keys = Object.keys(record);
    const nums = new Array(keys.length);
    const data = new Array(keys.length);

    let i = 0;
    for (const key of keys) {
      data[i] = record[key];
      nums[i] = `$${++i}`;
    }

    const fields = '"' + keys.join('", "') + '"';
    const params = nums.join(', ');
    const sql = `INSERT INTO "${tableName}" (${fields}) VALUES (${params})`;
    return pool.query(sql, data);
  },

  async update(id, record) {
    const keys = Object.keys(record);
    const updates = new Array(keys.length);
    const data = new Array(++keys.length);

    let i = 0;
    for (const key in keys) {
      data[i] = record[key];
      updates[i] = `${key} = $${++i}`;
    }

    data.push(id);

    const delta = updates.join(', ');
    const sql = `UPDATE ${tableName} SET ${delta} WHERE id = $${++i}`;

    return pool.query(sql, data);
  },

  async delete(id) {
    const sql = `DELETE FROM ${tableName} WHERE id = $1`;
    return pool.query(sql, [id]);
  },
});

