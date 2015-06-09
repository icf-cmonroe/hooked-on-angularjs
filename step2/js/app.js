var demoApp = angular.module('demoApp', [
    'ngTouch',
    'demoControllers'
]);

demoApp.directive('googlemap', function($rootScope) {
    return {
        restrict: 'E',
        replace: true,
        template: '<div></div>',
        link: function(scope, element, attrs) {
            var map = null;
            var marker = new google.maps.Marker();
            var infowindow = new google.maps.InfoWindow();
            var mapOptions = {
                zoom: Number(attrs.zoom),
                center: new google.maps.LatLng(attrs.latitude, attrs.longitude),
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            
            map = new google.maps.Map(document.getElementById(attrs.id), mapOptions);

            scope.$on('locationUpdated', function() {
                var latlong = new google.maps.LatLng($rootScope.latitude, $rootScope.longitude);
                marker = new google.maps.Marker({ position: latlong, title: "Your Location is " + $rootScope.latitude + ", " + $rootScope.longitude, description: "Hey this is where I'm currently at!", map: map});
                map.setZoom(16);
                map.panTo(latlong);

                google.maps.event.addListener(marker, 'click', function() {
                    infowindow.setContent("<h2>" + marker.title + "</h2>" + "<p>" + marker.description + "</p>");
                    infowindow.open(map, marker);
                });
            });
        }
    };
});

demoApp.factory('geolocation', ['$q',
    function ($q) {
        return function () {
            var deferred = $q.defer();
            var options = { maximumAge: 15000, timeout: 15000, enableHighAccuracy: false };

            function onSuccess(position) {
                deferred.resolve(position);
            }

            function onError(error) {
                navigator.notification.alert('There was a problem locating your position, please manually enter your city, state or zipcode.', null, 'Failed to Locate Position', 'Close');
                deferred.resolve(null);
            }

            navigator.geolocation.getCurrentPosition(onSuccess, onError, options);

            return deferred.promise;
        };
    }
]);