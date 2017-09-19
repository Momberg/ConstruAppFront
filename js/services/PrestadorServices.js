app.factory('prestadorServices', ['$http', 'locationServices', function($http, locationServices) {

        function listar(callback) {
            $http({
                method:'GET',
                url: 'https://servicosfiap.herokuapp.com/prestador'
            }).then(function (data) {
                if (callback) callback(data)
            });
        }

        function pesquisarPor(nome, callback) {
            $http({
                method:'GET',
                url:'https://servicosfiap.herokuapp.com/prestador/' + nome
            }).then(function (data) {
                if (callback) callback(data)
            });
        }

        function salvar(prestador, callback) {
            $http({
                method:'POST',
                url:'https://servicosfiap.herokuapp.com/prestador',
                data:JSON.stringify(prestador)
            }).then(function (data) {
                if (callback) callback(data)
            });
        }

        return {
            listar:listar,
            salvar:salvar,
            pesquisarPor:pesquisarPor
        };
    }])