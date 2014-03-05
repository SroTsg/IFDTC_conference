'use strict';

/* Services */

function TwitterService($http, $q){

	this.getInfo = function(){
	    var today      = new Date();
	    var sinceDate  = today.getFullYear()+"-01-01";
		var info = {
			jsonURL 		 : 'http://odk-dev.isr.umich.edu/twitter/',
			description		 : 'IFDTC Tweets!',
			tweetSearchTerm  : "%23ifdtc",
			tweetSearchTerm2 : "@ifdtc2014"
		}

		return info;
	}

	this.getTweetsBySearch = function(term){
		term = term && term || this.getInfo().tweetSearchTerm;

		var defer = $q.defer();

		$http({
			method : 'GET',
			url : this.getInfo().jsonURL+escape(term)
		}).success(function(data, status, headers, config) {
			defer.resolve(data);
		}).error(function(data, status, headers, config) {
			defer.reject(status);
		});

		return defer.promise;		
	}

}



