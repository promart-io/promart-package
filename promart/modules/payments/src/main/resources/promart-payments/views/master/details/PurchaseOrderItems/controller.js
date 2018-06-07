angular.module('page', []);
angular.module('page')
.factory('$messageHub', [function(){
	var messageHub = new FramesMessageHub();

	var message = function(evtName, data){
		messageHub.post({data: data}, 'promart.promart-payments.PurchaseOrderItems.' + evtName);
	};

	var on = function(topic, callback){
		messageHub.subscribe(callback, topic);
	};

	return {
		message: message,
		on: on,
		onEntityRefresh: function(callback) {
			on('promart.promart-payments.PurchaseOrderItems.refresh', callback);
		},
		onPurchaseOrdersSelected: function(callback) {
			on('promart.promart-payments.PurchaseOrders.selected', callback);
		},
		messageEntityModified: function() {
			message('modified');
		}
	};
}])
.controller('PageController', function ($scope, $http, $messageHub) {

	var api = '/services/v3/js/promart-payments/api/PurchaseOrderItems.js';
	var productOptionsApi = '/services/v3/js/promart-marketplace/api/Products.js';
	var unitOptionsApi = '/services/v3/js/promart-data/api/UoM.js';

	$scope.productOptions = [];

	$scope.unitOptions = [];

	function productOptionsLoad() {
		$http.get(productOptionsApi)
		.success(function(data) {
			$scope.productOptions = data;
		});
	}
	productOptionsLoad();

	function unitOptionsLoad() {
		$http.get(unitOptionsApi)
		.success(function(data) {
			$scope.unitOptions = data;
		});
	}
	unitOptionsLoad();

	function load() {
		$http.get(api + '?PurchaseOrder=' + $scope.masterEntityId)
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
		$scope.entity.PurchaseOrder = $scope.masterEntityId;
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
		$scope.entity.PurchaseOrder = $scope.masterEntityId;

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

	$scope.productOptionValue = function(optionKey) {
		for (var i = 0 ; i < $scope.productOptions.length; i ++) {
			if ($scope.productOptions[i].Id === optionKey) {
				return $scope.productOptions[i].Name;
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

	$messageHub.onPurchaseOrdersSelected(function(event) {
		$scope.masterEntityId = event.data.id
		load();
	});

	function toggleEntityModal() {
		$('#entityModal').modal('toggle');
	}
});