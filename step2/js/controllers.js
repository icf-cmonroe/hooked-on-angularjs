var demoControllers = angular.module('demoControllers', []);

demoControllers.controller('LocateCtrl', ['$scope', '$rootScope', 'geolocation',
	function($scope, $rootScope, geolocation) {
		$scope.locate = function() {
			geolocation().then(function(position) {
				if(position !== null) {
					$rootScope.latitude = position.coords.latitude;
					$rootScope.longitude = position.coords.longitude;
					$rootScope.$broadcast("locationUpdated");
				} else {
					alert("Location Lookup Error!");
				}
			});
		};
	}
]);