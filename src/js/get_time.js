(function() {
'use strict';

var time_app = angular.module('time_app', []);

time_app.controller("GetTimeCtrl", ['$scope', '$rootScope', '$http',
    function($scope, $rootScope, $http) {
    // var self = this;
    var t_city = $rootScope.city_id;
    var city_data = $rootScope.locs;
    var username = 'jliberty';
    $http({
        url: 'http://api.geonames.org/timezoneJSON',
        dataType: 'jsonp', 
        method: "GET",
        params: {
                lat: city_data[t_city].lat,
                lng: city_data[t_city].lon,
                username: username
                }
    }).success(function(data) {
        $rootScope.times.fulltime = data.time;
        // console.log('from time api: ' + $rootScope.times.fulltime)
        var time_arr = data.time.split(' ');
         // $scope.current_time = time_arr[1];
        $rootScope.times.current = time_arr[1];
        var sunrise_arr = data.sunrise.split(' ');
        // $scope.sunrise = sunrise_arr[1];
        $rootScope.times.sunrise = sunrise_arr[1];
        var sunset_arr = data.sunset.split(' ');
        // $scope.sunset = sunset_arr[1];
        $rootScope.times.sunset = sunset_arr[1];
        // console.log('time: ' + $scope.current_time)
   });
}]);
})();