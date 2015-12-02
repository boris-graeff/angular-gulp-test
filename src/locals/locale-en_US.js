angular.module('weatherApp')
    .config(function ($translateProvider) {
        $translateProvider.translations('en', {
            'home_title': 'City name',
            'home_subtitle': 'And eventually the country',
            'home_button_action': 'Go !',

            'result_sunrise' : 'Sunrise',
            'result_sunset' : 'Sunset',
            'result_temperature' : 'Temperature',
            'result_humidity' : 'Humidity',

            'error_title' : 'Oups',
            'error_message_1' : 'An error has occured,',
            'error_message_2' : 'please check your input and try again.'
        });
    });
