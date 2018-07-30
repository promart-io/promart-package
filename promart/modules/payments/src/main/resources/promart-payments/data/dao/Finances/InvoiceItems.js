var query = require('db/v3/query');
var daoApi = require('db/v3/dao');
var dao = daoApi.create({
	'table': 'PROMART_INVOICE_ITEMS',
	'properties': [
		{
			'name': 'Id',
			'column': 'INVOICE_ITEM_ID',
			'type': 'INTEGER',
			'id': true,
		}, {
			'name': 'Invoice',
			'column': 'INVOICE_ITEM_INVOICE',
			'type': 'INTEGER',
		}, {
			'name': 'Product',
			'column': 'INVOICE_ITEM_PRODUCT',
			'type': 'INTEGER',
		}, {
			'name': 'Quantity',
			'column': 'INVOICE_ITEM_QUANTITY',
			'type': 'INTEGER',
		}, {
			'name': 'Price',
			'column': 'INVOICE_ITEM_PRICE',
			'type': 'DOUBLE',
		}, {
			'name': 'Unit',
			'column': 'INVOICE_ITEM_UNIT',
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
	var resultSet = query.execute("SELECT COUNT(*) FROM INVOICEITEMS");
	return resultSet !== null ? resultSet[0].COUNT : 0;
};