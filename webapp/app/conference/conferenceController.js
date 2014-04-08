'use strict';

/* Controllers */

function ConferenceCtrl($scope, $rootScope, $timeout, $route, $location, $templateCache, scheduleService){
    var today           = new Date();
    var todayFormatted  = today.getFullYear()+"-"+((today.getMonth()+1)<10&&"0"+(today.getMonth()+1)||(today.getMonth()+1))+"-"+(today.getDate()<10&&"0"+today.getDate()||today.getDate());
    var conferenceDates = scheduleService.getConferenceDates();

    $rootScope.hasLocalStorage      = !store.disabled;
    $rootScope.conferenceDay        = "";
    $rootScope.angularConferenceDay = "";

    // if we're not in the conference, go to the first day of the conference
    for(var d in conferenceDates){
        if(conferenceDates[d].substr(0,10)==todayFormatted){
            $rootScope.conferenceDay        = todayFormatted;
            $rootScope.angularConferenceDay = $rootScope.conferenceDay+"T100000Z";
        }
    }
    if($rootScope.conferenceDay==""){ 
        $rootScope.conferenceDay        = conferenceDates[0].substr(0,10); 
        $rootScope.angularConferenceDay = $rootScope.conferenceDay+"T100000Z";
    }
    
    $scope.readyForEval = function(){
        var strDateToShow = '2014-05-21';
        var intDateToShow = Date.parse( strDateToShow );
        var intToday      = Date.parse( todayFormatted );

        // stupid iPad 1 !!
        if(!intDateToShow){ intDateToShow = new Date( strDateToShow ); }
        if(!intToday){ intDateToShow = new Date( todayFormatted ); }

        if(intToday < intDateToShow){ return false; }
        if(store.get('tookOverallEval')){ return false; }

        return true;
    }

    $scope.tookOverallEval = function(){
        $timeout(function(){store.set('tookOverallEval',true);},2500);
    }

    $scope.clearCache = function() { 
        $templateCache.removeAll();
    }


    // ------------------
    // ROOT SCOPE STUFF
    // ------------------
    $rootScope.activePage = $rootScope.activePage!='' && $rootScope.activePage || '';

    $rootScope.isPageActive = function(pg){
        if( pg.toLowerCase()==$rootScope.activePage.toLowerCase() &&  $rootScope.activePage.toLowerCase()=="splash"){
            $location.path("/home");
            return false;
        }
        return pg.toLowerCase()==$rootScope.activePage.toLowerCase();
    }

    $rootScope.setActivatePage = function(pg){
        $rootScope.activePage = pg.toLowerCase();
    }

    // INIT FOR DEV
    // $templateCache.removeAll();
    // 
}

