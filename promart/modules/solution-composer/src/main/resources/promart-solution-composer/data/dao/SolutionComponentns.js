var daoApi = require('db/v3/dao');
var dao = daoApi.create({
	'table': 'PROMART_SOLUTION_COMPONENTNS',
	'properties': [
		{
			'name':  'Id',
			'column': 'SOLUTION_COMPONENT_ID',
			'type':'INTEGER',
			'id': true,
			'required': true
		},		{
			'name':  'Solution',
			'column': 'SOLUTION_COMPONENT_SOLUTION',
			'type':'INTEGER',
			'id': false,
			'required': true
		},		{
			'name':  'Component',
			'column': 'SOLUTION_COMPONENT_COMPONENT',
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