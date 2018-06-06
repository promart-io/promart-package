var daoApi = require('db/v3/dao');
var dao = daoApi.create({
	'table': 'PROMART_INDUSTRIES',
	'properties': [
		{
			'name':  'Id',
			'column': 'INDUSTRY_ID',
			'type':'INTEGER',
			'id': true,
			'required': true
		},		{
			'name':  'Name',
			'column': 'INDUSTRY_NAME',
			'type':'VARCHAR',
			'id': false,
			'required': false
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