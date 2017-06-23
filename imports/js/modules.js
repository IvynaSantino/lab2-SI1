var app = angular.module("NetSI", []);

angular.module("NetSI").controller("NetSIController", function ($scope, $http) {
    $scope.app = "NetSI";
    $scope.movies = [];
    $scope.watchlist = [];
    $scope.myMovies = [];
    $scope.moviesPerfil = null;

    var ADD_PERFIL = "Série/Filme já adicionado ao perfil";
    var ADD_WATCHLIST = "Série/Filme já adicionado à watchlist";

    $scope.searchMovie = function(movie) {
        $http.get('https://omdbapi.com/?s=' + movie + '&type=series&r=json&apikey=93330d3c')
        .then(existMovie);   

            function existMovie(response) {
                console.log(response);

                if (response.data.Response === "False") {
                    alert("A série ou filme não foi encontrado.");
                    
                } else {
                    $scope.movies = response.data.Search;
                   
                }
            }


        //falta colocar as imagens - sem foto  
    };


    $scope.addMoviePerfil = function(movie) {
       if (!$scope.existAddPerfil(movie, ADD_PERFIL)) {
            $scope.myMovies.push(angular.copy(movie));
           //delete $scope.movie;
       }
    };
    

    $scope.addMovieWatchlist = function(movie) {
       // if (!$scope.existAdd(movie, watchlist, ADD_WATCHLIST)) {
            $scope.watchlist.push(movie);
        //}
    }


    $scope.existAddPerfil = function(movie, message) {
        var index = 0;

        while (index < $scope.myMovies.lenght - 1) {
            if (movie.Title === $scope.myMovies[index].Title) {
                alert(message);
                return true;
            } 
            index++;
        }
        return false;
    }

    $scope.viewPerfil = function() {
        for (var i = 0; i < myMovies.lenght; i++) {
            $scope.moviesPerfil = myMovies[i];
        }
    }
});