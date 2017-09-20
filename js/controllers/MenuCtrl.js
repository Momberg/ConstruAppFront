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
        });
    };

    $scope.salvar = function(servico) {
        servico.idPrestador = localStorage.getItem('id');
        servicosServices.salvar(servico, function() {
            document.forms["formCadastro"].reset();
        });
    };

    $scope.listarServico = function() {
        if(localStorage.getItem('tipo') == "admin"){
            servicosServices.listar(function(servico) {
                console.log("dentro do listar");
                buildCards(servico);
            });
        }
        if(localStorage.getItem('tipo') == "normal"){
            var id = localStorage.getItem('id');
            servicosServices.pesquisarPorIdPrestador(function(id, servico) {
                console.log("dentro do pesquisar");
                buildCards(servico);
            });
        }
    };

    function addCardFirst(servico, numServico){
        var div = document.createElement('div');
        div.className = 'col-md-4';
        div.innerHTML = '<div class="panel panel-primary">' +
                            '<div class="panel-heading">' +
                            '<h3 class="panel-title">' +
                                    'Serviço ' + numServico + '</h3>' +
                            '</div>' +
                            '<ul class="list-group">' +
                                '<a href="#" class="list-group-item">' + servico.tipoServico + '</a>' +
                                '<a href="#" class="list-group-item">' + servico.localServico + '</a>' +
                            '</ul>' +
                        '</div>';
        document.getElementById('rowCards0').appendChild(div);
    }

    function addCard(servico, num, numServico){
        var div = document.createElement('div');
        div.className = 'col-md-4';
        div.innerHTML = '<div class="panel panel-primary">' +
                            '<div class="panel-heading">' +
                            '<h3 class="panel-title">' +
                                    'Serviço ' + numServico + '</h3>' +
                            '</div>' +
                            '<ul class="list-group">' +
                                '<a href="#" class="list-group-item">' + servico.tipoServico + '</a>' +
                                '<a href="#" class="list-group-item">' + servico.localServico + '</a>' +
                            '</ul>' +
                        '</div>';

        document.getElementById('rowCards' + num).appendChild(div);
    }

    function addCardRow(num, numServico){
        var row = document.createElement('div');
        row.className = 'row';
        row.id = 'rowCards' + num;
        document.getElementById('rowContainer').appendChild(row);
    }
    
    function removeRows() {
        var node = document.getElementById('rowContainer');
        while(node.firstChild){
            node.removeChild(node.firstChild);
        }
        var div = document.createElement('div');
        div.className = 'row';
        div.id = 'rowCards0';
        document.getElementById('rowContainer').appendChild(div);
    }

    function buildCards(servico){
        removeRows();
        if(servico.data.length > 0){
            var num = 0;
            var numServico = 1;
            var count = 0;
            var first = true;
            var elementsAdd = false;
            servico.data.forEach(function(element) {
                if(count < 2){
                    if(first){
                        addCardFirst(element, numServico);
                    } else {
                        addCard(element, num, numServico);
                    }
                    if(count == 1){
                        elementsAdd = true;
                    }
                    if(count == 1 & first){
                        first = false;
                    }
                    numServico = numServico + 1;
                }
                count = count + 1;
                if(elementsAdd){
                    num = num + 1;
                    addCardRow(num, numServico);
                    count = 0;
                    elementsAdd = false;
                }
            }, this);
        }
    }

});