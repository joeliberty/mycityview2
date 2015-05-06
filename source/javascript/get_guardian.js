(function() {
'use strict';
var guardian_app = angular.module('guardian_app', []);

// guardian_app.factory('formatDate', function() {
//     return {
//         yyyy_mm_dd : function(today){
//         var day = today.getDate(today);
//         if(day < 10) {
//             day = '0' + day;
//         }
//         var month = today.getMonth(today) + 1;
//         if(month < 10) {
//             month = '0' + month;
//         }
//         var year = today.getFullYear(today);
//         return year + '-' + month + '-' + day; 
//         }  
//     };
// });

// guardian_app.factory('dateSort', function() {
//     return {
//         comparator : function (a,b){
//         if (a.timestamp < b.timestamp) return -1;
//         if (a.timestamp > b.timestamp) return 1;
//         return 0;
//         }
//     };
// });

guardian_app.controller("GuardianCtrl", ['$scope', '$rootScope', '$http', 'formatDate',
    function($scope, $rootScope, $http, formatDate) {
        $('.tabs_container').css('visibility', 'visible');
    $scope.sections = [];

    $scope.news_items = [{"id": "artanddesign","name": "Art"}, {"id": "australia-news","name": "Australia News"}, {"id": "books","name": "Books"}, {"id": "business","name": "Business"}, {"id": "cities","name": "Cities"}, {"id": "community","name": "Community"}, {"id": "culture","name": "Culture"}, {"id": "education","name": "Education"}, {"id": "environment","name": "Environment"}, {"id": "fashion","name": "Fashion"}, {"id": "film","name": "Film"}, {"id": "football","name": "Football"}, {"id": "global-development","name": "Global Developement"}, {"id": "healthcare-network","name": "Healthcare"}, {"id": "help","name": "Help"}, {"id": "law","name": "Law"}, {"id": "lifeandstyle","name": "Lifestyle"}, {"id": "money","name": "Money"}, {"id": "music","name": "Music"}, {"id": "news","name": "News"}, {"id": "politics","name": "Politics"}, {"id": "science","name": "Sciende"}, {"id": "society","name": "Society"}, {"id": "sport","name": "Sports"}, {"id": "stage","name": "Stage"}, {"id": "teacher-network","name": "Teachers Network"}, {"id": "technology","name": "Technology"}, {"id": "travel","name": "Travel"}, {"id": "tv-and-radio", "name": "TV and Radio"}, {"id": "uk-news","name": "UK News"}, {"id": "us-news","name": "US News"}, {"id": "voluntary-sector-network","name": "Volunteer Network"}, {"id": "weather","name": "Weather"}, {"id": "women-in-leadership", "name": "Wowmen in Leadership"}, {"id": "world", "name": "World"}];
        
        $scope.selected_item = $scope.news_items[$scope.news_items.length - 1];

        $scope.query = '';
        console.log('default', $scope.selected_item)

    $scope.find_news = function(page, section) {
        console.log('page', page)
        // $('.newspanel').css('display', 'none');
        // $scope.find_news = function(page_num, category) {
        $scope.news_spinner = true;
        // var self = this;
        // var t_city = $rootScope.city;
        var end_date = new Date();
        end_date = formatDate.yyyy_mm_dd(end_date);
        // Get tomorrows date and format it.
        var now = new Date();
        var start_date = new Date(now);
        start_date = start_date.setDate(now.getDate()-2);
        start_date = new Date(start_date);
        
        console.log('end',end_date)
        start_date = formatDate.yyyy_mm_dd(start_date).toString();
        console.log('start', start_date)



        // var page_size = '10';

        // $scope.news = { news: {title:'Retreiving news for ' + $rootScope.city + '.'}};
        // var city_state_country = '';
        // if($rootScope.state) {
        //     city_state_country = t_city +','+ $rootScope.state+','+$rootScope.country;
        // } else {
        //     city_state_country = t_city +','+$rootScope.country;
        // }
        var grp = (section == 'search') ? $scope.selected_item.id : section;
        // var grp = section;
        console.log('section', section)
        console.log('query', $scope.query)
        var url = 'php/get_guardian.php';
        $http({
            url: url,
            dataType: 'json',
            method: 'GET',
            cache: true,
            params: {
                start_date: start_date,
                end_date: end_date,
                section: grp,
                page: page,
                query: $scope.query
            },
            config: {
                section: section
            }
        }).success(function(data, status, headers, config) {
            // console.log(data)
            if(data) {
                $scope.news_spinner = false;
                $('.newspanel').scrollTop(0,0);

                var section = String(config.config.section);
                // console.log('section', section)
                // var sectionname = 'news_'+section;
                // console.log('secitonname', sectionname)

                $scope.sections.push({ "name":section, "news":data.response});
                $scope[section] = data.response;
                console.log($scope[section].total)
                console.log($scope[section].pageSize)
                $('.newspanel').css('display', 'block');
                
                var pagerState = (parseInt($scope[section].total) <= parseInt($scope[section].pageSize)) ? 'none' : 'block';
                $('#'+section).css('display', pagerState);

            }
            
        }); 

        // this.cleanIt = function(str) {
        //     return str.replace(/(<([^>]+)>)/ig," ");
        // };

        // this.clean_stop_time = function(start_time, stop_time) {
        //     if(start_time && stop_time ) {
        //         var ind = start_time.indexOf(' ');
        //         var sdate = start_time.slice(0, ind);
        //         ind = stop_time.indexOf(' ');
        //         var edate = stop_time.slice(0, ind);
        //         var etime = stop_time.slice(ind);
        //         etime = (sdate == edate) ? etime : stop_time;
        //         return etime;
        //     } else {
        //         return;
        //     }
        // };

        // this.checkGeocode = function(geocode) {
        //     // For ng-hide, hide if true
        //     return (geocode == 'EVDB Geocoder') ? false : true;
        // };

    };

    $scope.setPage = function (pageNo, type) {
        console.log(pageNo)
        $scope.find_news(pageNo, type);
    };

    var sections = ['world', 'technology'];
    for(var i = 0; i < sections.length; i++) {
        $scope.find_news(1, sections[i]);
    }
    // $scope.text = 'hello';
    $scope.submit = function() {
            if(this.query == '' || this.selected_item == '') {
                alert('Please type in a search term.');
                return
            }
            console.log(this.query)
            $scope.query = this.query;
            // $scope.query = '';
            console.log(this.selected_item.id)
            $scope.selected_item = this.selected_item;
            // $scope.text = '';
            $scope.find_news(1, 'search');
      };

}]);

// guardian_app.directive('hmtext', function () {
//     return {
//         restrict:'EA',
//         scope:{
//             hmtext : '=hmtext',
//             hmlimit : '=',
//             hmfulltext:'='
//         },
//         templateUrl: 'partials/moreless.html',
//         controller : function($scope){
//             $scope.toggleValue=function(){
//                 if($scope.hmfulltext === true)
//                     $scope.hmfulltext=false;
//                 else if($scope.hmfulltext === false)
//                     $scope.hmfulltext=true;
//                 else
//                     $scope.hmfulltext=true;
//             };
//         }
//     };
// });

// guardian_app.directive('newsa', function () {
//     return {
//         restrict:'EA',
//         scope:{
//             url : '=',
//             image : '=',
//             title:'=',
//             venuename: '=',
//             start: '=',
//             stop: '=',
//             address: '='
//         },
//         templateUrl: 'partials/newsa.html',
//     };
// });

// guardian_app.directive('newsb', function () {
//     return {
//         restrict:'EA',
//         scope:{
//             geocode : '=',
//             latitude : '=',
//             longitude:'=',
//             url: '='
//         },
//         templateUrl: 'partials/newsb.html',
//     };
// });

// guardian_app.filter('cleanTime', function () {
//     return function (item) {
//         if(!item) { return; }
//         if(item.indexOf(' ')) {
//             var arr = item.split(' ');
//             var time = (arr[1] != '00:00:00') ? item : arr[0];
//             return time;
//         } else {
//             return item;
//         }
//     };
// });

// guardian_app.filter('capitalize_fist_char', function () {
//     return function (item) {
//         if(!item) { return; }
//         var title = item.charAt(0).toUpperCase() + item.slice(1);
//         // Also take out underscore
//         title = title.replace(/_/g, ' ');
//         return title;
//     };
// });


})();

