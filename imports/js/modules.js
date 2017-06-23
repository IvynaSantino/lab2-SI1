var app = angular.module("NetSI", []);

angular.module("NetSI").controller("NetSIController", function ($scope, $http) {
    $scope.app = "NetSI";
    $scope.movies = [];
    $scope.watchlist = [];
    $scope.myMovies = [];

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

    //Bug: add mais de uma vez o mesmo filme!!! 
    $scope.addMoviePerfil = function(movie) {
       if ($scope.existAddPerfil(movie)) {
            alert("Série/Filme já adicionado ao perfil");
       } else {
            $scope.myMovies.push(angular.copy(movie));
       }
    };
    

    $scope.addMovieWatchlist = function(movie) {
        if ($scope.existAddWatchlist(movie)) {
            alert("Série/Filme já adicionado à watchlist");
            
        } else {
            $scope.watchlist.push(angular.copy(movie));
        }
    }


    $scope.existAddPerfil = function(movie) {
        var cont = 0;
        var result = false;
        for (var i = 0; i < $scope.myMovies.lenght; i++) {
            if (movie.Title == $scope.myMovies[i].Title) {
                cont += 1;
            }
        }

        if (cont > 0) {
            result = true;
        }

        return result;
    }

     $scope.existAddWatchlist = function(movie) {
        var cont = 0;
        var result = false;
        for (var i = 0; i < $scope.watchlist.lenght; i++) {
            if (movie.Title == $scope.watchlist[i].Title) {
                cont += 1;
            }
        }

        if (cont > 0) {
            result = true;
        }

        return result;
    }

    $scope.viewPerfil = function() {
        for (var i = 0; i < $scope.myMovies.lenght; i++) {
            $scope.moviesPerfil = $scope.myMovies[i];
        }
    }

    
});