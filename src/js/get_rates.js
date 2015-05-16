(function() {
'use strict';

var rates_app = angular.module('rates_app', ['ui.bootstrap']);

rates_app.controller('RatesCtrl', ['$scope', '$rootScope', '$http',
    function($scope, $rootScope, $http) {
    $scope.load_rates = function() {
        var self = this;
        $scope.amount = 1;
        $scope.currencies = [];
        $scope.base_rates = ['USD', 'AUD', 'EUR'];
        $scope.sel_grp = ['USD', 'EUR', 'GBP', 'INR', 'AUD', 'CAD', 'CNY', 'NZD', 'JPY', 'RUB'];
        $http.get('js/currencies.json').success(function(data){
            $scope.all_currencies = data;
            for(var v = 0; v < $scope.base_rates.length; v++){
                var str = '';
                for(var x = 0; x < $scope.sel_grp.length; x++) {
                    str += "'" + $scope.base_rates[v] + $scope.sel_grp[x] + "'" + ',';
                }
                str = str.substring(0, str.length - 1);
                var url = "https://query.yahooapis.com/v1/public/yql?q=select * from yahoo.finance.xchange where pair in (" + str + ")&format=json&diagnostics=true&env=store://datatables.org/alltableswithkeys&callback=";
                $.getJSON(url, function (data) {
                    var currency = {};
                    /* Add necessary key:values */
                    $.each(data.query.results.rate, function (i, item) {
                        var abbrev = item.id;
                        $scope.base = abbrev.slice(0,3);
                        currency.sortid = $scope.base_rates.indexOf($scope.base);
                        item.country = abbrev.slice(3);
                        item.fullname = self.get_full_names(abbrev.slice(3), $scope.all_currencies);
                    });
                    currency.base = $scope.base;
                    currency.fullname = self.get_full_names($scope.base, $scope.all_currencies);
                    currency.rates = data.query.results.rate;
                    $scope.currencies.push(currency);
                    if($scope.currencies.length == $scope.base_rates.length) {
                        $scope.currencies.sort(self.compare);
                    }
                });
            }
        });

        this.compare = function(a,b) {
          if (a.sortid < b.sortid)
             return -1;
          if (a.sortid > b.sortid)
            return 1;
          return 0;
        };

        this.get_full_names= function(abbrev, data) {
        for(var key in data) {
                if(data.hasOwnProperty(key)) {
                    if(key === abbrev) {
                        return data[key];
                    }
                }
            }
        };
    };

    $rootScope.$watch('slidesdone', function() {
        if($rootScope.slidesdone) {
            setTimeout(function(){
                $scope.load_rates();
            }, 500);
        }
    });

}]);

})();