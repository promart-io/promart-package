var daoApi = require('db/v3/dao');
var dao = daoApi.create({
	'table': 'PROMART_CUSTOMERS',
	'properties': [
		{
			'name':  'Id',
			'column': 'ID',
			'type':'INTEGER',
			'id': true,
			'required': true
		},		{
			'name':  'FirstName',
			'column': 'CUSTOMER_FIRST_NAME',
			'type':'VARCHAR',
			'id': false,
			'required': true
		},		{
			'name':  'LastName',
			'column': 'CUSTOMER_LAST_NAME',
			'type':'VARCHAR',
			'id': false,
			'required': true
		},		{
			'name':  'Email',
			'column': 'CUSTOMER_EMAIL',
			'type':'VARCHAR',
			'id': false,
			'required': true
		},		{
			'name':  'Address',
			'column': 'CUSTOMER_ADDRESS',
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