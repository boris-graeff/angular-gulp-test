angular.module('weatherApp')
    .controller('ResultCtrl', function ResultCtrl($routeParams, weatherInfos) {

        /* Attributes */

        var vm = this;
        vm.location = $routeParams.location;
        vm.weather = weatherInfos;
    });