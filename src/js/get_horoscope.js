(function() {
'use strict';

var astro_app = angular.module('astro_app', []);

astro_app.controller("AstroCtrl", ['$scope', '$http', '$rootScope',
  function($scope, $http, $rootScope) {
    $scope.signs = [
    {"name": "Aries", "link": "images/astro/aries.png"},
    {"name": "Taurus", "link": "images/astro/taurus.png"},
    {"name": "Gemini", "link": "images/astro/gemini.png"},
    {"name": "Cancer", "link": "images/astro/cancer.png"},
    {"name": "Leo", "link": "images/astro/leo.png"},
    {"name": "Virgo", "link": "images/astro/virgo.png"},
    {"name": "Libra", "link": "images/astro/libra.png"},
    {"name": "Scorpio", "link": "images/astro/scorpio.png"},
    {"name": "Sagittarius", "link": "images/astro/sagittarius.png"},
    {"name": "Capricorn", "link": "images/astro/capricorn.png"},
    {"name": "Aquarius", "link": "images/astro/aquarius.png"},
    {"name": "Pisces", "link": "images/astro/pisces.png"}
    ];

  $scope.horoscope = 'Choose your sign';

  $scope.call = function(sign) {
    $scope.horoscope = '';
    $('#astro_horoscope i').css('display', 'inline-block');
    $http({
      url: 'https://sender.blockspring.com/api_v2/blocks/dba3c2ca01c063df9cdf9fc6f0cf93f9?api_key=db81b1fa591380eb4110ff3093829176', 
      method: "POST",
      cache: true,
      dataType: 'json',
      data: JSON.stringify({ sign: sign})
    })
    .success(function(data) {
      $('#astro_horoscope i').css('display', 'none');
      $scope.horoscope = data.horoscope;
    }); 
  };


}]);

})();


