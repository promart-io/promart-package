var query = require('db/v3/query');
var daoApi = require('db/v3/dao');
var dao = daoApi.create({
	'table': 'PROMART_INVOICES',
	'properties': [
		{
			'name': 'Id',
			'column': 'INVOICE_ID',
			'type': 'INTEGER',
			'id': true,
		}, {
			'name': 'Number',
			'column': 'INVOICE_NUMBER',
			'type': 'VARCHAR',
		}, {
			'name': 'Date',
			'column': 'INVOICE_DATE',
			'type': 'DATE',
		}, {
			'name': 'PurchaseOrder',
			'column': 'INVOICE_PURCHASE_ORDER',
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
	var resultSet = query.execute("SELECT COUNT(*) AS COUNT FROM PROMART_INVOICES");
	return resultSet !== null ? resultSet[0].COUNT : 0;
};