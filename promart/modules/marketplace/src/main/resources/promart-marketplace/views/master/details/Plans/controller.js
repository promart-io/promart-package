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
		onPlanTypesModified: function(callback) {
			on('promart.promart-marketplace.PlanTypes.modified', callback);
		},
		onSupportLevelsModified: function(callback) {
			on('promart.promart-marketplace.SupportLevels.modified', callback);
		},
		onSalesModelsModified: function(callback) {
			on('promart.promart-marketplace.SalesModels.modified', callback);
		},
		onProductsSelected: function(callback) {
			on('promart.promart-marketplace.Products.selected', callback);
		},
		messageEntityModified: function() {
			message('modified');
		}
	};
}])
.controller('PageController', function ($scope, $http, $messageHub) {

	var api = '/services/v3/js/promart-marketplace/api/Plans.js';
	var typeOptionsApi = '/services/v3/js/promart-marketplace/api/PlanTypes.js';
	var supportlevelOptionsApi = '/services/v3/js/promart-marketplace/api/SupportLevels.js';
	var salesmodelOptionsApi = '/services/v3/js/promart-marketplace/api/SalesModels.js';
	var unitOptionsApi = '/services/v3/js/promart-data/api/UoM.js';

	$scope.typeOptions = [];

	$scope.supportlevelOptions = [];

	$scope.salesmodelOptions = [];

	$scope.unitOptions = [];

	function typeOptionsLoad() {
		$http.get(typeOptionsApi)
		.success(function(data) {
			$scope.typeOptions = data;
		});
	}
	typeOptionsLoad();

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

	function unitOptionsLoad() {
		$http.get(unitOptionsApi)
		.success(function(data) {
			$scope.unitOptions = data;
		});
	}
	unitOptionsLoad();

	function load() {
		$http.get(api + '?Product=' + $scope.masterEntityId)
		.success(function(data) {
			$scope.data = data;
		});
	}

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
		$scope.entity.Product = $scope.masterEntityId;
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
		$scope.entity.Product = $scope.masterEntityId;

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

	$scope.typeOptionValue = function(optionKey) {
		for (var i = 0 ; i < $scope.typeOptions.length; i ++) {
			if ($scope.typeOptions[i].Id === optionKey) {
				return $scope.typeOptions[i].Name;
			}
		}
		return null;
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
	$scope.unitOptionValue = function(optionKey) {
		for (var i = 0 ; i < $scope.unitOptions.length; i ++) {
			if ($scope.unitOptions[i].Id === optionKey) {
				return $scope.unitOptions[i].Name;
			}
		}
		return null;
	};

	$messageHub.onEntityRefresh(load);
	$messageHub.onPlanTypesModified(typeOptionsLoad);
	$messageHub.onSupportLevelsModified(supportlevelOptionsLoad);
	$messageHub.onSalesModelsModified(salesmodelOptionsLoad);

	$messageHub.onProductsSelected(function(event) {
		$scope.masterEntityId = event.data.id
		load();
	});

	function toggleEntityModal() {
		$('#entityModal').modal('toggle');
	}
});