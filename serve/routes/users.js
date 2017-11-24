'use strict';
const router = require('koa-router')();
const database = require('./database/index'),
  db = database.db,
  pool = database.pool;

router.prefix('/users');

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
});

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
});

router.get('/home', async (ctx, next) => {
  try {
    let docs = await db.category.queryAvailable({}, pool);
    ctx.body = docs;
  } catch (e) {
    console.error(e);
    ctx.body = {code: -1};
  }
});

module.exports = router;
