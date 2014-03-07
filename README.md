IFDTC_conference
================

Conference app made using the Kuali Conference App framework (http://www.kuali.org/)

Programmed in HTML with AngularJS & Bootstrap

Major things to edit
--------------------

Most of the edits are done in app/[appname]/[appname]Service.js
The following have values that you should edit:
* app/activities/activitiesService.js - jsonURL
* app/attendees/attendeesService.js - jsonURL
* app/directive-templates/session-modal.html - the form tag's action command, as well as the form
* app/schedule/scheduleService.js - jsonURL
* app/twitter/twitterService.js - jsonURL, tweetSearchTerm, tweetSearchTerm2
* views/map.html - All of this, it's just an html page with bootstrap
* views/conference.html - the form tag's action commmand, as well as the form
* views/activites.html - the form tag's action commmand, as well as the form
* index.html - iframe near the bottom contains src tag
* Any of the style sheets as needed as well as corresponding images

There's example JSON data in the webapp/Data folder if you want to make any edits to how the data is parsed
