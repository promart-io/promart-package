angular.module('page', []);
angular.module('page')
.factory('$messageHub', [function(){
	var messageHub = new FramesMessageHub();

	var message = function(evtName, data){
		messageHub.post({data: data}, 'promart.promart-marketplace.Products.' + evtName);
	};

	var on = function(topic, callback){
		messageHub.subscribe(callback, topic);
	};

	return {
		message: message,
		on: on,
		onEntityRefresh: function(callback) {
			on('promart.promart-marketplace.Products.refresh', callback);
		},
		messageEntityModified: function() {
			message('modified');
		},
		messageEntitySelected: function(id) {
			message('selected', id);
		}
	};
}])
.controller('PageController', function ($scope, $http, $messageHub) {

	var api = '/services/v3/js/promart-marketplace/api/Products.js';
	var categoryOptionsApi = '/services/v3/js/promart-data/api/Categories.js';
	var industryOptionsApi = '/services/v3/js/promart-data/api/Industries.js';
	var regionOptionsApi = '/services/v3/js/promart-data/api/Regions.js';
	var countryOptionsApi = '/services/v3/js/promart-data/api/Countries.js';
	var vendorOptionsApi = '/services/v3/js/promart-accounts/api/Vendors.js';

	$scope.categoryOptions = [];

	$scope.industryOptions = [];

	$scope.regionOptions = [];

	$scope.countryOptions = [];

	$scope.vendorOptions = [];

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

	function regionOptionsLoad() {
		$http.get(regionOptionsApi)
		.success(function(data) {
			$scope.regionOptions = data;
		});
	}
	regionOptionsLoad();

	function countryOptionsLoad() {
		$http.get(countryOptionsApi)
		.success(function(data) {
			$scope.countryOptions = data;
		});
	}
	countryOptionsLoad();

	function vendorOptionsLoad() {
		$http.get(vendorOptionsApi)
		.success(function(data) {
			$scope.vendorOptions = data;
		});
	}
	vendorOptionsLoad();

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

	$scope.regionOptionValue = function(optionKey) {
		for (var i = 0 ; i < $scope.regionOptions.length; i ++) {
			if ($scope.regionOptions[i].Id === optionKey) {
				return $scope.regionOptions[i].Name;
			}
		}
		return null;
	};

	$scope.countryOptionValue = function(optionKey) {
		for (var i = 0 ; i < $scope.countryOptions.length; i ++) {
			if ($scope.countryOptions[i].Id === optionKey) {
				return $scope.countryOptions[i].Name;
			}
		}
		return null;
	};

	$scope.vendorOptionValue = function(optionKey) {
		for (var i = 0 ; i < $scope.vendorOptions.length; i ++) {
			if ($scope.vendorOptions[i].Id === optionKey) {
				return $scope.vendorOptions[i].Name;
			}
		}
		return null;
	};

	$messageHub.onEntityRefresh(load);

	$scope.selectEntity = function(entity) {
		$scope.selectedEntity = entity;
		$messageHub.messageEntitySelected({
			'id': entity.Id		})
	};

	function toggleEntityModal() {
		$('#entityModal').modal('toggle');
	}
});