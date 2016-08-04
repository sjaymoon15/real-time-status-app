(function(){
	'use strict';

	angular
		.module('statusApp')
		.factory('Auth', AuthService)
		
	function AuthService($firebaseAuth){
		var ref = new firebase('https://realtimestatusupdate.firebaseio.com');
		return $firebaseAuth(ref);
	}

})();