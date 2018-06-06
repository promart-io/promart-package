angular.module('page', []);
angular.module('page')
.factory('$messageHub', [function(){
	var messageHub = new FramesMessageHub();

	var message = function(evtName, data){
		messageHub.post({data: data}, 'promart.promart-solution-composer.SolutionComponentns.' + evtName);
	};

	var on = function(topic, callback){
		messageHub.subscribe(callback, topic);
	};

	return {
		message: message,
		on: on,
		onEntityRefresh: function(callback) {
			on('promart.promart-solution-composer.SolutionComponentns.refresh', callback);
		},
		onSolutionsSelected: function(callback) {
			on('promart.promart-solution-composer.Solutions.selected', callback);
		},
		messageEntityModified: function() {
			message('modified');
		}
	};
}])
.controller('PageController', function ($scope, $http, $messageHub) {

	var api = '/services/v3/js/promart-solution-composer/api/SolutionComponentns.js';
	var componentOptionsApi = '/services/v3/js/promart-component-registry/api/Components.js';

	$scope.componentOptions = [];

	function componentOptionsLoad() {
		$http.get(componentOptionsApi)
		.success(function(data) {
			$scope.componentOptions = data;
		});
	}
	componentOptionsLoad();

	function load() {
		$http.get(api + '?Solution=' + $scope.masterEntityId)
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
		$scope.entity.Solution = $scope.masterEntityId;
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
		$scope.entity.Solution = $scope.masterEntityId;

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

	$scope.componentOptionValue = function(optionKey) {
		for (var i = 0 ; i < $scope.componentOptions.length; i ++) {
			if ($scope.componentOptions[i].Id === optionKey) {
				return $scope.componentOptions[i].Name;
			}
		}
		return null;
	};

	$messageHub.onEntityRefresh(load);

	$messageHub.onSolutionsSelected(function(event) {
		$scope.masterEntityId = event.data.id
		load();
	});

	function toggleEntityModal() {
		$('#entityModal').modal('toggle');
	}
});