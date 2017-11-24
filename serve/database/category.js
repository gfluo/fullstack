let Category = function (format) {
    this.format = format;
};

Category.prototype.queryAvailable = function(params, pool) {
    return new Promise((resolve, reject) => {
        let sql = 'select id from category where status=0';
        pool.query(sql, (err, docs) => {
            if (err) {
                reject(err);
            } else {
                resolve(docs);
            }
        })
    });
} 

module.exports = Category;

