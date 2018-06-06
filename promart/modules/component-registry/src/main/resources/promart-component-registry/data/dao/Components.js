var daoApi = require('db/v3/dao');
var dao = daoApi.create({
	'table': 'PROMART_COMPONENTS',
	'properties': [
		{
			'name':  'Id',
			'column': 'COMPONENT_ID',
			'type':'INTEGER',
			'id': true,
			'required': true
		},		{
			'name':  'Name',
			'column': 'COMPONENT_NAME',
			'type':'VARCHAR',
			'id': false,
			'required': true
		},		{
			'name':  'Description',
			'column': 'COMPONENT_DESCRIPTION',
			'type':'VARCHAR',
			'id': false,
			'required': true
		},		{
			'name':  'Repository',
			'column': 'COMPONENT_REPOSITORY',
			'type':'VARCHAR',
			'id': false,
			'required': true
		},		{
			'name':  'Category',
			'column': 'COMPONENT_CATEGORY',
			'type':'INTEGER',
			'id': false,
			'required': true
		},		{
			'name':  'Industry',
			'column': 'COMPONENT_INDUSTRY',
			'type':'INTEGER',
			'id': false,
			'required': true
		},		{
			'name':  'License',
			'column': 'LICENSE',
			'type':'INTEGER',
			'id': false,
			'required': true
		},		{
			'name':  'Developer',
			'column': 'COMPONENT_DEVELOPER',
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