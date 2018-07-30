var query = require('db/v3/query');
var daoApi = require('db/v3/dao');
var dao = daoApi.create({
	'table': 'PURCHASEORDERITEMS',
	'properties': [
		{
			'name': 'Id',
			'column': 'ID',
			'type': 'INTEGER',
			'id': true,
		}, {
			'name': 'PurchaseOrder',
			'column': 'PURCHASEORDER',
			'type': 'INTEGER',
		}, {
			'name': 'Product',
			'column': 'PURCHASE_ORDER_ITEM_PRODUCT',
			'type': 'INTEGER',
		}, {
			'name': 'Quantity',
			'column': 'PURCHASE_ORDER_ITEM_QUANTITY',
			'type': 'INTEGER',
		}, {
			'name': 'Price',
			'column': 'PURCHASE_ORDER_ITEM_PRICE',
			'type': 'DOUBLE',
		}, {
			'name': 'Unit',
			'column': 'PURCHASE_ORDER_ITEM_UNIT',
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
	var resultSet = query.execute("SELECT COUNT(*) FROM PURCHASEORDERITEMS");
	return resultSet !== null ? resultSet[0].COUNT : 0;
};