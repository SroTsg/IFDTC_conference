'use strict';

/* Controllers */

function MapCtrl($scope,$rootScope,$route,$http,$window,mapService){

    /*
        SET THE ACTIVE PAGE
    */
    $rootScope.setActivatePage($route.current.controller.replace("Ctrl",""));
}



