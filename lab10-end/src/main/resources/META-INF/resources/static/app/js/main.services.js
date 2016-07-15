var wafepaApp = angular.module('wafepaApp.services', []);

wafepaApp.service('activityService', function($http) {
	
	this.url = 'api/activities';
	
	this.getOne = function(id) {
		return $http.get(this.url + '/' + id);
	};
	
	this.remove = function(id) {
		return $http.delete(this.url + '/' + id);
	};
	
	this.getAll = function(name, page) {
		return $http.get(this.url, { params: {'name': name, 'page': page} });
	};
	
	this.save = function(activity) {
		if (activity.id) {
			return $http.put(this.url + '/' + activity.id, activity);
		} else {
			return $http.post(this.url, activity);
		}
	};
});