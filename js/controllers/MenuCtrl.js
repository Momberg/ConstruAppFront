app.controller('MenuCtrl', function ($scope, $location, servicosServices) {
    
    $(document).ready(function()
    {
        var navItems = $('.admin-menu li > a');
        var navListItems = $('.admin-menu li');
        var allWells = $('.admin-content');
        var allWellsExceptFirst = $('.admin-content:not(:first)');
        
        allWellsExceptFirst.hide();
        navItems.click(function(e)
        {
            e.preventDefault();
            navListItems.removeClass('active');
            $(this).closest('li').addClass('active');
            
            allWells.hide();
            var target = $(this).attr('data-target-id');
            $('#' + target).show();
        });
    });

    $scope.servico = {
        "tipoServico" : "",
        "localServico" : "",
        "idPrestador" : ""
    };

    $scope.pesquisarTipoServico = function (tipo) {
        servicosServices.pesquisarPorTipoServico(tipo, function(servico) {
            console.log(servico);
            if(servico.data.length > 0)
                $scope.servico = servico.data[0];
            else {
                $scope.servico.cpf = "";
            }
        })  
    };

    $scope.salvar = function(servico) {
        servico.idPrestador = localStorage.getItem('id');
        servicosServices.salvar(servico, function() {
            console.log("Sucesso");
        })
    };
    
});