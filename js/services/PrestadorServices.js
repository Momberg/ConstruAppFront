app.factory('prestadorServices', ['$http', 'locationServices', function($http, locationServices) {

        function listar(callback) {
            $http({
                method:'GET',
                url: 'https://servicosfiap.herokuapp.com/prestador'
            }).then(function (data) {
                if (callback) callback(data);
            });
        }

        function pesquisarPorNome(nome, callback) {
            $http({
                method:'GET',
                url:'https://servicosfiap.herokuapp.com/prestador/lista/nome=' + nome
            }).then(function (data) {
                if (callback) callback(data);
            });
        }

        function salvar(prestador, callback) {
            $http({
                method:'POST',
                url:'https://servicosfiap.herokuapp.com/prestador',
                data:JSON.stringify(prestador)
            }).then(function (data) {
                if (callback) callback(data);
            });
        }

        function pesquisarPorCpf(cpf, callback) {
            $http({
                method:'GET',
                url:'https://servicosfiap.herokuapp.com/prestador/cpf=' + cpf
            }).then(function (data) {
                if (callback) callback(data);
            });
        }

        function pesquisarPorCpfLista(cpf, callback) {
            $http({
                method:'GET',
                url:'https://servicosfiap.herokuapp.com/prestador/lista/cpf=' + cpf
            }).then(function (data) {
                if (callback) callback(data);
            });
        }

        function pesquisarPorTipo(tipo, callback) {
            $http({
                method:'GET',
                url:'https://servicosfiap.herokuapp.com/prestador/lista/tipo=' + tipo
            }).then(function (data) {
                if (callback) callback(data);
            });
        }

        return {
            listar:listar,
            salvar:salvar,
            pesquisarPorNome:pesquisarPorNome,
            pesquisarPorCpf:pesquisarPorCpf,
            pesquisarPorTipo:pesquisarPorTipo,
            pesquisarPorCpfLista:pesquisarPorCpfLista
        };
    }]);