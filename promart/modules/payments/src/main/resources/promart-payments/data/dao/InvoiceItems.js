var daoApi = require('db/v3/dao');
var dao = daoApi.create({
	'table': 'PROMART_INVOICE_ITEMS',
	'properties': [
		{
			'name':  'Id',
			'column': 'INVOICE_ITEM_ID',
			'type':'INTEGER',
			'id': true,
			'required': true
		},		{
			'name':  'Invoice',
			'column': 'INVOICE_ITEM_INVOICE',
			'type':'INTEGER',
			'id': false,
			'required': true
		},		{
			'name':  'Quantity',
			'column': 'QUANTITY',
			'type':'VARCHAR',
			'id': false,
			'required': true
		},		{
			'name':  'Price',
			'column': 'PRICE',
			'type':'VARCHAR',
			'id': false,
			'required': true
		},		{
			'name':  'Unit',
			'column': 'INVOICE_UNIT',
			'type':'INTEGER',
			'id': false,
			'required': true
		},		{
			'name':  'Product',
			'column': 'INVOICE_ITEM_PRODUCT',
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