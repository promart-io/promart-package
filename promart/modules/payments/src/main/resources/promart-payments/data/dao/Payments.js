var daoApi = require('db/v3/dao');
var dao = daoApi.create({
	'table': 'PROMART_PAYMENTS',
	'properties': [
		{
			'name':  'Id',
			'column': 'PAYMENT_ID',
			'type':'INTEGER',
			'id': true,
			'required': true
		},		{
			'name':  'Amount',
			'column': 'PAYMENT_AMOUNT',
			'type':'DOUBLE',
			'id': false,
			'required': true
		},		{
			'name':  'Invoice',
			'column': 'PAYMENT_INVOICE',
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