app.factory('servicosServices', ['$http', 'locationServices', function($http, locationServices) {
    
            function listar(callback) {
                $http({
                    method:'GET',
                    url: 'https://servicosfiap.herokuapp.com/servico'
                }).then(function (data) {
                    if (callback) callback(data);
                });
            }
    
            function pesquisarPorTipoServico(tipo, callback) {
                $http({
                    method:'GET',
                    url:'https://servicosfiap.herokuapp.com/servico/lista/tipoServico=' + tipo
                }).then(function (data) {
                    if (callback) callback(data);
                });
            }
    
            function salvar(servico, callback) {
                $http({
                    method:'POST',
                    url:'https://servicosfiap.herokuapp.com/servico',
                    data:JSON.stringify(servico)
                }).then(function (data) {
                    if (callback) callback(data);
                });
            }
    
            function pesquisarPorLocalServico(local, callback) {
                $http({
                    method:'GET',
                    url:'https://servicosfiap.herokuapp.com/servico/lista/localServico=' + local
                }).then(function (data) {
                    if (callback) callback(data);
                });
            }

            function pesquisarPorIdPrestador(id, callback) {
                $http({
                    method:'GET',
                    url:'https://servicosfiap.herokuapp.com/servico/lista/idPrestador=' + id
                }).then(function (data) {
                    if (callback) callback(data);
                });
            }
    
            return {
                listar:listar,
                salvar:salvar,
                pesquisarPorTipoServico:pesquisarPorTipoServico,
                pesquisarPorLocalServico:pesquisarPorLocalServico,
                pesquisarPorIdPrestador:pesquisarPorIdPrestador
            };
        }]);