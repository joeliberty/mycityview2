(function() {
'use strict';
var events_app = angular.module('events_app', []);

events_app.factory('formatDate', function() {
    return {
        yyyy_mm_dd : function(today){
        var day = today.getDate(today);
        if(day < 10) {
            day = '0' + day;
        }
        var month = today.getMonth(today) + 1;
        if(month < 10) {
            month = '0' + month;
        }
        var year = today.getFullYear(today);
        return year + '-' + month + '-' + day; 
        }  
    };
});

// events_app.factory('dateSort', function() {
//     return {
//         comparator : function (a,b){
//         if (a.timestamp < b.timestamp) return -1;
//         if (a.timestamp > b.timestamp) return 1;
//         return 0;
//         }
//     };
// });

events_app.controller("EventsCtrl", ['$scope', '$rootScope', '$http', 'formatDate',
    function($scope, $rootScope, $http, formatDate) {
    $rootScope.slidesdone = false;
    $scope.num_of_categories = 0;
    $scope.cats_returned = 0;
    $scope.loading_events = true;
    $scope.is_search = false;
    $scope.query = '';

    $scope.find_events = function(page_num, category, count_only) {
        var term = category;
        $scope[category + '_spinner'] = true;
        var self = this;
        $scope.events = { events: {title:'Retreiving events for ' + $rootScope.city + '.'}};

        var params = {};
        params.page_number = page_num;
        params.count_only = count_only;
        var keywords = (category == 'search') ? $scope.query : '';
        if(keywords) {
            params.keywords = keywords;
            params.sort_order = 'date';
        }
        category = (category == 'search') ? '' : category;
        if(category) {
            params.category = category;
            params.sort_order = 'popularity';
        }
        var date;
        if(!category) {
            date = 'Future';
        } else {
            var today = new Date();
            today = formatDate.yyyy_mm_dd(today);
            today = today.replace(/-/g, '')+'00';
            date = today + '-' + today;
        }
        params.date = date;
        params.page_size = '10';

        var t_city = $rootScope.city;
        var city_state_country = '';
        if($rootScope.state) {
            city_state_country = t_city +','+ $rootScope.state+','+$rootScope.country;
        } else {
            city_state_country = t_city +','+$rootScope.country;
        }
        params.location = city_state_country;
        var url = 'php/get_event.php';
        $http({
            url: url,
            dataType: 'json',
            method: 'GET',
            cache: true,
            params: params,
            config: {
                category: term
            }
        }).success(function(data, status, headers, config) {
            $scope.cats_returned += 1;
            if($scope.cats_returned >= $scope.num_of_categories) {
                $scope.loading_events = false;
            }
            var arr = [];
            if(data.events) {
                var results;
                if(data.events.event.length) {
                    results = $scope.events = data.events.event;
                } else {
                    results = data.events;
                }
                $.each(results, function (i, item) {
                    var event = {};
                    event.image = (item.image !== null) ? item.image.medium.url : '';
                    event.title = (item.title !== null) ? item.title : false;
                    event.url = (item.url !== null) ? item.url : false;
                    event.venue_name = (item.venue_name !== null) ? item.venue_name : false;
                    event.start_time = (item.start_time !== null) ? item.start_time : false;
                    var stop_time = self.clean_stop_time(event.start_time, item.stop_time);
                    event.stop_time = (stop_time !== null) ? stop_time : false;
                    event.description = (item.description !== null) ? self.cleanIt(item.description) : false;
                    event.venue_address = (item.venue_address !== null) ? item.venue_address : false;
                    event.geocode_type = (item.geocode_type !== null) ? self.checkGeocode(item.geocode_type) : false;
                    event.latitude = (item.latitude !== null) ? item.latitude : false;
                    event.longitude = (item.longitude !== null) ? item.longitude : false;
                    arr.push(event);
                });
                $('.newspanel').scrollTop(0,0);
            }
            /* Add accordion headings here */
            if(data.total_items != 0) {
                var type = String(config.config.category);
                var catname = 'cat'+type;
                $scope[catname] = type;
                $scope[type+'totalItems'] = data.total_items;
                $scope[type+'currentPage'] = data.page_number;
                $scope[type+'numOfPages'] = data.page_count;
                $scope[type+'itemsPerPage'] = data.page_size;
                var pagerState = (parseInt($scope[type+'totalItems']) <= parseInt($scope[type+'itemsPerPage'])) ? 'none' : 'block';
                $('#'+catname).css('display', pagerState);

                if(arr.length) {
                    $scope[type] = arr;
                    $scope[type + '_spinner'] = false;
                 }
             }

            // console.log('totalItems: ', $scope[type+'totalItems'] + ' currentPage: ', $scope[type+'currentPage'] + ' numOfPages: ' , $scope[type+'numOfPages'] + ' itemsPerPage: ', $scope[type+'itemsPerPage'])
        }); 

        this.cleanIt = function(str) {
            return str.replace(/(<([^>]+)>)/ig," ");
        };

        this.clean_stop_time = function(start_time, stop_time) {
            if(start_time && stop_time ) {
                var ind = start_time.indexOf(' ');
                var sdate = start_time.slice(0, ind);
                ind = stop_time.indexOf(' ');
                var edate = stop_time.slice(0, ind);
                var etime = stop_time.slice(ind);
                etime = (sdate == edate) ? etime : stop_time;
                return etime;
            } else {
                return;
            }
        };

        this.checkGeocode = function(geocode) {
            // For ng-hide, hide if true
            return (geocode == 'EVDB Geocoder') ? false : true;
        };

    };

    $rootScope.$watch('slidesdone', function() {
        if($rootScope.slidesdone) {
            setTimeout(function(){
                $scope.find_categories();
              }, 500);
        }
    });

    $scope.find_categories = function() {
        var cats = ['attractions', 'art', 'business','clubs_associations', 'comedy', 'community', 'family_fun_kids', 'festivals_parades', 'fundraisers', 'learning_education', 'movies_film', 'music', 'outdoors_recreation', 'performing_arts', 'politics_activism', 'sales', 'singles_social', 'sports', 'support', 'technology'];
        $scope.num_of_categories = cats.length;
        for( var v = 0; v < cats.length; v++) {
            $scope.find_events(1, cats[v], 1);
        }
    };

    $scope.submit = function() {
        if(this.query === '') {
            alert('Please type in a search term.');
            return;
        }
        $scope.query = this.query.replace(/ /g, '%20');
        $scope.find_events(1, 'search', 0);
    };

    // Get single set of events e.g. music
    $scope.get_event = function (type) {
        // Page, whichevent, count_only
        $scope.find_events(1, type, 0);
    };

    $scope.setPage = function (pageNo, type) {
        $scope.find_events(pageNo, type);
    };

}]);

events_app.directive('hmtext', function () {
    return {
        restrict:'EA',
        scope:{
            hmtext : '=hmtext',
            hmlimit : '=',
            hmfulltext:'='
        },
        templateUrl: 'partials/moreless.html',
        controller : ['$scope', function($scope){
            $scope.toggleValue=function(){
                if($scope.hmfulltext === true)
                    $scope.hmfulltext=false;
                else if($scope.hmfulltext === false)
                    $scope.hmfulltext=true;
                else
                    $scope.hmfulltext=true;
            };
        }]
    };
});

events_app.directive('eventa', function () {
    return {
        restrict:'EA',
        scope:{
            url : '=',
            image : '=',
            title:'=',
            venuename: '=',
            start: '=',
            stop: '=',
            address: '='
        },
        templateUrl: 'partials/eventsa.html',
    };
});

events_app.directive('eventb', function () {
    return {
        restrict:'EA',
        scope:{
            geocode : '=',
            latitude : '=',
            longitude:'=',
            url: '='
        },
        templateUrl: 'partials/eventsb.html',
    };
});

events_app.filter('cleanTime', function () {
    return function (item) {
        if(!item) { return; }
        if(item.indexOf(' ')) {
            var arr = item.split(' ');
            var time = (arr[1] != '00:00:00') ? item : arr[0];
            return time;
        } else {
            return item;
        }
    };
});

events_app.filter('capitalize_fist_char', function () {
    return function (item) {
        if(!item) { return; }
        var title = item.charAt(0).toUpperCase() + item.slice(1);
        // Also take out underscore
        title = title.replace(/_/g, ' ');
        return title;
    };
});


})();
