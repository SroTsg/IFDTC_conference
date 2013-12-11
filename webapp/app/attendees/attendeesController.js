'use strict';

/* Controllers */

function AttendeesCtrl($scope,$rootScope,$route,$http,$window,attendeesService){

    /*
        SET THE ACTIVE PAGE
    */
    $rootScope.setActivatePage($route.current.controller.replace("Ctrl",""));

    $scope.loaded    = false;
    $scope.orgFilter = "";

    $scope.grabTheData = function(){
        attendeesService.getAttendees($rootScope.attendeeLetterChosen).then(function(data){
            $scope.attendees  = data;

            var uniqueOrganizations = [];
            var organizations       = [];
            for(var org in $scope.attendees){
                if( data[org].organization.toLowerCase()!='unknown' && data[org].organization!='' ){
                    uniqueOrganizations[ data[org].organization ] = data[org].organization;
                }
            }
            
            for(var org in uniqueOrganizations){ organizations.push( uniqueOrganizations[org] ); }
            organizations.sort(function(a,b) {
                                a = a.toLowerCase();
                                b = b.toLowerCase();
                                if( a == b) return 0;
                                if( a > b) return 1;
                                return -1;
                            });
            $scope.organizations = organizations;

            $scope.attendeesLoaded();
            if($scope.attendees.length<=0){
                $scope.attendees = new Array();
            }
        },function(response){
            console.log("Oops, could not get data: "+response);
            $scope.attendees = new Array();
            $scope.attendeesLoaded();
        });
    }


    /*
        LOADING Code 
    */
    $scope.isLoading = function(){
        return !$scope.loaded;
    }
    $scope.attendeesLoaded = function(){
        $scope.loaded=true;
    }

    /*
        DISPLAY Code
    */
    $scope.filterAttendees = function(filter, $event){

        $scope.loaded                   = false;
        $scope.orgFilter                = '';
        $rootScope.attendeeLetterChosen = '';
        $scope.attendees                = [];
        
        if(filter.length>1){
            $rootScope.attendeeLetterChosen = 'All';
            $scope.orgFilter                = filter;
        }else{
            $rootScope.attendeeLetterChosen = filter;
        }

        $scope.grabTheData();
    }


    // INIT
    $scope.grabTheData();
}



