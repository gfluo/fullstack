module.exports = {
    collect: [{
        name: '广东快乐十分',
        abbreviate: 'gdklsf',
        frequency: 600,
        option: {
            hostname: 'kjh.cailele.com',
            port: 80,
            route: '/kj_klsf.shtml',
            method: 'GET',
        },
        parseResult: function (data) {

        }
    }],
    errorReTime: 10,
    restartTime: 5, 
};