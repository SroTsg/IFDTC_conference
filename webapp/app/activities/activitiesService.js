'use strict';

/* Services */

function ActivitiesService($http, $q){

	this.getInfo = function(){
		var info = {
			jsonURL 	: '/json/passthrough?feedurl='+escape('https://iu.edu/~iumobile/kme3beta/conference/json/activities/feed.json'),
			description	: 'Whatcha wanna do?'
		}

		return info;
	}

	this.getActivities = function(){
		var defer = $q.defer();

		$http({
			method : 'GET',
			url : this.getInfo().jsonURL
		}).success(function(data, status, headers, config) {
			defer.resolve(data);
		}).error(function(data, status, headers, config) {
			defer.reject(status);
		});

		return defer.promise;
	}

}



