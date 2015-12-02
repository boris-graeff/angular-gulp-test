angular.module('weatherApp', [
        'ngRoute',
        'ngSanitize',

        'pascalprecht.translate',

        'weatherApp.templates',
        'weatherApp.config'
    ])

    // ROUTINGS

    .config(function ($routeProvider) {
        $routeProvider

            // --> Index

            .when('/', {
                templateUrl: 'src/components/home/template.html',
                controller: 'HomeCtrl',
                controllerAs: 'home'
            })

            // --> Error

            .when('/error', {
                templateUrl: 'src/components/error/template.html'
            })

            // --> Result

            .when('/result/:location', {
                templateUrl: 'src/components/result/template.html',
                controller: 'ResultCtrl',
                controllerAs: 'result',
                resolve: {
                    weatherInfos: function (weatherAPIFactory, $route, $location) {
                        return weatherAPIFactory.getWeather($route.current.params.location)
                            .then(function (data) {
                                return data;
                            })
                            .catch(function () {
                                $location.path('/error').replace('/error');
                            });
                    }
                }
            })

            // --> Redirect to index

            .otherwise({
                redirectTo: '/'
            });
    })

    // TRANSLATIONS

    .config(function ($translateProvider) {
        $translateProvider.useSanitizeValueStrategy('sanitizeParameters');
        $translateProvider.preferredLanguage('en');
    });