app.controller('HomeCtrl', function ($scope, $location, prestadorServices) {
    $scope.titulo = "Servicos";

    $scope.prestador = {
		"nome" : "",
		"cpf" : "",
		"tipo" : "",
		"senha" : ""
	};

    $scope.validaLogin = function (cpf, senha) {
        localStorage.clear();
		prestadorServices.pesquisarPorCpf(cpf, function(prestador) {
            if(prestador.data != "") {
                if(prestador.data.senha == senha) {
                    localStorage.setItem('id', prestador.data.id);
                    localStorage.setItem('tipo', prestador.data.tipo);
                    window.location.href = "#/menu";
                } else {
                    document.getElementById("userPassword").className = document.getElementById("userPassword").className + " error";
                    document.getElementById("userPassword").focus();
                }
            } else {
                document.getElementById("inputCpf").className = document.getElementById("inputCpf").className + " error";
                document.getElementById("inputCpf").focus();
            }
        });
	};

});