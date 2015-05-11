var demoControllers = angular.module('demoControllers', []);

demoControllers.controller('PhoneListCtrl', ['$scope', '$rootScope', '$http',
	function ($scope, $rootScope, $http) {
		if(angular.isObject($rootScope.phones)) {
			$scope.phones = $rootScope.phones;
		} else {
			$http.get('/json/phones.json').success(function(data) {
				$rootScope.phones = $scope.phones = data;
			});
		}
	}
]);

demoControllers.controller('PhoneDetailCtrl', ['$scope', '$rootScope', '$routeParams',
	function($scope, $rootScope, $routeParams) {
		$scope.phoneId = $routeParams.phoneId;
		$scope.phones = $rootScope.phones;
	}
]);
