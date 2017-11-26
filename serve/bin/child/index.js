const config = require('./config'),
    collect = config.collect;

const schedule = require('node-schedule');
const handle = require('./handle');
let rule = new schedule.RecurrenceRule();

rule.hour = 10;
rule.minute = 13;

let task = schedule.scheduleJob(rule, function () {
    collect.forEach((element) => {
        handle(element);
    });
})