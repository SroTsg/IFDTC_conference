'use strict';

/* Services */

function TwitterService($http, $q){

	this.getInfo = function(){
	    var today      = new Date();
	    var sinceDate  = today.getFullYear()+"-01-01";
		var info = {
			jsonURL 		 : 'json/twitter-search?since='+sinceDate+'&term=',
			description		 : 'Kuali Days Tweets!',
			tweetSearchTerm  : "@Kuali",
			tweetSearchTerm2 : "#KualiDays"
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



