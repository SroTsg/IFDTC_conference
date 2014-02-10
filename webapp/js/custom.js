$(document).ready(function () {

    console.log("JS: SETUP APPCACHE LISTENER");
    window.applicationCache.addEventListener('updateready', function(e) {
        if (window.applicationCache.status == window.applicationCache.UPDATEREADY) {
          // Browser downloaded a new app cache.
          // Swap it in and reload the page to get the new version.
          //console.log("JS: APPCACHE UPDATED!!!");
          window.applicationCache.swapCache();
          //window.location.reload();
        } else {
          // Manifest didn't changed. Nothing new yet.
        }
      }, false);    

});

function loadMap(iframeSRC){
    var i = $("#collapseGoogle").find('iframe');
    i.delay(250).attr('src', iframeSRC);
}

function evaluationFormSubmission(formID, loaderID, completeID, buttonID){
    $("#"+formID).submit();
    $("#"+loaderID).show();
    setTimeout( 'killEvaluationFormSubmissionLoader("'+loaderID+'")', 900);
    setTimeout( 'showEvaluationFormSubmissionComplete("'+completeID+'")', 910);
    setTimeout( 'disableEvaluationFormSubmissionButton("'+buttonID+'")', 10);
}

function disableEvaluationFormSubmissionButton(buttonID){
    $("#"+buttonID).addClass("disabled");
}
function killEvaluationFormSubmissionLoader(loaderID){
    $("#"+loaderID).hide();   
}

function showEvaluationFormSubmissionComplete(completeID){
    $("#"+completeID).show();

    // hack to hide forms on home/dashboard screen
    $( "#HomepageEvalForm01" ).fadeOut( 1600 );
    $( "#HomepageEvalForm02" ).fadeOut( 1600 );
}
