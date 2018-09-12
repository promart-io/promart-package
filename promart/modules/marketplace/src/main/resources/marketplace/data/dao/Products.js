var query = require('db/v3/query');

var LIST_PRODUCTS_QUERY = 'select PRODUCT_ID, PRODUCT_NAME, PRODUCT_DESCRIPTION, PRODUCT_IMAGE, VENDOR_NAME, SOLUTION_REPOSITORY, SOLUTION_URI'
	+ ' from PROMART_PRODUCTS'
	+ ' join PROMART_VENDORS on PRODUCT_VENDOR = VENDOR_ID'
	+ ' join PROMART_SOLUTIONS on PRODUCT_SOLUTION = SOLUTION_ID'
	+ ' order by PRODUCT_ID';

var GET_PRODUCT_QUERY = 'select PRODUCT_ID, PRODUCT_NAME, PRODUCT_DESCRIPTION, PRODUCT_IMAGE, VENDOR_NAME, SOLUTION_REPOSITORY, SOLUTION_URI'
	+ ' from PROMART_PRODUCTS'
	+ ' join PROMART_VENDORS on PRODUCT_VENDOR = VENDOR_ID'
	+ ' join PROMART_SOLUTIONS on PRODUCT_SOLUTION = SOLUTION_ID'
	+ ' where PRODUCT_ID = ?';

var trialLandscape = 'http://trial.ingress.dev.promart.shoot.canary.k8s-hana.ondemand.com/services/v3/web/ide-git/index.html';

exports.list = function(settings) {
	var resultSet = query.execute(LIST_PRODUCTS_QUERY);
	var products = resultSet.map(mapEntity);
	return products;
};

exports.get = function(id) {
	var entityId = id.substr(id.lastIndexOf('-') + 1);
	console.error('entityId: ' + entityId);
	var resultSet = query.execute(GET_PRODUCT_QUERY, [{
		'type': 'BIGINT',
		'value': entityId
	}]);
	return resultSet.map(mapEntity)[0];
};

function mapEntity(entity) {
	var id = entity.product_name.toLowerCase().replace(' ', '-') + '-' + entity.vendor_name.toLowerCase() + '-' + entity.product_id;
	return {
		'id': id,
		'name': entity.product_name,
		'image': entity.product_image,
		'description': entity.product_description,
		'vendor': entity.vendor_name,
		'trialLink': trialLandscape + '?repository=' + entity.solution_repository + '&uri=' + entity.solution_uri
	}
}
