'use strict';

/* Controllers */

function ScheduleDetailCtrl($scope,$http,$routeParams,$window,scheduleService){

	scheduleService.getSchedule().then(function(data){
		$scope.sessions  = data;
        $scope.sessionId = $routeParams.sessionId && $routeParams.sessionId || null; 
        $scope.session   = $scope.sessions[$scope.getSelectedSessionIndex()];
	},function(response){
		console.log("Oops, could not get data: "+response);
	});

    $scope.getSelectedSessionIndex = function(sessionId){
        sessionId     = sessionId && sessionId || $scope.sessionId;

        for(var x=0;x<$scope.sessions.length;x++){
            if($scope.sessions[x].id==sessionId){
                return x;
            }
        }
    }

    /*
        FAVORITES Code 
    */
    $scope.isFavorite = function(sessionId){

        var favSessions    = store.get('favoriteSessions');
            favSessions    = favSessions ? favSessions : new Array();

        for(var x in favSessions){
            if(favSessions[x].id == sessionId){ return true; }
        }

        return false;
    }

    $scope.hasFavorites = function(){
        var favSessions = store.get('favoriteSessions');
            favSessions = favSessions ? favSessions : new Array();

        return favSessions.length;
    }

    $scope.addToFavorites = function(sessionId){

        var favSessions = store.get('favoriteSessions');
            favSessions = favSessions ? favSessions : new Array();

        favSessions.push({id:sessionId});
        store.set('favoriteSessions', favSessions);
        return true;
    }

    $scope.removeFromFavorites = function(sessionId){

        var newFavSessions = new Array();
        var favSessions    = store.get('favoriteSessions');
            favSessions    = favSessions ? favSessions : new Array();


        for(var x in favSessions){
            if(favSessions[x].id != sessionId){
                newFavSessions.push(favSessions[x]);
            }
        }

        store.set('favoriteSessions', newFavSessions);
        return true;
    }
    
}



