(function() {
'use strict';

var astro_app = angular.module('astro_app', []);

astro_app.controller("AstroCtrl", ['$scope', '$http', '$rootScope',
  function($scope, $http, $rootScope) {
  $scope.signs = [
    {"name": "Aries", "link": "images/astro/40px-Aries.svg.png"},
    {"name": "Taurus", "link": "images/astro/40px-Taurus.svg.png"},
    {"name": "Gemini", "link": "images/astro/40px-Gemini.svg.png"},
    {"name": "Cancer", "link": "images/astro/40px-Cancer.svg.png"},
    {"name": "Leo", "link": "images/astro/40px-Leo.svg.png"},
    {"name": "Virgo", "link": "images/astro/40px-Virgo.svg.png"},
    {"name": "Libra", "link": "images/astro/40px-Libra.svg.png"},
    {"name": "Scorpio", "link": "images/astro/40px-Scorpio.svg.png"},
    {"name": "Sagittarius", "link": "images/astro/40px-Sagittarius.svg.png"},
    {"name": "Capricorn", "link": "images/astro/40px-Capricorn.svg.png"},
    {"name": "Aquarius", "link": "images/astro/40px-Aquarius.svg.png"},
    {"name": "Pisces", "link": "images/astro/40px-Pisces.svg.png"}
    ];

  $scope.horoscope = 'Choose your sign';

  $scope.call = function(sign) {
    // console.log('sign: ' + sign)
    $scope.horoscope = '';
    $('#astro_horoscope i').css('display', 'inline-block');
    $http({
      url: 'https://sender.blockspring.com/api_v2/blocks/dba3c2ca01c063df9cdf9fc6f0cf93f9?api_key=db81b1fa591380eb4110ff3093829176', 
      method: "POST",
      dataType: 'json',
      data: JSON.stringify({ sign: sign})
    })
    .success(function(data) {
      $('#astro_horoscope i').css('display', 'none');
      // console.log('data: ' + data)
      $scope.horoscope = data.horoscope;
    }); 
  };


}]);

})();


