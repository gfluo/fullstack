const request = require('request');
const phantom = require('phantom');
const database = require('../../database/index'),
    db = database.db,
    pool = database.pool;

const nolog = function() {};

let main = async function (params, cb) {
    let { option } = params;
    let url = "http://" + option.hostname + option.route;
    
    try {
        const instance = await phantom.create([], { logger: { warn: nolog, debug: nolog, error: nolog } });
	    const page = await instance.createPage();
        await page.on("onResourceRequested", function(requestData) {
            ///console.info('Requesting', requestData.url)
        });
    
        const status = await page.open(url);
        if ('success' === status) {
            const content = await page.property('content'); 
            let codeData =  params.parseResult(content);
            db.code.insertCode(codeData, pool);
        } else  
            cb(e);
    } catch (e) {
        console.log(e);
        cb(e)
    }
};

module.exports = main;