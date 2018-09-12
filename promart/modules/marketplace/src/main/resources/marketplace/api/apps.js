var rs = require('http/v3/rs');

var apps = getApps();

rs.service()
	.resource('')
		.get(function(ctx, request, response) {
			var allApps = [];
			allApps = allApps.concat(apps.featured);
			allApps = allApps.concat(apps.recent);
			response.println(JSON.stringify(allApps));
		})
	.resource('{id}')
		.get(function(ctx, request, response) {
			var app = {};
			var allApps = [];
			allApps = allApps.concat(apps.featured);
			allApps = allApps.concat(apps.recent);

			// Add Top Paid Apps
			for (var i = 0 ; i < apps.topPaid.length; i++) {
				for (var j = 0 ; j < allApps.length; j++) {
					if (allApps[j].id !== apps.topPaid[i].id) {
						allApps.push(apps.topPaid[i]);
						break;
					}
				}
			}

			// Add Top Free Apps
			for (var i = 0 ; i < apps.topFree.length; i++) {
				for (var j = 0 ; j < allApps.length; j++) {
					if (allApps[j].id !== apps.topFree[i].id) {
						allApps.push(apps.topFree[i]);
						break;
					}
				}
			}

			for (var i = 0; i < allApps.length; i ++) {
				if (allApps[i].id === ctx.pathParameters.id) {
					app = allApps[i];
					break;
				}
			}

			response.println(JSON.stringify(app));
		})
	.resource('featured')
		.get(function(ctx, request, response) {
			response.println(JSON.stringify(apps.featured));
		})
	.resource('recent')
		.get(function(ctx, request, response) {
			response.println(JSON.stringify(apps.recent));
		})
	.resource('top/free')
		.get(function(ctx, request, response) {
			response.println(JSON.stringify(apps.topFree));
		})
	.resource('top/paid')
		.get(function(ctx, request, response) {
			response.println(JSON.stringify(apps.topPaid));
		})
.execute();

