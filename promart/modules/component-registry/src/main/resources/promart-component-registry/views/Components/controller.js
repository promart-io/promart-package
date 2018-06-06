angular.module('page', []);
angular.module('page')
.factory('$messageHub', [function(){
	var messageHub = new FramesMessageHub();

	var message = function(evtName, data){
		messageHub.post({data: data}, 'promart.promart-component-registry.Components.' + evtName);
	};

	var on = function(topic, callback){
		messageHub.subscribe(callback, topic);
	};

	return {
		message: message,
		on: on,
		onEntityRefresh: function(callback) {
			on('promart.promart-component-registry.Components.refresh', callback);
		},
		messageEntityModified: function() {
			message('modified');
		}
	};
}])
.controller('PageController', function ($scope, $http, $messageHub) {

	var api = '/services/v3/js/promart-component-registry/api/Components.js';
	var categoryOptionsApi = '/services/v3/js/promart-data/api/Categories.js';
	var industryOptionsApi = '/services/v3/js/promart-data/api/Industries.js';
	var licenseOptionsApi = '/services/v3/js/promart-data/api/License.js';
	var developerOptionsApi = '/services/v3/js/promart-accounts/api/Developers.js';

	$scope.categoryOptions = [];

	$scope.industryOptions = [];

	$scope.licenseOptions = [];

	$scope.developerOptions = [];

	function categoryOptionsLoad() {
		$http.get(categoryOptionsApi)
		.success(function(data) {
			$scope.categoryOptions = data;
		});
	}
	categoryOptionsLoad();

	function industryOptionsLoad() {
		$http.get(industryOptionsApi)
		.success(function(data) {
			$scope.industryOptions = data;
		});
	}
	industryOptionsLoad();

	function licenseOptionsLoad() {
		$http.get(licenseOptionsApi)
		.success(function(data) {
			$scope.licenseOptions = data;
		});
	}
	licenseOptionsLoad();

	function developerOptionsLoad() {
		$http.get(developerOptionsApi)
		.success(function(data) {
			$scope.developerOptions = data;
		});
	}
	developerOptionsLoad();

	function load() {
		$http.get(api)
		.success(function(data) {
			$scope.data = data;
		});
	}
	load();

	$scope.openNewDialog = function() {
		$scope.actionType = 'new';
		$scope.entity = {};
		toggleEntityModal();
	};

	$scope.openEditDialog = function(entity) {
		$scope.actionType = 'update';
		$scope.entity = entity;
		toggleEntityModal();
	};

	$scope.openDeleteDialog = function(entity) {
		$scope.actionType = 'delete';
		$scope.entity = entity;
		toggleEntityModal();
	};

	$scope.close = function() {
		load();
		toggleEntityModal();
	};

	$scope.create = function() {
		$http.post(api, JSON.stringify($scope.entity))
		.success(function(data) {
			load();
			toggleEntityModal();
			$messageHub.messageEntityModified();
		}).error(function(data) {
			alert(JSON.stringify(data));
		});
			
	};

	$scope.update = function() {
		$http.put(api + '/' + $scope.entity.Id, JSON.stringify($scope.entity))

		.success(function(data) {
			load();
			toggleEntityModal();
			$messageHub.messageEntityModified();
		}).error(function(data) {
			alert(JSON.stringify(data));
		})
	};

	$scope.delete = function() {
		$http.delete(api + '/' + $scope.entity.Id)
		.success(function(data) {
			load();
			toggleEntityModal();
			$messageHub.messageEntityModified();
		}).error(function(data) {
			alert(JSON.stringify(data));
		});
	};

	$scope.categoryOptionValue = function(optionKey) {
		for (var i = 0 ; i < $scope.categoryOptions.length; i ++) {
			if ($scope.categoryOptions[i].Id === optionKey) {
				return $scope.categoryOptions[i].Name;
			}
		}
		return null;
	};
	$scope.industryOptionValue = function(optionKey) {
		for (var i = 0 ; i < $scope.industryOptions.length; i ++) {
			if ($scope.industryOptions[i].Id === optionKey) {
				return $scope.industryOptions[i].Name;
			}
		}
		return null;
	};
	$scope.licenseOptionValue = function(optionKey) {
		for (var i = 0 ; i < $scope.licenseOptions.length; i ++) {
			if ($scope.licenseOptions[i].Id === optionKey) {
				return $scope.licenseOptions[i].Name;
			}
		}
		return null;
	};
	$scope.developerOptionValue = function(optionKey) {
		for (var i = 0 ; i < $scope.developerOptions.length; i ++) {
			if ($scope.developerOptions[i].Id === optionKey) {
				return $scope.developerOptions[i].Name;
			}
		}
		return null;
	};

	$messageHub.onEntityRefresh(load);

	function toggleEntityModal() {
		$('#entityModal').modal('toggle');
	}
});