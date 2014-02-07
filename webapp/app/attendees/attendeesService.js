'use strict';

/* Services */

function AttendeesService($http, $q){

	this.getInfo = function(letter){
		var info = {
		    jsonURL 	: 'http://odk-dev.isr.umich.edu/attendees/'+(letter && letter.toLowerCase() || 'all'),
			description	: 'Who be at th is thing?'
		}

		return info;
	}

	this.getAttendees = function(letter){
		var defer = $q.defer();

		$http({
			method : 'GET',
			url : this.getInfo( letter ).jsonURL
		}).success(function(data, status, headers, config) {
			var registrants = data.registrants && data.registrants || data;

			for(var r in registrants){
				registrants[r].letter = registrants[r].lastname.substr(0,1).toUpperCase();
			}

			defer.resolve(registrants);
		}).error(function(data, status, headers, config) {
			defer.reject(status);
		});

		return defer.promise;
	}

}