function getApps() {
	return {
		'featured': [{
			'id': 'loyalty-programs-company-name-qwerty-12345',
			'name': 'Loyalty Programs',
			'image': 'http://www.logofound.com/wp-content/uploads/2017/06/letter-n-logo-template-3-01.jpg',
			'description': 'Some quick example text to build on the card title and make up the bulk of the card\'s content.',
			'vendor': 'Company Name',
			'trialLink': 'http://trial.ingress.dev.promart.shoot.canary.k8s-hana.ondemand.com/services/v3/web/ide-git/index.html?repository=https://github.com/dirigiblelabs/sample-v3-simple-print-env-vars.git&uri=/services/v3/js/sample-v3-simple-print-env-vars/print_env_vars.js'
		}, {
			'id': 'asset-management-company-name-qwerty-12345',
			'name': 'Asset Management',
			'image': 'http://www.logofound.com/wp-content/uploads/2016/09/business-logo-company-01.jpg',
			'description': 'Some quick example text to build on the card title and make up the bulk of the card\'s content.',
			'vendor': 'Company Name',
			'trialLink': 'http://trial.ingress.dev.promart.shoot.canary.k8s-hana.ondemand.com/services/v3/web/ide-git/index.html?repository=https://github.com/dirigiblelabs/sample-v3-simple-print-env-vars.git&uri=/services/v3/js/sample-v3-simple-print-env-vars/print_env_vars.js'
		}, {
			'id': 'house-guard-company-name-qwerty-12345',
			'name': 'House Guard',
			'image': 'http://www.logofound.com/wp-content/uploads/2016/10/real-estate-logo-template-15-01.jpg',
			'description': 'Some quick example text to build on the card title and make up the bulk of the card\'s content.',
			'vendor': 'Company Name',
			'trialLink': 'http://trial.ingress.dev.promart.shoot.canary.k8s-hana.ondemand.com/services/v3/web/ide-git/index.html?repository=https://github.com/dirigiblelabs/sample-v3-simple-print-env-vars.git&uri=/services/v3/js/sample-v3-simple-print-env-vars/print_env_vars.js'
		}, {
			'id': 'financial-services-company-name-qwerty-12345',
			'name': 'Financial Services',
			'image': 'http://www.logofound.com/wp-content/uploads/2015/01/newtech-logo-02.jpg',
			'description': 'Some quick example text to build on the card title and make up the bulk of the card\'s content.',
			'vendor': 'Company Name',
			'trialLink': 'http://trial.ingress.dev.promart.shoot.canary.k8s-hana.ondemand.com/services/v3/web/ide-git/index.html?repository=https://github.com/dirigiblelabs/sample-v3-simple-print-env-vars.git&uri=/services/v3/js/sample-v3-simple-print-env-vars/print_env_vars.js'
		}],
		'recent': [{
			'id': 'diving-shop-company-name-qwerty-12345',
			'name': 'Diving Shop',
			'image': 'http://www.logofound.com/wp-content/uploads/2016/09/business-logo-company-06.jpg',
			'description': 'Some quick example text to build on the card title and make up the bulk of the card\'s content.',
			'vendor': 'Company Name',
			'trialLink': 'http://trial.ingress.dev.promart.shoot.canary.k8s-hana.ondemand.com/services/v3/web/ide-git/index.html?repository=https://github.com/promart-io/applications-diving-shop-package.git&uri=/services/v3/web/diving-shop/'
		}, {
			'id': 'bookstore-company-name-qwerty-12345',
			'name': 'Bookstore',
			'image': 'http://www.logofound.com/wp-content/uploads/2014/12/communication-logo-template-06.jpg',
			'description': 'Some quick example text to build on the card title and make up the bulk of the card\'s content.',
			'vendor': 'Company Name',
			'trialLink': 'http://trial.ingress.dev.promart.shoot.canary.k8s-hana.ondemand.com/services/v3/web/ide-git/index.html?repository=https://github.com/dirigiblelabs/sample-v3-simple-print-env-vars.git&uri=/services/v3/js/sample-v3-simple-print-env-vars/print_env_vars.js'
		}, {
			'id': 'hr-self-service-copany-name-qwerty-12345',
			'name': 'HR Self-Service',
			'image': 'http://www.logofound.com/wp-content/uploads/2014/06/internet-solutions-logo-prev.jpg',
			'description': 'Some quick example text to build on the card title and make up the bulk of the card\'s content.',
			'vendor': 'Company Name',
			'trialLink': 'http://trial.ingress.dev.promart.shoot.canary.k8s-hana.ondemand.com/services/v3/web/ide-git/index.html?repository=https://github.com/dirigiblelabs/sample-v3-simple-print-env-vars.git&uri=/services/v3/js/sample-v3-simple-print-env-vars/print_env_vars.js'
		}, {
			'id': 'expenses-company-name-qwerty-12345',
			'name': 'Expenses',
			'image': 'http://www.logofound.com/wp-content/uploads/2016/07/Company-Logo-Template-08.png',
			'description': 'Some quick example text to build on the card title and make up the bulk of the card\'s content.',
			'vendor': 'Company Name',
			'trialLink': 'http://trial.ingress.dev.promart.shoot.canary.k8s-hana.ondemand.com/services/v3/web/ide-git/index.html?repository=https://github.com/dirigiblelabs/sample-v3-simple-print-env-vars.git&uri=/services/v3/js/sample-v3-simple-print-env-vars/print_env_vars.js'
		}],
		'topPaid': [{
			'id': 'asset-management-company-name-qwerty-12345',
			'name': 'Asset Management',
			'image': 'http://www.logofound.com/wp-content/uploads/2016/09/business-logo-company-06.jpg',
			'description': 'Some quick example text to build on the card title and make up the bulk of the card\'s content.',
			'vendor': 'Company Name',
			'trialLink': 'http://trial.ingress.dev.promart.shoot.canary.k8s-hana.ondemand.com/services/v3/web/ide-git/index.html?repository=https://github.com/dirigiblelabs/sample-v3-simple-print-env-vars.git&uri=/services/v3/js/sample-v3-simple-print-env-vars/print_env_vars.js'
		}, {
			'id': 'loyalty-management-company-name-qwerty-12345',
			'name': 'Loyalty Management',
			'image': 'http://www.logofound.com/wp-content/uploads/2016/09/business-logo-company-06.jpg',
			'description': 'Some quick example text to build on the card title and make up the bulk of the card\'s content.',
			'vendor': 'Company Name',
			'trialLink': 'http://trial.ingress.dev.promart.shoot.canary.k8s-hana.ondemand.com/services/v3/web/ide-git/index.html?repository=https://github.com/dirigiblelabs/sample-v3-simple-print-env-vars.git&uri=/services/v3/js/sample-v3-simple-print-env-vars/print_env_vars.js'
		}, {
			'id': 'financial-services-company-name-qwerty-12345',
			'name': 'Financial Services',
			'image': 'http://www.logofound.com/wp-content/uploads/2016/09/business-logo-company-06.jpg',
			'description': 'Some quick example text to build on the card title and make up the bulk of the card\'s content.',
			'vendor': 'Company Name',
			'trialLink': 'http://trial.ingress.dev.promart.shoot.canary.k8s-hana.ondemand.com/services/v3/web/ide-git/index.html?repository=https://github.com/dirigiblelabs/sample-v3-simple-print-env-vars.git&uri=/services/v3/js/sample-v3-simple-print-env-vars/print_env_vars.js'
		}, {
			'id': 'expenses-company-name-qwerty-12345',
			'name': 'Expenses',
			'image': 'http://www.logofound.com/wp-content/uploads/2016/09/business-logo-company-06.jpg',
			'description': 'Some quick example text to build on the card title and make up the bulk of the card\'s content.',
			'vendor': 'Company Name',
			'trialLink': 'http://trial.ingress.dev.promart.shoot.canary.k8s-hana.ondemand.com/services/v3/web/ide-git/index.html?repository=https://github.com/dirigiblelabs/sample-v3-simple-print-env-vars.git&uri=/services/v3/js/sample-v3-simple-print-env-vars/print_env_vars.js'
		}, {
			'id': 'hr-self-service-company-name-qwerty-12345',
			'name': 'HR Self-Service',
			'image': 'http://www.logofound.com/wp-content/uploads/2016/09/business-logo-company-06.jpg',
			'description': 'Some quick example text to build on the card title and make up the bulk of the card\'s content.',
			'vendor': 'Company Name',
			'trialLink': 'http://trial.ingress.dev.promart.shoot.canary.k8s-hana.ondemand.com/services/v3/web/ide-git/index.html?repository=https://github.com/dirigiblelabs/sample-v3-simple-print-env-vars.git&uri=/services/v3/js/sample-v3-simple-print-env-vars/print_env_vars.js'
		}],
		'topFree': [{
			'id': 'diving-shop-company-name-qwerty-12345',
			'name': 'Diving Shop',
			'image': 'http://www.logofound.com/wp-content/uploads/2016/09/business-logo-company-06.jpg',
			'description': 'Some quick example text to build on the card title and make up the bulk of the card\'s content.',
			'vendor': 'Company Name',
			'trialLink': 'http://trial.ingress.dev.promart.shoot.canary.k8s-hana.ondemand.com/services/v3/web/ide-git/index.html?repository=https://github.com/promart-io/applications-diving-shop-package.git&uri=/services/v3/web/diving-shop/'
		}, {
			'id': 'car-service-company-name-qwerty-12345',
			'name': 'Car Service',
			'image': 'http://www.logofound.com/wp-content/uploads/2016/09/business-logo-company-06.jpg',
			'description': 'Some quick example text to build on the card title and make up the bulk of the card\'s content.',
			'vendor': 'Company Name',
			'trialLink': 'http://trial.ingress.dev.promart.shoot.canary.k8s-hana.ondemand.com/services/v3/web/ide-git/index.html?repository=https://github.com/promart-io/applications-car-service-package.git&uri=/services/v3/web/car-service-bookings/'
		}, {
			'id': 'house-guard-company-name-qwerty-12345',
			'name': 'House Guard',
			'image': 'http://www.logofound.com/wp-content/uploads/2016/09/business-logo-company-06.jpg',
			'description': 'Some quick example text to build on the card title and make up the bulk of the card\'s content.',
			'vendor': 'Company Name',
			'trialLink': 'http://trial.ingress.dev.promart.shoot.canary.k8s-hana.ondemand.com/services/v3/web/ide-git/index.html?repository=https://github.com/dirigiblelabs/sample-v3-simple-print-env-vars.git&uri=/services/v3/js/sample-v3-simple-print-env-vars/print_env_vars.js'
		}]
	};
}
