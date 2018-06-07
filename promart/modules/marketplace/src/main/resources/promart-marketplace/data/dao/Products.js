var daoApi = require('db/v3/dao');
var dao = daoApi.create({
	'table': 'PROMART_PRODUCTS',
	'properties': [
		{
			'name':  'Id',
			'column': 'PRODUCT_ID',
			'type':'INTEGER',
			'id': true,
			'required': true
		},		{
			'name':  'Name',
			'column': 'PRODUCT_NAME',
			'type':'VARCHAR',
			'id': false,
			'required': true
		},		{
			'name':  'Description',
			'column': 'PRODUCT_DESCRIPTION',
			'type':'VARCHAR',
			'id': false,
			'required': true
		},		{
			'name':  'Price',
			'column': 'PRODUCT_PRICE',
			'type':'DOUBLE',
			'id': false,
			'required': true
		},		{
			'name':  'Category',
			'column': 'PRODUCT_CATEGORY',
			'type':'INTEGER',
			'id': false,
			'required': true
		},		{
			'name':  'Industry',
			'column': 'PRODUCT_INDUSTRY',
			'type':'INTEGER',
			'id': false,
			'required': true
		},		{
			'name':  'Region',
			'column': 'PRODUCT_REGION',
			'type':'INTEGER',
			'id': false,
			'required': true
		},		{
			'name':  'Country',
			'column': 'PRODUCT_COUNTRY',
			'type':'INTEGER',
			'id': false,
			'required': true
		},		{
			'name':  'Vendor',
			'column': 'PRODUCT_VENDOR',
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