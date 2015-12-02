angular.module('weatherApp')
    .factory('weatherAPIFactory', function WeatherAPIService ($http, config, $q) {

        return {
            getWeather : getWeather
        };

        // Private methods

        function _generateUrl(location){
            return config.openWeatherMapAPI.url
                + location
                + '&units=' + config.openWeatherMapAPI.units
                + '&APPID=' + config.openWeatherMapAPI.apiKey;
        }

        function _handleError() {
            return ($q.reject("Unexpected error"));
        }

        function _parseResponse(response){
            var data = response.data;

            if(data.cod === '404'){
                return _handleError();
            }

            var sunset = new Date(data.sys.sunset * 1000);
            var sunrise = new Date(data.sys.sunrise * 1000);

            return {
                key : data.weather[0].main.toLowerCase(),
                description : data.weather[0].description,
                temperature : data.main.temp,
                sunrise : sunrise.getHours()+':'+sunrise.getMinutes(),
                sunset : sunset.getHours()+':'+sunset.getMinutes(),
                humidity : data.main.humidity
            };
        }

        // Public methods

        function getWeather (location) {
            return $http.get(_generateUrl(location))
                .then(_parseResponse, _handleError);
        }
    });