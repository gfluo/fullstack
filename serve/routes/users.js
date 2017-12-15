'use strict';
const multer = require('koa-multer');
const router = require('koa-router')();
const moment = require('moment');
const database = require('../database/index'),
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
    for (let i=0; i<docs.length; i++) {
      let now = moment();
      let firstTime = 
        moment((now.format('YYYY') + '-' + now.format('MM') + '-' + now.format('DD') + ' ' + docs[i].period_start), 'YYYY-MM-DD HH:mm:ss');
      docs[i]['nextTime'] = firstTime.format('YYYY-MM-DD HH:mm:ss');
      if (3 === docs[i].id) {
        if (parseInt(firstTime.format('X')) - parseInt(now.format('X')) < 0) {
          let diss = 10 - now.format('mm')[1];
          docs[i]['nextTime'] = now.add(diss,'minutes').format('YYYY-MM-DD HH:mm:ss');
        } 
      } else if (1 === docs[i].id) {
        let hour = now.format('HH');
        if (3 > hour || hour > 9) {
          let diss = 10 - now.format('mm')[1];
          docs[i]['nextTime'] = now.add(diss,'minutes').format('YYYY-MM-DD HH:mm:ss');
        }
      } else if (2 === docs[i].id) {
        if (parseInt(firstTime.format('X')) - parseInt(now.format('X')) < 0) {
          let theUnit = now.format('mm')[1];
          let diss = 5 >= theUnit ? 5-theUnit : 10-theUnit;
          docs[i]['nextTime'] = now.add(diss,'minutes').format('YYYY-MM-DD HH:mm:ss');
        }
      }
      delete docs[i].period_start;
    }
    ctx.body = docs;
  } catch (e) {
    console.error(e);
    ctx.body = [];
  }
});

router.get('/lasted', async (ctx, next) => {
  try {
    let { type } = ctx.query;
    if (!type) return ctx.body = {};
    let lasted = await db.code.findById(parseInt(type), pool);
    if (lasted) {
      lasted.code = lasted.code.split(',');
    }
    ctx.body = {
      status: lasted ? 0 : -1,
      data: lasted,
    };
  } catch (e) {
    console.error(e);
    ctx.body = {
      status: -1,
    };
  }
})

var storage = multer.diskStorage({
  //文件保存路径
  destination: function (req, file, cb) {
    cb(null, 'serve/public/uploads/')
  },
  //修改文件名称
  filename: function (req, file, cb) {
    var fileFormat = (file.originalname).split(".");
    cb(null, Date.now() + "." + fileFormat[fileFormat.length - 1]);
  }
})
//加载配置
var upload = multer({ storage: storage });
//路由
router.post('/uploadFile', upload.single('file'), async (ctx, next) => {
  ctx.body = {
    location:`http://42.51.44.131:3000/uploads/${ ctx.req.file.filename }`///返回文件名
  }
})

module.exports = router;
