(function() {
'use strict';
var yelp_app = angular.module('yelp_app', []);

yelp_app.controller("YelpCtrl", ['$scope', '$rootScope', '$http','$q',
    function($scope, $rootScope, $http, $q) {
        //Pagination
        $scope.totalItems = 0;
        $scope.currentPage = 0;
        $scope.yelp = {};
        // Yelp Sort mode: 0=Best matched (default), 1=Distance, 2=Highest Rated
        $scope.filters = [{type: "Best matched", value: 0},{type: "Closest", value: 1},{type: "Highest Rated",value: 2}];
        $scope.yelp.selectedItem = $scope.filters[1];
        $scope.good_data = true;

    $scope.find_yelp = function(page, term) {
        $scope.good_data = true;
        $('.newspanel').scrollTop(0,0);
        var form_data = $scope.yelp;
        $scope[term + '_spinner'] = true;
        $scope.is_search = false;
        var self = this;
        var query = (term == 'search') ? form_data.query : term;
        var sort = form_data.selectedItem.value;
        var url = 'php/yelp_sample.php';
        $http({
            url: url,
            dataType: 'json',
            method: 'GET',
            cache: true,
            params: {
                term: query,
                sort: sort,
                offset: (page - 1) * 10 + 1,
                location: $rootScope.city_state_country
            },
            config: {
                term: term,
                page: page
            }
        }).success(function(data, status, headers, config) {
            if(data) {
                if (data.indexOf("error") != -1) {
                    // $scope.bad_data = true;
                    $scope.good_data = false;
                } else {
                    $scope.good_data = true;
                    // $scope.bad_data = false;
                    var data_array = [];
                    data_array.push(jQuery.parseJSON(data));
                    data_array = jQuery.parseJSON(data_array);

                    var term = String(config.config.term);
                    $scope[term + '_spinner'] = false;
                    var cur_page = String(config.config.page);
                    /* Add currentPage to data for pagination */
                    data_array.businesses.currentPage = cur_page;

                    // Data ok but no content
                    if (data_array.businesses.length < 1) {
                        $scope.good_data = false;
                    }

                    /* Check if image is good */
                    // self.isImage(data_array, term);
                    $scope[term] = data_array.businesses;
                    $scope[term].count = (data_array.total <= 100) ? data_array.total : 100;

                    var numofpages = (parseInt(data_array.total/10) <= 10) ? parseInt(data_array.total/10) : 10;
                    var pagerState = (numofpages <= 1) ? 'false' : 'true';
                    $scope['is_' + term] = pagerState; // For is_search pager
                }
            }
        }); 
    };

    $scope.load_yelp = function(query) {
        $scope.find_yelp(1, query);
    };

    $scope.select = function(item) {
        var same = (item === $scope.selected) ? true : false;
        $scope.selected = (item === $scope.selected) ? null : item;
    };

    $scope.isActive = function(item) {
        return $scope.selected === item;
    };

    $scope.setPage = function (pageNo, type) {
        $scope.find_yelp(pageNo, type);
    };

    $scope.submit = function() {
        if(this.query === '') {
            alert('Please type in a search term.');
            return;
        }
        $scope.query = this.query;
        $scope.find_yelp(1, 'search');
    };
}]);

yelp_app.directive('yelpa', function () {
    return {
        restrict:'EA',
        scope:{
            things : '=things',
            spinner : '='
        },
        templateUrl: 'partials/yelpa.html',
    };
});

yelp_app.filter('formatPhone', function () {
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


yelp_app.filter('toString', function () {
  return function (item) {
      return item.toString();
  };
});
})();