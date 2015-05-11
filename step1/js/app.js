var demoApp = angular.module('demoApp', [
	'ngRoute',
	'demoControllers'
]);

demoApp.run(function($rootScope) {
    $rootScope.phones = null;
});

demoApp.config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
		when('/phones', {
			templateUrl: 'partials/phone-list.html',
			controller: 'PhoneListCtrl'
		}).
		when('/phones/:phoneId', {
			templateUrl: 'partials/phone-detail.html',
			controller: 'PhoneDetailCtrl'
		}).
		otherwise({
		redirectTo: '/phones'
	});
}]);