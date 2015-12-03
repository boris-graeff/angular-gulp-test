exports.config = {
    allScriptsTimeout: 10000,

    baseUrl: 'http://localhost:3000/',

    specs: [
        'scenarios/**/*.js'
    ],

    multiCapabilities: [{
        browserName: 'firefox'
    }, {
        browserName: 'chrome'
    }]
};