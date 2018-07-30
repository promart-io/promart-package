var query = require('db/v3/query');
var daoApi = require('db/v3/dao');
var dao = daoApi.create({
	'table': 'PROMART_PRODUCTS',
	'properties': [
		{
			'name': 'Id',
			'column': 'PRODUCT_ID',
			'type': 'INTEGER',
			'id': true,
		}, {
			'name': 'Name',
			'column': 'PRODUCT_NAME',
			'type': 'VARCHAR',
		}, {
			'name': 'Description',
			'column': 'PRODUCT_DESCRIPTION',
			'type': 'VARCHAR',
		}, {
			'name': 'Price',
			'column': 'PRODUCT_PRICE',
			'type': 'DOUBLE',
		}, {
			'name': 'Category',
			'column': 'PRODUCT_CATEGORY',
			'type': 'INTEGER',
		}, {
			'name': 'Industry',
			'column': 'PRODUCT_INDUSTRY',
			'type': 'INTEGER',
		}, {
			'name': 'Region',
			'column': 'PRODUCT_REGION',
			'type': 'INTEGER',
		}, {
			'name': 'Country',
			'column': 'PRODUCT_COUNTRY',
			'type': 'INTEGER',
		}, {
			'name': 'Vendor',
			'column': 'PRODUCT_VENDOR',
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
	var resultSet = query.execute("SELECT COUNT(*) AS COUNT FROM PROMART_PRODUCTS");
	return resultSet !== null ? resultSet[0].COUNT : 0;
};