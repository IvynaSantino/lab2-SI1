var app = angular.module("NetSI", []);

angular.module("NetSI").controller("NetSIController", function ($scope, $http) {
    $scope.app = "NetSI";
    $scope.movies = [];
    $scope.watchlist = [];
    $scope.myMovies = [];
    $scope.flag;

    $scope.info = [];

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

    $scope.viewInfo = function(movie) {
        $scope.flag = false;
        $http.get('https://omdbapi.com/?i=' + movie + '&plot=full&apikey=93330d3c')
        .then(function (response) {
            $scope.info = response.data.Search;
            $scope.flag = true;
        });   

        //falta colocar as imagens - sem foto  
    };


    $scope.addInfo = function(movie) {
        $scope.info.push(angular.copy(movie));
    }

    //Bug: add mais de uma vez o mesmo filme!!! 
    $scope.addMoviePerfil = function(movie) {
       if ($scope.existAddPerfil(movie)) {
            alert("Série/Filme já adicionado ao perfil");
       } else {
            $scope.myMovies.push(angular.copy(movie));
       }
    };
    
    //Bug: add mais de uma vez o movie
    $scope.addMovieWatchlist = function(movie) {
        $scope.watchlist.push(angular.copy(movie));
        delete $scope.movie;
        
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


    $scope.removeMoviePerfil = function(movie) {
        if(confirm("Deseja remover a série da sue perfil?")) {
            var movieIndex = $scope.myMovies.indexOf(movie);
            $scope.myMovies.splice(movieIndex, 1);
        }
        
    }

    $scope.removeMovieWL = function(movie) {
        if (confirm("Deseja remover a série da sua watchlist?")) {
            var movieIndex = $scope.watchlist.indexOf(movie);
            $scope.watchlist.splice(movieIndex, 1);
    
        }
        
    }

    $scope.viewInfo = function(movie) {
        var movieIndex = $scope.myMovies.indexOf(movie);
        return $scope.myMovies[movieIndex];
    }
 
});