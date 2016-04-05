(function() {
    'use strict';

    angular
        .module('pianoApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('user', {
            parent: 'admin',
            url: '/user',
            data: {
                authorities: ['ROLE_ADMIN'],
                pageTitle: 'user-management.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/admin/user/user.html',
                    controller: 'UserController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('user-management');
                    return $translate.refresh();
                }]
            }
        });
    }
})();
