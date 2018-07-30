var query = require('db/v3/query');
var daoApi = require('db/v3/dao');
var dao = daoApi.create({
	'table': 'PROMART_COMPONENTS',
	'properties': [
		{
			'name': 'Id',
			'column': 'COMPONENT_ID',
			'type': 'INTEGER',
			'id': true,
		}, {
			'name': 'Name',
			'column': 'COMPONENT_NAME',
			'type': 'VARCHAR',
		}, {
			'name': 'Description',
			'column': 'COMPONENT_DESCRIPTION',
			'type': 'VARCHAR',
		}, {
			'name': 'Repository',
			'column': 'COMPONENT_REPOSITORY',
			'type': 'VARCHAR',
		}, {
			'name': 'Category',
			'column': 'COMPONENT_CATEGORY',
			'type': 'INTEGER',
		}, {
			'name': 'Industry',
			'column': 'COMPONENT_INDUSTRY',
			'type': 'INTEGER',
		}, {
			'name': 'License',
			'column': 'COMPONENT_LICENSE',
			'type': 'INTEGER',
		}, {
			'name': 'Developer',
			'column': 'COMPONENT_DEVELOPER',
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
	var resultSet = query.execute("SELECT COUNT(*) AS COUNT FROM PROMART_COMPONENTS");
	return resultSet !== null ? resultSet[0].COUNT : 0;
};