app.controller('MenuCtrl', function ($scope, $location, servicosServices, prestadorServices) {
    $(document).ready(function () {
        montaMenuByUser();
        var navItems = $('.admin-menu li > a');
        var navListItems = $('.admin-menu li');
        var allWells = $('.admin-content');
        var allWellsExceptFirst = $('.admin-content:not(:first)');
        allWellsExceptFirst.hide();
        navItems.click(function (e) {
            e.preventDefault();
            navListItems.removeClass('active');
            $(this).closest('li').addClass('active');
            allWells.hide();
            var target = $(this).attr('data-target-id');
            $('#' + target).show();
        });
        document.getElementById('teste').onclick = function() {
            listaCardPrestador();
        }
    });

    $scope.prestador = {
        "nome": "",
        "cpf": "",
        "tipo": "",
        "senha": ""
    };

    $scope.servico = {
        "tipoServico": "",
        "localServico": "",
        "idPrestador": ""
    };

    $scope.salvarPrestador = function (prestador) {
        var e = document.getElementById("dropdownPrestador");
        var selectedText = e.options[e.selectedIndex].text;
        prestador.tipo = selectedText.toLowerCase();
        prestadorServices.salvar(prestador, function () {
            document.forms["formCadastroPrestador"].reset();
        });
    };

    $scope.salvar = function (servico) {
        servico.idPrestador = localStorage.getItem('id');
        servicosServices.salvar(servico, function () {
            document.forms["formCadastro"].reset();
        });
    };

    $scope.listarServico = function () {
        listaByUserType();
    };

    $scope.pesquisaServico = function (pesquisa) {
        var e = document.getElementById("dropdownServico");
        var selectedText = e.options[e.selectedIndex].text;
        if (pesquisa) {
            switch (selectedText) {
                case 'Tipo':
                    servicosServices.pesquisarPorTipoServico(pesquisa, function (servico) {
                        buildCardsServicos(servico);
                    });
                    break;
                case 'Local':
                    servicosServices.pesquisarPorLocalServico(pesquisa, function (servico) {
                        buildCardsServicos(servico);
                    });
                    break;
                default:
                    break;
            }
        } else {
            listaByUserType();
        }
    };

    $scope.pesquisaPrestador = function (pesquisa) {
        var e = document.getElementById("dropdownPrestadorPesquisa");
        var selectedText = e.options[e.selectedIndex].text;
        if (pesquisa) {
            switch (selectedText) {
                case 'Nome':
                    prestadorServices.pesquisarPorNome(pesquisa, function (prestador) {
                        buildCardsPrestador(prestador);
                    });
                    break;
                case 'CPF':
                    prestadorServices.pesquisarPorCpfLista(pesquisa, function (prestador) {
                        buildCardsPrestador(prestador);
                    });
                    break;
                case 'Tipo':
                prestadorServices.pesquisarPorTipo(pesquisa, function (prestador) {
                    buildCardsPrestador(prestador);
                });
                break;
                default:
                    break;
            }
        } else {
            listaCardPrestador();
        }
    };

    function addCardFirstServico(servico, numServico) {
        var div = document.createElement('div');
        div.className = 'col-md-4';
        div.innerHTML = '<div class="panel panel-primary">' +
            '<div class="panel-heading">' +
            '<h3 class="panel-title">' +
            'Serviço ' + numServico + '</h3>' +
            '</div>' +
            '<ul class="list-group">' +
            '<p class="list-group-item">Tipo: ' + servico.tipoServico + '</p>' +
            '<p class="list-group-item">Local: ' + servico.localServico + '</p>' +
            '</ul>' +
            '</div>';
        document.getElementById('rowCards0').appendChild(div);
    }

    function addCardServico(servico, num, numServico) {
        var div = document.createElement('div');
        div.className = 'col-md-4';
        div.innerHTML = '<div class="panel panel-primary">' +
            '<div class="panel-heading">' +
            '<h3 class="panel-title">' +
            'Serviço ' + numServico + '</h3>' +
            '</div>' +
            '<ul class="list-group">' +
            '<p class="list-group-item">Tipo: ' + servico.tipoServico + '</p>' +
            '<p class="list-group-item">local: ' + servico.localServico + '</p>' +
            '</ul>' +
            '</div>';

        document.getElementById('rowCards' + num).appendChild(div);
    }

    function addCardRow(num) {
        var row = document.createElement('div');
        row.className = 'row';
        row.id = 'rowCards' + num;
        document.getElementById('rowContainer').appendChild(row);
    }
    function removeRows() {
        var node = document.getElementById('rowContainer');
        while (node.firstChild) {
            node.removeChild(node.firstChild);
        }
        var div = document.createElement('div');
        div.className = 'row';
        div.id = 'rowCards0';
        document.getElementById('rowContainer').appendChild(div);
    }

    function buildCardsServicos(servico) {
        removeRows();
        if (servico.data.length > 0) {
            var num = 0;
            var numServico = 1;
            var count = 0;
            var first = true;
            var elementsAdd = false;
            servico.data.forEach(function (element) {
                if (count < 2) {
                    if (first) {
                        addCardFirstServico(element, numServico);
                    } else {
                        addCardServico(element, num, numServico);
                    }
                    if (count === 1) {
                        elementsAdd = true;
                    }
                    if (count === 1 && first) {
                        first = false;
                    }
                    numServico = numServico + 1;
                }
                count = count + 1;
                if (elementsAdd) {
                    num = num + 1;
                    addCardRow(num);
                    count = 0;
                    elementsAdd = false;
                }
            }, this);
        }
    }

    function listaByUserType() {
        var codigo = localStorage.getItem('id');
        switch (localStorage.getItem('tipo')) {
            case 'admin':
                servicosServices.listar(function (servico) {
                    buildCardsServicos(servico);
                });
                break;
            case 'normal':
                servicosServices.pesquisarPorIdPrestador(codigo, function (servico) {
                    buildCardsServicos(servico);
                });
                break;
            default:
                break;
        }
    }

    function montaMenuByUser() {
        var tipo = localStorage.getItem('tipo');
        if (tipo === 'admin') {
            var li = document.createElement('li');
            li.innerHTML = '<a href="" data-target-id="cadastroPrestador"><i class="fa fa-list-alt fa-fw"></i>Cadastrar Prestador</a>';
            document.getElementById('menuLateral').appendChild(li);
            li = document.createElement('li');
            li.innerHTML = '<a href="" data-target-id="listaPrestador" id="teste"><i class="fa fa-list-alt fa-fw"></i>Listar Prestadores</a>';
            document.getElementById('menuLateral').appendChild(li);
        }
    }

    function buildCardsPrestador(prestador) {
        removeRowsPrestador();
        if (prestador.data.length > 0) {
            var num = 0;
            var numprestador = 1;
            var count = 0;
            var first = true;
            var elementsAdd = false;
            prestador.data.forEach(function (element) {
                if (count < 2) {
                    if (first) {
                        addCardFirstPrestador(element, numprestador);
                    } else {
                        addCardPrestador(element, num, numprestador);
                    }
                    if (count === 1) {
                        elementsAdd = true;
                    }
                    if (count === 1 && first) {
                        first = false;
                    }
                    numprestador = numprestador + 1;
                }
                count = count + 1;
                if (elementsAdd) {
                    num = num + 1;
                    addCardRowPrestador(num);
                    count = 0;
                    elementsAdd = false;
                }
            }, this);
        }
    }

    function addCardFirstPrestador(prestador, numServico) {
        var div = document.createElement('div');
        div.className = 'col-md-4';
        div.innerHTML = '<div class="panel panel-primary">' +
            '<div class="panel-heading">' +
            '<h3 class="panel-title">' +
            'Nome: ' + prestador.nome + '</h3>' +
            '</div>' +
            '<ul class="list-group">' +
            '<p class="list-group-item">CPF: ' + prestador.cpf + '</p>' +
            '<p class="list-group-item">Tipo: ' + prestador.tipo + '</p>' +
            '</ul>' +
            '</div>';
        document.getElementById('rowCardsP0').appendChild(div);
    }

    function addCardPrestador(prestador, num, numServico) {
        var div = document.createElement('div');
        div.className = 'col-md-4';
        div.innerHTML = '<div class="panel panel-primary">' +
            '<div class="panel-heading">' +
            '<h3 class="panel-title">' +
            'Nome: ' + prestador.nome + '</h3>' +
            '</div>' +
            '<ul class="list-group">' +
            '<p class="list-group-item">CPF: ' + prestador.cpf + '</p>' +
            '<p class="list-group-item">Tipo: ' + prestador.tipo + '</p>' +
            '</ul>' +
            '</div>';
        document.getElementById('rowCardsP' + num).appendChild(div);
    }
    function addCardRowPrestador(num) {
        var row = document.createElement('div');
        row.className = 'row';
        row.id = 'rowCardsP' + num;
        document.getElementById('rowContainerPrestador').appendChild(row);
    }
    function removeRowsPrestador() {
        var node = document.getElementById('rowContainerPrestador');
        while (node.firstChild) {
            node.removeChild(node.firstChild);
        }
        var div = document.createElement('div');
        div.className = 'row';
        div.id = 'rowCardsP0';
        document.getElementById('rowContainerPrestador').appendChild(div);
    }

    function listaCardPrestador() {
        prestadorServices.listar(function (prestador) {
            buildCardsPrestador(prestador);
        });
    }

});