(function() {
'use strict';
var Site = angular.module('Site', ['ngRoute', 'ui.bootstrap', 'ngSanitize', 'weather_app', 'yelp_app', 'astro_app', 'movie_app','faroo_app', 'quote_app', 'time_app', 'mycity-directives', 'events_app', 'map_app', 'places_app', 'twitter_app', 'ngTouch', 'meetup_app', 'rates_app', 'nearby_app']);

Site.controller('ShowHomeController', ['$scope', '$rootScope', '$location', '$http', 'MyService',
  function($scope, $rootScope, $location, $http, MyService) {
  $rootScope.locs = MyService.get_json_data();
  $rootScope.nameLength = 20; // Yelp uses this!
  $rootScope.cur_type = 0; // For attractions
  $rootScope.cur_places = [];
  $rootScope.times = {
    "fulltime": 0,
    "current": 0,
    "sunrise": 0,
    "sunset": 0
  };

  /*
  * New_city is the user selected city from navbar dropdown menu.
  * Default is false, true when city selected from the dropdown.
  */
  var new_city = $location.hash();
  /* Set defaults */
  $rootScope.city = (new_city) ? new_city.replace(/_/g, ' ') : 'Melbourne';
  $rootScope.city_id = (new_city) ? new_city : 'Melbourne';
  $rootScope.state = (new_city) ? $rootScope.locs[new_city].state : '';
  $rootScope.country = (new_city) ? $rootScope.locs[new_city].country : 'au';
  $rootScope.map = null;

  /* Create City State County value*/
  $rootScope.city_state_country = '';
  if($rootScope.state) {
      $rootScope.city_state_country = $rootScope.city +', '+ $rootScope.state +', '+$rootScope.country;
  } else {
      $rootScope.city_state_country = $rootScope.city +', '+$rootScope.country;
  }
  
  /*
  * Loop throuth $rootScope.locs to create cities
  * navbar list.
  */

  var cities = $rootScope.locs;
  /* actions array used in navbar */
  $scope.actions = []; 
  for(var city in cities) {

    if(cities.hasOwnProperty(city)) {
      var obj = {};
      // Gets all listings values
      obj.id = city;
      var city_st = (cities[city].state) ?
        city.replace(/_/g, ' ') + ', ' + cities[city].state.toUpperCase() :
        city.replace(/_/g, ' ');
      obj.name = city_st;
      $scope.actions.push(obj);
    }
  }

  $scope.setAction = function(action) {
    $scope.selectedAction = action;
    $location.hash($scope.selectedAction.id);
  };

}]);
 
Site.controller('GetHeaderImage', ['$scope', '$rootScope', '$http',
  function($scope, $rootScope, $http) {
  var city = $rootScope.city_id.toLowerCase();
  var state;
  if($rootScope.state) {
    state = $rootScope.state.toLowerCase();
  }
  var country = $rootScope.country.toLowerCase();
  var path = '../images/' + city;
  if(state) {
    path += '_' + state;
  }
  path += '_' + country;
  
  /* 
  *Get list of files that are prepended with city, state, country
  */
  $scope.myInterval = 7000; //Carousel delay
  $http({
    url: 'php/get_image_files.php',
    dataType: 'json', 
    method: "GET",
    params: {filename: path}
  }).success(function(data) {
    $scope.slides = data;
    $rootScope.slidesdone = true;
  }); 
}]);



Site.service('MyService', ['$http',
  function($http) {
  var myData = null;

  var promise = $http.get('js/city_data.json').success(function (data) {
    myData = data;
  });

  return {
    promise:promise,
    // setData: function (data) {
      // myData = data;
    // },
    get_json_data: function () {
        return myData;
    }
  };
}]);

Site.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/ShowHome', {
        templateUrl: 'partials/home.html',
        controller: 'ShowHomeController',
        resolve:{
          // Wait for promise
          MyServiceData: ['MyService', function(MyService){
          return MyService.promise;
        }]}
      }).
      // when('/ShowAbout', {
      //   templateUrl: 'partials/about.html',
      //   controller: 'ShowAboutController'
      // }).
      // when('/ShowContact', {
      //   templateUrl: 'partials/contact.html',
      //   controller: 'ShowContactController'
      // }).
      otherwise({
        redirectTo: '/ShowHome'
      });
  }]);

  Site.directive('tooltip', function(){
    return {
        restrict: 'A',
        link: function(scope, element, attrs){
            $(element).hover(function(){
                // on mouseenter
                $(element).tooltip('show');
                  // Set timer for mobile
                  setTimeout(function(){
                    $(element).tooltip('hide');
                  }, 3000);
            }, function(){
                // on mouseleave
                $(element).tooltip('hide');
            });
        }
    };
  });

})();