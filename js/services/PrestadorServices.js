app.factory('prestadorServices', ['$http', 'locationServices', function($http, locationServices) {

        function listar(callback) {
            $http({
                method:'GET',
                url: 'https://servicosfiap.herokuapp.com/prestador'
            }).then(function (data) {
                if (callback) callback(data)
            });
        }

        function pesquisarPorNome(nome, callback) {
            $http({
                method:'GET',
                url:'https://servicosfiap.herokuapp.com/prestador/nome=' + nome
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
            pesquisarPorNome:pesquisarPorNome
        };
    }])