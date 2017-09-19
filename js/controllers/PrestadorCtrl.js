app.controller('PrestadorCtrl', function ($scope, $location, prestadorServices) {

	$scope.prestador = {
		"nome" : "",
		"cpf" : "",
		"tipo" : "",
		"senha" : ""
	};

	$scope.pesquisar = function (nome) {
		prestadorServices.pesquisarPor(nome, function(prestador) {
			console.log(prestador);
            if(prestador.data.length > 0)
            	$scope.prestador = prestador.data[0];
            else {
            	$scope.prestador.cpf = "";
            }
        })
	};

	$scope.salvar = function(prestador) {
        prestadorServices.salvar(prestador, function() {
            console.log("Sucesso");
        })
    };

});