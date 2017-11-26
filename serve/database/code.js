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

module.exports = Code;