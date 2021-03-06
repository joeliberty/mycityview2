(function() {
'use strict';
var faroo_app = angular.module('faroo_app', []);

faroo_app.controller("FarooCtrl", ['$scope', '$rootScope', '$http', 'formatDate', '$q',
    function($scope, $rootScope, $http, formatDate, $q) {
        //Pagination
        $scope.totalItems = 0;
        $scope.currentPage = 0;

        $('.tabs_container').css('visibility', 'visible');
        $scope.is_search = false;
        $scope.query = '';

    $scope.find_news = function(page, term) {
        $('.newspanel').scrollTop(0,0);
        $scope[term + '_spinner'] = true;
        $scope.is_search = false;
        var self = this;
        var query = (term == 'search') ? $scope.query : term;
        var url = 'php/get_faroo.php';
        $http({
            url: url,
            dataType: 'json',
            method: 'GET',
            cache: true,
            params: {
                start: (page - 1) * 10 + 1,
                query: query
            },
            config: {
                term: term,
                page: page
            }
        }).success(function(data, status, headers, config) {
            if(data) {
                var term = String(config.config.term);
                $scope[term + '_spinner'] = false;
                var cur_page = String(config.config.page);
                /* Add currentPage to data for pagination */
                data.currentPage = cur_page;
                /* Check if image is good */
                self.isImage(data, term);
                var numofpages = parseInt(data.count/10);
                var pagerState = (numofpages <= 1) ? 'false' : 'true';
                $scope['is_' + term] = pagerState; // For is_search pager
            }
        }); 

        this.isImage = function(data, term) {
            /* Check that the image  exits befor including it. */
            $.each(data.results, function (i, item) {
                var deferred = $q.defer();
                var image = new Image();
                image.onerror = function() {
                    deferred.resolve(false);
                };
                image.onload = function() {
                    deferred.resolve(true);
                };
                image.src = item.iurl;
                /* Add src_url if image is there or
                 * '', so no broken image icon
                */
                deferred.promise.then(function(ok) {
                  if(ok) {
                    // Use the url
                  } else {
                    item.iurl = '';
                  }
                });
            });
             $scope[term] = data;
          };

    };

    $scope.setPage = function (pageNo, type) {
        $scope.find_news(pageNo, type);
    };

    $scope.pageChanged = function() {
        // console.log('Page changed to: ' + $scope.currentPage);
        // $scope.find_news($scope.currentPage, 'world');
    };

    $scope.get_article = function (type) {
        $scope.find_news(1, type);
    };

    $scope.submit = function() {
        if(this.query === '') {
            alert('Please type in a search term.');
            return;
        }
        $scope.query = this.query.replace(/ /g, '%20');
        $scope.find_news(1, 'search');
    };
}]);

faroo_app.directive('farootopic', function () {
    return {
        restrict:'EA',
        scope:{
            article : '=article',
            spinner : '='
        },
        templateUrl: 'partials/farootopic.html',
    };
});

})();

