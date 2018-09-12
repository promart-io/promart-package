var rs = require('http/v3/rs');
var dao = require('marketplace/data/dao/Products');
var http = require('marketplace/api/http');

rs.service()
	.resource('')
		.get(function(ctx, request) {
			var entities = dao.list();
			http.sendResponseOk(entities);
		})
	.resource('{id}')
		.get(function(ctx) {
			var id = ctx.pathParameters.id;
			var entity = dao.get(id);
			if (entity) {
			    http.sendResponseOk(entity);
			} else {
				http.sendResponseNotFound('Products not found');
			}
		})
	.resource('featured')
		.get(function(ctx, request, response) {
			var entities = dao.list();
			http.sendResponseOk(entities);
		})
	.resource('recent')
		.get(function(ctx, request, response) {
			var entities = dao.list();
			http.sendResponseOk(entities);
		})
	.resource('top/free')
		.get(function(ctx, request, response) {
			var entities = dao.list();
			http.sendResponseOk(entities);
		})
	.resource('top/paid')
		.get(function(ctx, request, response) {
			var entities = dao.list();
			http.sendResponseOk(entities);
		})
.execute();
