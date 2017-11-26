/**
 * Created by luogf on 2017/11/24.
 */

const mysql = require('mysql');
const databaseConfig = require('../config').database;
let Category = require('./category'),
    category = new Category(mysql.format);
let Code = require('./code'),
    code = new Code(mysql.format);
let pool = mysql.createPool(databaseConfig);

let getConnect = function () {
    return new Promise((resolve, reject) => {
        mysqlPool.getConnection(function (err, conn) {
            if (err)
                reject(err);
            else
                resolve(conn);
        });
    })
};

let Db = function(category) {
    this.category = category;
    this.code = code;
};

module.exports = {
    db: new Db(category),
    pool: pool,
};