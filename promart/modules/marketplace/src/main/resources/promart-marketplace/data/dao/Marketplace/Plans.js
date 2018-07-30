var query = require('db/v3/query');
var daoApi = require('db/v3/dao');
var dao = daoApi.create({
	'table': 'PROMART_PLANS',
	'properties': [
		{
			'name': 'Id',
			'column': 'PLAN_ID',
			'type': 'INTEGER',
			'id': true,
		}, {
			'name': 'Product',
			'column': 'PLAN_PRODUCT',
			'type': 'INTEGER',
		}, {
			'name': 'Type',
			'column': 'PLAN_TYPE',
			'type': 'INTEGER',
		}, {
			'name': 'Price',
			'column': 'PLAN_PRICE',
			'type': 'DOUBLE',
		}, {
			'name': 'SupportLevel',
			'column': 'PLAN_SUPPORT_LEVEL',
			'type': 'INTEGER',
		}, {
			'name': 'SalesModel',
			'column': 'PLAN_SALES_MODEL',
			'type': 'INTEGER',
		}, {
			'name': 'Unit',
			'column': 'PRODUCT_UNIT',
			'type': 'INTEGER',
		}]
});
exports.list = function(settings) {
	return dao.list(settings);
};

exports.get = function(id) {
	return dao.find(id);
};

exports.create = function(entity) {
	return dao.insert(entity);
};

exports.update = function(entity) {
	return dao.update(entity);
};

exports.delete = function(id) {
	dao.remove(id);
};

exports.count = function() {
	return dao.count();
};

exports.customDataCount = function() {
	var resultSet = query.execute("SELECT COUNT(*) FROM PLANS");
	return resultSet !== null ? resultSet[0].COUNT : 0;
};