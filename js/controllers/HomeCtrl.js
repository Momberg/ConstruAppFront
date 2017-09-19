app.controller('HomeCtrl', function ($scope, $location, prestadorServices) {
    $scope.titulo = "Servicos"

    $scope.prestador = {
		"nome" : "",
		"cpf" : "",
		"tipo" : "",
		"senha" : ""
	};

    $scope.validaLogin = function (cpf, senha) {
		prestadorServices.pesquisarPorCpf(cpf, function(prestador) {
			console.log(prestador);
            console.log("status: " + prestador.status);
            if(prestador.data != "") {
                if(prestador.data.senha == senha) {
                    $scope.prestador = prestador.data[0];
                    window.location.href = "#/demo";
                } else {
                    alert("Senha incorreta");
                }
            } else {
            	alert("CPF não cadastrado");
            }
        })
	};

});