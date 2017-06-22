var app = angular.module("NetSI", []);

angular.module("NetSI").controller("NetSIController", function ($scope, $http) {
    $scope.app = "NetSI";
    $scope.name = null;
    $scope.movies = [];
    $scope.flagMovie;


    $scope.searchMovie = function() {
        $http.get('https://omdbapi.com/?s=' + $scope.name + '&type=series&r=json&apikey=93330d3c')
        .then(function(data) {  
            $scope.films = data;
        });
    };

});