var daoApi = require('db/v3/dao');
var dao = daoApi.create({
	'table': 'PROMART_PLANS',
	'properties': [
		{
			'name':  'Id',
			'column': 'PLAN_ID',
			'type':'INTEGER',
			'id': true,
			'required': true
		},		{
			'name':  'Product',
			'column': 'PLAN_PRODUCT',
			'type':'INTEGER',
			'id': false,
			'required': true
		},		{
			'name':  'Type',
			'column': 'PLAN_TYPE',
			'type':'INTEGER',
			'id': false,
			'required': true
		},		{
			'name':  'Price',
			'column': 'PLAN_PRICE',
			'type':'DOUBLE',
			'id': false,
			'required': true
		},		{
			'name':  'SupportLevel',
			'column': 'PLAN_SUPPORT_LEVEL',
			'type':'INTEGER',
			'id': false,
			'required': true
		},		{
			'name':  'SalesModel',
			'column': 'PLAN_SALES_MODEL',
			'type':'INTEGER',
			'id': false,
			'required': true
		},		{
			'name':  'Unit',
			'column': 'PRODUCT_UNIT',
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