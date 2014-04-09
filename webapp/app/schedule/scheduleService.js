'use strict';

/* Services */

function timesplit(timelist)
{
    var splittime = timelist.split(":");
		splittime.pop();
		var ampm = " AM";
		if (splittime[0] == 12)
		    {
		        ampm = " PM";
		    }
		if (splittime[0] > 12)
		{
		    ampm = " PM";
		    splittime[0] = splittime[0]-12;

		}
		return splittime.join(":")+ampm;
}

function ScheduleService($http, $q, $scope, $rootScope){

	this.getConferenceDates = function(){
		return {
				0:	"2014-05-18T100000Z",
				1:	"2014-05-19T100000Z",
				2: 	"2014-05-20T100000Z",
				3:	"2014-05-21T100000Z"
		}
	}

	this.getInfo = function(str_date){
		var info = {
		    jsonURL: 'http://sro-django.isr.umich.edu/djangoapp/agenda/' + str_date,
			description	: 'Schedule of all the sesssion. Have fun!'
		}
		return info;
	}

	this.getSchedule = function(str_date){
		var defer 			  = $q.defer();
		var datesOfConference = this.getConferenceDates();

		$http({
			method : 'GET',
			url : this.getInfo(str_date).jsonURL
		}).success(function(data, status, headers, config) {
			var sessions = data;
			var monthNameToNumber = {
					"Jan":"01",
					"Feb":"02",
					"Mar":"03",
					"Apr":"04",
					"May":"05",
					"Jun":"06",
					"Jul":"07",
					"Aug":"08",
					"Sep":"09",
					"Oct":"10",
					"Nov":"11",
					"Dec":"12"
				}

			// let's add data and re-format some
			var oneDayInMiliseconds = 86400000;	// Hack because Angular is odd.
			for(var s in sessions){

				// IE making us reformat date
				var forIEDateArray = sessions[s].date.split('-');
				sessions[s].date   = forIEDateArray[2]+"-"+monthNameToNumber[forIEDateArray[1]]+"-"+(parseInt(forIEDateArray[0])+1);
				sessions[s].starttime = timesplit(sessions[s].starttime);
				sessions[s].endtime = timesplit(sessions[s].endtime);
				var startDateTime  = Date.parse(sessions[s].date+' '+sessions[s].starttime);

				// on iPad 1, IE 'fix' doesn't work.
				if(isNaN(startDateTime)){
					sessions[s].date = monthNameToNumber[forIEDateArray[1]]+"/"+(parseInt(forIEDateArray[0]))+"/"+forIEDateArray[2];
					startDateTime    = new Date(sessions[s].date+' '+sessions[s].starttime);
				}

				sessions[s].dateObject = startDateTime;
				sessions[s].dateParsed = Date.parse(sessions[s].date);
				//console.log((startDateTime/1000000000) + " ["+sessions[s].date+' '+sessions[s].starttime+"] <= [2013-11-19 10:00 AM']" + (Date.parse('2013-11-19 10:00 AM')/1000000000));
				sessions[s].isOver	   = startDateTime<=(new Date()).getTime()+oneDayInMiliseconds;
			}

			defer.resolve(sessions);
		}).error(function(data, status, headers, config) {
			defer.reject(status);
		});

		return defer.promise;		
	}

}



