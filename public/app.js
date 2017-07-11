app.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise('/home');
    $stateProvider.state('home', {
        url: '/home',
        templateUrl: 'partial-home.html'
    }).state('home.list', {
        url: '/list',
        templateUrl: 'partial-home-list.html',
        controller: 'HomeListCtrl'
    })
})