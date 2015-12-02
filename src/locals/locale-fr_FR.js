angular.module('weatherApp')
    .config(function ($translateProvider) {
        $translateProvider.translations('fr', {
            'home_title': 'Nom de la ville',
            'home_subtitle': 'Et éventuellement le pays',
            'home_button_action': 'Go !',

            'result_sunrise' : 'Levé',
            'result_sunset' : 'Couché',
            'result_temperature' : 'Température',
            'result_humidity' : 'Humidité',

            'error_title' : 'Oups',
            'error_message_1' : 'Une erreur est survenue,',
            'error_message_2' : 'veuillez vérifier votre saisie et essayer de nouveau.'
        });
    });
