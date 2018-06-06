var daoApi = require('db/v3/dao');
var dao = daoApi.create({
	'table': 'PROMART_VENDORS',
	'properties': [
		{
			'name':  'Id',
			'column': 'VENDOR_ID',
			'type':'INTEGER',
			'id': true,
			'required': true
		},		{
			'name':  'Name',
			'column': 'VENDOR_NAME',
			'type':'VARCHAR',
			'id': false,
			'required': false
		},		{
			'name':  'Rating',
			'column': 'VENDOR_RATING',
			'type':'DOUBLE',
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