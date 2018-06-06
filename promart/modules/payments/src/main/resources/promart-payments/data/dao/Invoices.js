var daoApi = require('db/v3/dao');
var dao = daoApi.create({
	'table': 'PROMART_INVOICES',
	'properties': [
		{
			'name':  'Id',
			'column': 'INVOICE_ID',
			'type':'INTEGER',
			'id': true,
			'required': true
		},		{
			'name':  'Number',
			'column': 'INVOICE_NUMBER',
			'type':'VARCHAR',
			'id': false,
			'required': true
		},		{
			'name':  'Date',
			'column': 'INVOICE_DATE',
			'type':'DATE',
			'id': false,
			'required': true
		},		{
			'name':  'PurchaseOrder',
			'column': 'INVOICE_PURCHASE_ORDER',
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