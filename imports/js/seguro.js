var app = angular.module("NetSI", []);

angular.module("NetSI").controller("NetSIController", function ($scope, $http) {
    $scope.app = "NetSI";
    $scope.name = null;
    $scope.year = null;

    $scope.searchMovie = function() {
        $http.get('https://omdbapi.com/?s=' + $scope.name + '&type=series&r=json&apikey=93330d3c')
        .then(function(data) {  
            $scope.films = data;
        });
    };


    $scope.searchYear = function() {
        $http.get('https://omdbapi.com/?s=' + $scope.year + '&type=series&r=json&apikey=93330d3c')
        .then(function(data) {
            $scope.year = data.Year;
        });
    }

    $scope.image = null;
    $scope.viewImage = function() {
        $http.get('http://www.omdbapi.com/?t=' + $scope.name + '&type=series&r=json&apikey=93330d3c')
        .then(function(data) {
            $scope.image = data.Poster;
        }); 
    };
});