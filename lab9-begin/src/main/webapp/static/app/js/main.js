var wafepaApp = angular.module('wafepaApp', ['ngRoute']);

wafepaApp.controller('ActivityController', function($scope, $http, $location, $routeParams) {
	
	$scope.getAll = function() {
		$http.get('api/activities')  // HTTP GET api/activities
				.success(function(data) {
					$scope.activities = data;
					$scope.hideSpinner = true;
				})
				.error(function() {
					$scope.showError = true;
					$scope.hideSpinner = true;
				});
	};
	
	$scope.remove = function(id) {
		$http.delete('api/activities/' + id)
				.success(function() {
					$scope.getAll();
				})
				.error(function() {
					
				});
	};
	
	$scope.init = function() {
		$scope.activity = {};
		
		if ($routeParams.id) {  // edit stranica
			$http.get('api/activities/' + $routeParams.id)
					.success(function(data) {
						$scope.activity = data;
					})
					.error(function() {
						
					});
		}
	};
	
	$scope.save = function() {
		if ($scope.activity.id) {
			$http.put('api/activities/' + $scope.activity.id, $scope.activity)
					.success(function() {
						$location.path('/activities');
					})
					.error(function() {
						
					});
		} else {
			$http.post('api/activities', $scope.activity)
					.success(function() {
						$location.path('/activities');
					})
					.error(function() {
						
					});
		}
	};
});

wafepaApp.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl : '/static/app/html/partial/home.html'
        })
        .when('/activities', {
            templateUrl : '/static/app/html/partial/activities.html',
            controller : 'ActivityController'
        })
        .when('/activities/add', {
            templateUrl : '/static/app/html/partial/addEditActivity.html',
            controller : 'ActivityController'
        })
        .when('/activities/edit/:id', {
            templateUrl : '/static/app/html/partial/addEditActivity.html',
            controller : 'ActivityController'
        })
        .otherwise({
            redirectTo: '/'
        });
}]);