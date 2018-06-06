var daoApi = require('db/v3/dao');
var dao = daoApi.create({
	'table': 'ZEUS_PLANS',
	'properties': [
		{
			'name':  'Id',
			'column': 'ID',
			'type':'INTEGER',
			'id': true,
			'required': true
		},		{
			'name':  'Name',
			'column': 'PLAN_NAME',
			'type':'VARCHAR',
			'id': false,
			'required': false
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