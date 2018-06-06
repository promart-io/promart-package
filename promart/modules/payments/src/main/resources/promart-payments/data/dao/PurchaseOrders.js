var daoApi = require('db/v3/dao');
var dao = daoApi.create({
	'table': 'PROMART_PURCHASE_ORDERS',
	'properties': [
		{
			'name':  'Id',
			'column': 'PURCHASE_ORDER_ID',
			'type':'INTEGER',
			'id': true,
			'required': true
		},		{
			'name':  'Status',
			'column': 'PURCHASE_ORDER_STATUS',
			'type':'INTEGER',
			'id': false,
			'required': true
		},		{
			'name':  'Customer',
			'column': 'PURCHASE_ORDER_CUSTOMER',
			'type':'INTEGER',
			'id': false,
			'required': true
		},		{
			'name':  'Number',
			'column': 'PURCHASE_ORDER_NUMBER',
			'type':'VARCHAR',
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