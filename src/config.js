angular.module('weatherApp.config', [])

    .constant('config', {
        openWeatherMapAPI : {
            url : 'http://api.openweathermap.org/data/2.5/weather?q=',
            apiKey : 'a9b496a242cadc1c8db441fedf5f10e4',
            units : 'metric'
        }
    });