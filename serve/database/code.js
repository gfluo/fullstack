let Code = function (format) {
    this.format = format;
};

Code.prototype.insertCode = function(params, pool) {
    return new Promise((resolve, reject) => {
        let sql = 'insert into code values(null, ?, ?, ?, ?)';
        pool.query(this.format(sql, [params.type, params.issue, params.data.join(','), params.time]), (err, doc) => {
            if (err)
                reject(err);
            else 
                console.log(doc);
        });
    });
}

Code.prototype.findById = function(type, pool) {
    return new Promise((resolve, reject) => {
        let sql = `select issue, code, time from code where type=? order by id desc limit 1`;
        pool.query(this.format(sql, [type]), (err, doc) => {
            if (err) 
                reject(err);
            else
                resolve(doc);
        })
    })
}

module.exports = Code;