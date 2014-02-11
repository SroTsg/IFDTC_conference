'use strict';

/* Controllers */

function ActivitiesCtrl($scope,$rootScope,$route,$http,$window,activitiesService){

    /*
        SET THE ACTIVE PAGE
    */
    $rootScope.setActivatePage($route.current.controller.replace("Ctrl",""));

    $scope.loaded     = false;

    $scope.grabTheData = function(){
        activitiesService.getActivities().then(function(data){
            $scope.activities  = data;
            if($scope.activities.length<=0){
                $scope.activities = new Array();
                $scope.activitiesLoaded();
            }
        },function(response){
            console.log("Oops, could not get data: "+response);
            $scope.activities = [{ "title":"Oops!", "task" : "An internet connection is required to view the activities." }];
            $scope.activitiesLoaded();
        });
    }


    $scope.hasActivities = function(d){

        for(var a in $scope.activities){
            if($scope.activities[a].date==d){ return true; }
        }

        return false;
    }

    /*
        LOADING Code 
    */
    $scope.isLoading = function(){
        return !$scope.loaded;
    }
    $scope.activitiesLoaded = function(){
        $scope.loaded=true;
    }

    /*
        DISPLAY Code
    */
    
    $scope.evaluationFormSubmission = function(formID, loaderID, completeID, buttonID){
    $("#"+formID).submit();
    $("#"+loaderID).show();
    setTimeout( 'killEvaluationFormSubmissionLoader("'+loaderID+'")', 900);
    setTimeout( 'showEvaluationFormSubmissionComplete("'+completeID+'")', 910);
    setTimeout( 'disableEvaluationFormSubmissionButton("'+buttonID+'")', 10);
    }

    $scope.disableEvaluationFormSubmissionButton = function(buttonID){
    $("#"+buttonID).addClass("disabled");
    }
    $scope.killEvaluationFormSubmissionLoader = function(loaderID){
    $("#"+loaderID).hide();   
    }

    $scope.showEvaluationFormSubmissionComplete = function(completeID){
    $("#"+completeID).show();

    // hack to hide forms on home/dashboard screen
    $( "#HomepageEvalForm01" ).fadeOut( 1600 );
    $( "#HomepageEvalForm02" ).fadeOut( 1600 );
    }



    // INIT
    $scope.grabTheData();
}


