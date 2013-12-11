'use strict';

/* Services */

function MapService($http, $q){

	this.getInfo = function(letter){
		var info = {
			jsonURL 	: '',
			description	: 'Where is this thing?'
		}
		return info;
	}

}



