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
            var gridId, wrapperId, tableId, table, pagerId, options;

            gridId = "users-grid";
            wrapperId = 'jqgrid-' + gridId;
            tableId = 'jqgrid-table-' + gridId;
            table = element.find('table');
            table.attr('id', tableId);
            pagerId = 'jqgrid-pager-' + gridId;

            element.find('.jqgrid-pagination').attr('id', pagerId);
            element.attr('id', wrapperId);

            options = {
                data: scope.gridData.data,
                jsonReader: scope.gridData.jsonReader,
                datatype: "local",
                editurl: 'clientArray',
                height: 'auto',
                colNames: scope.gridData.colNames || [],
                colModel: scope.gridData.colModel || [],
                multiselect: true,
                ignoreCase: true,
                sortname: "name",
                sortorder: "asc",
                sortable: true,
                rowNum: 10,
                rowList: [10, 20, 30],
                pager: '#' + pagerId,
                toolbarfilter: true,
                viewrecords: true,
            };
            table.jqGrid(options);
        }
    }
})();
