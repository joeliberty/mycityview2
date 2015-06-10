(function() {
'use strict';
var places_app = angular.module('places_app', []);

places_app.controller("PlacesCtrl", ['$scope', '$http', '$rootScope',
  function($scope, $http, $rootScope) {
    
  $scope.load_places = function(which_place) {
    types = ['art_gallery', 'cafe', 'restaurant', 'bar', 'establishment', 'museum', 'night_club', 'store', 'other_places'];
    $rootScope.cur_type = types.indexOf(which_place);
    if($scope[which_place]) { return; }
    $scope.loading_places = true;
    clearMarkers();
    var t_city = $rootScope.city_id;
    var city_data = $rootScope.locs;
    var pyrmont = new google.maps.LatLng(city_data[t_city].lat,city_data[t_city].lon);
    $scope.bounds = new google.maps.LatLngBounds();
    var types;
    if(which_place == 'other_places') {
      types = ['amusement_park', 'aquarium', 'bakery', 'book_store', 'bowling_alley', 'gym', 'park', 'zoo'];
    } else {
      types = [which_place];
    }
    var request = {
      location: pyrmont,
      radius: 1000,
      types: types
    };
    var service = new google.maps.places.PlacesService($('#for_places').get(0));
    service.nearbySearch(request, callback);

    function callback(results, status, pagination) {
      if(!$scope[which_place]) { $scope[which_place] = []; }
      if (status != google.maps.places.PlacesServiceStatus.OK) {
        $scope[which_place].push({status: status});
        $scope.loading_places = 0;
        $('#' + which_place).css('display', 'none');
        return;
      } else {
        $scope.loading_places = 0;
        var places_array = $scope[which_place];
        for(var v = 0; v < results.length; v++) {
          places_array.push(results[v]);
        }

        $scope.$apply(function() {
          $scope[which_place] = places_array;
          $rootScope.cur_places = $scope[which_place];
        });

        $('#' + which_place).css('display', 'block');
        $('#' + which_place).text('More results');
        if (pagination.hasNextPage) {
          var moreButton = document.getElementById(which_place);

          moreButton.disabled = false;

          google.maps.event.addDomListenerOnce(moreButton, 'click',
              function() {
            $('#' + which_place).text('Loading ...');
            moreButton.disabled = true;
            pagination.nextPage();
          });
        } else {
          $('#' + which_place).css('display', 'none');
        }
      }
    }
  };

  function clearMarkers() {
    for (var i = 0; i < $rootScope.markers.length; i++) {
    $rootScope.markers[i].setMap(null);
    }
  }

}]);

places_app.controller("DetailsCtrl", ['$scope', '$http', '$rootScope', '$q',
  function($scope, $http, $rootScope, $q) {
  

  $scope.get_details = function(place) {
    $scope.has_details = true;
    $scope.details = 0;
    var request = {
      placeId: place.place_id
    };
    var places_service = new google.maps.places.PlacesService($('#for_places').get(0));
    places_service.getDetails(request, function(place, status) {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        //Pull photo geturl from nested object
        var url = (typeof place.photos !== 'undefined') ?
          place.photos[0].getUrl({'maxWidth':200, 'maxHeight': 150}) : null;
        if(!url) {
          /*
           * Theres no image so just add what details
           * there are and return.
          */
          place.url = false;
          $scope.details = place;
          $scope.has_details = true;
        } else {
          isImage(url, place);
        }
        $scope.reset_scroll(place, 2);
      } else {
        console.log('got error');
      }
    });
  };

  $scope.createMarker = function(place, service) {
    var pinColor = "009933";
    var pinImage = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + pinColor,
      new google.maps.Size(21, 34),
      new google.maps.Point(0,0),
      new google.maps.Point(10, 34));
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
      map: $rootScope.map,
      position: place.geometry.location,
      icon: pinImage
    });
    $scope.bounds.extend(marker.getPosition()); //Add marker locs to bounds
    $rootScope.markers.push(marker);
  };

  $scope.select= function(place) {
    $scope.reset_scroll(place, 1);
    $scope.get_details(place);
    $scope.selected = (place === $scope.selected) ? null : place;

  };

  $scope.reset_scroll = function(place, num) {
    //reposition scrolltop if target out of focus
    var target = place.name;
    // Remove non alphanumeric characters
    target = target.replace(/\W/g, '');
    $scope.scroll_ready = false;
    if(num === 2) {
      $scope.scroll_ready = true;
    }
    if($scope.scroll_ready) {
        for(var i = 0; i < $rootScope.cur_places.length; i++) {
          var tmp_name = $rootScope.cur_places[i].name;
          if(tmp_name == place.name) {
            $scope.detail_index = i;
            break;
          }
        }
        var lineheight = $('#'+target).css('line-height');
        lineheight = lineheight.replace('px', '');
        var linenum = $scope.detail_index * 2;
        var height = lineheight * linenum;
        var elem = $('.placespanel:eq('+$rootScope.cur_type+')');
        $('html, body').find( elem ).animate({scrollTop: height}, 'slow');
      }
  };

  $scope.isActive = function(place) {
    return $scope.selected === place;
  };

  var isImage = function(src, place) {
    /* Check that the image  exits befor including it. */
    var deferred = $q.defer();
    /* 
     * Set resolve default to false.
     * Only images that load get added.
    */
    var image = new Image();
    image.onerror = function() {
      console.log('image error');
        deferred.resolve(false);

    };
    image.onload = function() {
        deferred.resolve(true);
    };
    image.src = src;

    /* Add src_url if image is there or
     * false, so no broken image icon
     * to scope.places
    */
    deferred.promise.then(function(ok) {
      if(ok) {
        place.url = src;
        $scope.details = place;
        $scope.has_details = true;
      } else {
        place.url = false;
        $scope.details = place;
        $scope.has_details = true;
      }
    });
  };
}]);

places_app.directive('placesa', function () {
    return {
        restrict:'EA',
        scope:{
            places : '=places',
            spinner : '=',
            btntxt : '@btntxt'
        },
        templateUrl: 'partials/placesa.html',
    };
});

places_app.filter('formatId', function () {
  return function (item) {
    var good = typeof(item !== 'undefined') ? item : 0;
    if(good) {
      if(item.indexOf(' ') == -1) {
        return item;
      } else {
        item = item.replace(/\W/g, '');
        return item;
      }
    }
  };
});

places_app.filter('formatPhone', function () {
  return function (item) {
    if(typeof item !== 'undefined') {
      var num = item;
      num = num.replace(/ /g, '');
      num = num.replace('(', '');
      num = num.replace(')', '');
      return num;
    }
  };
});

places_app.filter('formatType', function () {
  return function (item) {
    var good = typeof(item !== 'undefined') ? item : 0;
    if(good) {
      if(item.indexOf('_') == -1) {
        item = item.charAt(0).toUpperCase() + item.slice(1);
        return item;
      } else {
        var type_array = item.split('_');
        var str = '';
        for (var i = 0; i < type_array.length; i++) {
          var word = type_array[i];
          word = word.charAt(0).toUpperCase() + word.slice(1);
          str += word + ' ';
        }
        return str;
      }
    }
  };
});
})();