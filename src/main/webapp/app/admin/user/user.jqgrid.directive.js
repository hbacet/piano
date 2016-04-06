(function() {
    'use strict';

    angular
        .module('pianoApp')
        .directive('userJqgrid', userJqgrid);

    function userJqgrid() {
        var directive = {
            restrict: 'E',
            replace: true,
            template: '<div>' +
            '<table></table>' +
            '<div class="jqgrid-pagination"></div>' +
            '</div>',
            link: linkFunc
        };

        return directive;

        function linkFunc(scope, element, attrs) {
            var gridId, wrapperId, tableId, table, pagerId, options, colModel, colNames;

            gridId = "users-grid";
            wrapperId = 'jqgrid-' + gridId;
            tableId = 'jqgrid-table-' + gridId;
            table = element.find('table');
            table.attr('id', tableId);
            pagerId = 'jqgrid-pager-' + gridId;

            element.find('.jqgrid-pagination').attr('id', pagerId);
            element.attr('id', wrapperId);

            /*, "Email", "Activated", "Language"*/
            colNames = ["Login", "First Name", "Last Name"];
            colModel = [{
                index: "login",
                name: "login"
            },{
                index: "firstName",
                name: "firstName"
            },{
                index: "lastName",
                name: "lastName"
            }];

            options = {
                url: 'api/users/jqgrid',
                height: 'auto',
                colNames: colNames,
                colModel: colModel,
                rowNum: 10,
                rowList: [10, 20, 30],
                pager: '#' + pagerId,
                sortname: 'id',
                toolbarfilter: true,
                viewrecords: true,
                sortorder: "asc",
                datatype: "json",
                loadBeforeSend: function (jqXHR, settings) {
                    try {
                        jqXHR.setRequestHeader("Authorization", 'Bearer ' + JSON.parse(localStorage.getItem("jhi-authenticationToken")).access_token);
                    } catch (e) {
                    }
                },
                loadError: function (xhr, status, error) {
                },
                multiselect: true,
                autowidth: true
            };
            table.jqGrid(options);
            table.jqGrid('navGrid', '#' + pagerId, {
                edit: true,
                add: true,
                del: true,
                search: false
            });
        }
    }
})();
