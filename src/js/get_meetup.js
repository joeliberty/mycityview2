(function() {
'use strict';

var meetup_app = angular.module('meetup_app', []);

meetup_app.controller("meetupCtrl", ['$scope', '$rootScope', '$http',
    function($scope, $rootScope, $http) {
    $scope.load_meetup = function() {
        $scope.details_spinner = true;
        $scope.ismobile = (screen.width <= 400) ? true : false;
        console.log('mobileon', $scope.mobileon)
        var startdate = new Date();
        var now = new Date();
        var enddate = new Date(now);
        enddate = enddate.setDate(now.getDate()+5);
        enddate = new Date(enddate);
        var city = $rootScope.city;
        var state = $rootScope.state;
        var country = $rootScope.country;
        var city_data = $rootScope.locs;
        var t_city = $rootScope.city_id;
        var lat = city_data[t_city].lat;
        var lon = city_data[t_city].lon;
        var url = 'php/get_meetup.php';
        $http({
            url: url,
            dataType: 'json',
            method: 'GET',
            cache: true,
            params: {
                city: city,
                state: state,
                country: country,
                lat: lat,
                lon: lon
            }
        }).success(function(data, status, headers) {
            if(data) {
                var data_array = [];
                var arr = [];
                data_array.push(jQuery.parseJSON(data));
                data_array = jQuery.parseJSON(data_array);
                $.each(data_array.results, function (i, item) {
                    if (item.time <= enddate) {
                        var event = {};
                        event.city = city;
                        event.name = item.name;
                        event.group_name = item.group.name;
                        event.description = item.description;
                        event.join_mode = item.group.join_mode;
                        event.who = item.group.who;
                        event.why = typeof(item.why !== 'undefined') ? item.why : 0;
                        event.how_to_find_us = typeof(item.how_to_find_us !== 'undefined') ? item.how_to_find_us : 0;
                        if (typeof item.venue !== 'undefined') {
                            event.venue_name = typeof(item.venue.name !== 'undefined') ? item.venue.name : 0;
                            event.venue_address = typeof(item.venue.address !== 'undefined') ? item.venue.address : 0;
                            event.venue_city = typeof(item.venue.city !== 'undefined') ? item.venue.city : 0;
                            event.venue_phone = typeof(item.venue.phone !== 'undefined') ? item.venue.phone : 0;
                        }
                        var time = new Date(item.time).toString();
                        event.time = time.slice(0, 21);
                        if (typeof item.fee !== 'undefined') {
                            event.fee_amount = typeof(item.fee.amount !== 'undefined') ? item.fee.amount : 0;
                            event.fee_currency = typeof(item.fee.currency !== 'undefined') ? item.fee.currency : 0;
                            event.fee_description = typeof(item.fee.description !== 'undefined') ? item.fee.description : 0;
                        }
                        if (typeof item.venue !== 'undefined') {
                            var lat = typeof(item.venue.lat !== 'undefined') ? item.venue.lat : 0;
                            var lon = typeof(item.venue.lon !== 'undefined') ? item.venue.lon : 0;
                            if(item.venue.lat && item.venue.lon) {
                                event.point = {lat: lat, lon: lon};
                            }
                        }
                        arr.push(event);
                    }
                });
                $scope.meetup_unavailable = (arr.length === 0) ? true : false;
                $scope.events = arr;
                $scope.details_spinner = false;
            }
        });
        
        /*
        * Select and isActive toggle Yelp details
        */
        $scope.select= function(item) {
            $scope.selected = (item === $scope.selected) ? null : item;
            $scope.reset_scroll(item, 1);
        };

        $scope.isActive = function(item) {
            return $scope.selected === item;
            // $scope.reset_scroll(item, 2);
        };
    };

    $scope.get_meetup = function() {
        $scope.load_meetup();
    };

    $scope.reset_scroll = function(place, num) {
        //reposition scrolltop if target out of focus
        var target = place.name;
        // Remove non alphanumeric characters
        target = target.replace(/\W/g, '');
        for(var i = 0; i < $scope.events.length; i++) {
            var tmp_name = $scope.events[i].name;
            if(tmp_name == place.name) {
                $scope.detail_index = i;
                var lineheight = $('#'+target).css('line-height');
                lineheight = lineheight.replace('px', '');
                var linenum = $scope.detail_index;
                var height = (lineheight * linenum);
                var elem = $('.meetup_container');
                $('html, body').find( elem ).animate({scrollTop: height}, 'slow');
                break;
            }
        }
        
    };

}]);

meetup_app.filter('formatId', function () {
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

meetup_app.filter('shortentext', function () {
  return function (item) {
    var good = typeof(item !== 'undefined') ? item : 0;
    if(good) {
      if(item.length >= 30 && screen.width <= 400) {
        var txt = item.substring(0, 30);
        console.log('screen.width', screen.width)
        txt = txt + '...';
        return txt;
      } else {
        return item;
      }
    }
  };
});

})();