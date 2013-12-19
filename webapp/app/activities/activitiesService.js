'use strict';

/* Services */

function ActivitiesService($http, $q){

	this.getInfo = function(){
		var info = {
		    jsonURL: 'http://ifdtc.azurewebsites.net/data/activities/feed.json',
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



