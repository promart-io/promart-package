/*
 * Copyright (c) 2017 SAP and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 * Contributors:
 * SAP - initial API and implementation
 */

var dao = require('promart-component-registry/data/dao/Components/Components.js')

exports.getTile = function() {
	return {
		'name': 'Components',
		'group': 'Components',
		'icon': 'cogs',
		'location': '/services/v3/web/promart-component-registry/ui/Components/index.html',
		'count': dao.customDataCount(),
		'order': '100'
	};
};
