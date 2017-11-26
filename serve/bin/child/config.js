const cheerio = require('cheerio');

module.exports = {
    collect: [{
        name: '广东快乐十分',
        abbreviate: 'gdklsf',
        frequency: 600,
        option: {
            hostname: 'kjh.cailele.com',
            port: 80,
            route: '/kj_klsf.shtml?menu=mcl_4',
            method: 'GET',
        },
        parseResult: function (content) {
            let $ = cheerio.load(content);
            let numIndex = $('.cz_name_period').text();
            let time = $('.underthe_box').find('p').find('span').text() + ':00';
            let data = [];

            $('.red_ball').each((i, element) => {
                num = element.children[0].data;
                data[i] = num;
            })

            console.log(data);
            return {
                type: 3,
                issue: numIndex,
                time: time,
                data: data,
            }
        }
    }],
    errorReTime: 10,
    restartTime: 5, 
};