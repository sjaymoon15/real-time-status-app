(function(){
	'use strict';

	angular
		.module('statusApp')
		.controller('AuthController', AuthController);

	function AuthController(Auth, User, $state){
		var vm = this;
		console.log("this in AuthController", this); //is it like a $scope?

		vm.createUser = createUser;
		vm.login = login;
		vm.loggedInUser;

		function createUser(){
			//If there is already a user logged in,
			// log them out before proceeding
			Auth.$unauth();

			Auth.$createUser({
				email: vm.email,
				password: vm.password
			})
			.then(function(userData){
				saveUser(userData);
				login();
			})
			.catch(function(error){
				vm.error = error;
			});
		}

		function saveUser(userData){
			var user = User.newUserRef(userData);
			user.username = vm.username;
			user.email = vm.email;

			user.$save()  //angularFire method
			.then(function(success){
				vm.username = null;
				vm.email = null;
				vm.password = null;
				$state.go('status');
			}, function(error){
				console.log('there was an error'+ error);
			});
		}

		function login(){
			Auth.$authWithPassword({
				email: vm.email,
				password: vm.password
			})
			.then(function(data){
				vm.email = null;
				vm.password = null;
				$state.go('status');
			})
			.catch(function(error){
				console.log(error);
			});
		}
	}

})();