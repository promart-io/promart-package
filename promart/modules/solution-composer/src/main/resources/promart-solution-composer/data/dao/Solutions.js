var daoApi = require('db/v3/dao');
var dao = daoApi.create({
	'table': 'PROMART_SOLUTIONS',
	'properties': [
		{
			'name':  'Id',
			'column': 'SOLUTION_ID',
			'type':'INTEGER',
			'id': true,
			'required': true
		},		{
			'name':  'Name',
			'column': 'SOLUTION_NAME',
			'type':'VARCHAR',
			'id': false,
			'required': true
		},		{
			'name':  'Description',
			'column': 'SOLUTION_DESCRIPTION',
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