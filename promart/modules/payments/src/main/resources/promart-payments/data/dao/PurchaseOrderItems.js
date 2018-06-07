var daoApi = require('db/v3/dao');
var dao = daoApi.create({
	'table': 'PURCHASEORDERITEMS',
	'properties': [
		{
			'name':  'Id',
			'column': 'ID',
			'type':'INTEGER',
			'id': true,
			'required': true
		},		{
			'name':  'PurchaseOrder',
			'column': 'PURCHASEORDER',
			'type':'INTEGER',
			'id': false,
			'required': true
		},		{
			'name':  'Product',
			'column': 'PURCHASE_ORDER_ITEM_PRODUCT',
			'type':'INTEGER',
			'id': false,
			'required': true
		},		{
			'name':  'Quantity',
			'column': 'PURCHASE_ORDER_ITEM_QUANTITY',
			'type':'INTEGER',
			'id': false,
			'required': true
		},		{
			'name':  'Price',
			'column': 'PURCHASE_ORDER_ITEM_PRICE',
			'type':'DOUBLE',
			'id': false,
			'required': true
		},		{
			'name':  'Unit',
			'column': 'PURCHASE_ORDER_ITEM_UNIT',
			'type':'INTEGER',
			'id': false,
			'required': true
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