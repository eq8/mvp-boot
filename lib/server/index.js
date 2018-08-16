/* global define, Promise */
'use strict';

define([
	'lodash',
	'express',
	'-/logger/index.js',
	'-/server/status-handler.js',
	'-/server/utils.js'
], (
	_,
	express,
	logger,
	statusHandler,
	utils
) => {
	const app = express();

	app.use(statusHandler.middleware());

	const plugin = {
		use(...args) {
			return app.use(...args);
		},
		listen(options) {
			const { port } = _.defaultsDeep(options, {
				port: 8000
			});

			// TODO: only bubble up safe errors
			app.use(utils.errorHandler());

			return new Promise((resolve, reject) => {
				app.listen(port, err => (err ? reject(err) : resolve({ success: true })));
			});
		},
		setState(newState) {
			statusHandler.setState(newState);
		}
	};

	return plugin;
});
