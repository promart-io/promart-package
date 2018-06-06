angular.module('page', []);
angular.module('page')
.factory('$messageHub', [function(){
	var messageHub = new FramesMessageHub();

	var message = function(evtName, data){
		messageHub.post({data: data}, 'promart.promart-marketplace.Plans.' + evtName);
	};

	var on = function(topic, callback){
		messageHub.subscribe(callback, topic);
	};

	return {
		message: message,
		on: on,
		onEntityRefresh: function(callback) {
			on('promart.promart-marketplace.Plans.refresh', callback);
		},
		onSupportLevelsModified: function(callback) {
			on('promart.promart-marketplace.SupportLevels.modified', callback);
		},
		onSalesModelsModified: function(callback) {
			on('promart.promart-marketplace.SalesModels.modified', callback);
		},
		messageEntityModified: function() {
			message('modified');
		}
	};
}])
.controller('PageController', function ($scope, $http, $messageHub) {

	var api = '/services/v3/js/promart-marketplace/api/Plans.js';
	var supportlevelOptionsApi = '/services/v3/js/promart-marketplace/api/SupportLevels.js';
	var salesmodelOptionsApi = '/services/v3/js/promart-marketplace/api/SalesModels.js';

	$scope.supportlevelOptions = [];

	$scope.salesmodelOptions = [];

	function supportlevelOptionsLoad() {
		$http.get(supportlevelOptionsApi)
		.success(function(data) {
			$scope.supportlevelOptions = data;
		});
	}
	supportlevelOptionsLoad();

	function salesmodelOptionsLoad() {
		$http.get(salesmodelOptionsApi)
		.success(function(data) {
			$scope.salesmodelOptions = data;
		});
	}
	salesmodelOptionsLoad();

	function load() {
		$http.get(api)
		.success(function(data) {
			$scope.data = data;
		});
	}
	load();

	$scope.openInfoDialog = function(entity) {
		$scope.entity = entity;
		toggleEntityModal();
	};

	$scope.close = function() {
		load();
		toggleEntityModal();
	};

	$scope.supportlevelOptionValue = function(optionKey) {
		for (var i = 0 ; i < $scope.supportlevelOptions.length; i ++) {
			if ($scope.supportlevelOptions[i].Id === optionKey) {
				return $scope.supportlevelOptions[i].Name;
			}
		}
		return null;
	};
	$scope.salesmodelOptionValue = function(optionKey) {
		for (var i = 0 ; i < $scope.salesmodelOptions.length; i ++) {
			if ($scope.salesmodelOptions[i].Id === optionKey) {
				return $scope.salesmodelOptions[i].Name;
			}
		}
		return null;
	};

	$messageHub.onEntityRefresh(load);
	$messageHub.onSupportLevelsModified(supportlevelOptionsLoad);
	$messageHub.onSalesModelsModified(salesmodelOptionsLoad);

	function toggleEntityModal() {
		$('#entityModal').modal('toggle');
	}
});