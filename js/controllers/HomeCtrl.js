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
            if(prestador.data != "") {
                if(prestador.data.senha == senha) {
                    $scope.prestador = prestador.data[0];
                    window.location.href = "#/demo";
                } else {
                    document.getElementById("userPassword").className = document.getElementById("userPassword").className + " error";
                    document.getElementById("userPassword").focus();
                }
            } else {
                document.getElementById("inputCpf").className = document.getElementById("inputCpf").className + " error";
                document.getElementById("inputCpf").focus();
            }
        })
	};

});