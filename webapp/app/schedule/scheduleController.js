'use strict';

/* Controllers */

function ScheduleCtrl($scope,$rootScope,$http,$timeout,$route,$routeParams,$window,scheduleService){

    /*
        SET THE ACTIVE PAGE
    */
    $rootScope.setActivatePage($route.current.controller.replace("Ctrl",""));
    $scope.favorites        = store.get('favoriteSessions');
    $scope.conferenceDates  = scheduleService.getConferenceDates();
    $scope.sessionId        = $routeParams.sessionId && $routeParams.sessionId || null; 
    $scope.swipedItemId     = false;
    $scope.trackFilter      = "";
    $scope.dateSelected     = $scope.dateSelected && $scope.dateSelected || $rootScope.conferenceDay;

    $scope.setTrackFilter = function(filter){
        $scope.trackFilter = filter;
    }

    $scope.grabTheData = function(){
    	scheduleService.getSchedule($scope.dateSelected).then(function(data){
    		$scope.sessions      = data;
            $scope.favorites     = store.get('favoriteSessions');

            var uniqueTracks = [];
            var tracks       = [];
            for(var track in $scope.sessions){
                if( data[track].track.toLowerCase()!='unknown' && data[track].track!='' ){
                    uniqueTracks[ data[track].track ] = data[track].track;
                }
            }

            for(var track in uniqueTracks){ tracks.push( track ); }
            tracks.sort(function(a,b) {
                                a = a.toLowerCase();
                                b = b.toLowerCase();
                                if( a == b) return 0;
                                if( a > b) return 1;
                                return -1;
                            });

            $scope.tracks = tracks;

            if($scope.sessions.length<=0){
                $scope.sessions = new Array();
                $scope.sessionsLoaded();
            }
    	},function(response){
            var today = new Date();
            $scope.sessionsLoaded();
            $scope.sessions = [{ "id":"-1", "title":"Oops!", "details":"There was a problem obtaining the schedule. Please make sure you have an internet connection.", "date": "01-Jan-1969", "starttime": "12:00 AM", "endtime": "12:00 AM" }];
    		console.log("Oops, could not get data: "+response);
    	});
    }

    /*
        LOADING Code 
    */
    $scope.isLoading = function(){
        return !$scope.loaded;
    }

    $scope.sessionsLoaded = function(){
        $scope.loaded=true;

        if(store.disabled){ return true; }  // Disable swipe if local storage not available

        for(var s in $scope.sessions){

            $("#"+$scope.sessions[s].id).on('tap doubletap taphold touchstart', function (event) { 
                //console.log("Tapped! (+)"); 
                if($scope.swipedItemId && $scope.swipedItemId!=this.id){
                    event.preventDefault(); 
                    $scope.undoAllSwipes(); 
                }
            });

            $("#"+$scope.sessions[s].id).on('swipe', function (event) {
                event.preventDefault();
                if(event.type.toLowerCase()=="swipe" && event.direction=="left"){
                    $scope.undoAllSwipes(this.id);
                    $("#btn01_"+this.id).html( !$scope.isFavorite(this.id) && "<span class=\"glyphicon glyphicon-plus-sign\"></span>" || "<span class=\"glyphicon glyphicon-minus-sign\"></span>" );
                    $("#btn01_"+this.id).removeClass( !$scope.isFavorite(this.id) && "removeItem" || "addItem" );
                    $("#btn01_"+this.id).addClass( $scope.isFavorite(this.id) && "removeItem" || "addItem" );
                    $("#btn01_"+this.id).removeClass("hide");
                    $("#action_"+this.id).removeClass("swiped-off-left-OFF").addClass("swiped-off-left");
                    $scope.swipedItemId = this.id;
                }else{
                    $scope.undoAllSwipes();
                }
            });
        }
        //console.log("Sessions loaded!");
    }

    $scope.undoAllSwipes = function(exclude){

        for(var s in $scope.sessions){
            if(exclude != $scope.sessions[s].id){
                $("#"+$scope.sessions[s].id).on('tap', function (event) { /*console.log("Tapped! (-)");*/  });
                $("#btn01_"+$scope.sessions[s].id).removeClass("fade").removeClass("in").addClass("hide");
                $("#action_"+$scope.sessions[s].id).removeClass("swiped-off-left").addClass("swiped-off-left-OFF");
            }
        }
        $scope.swipedItemId = exclude && exclude || false;

    }

    /*
        FILTERING Code 
    */
    $scope.changeDate = function(timeStamp, $event){
        if(timeStamp!='fav'){
            //$scope.sessions = new Array();
            $scope.loaded=false;
            $scope.dateSelected=timeStamp.substr(0,10) ? timeStamp.substr(0,10) : $scope.conferenceDates[0].substr(0,10);
            $scope.grabTheData();
        }else{
            $scope.dateSelected = timeStamp;
            $scope.sessions     = $scope.favorites;
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

    $scope.addToFavorites = function(sessionId, sessionObj){

        var favSessions = store.get('favoriteSessions');
            favSessions = favSessions ? favSessions : new Array();

        if(store.disabled){ 
            alert("Error. There seems to be a problem saving this information. Make sure your browser allows cookies.")
            return false;
        }else{
            favSessions.push(sessionObj);
            store.set('favoriteSessions', favSessions);
            $scope.favorites = store.get('favoriteSessions');
            $scope.undoAllSwipes();

            return true;
        }

        $scope.$apply();
    }

    $scope.removeFromFavorites = function(sessionId){

        var newFavSessions = new Array();
        var favSessions    = store.get('favoriteSessions');
            favSessions    = favSessions ? favSessions : new Array();

        if(store.disabled){ 
            alert("Error. There seems to be a problem removing this information. Make sure your browser allows cookies.")
            return false;
        }

        for(var x in favSessions){
            if(favSessions[x].id != sessionId){
                newFavSessions.push(favSessions[x]);
            }
        }

        store.set('favoriteSessions', newFavSessions);
        $scope.favorites = store.get('favoriteSessions');
        $scope.undoAllSwipes();
        
        return true;
    }

    $scope.toggleFavoriteFlag = function(sessionId, sessionObj){

        if($scope.isFavorite(sessionId))
            $scope.removeFromFavorites(sessionId);
        else
            $scope.addToFavorites(sessionId, sessionObj);
        
        $scope.$apply();
        
        return true;
    }

    $scope.grabTheData();
}



