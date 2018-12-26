/**
 * Arquivo de recursos do framework.
 *
 * @type {Resources}
 */


class Resources {

    constructor() {
        this.Server = require('./http/Server');
	    this.DBContext = require('./database/DBContext');
        this.DBLoader = require('./database/DBLoader');
	    this.BaseRoute = require('./routes/abstract/BaseRoute');
        this.RouterLoader = require('./routes/RouterLoader');
        this.BasicExtension = require('./extensions/abstract/BasicExtension');
	    this.ExtensionLoader = require('./extensions/ExtensionLoader');
	    this.ExtensionContext = require('./extensions/ExtensionContext');
        this.Util = {
            PropertyValidator: require('./utils/PropertyValidator'),
            HttpHandler: require('./utils/HttpHandler')
        };
        this.baseDir = {
	        ds: '/app/config/ds.js',
	        routes: '/app/src/rest',
	        extensions: '/app/src/extensions'
        }
    }

    init(basePath) {
    	return new Promise(async (resolve, reject) => {
    		try {
    			console.log('==========================================================');
    			console.log('Initializing application');
			    if (!basePath) {
				    reject('The base path must be provided for Resources init');
			    } else {
				    await this.configureDataSource(basePath);
				    await this.configureRouter(basePath);
				    await this.configureExtensions(basePath);
				    resolve(true);
			    }
		    } catch (error) {
    			reject(error);
		    }
	    });
    }
	
	configureDataSource(basePath) {
		return new Promise(async (resolve, reject) => {
			try {
				if (!basePath) {
					reject('The base path must be provided for Resources init');
				} else {
					await this.DBLoader.LoadConnections(basePath + this.baseDir.ds);
					resolve(true);
				}
			} catch (error) {
				reject(error);
			}
		});
	}
	
	configureRouter(basePath) {
		return new Promise(async (resolve, reject) => {
			try {
				if (!basePath) {
					reject('The base path must be provided for Resources init');
				} else {
					await this.RouterLoader.LoadRoutes(basePath + this.baseDir.routes);
					resolve(true);
				}
			} catch (error) {
				reject(error);
			}
		});
	}
	
	configureExtensions(basePath) {
		return new Promise(async (resolve, reject) => {
			try {
				if (!basePath) {
					reject('The base path must be provided for Resources init');
				} else {
					await this.ExtensionLoader.loadExtensions(basePath + this.baseDir.extensions);
					resolve(true);
				}
			} catch (error) {
				reject(error);
			}
		});
	}
	
}

module.exports.loadFramework = (basePath) => {
	return new Promise(async (resolve, reject) => {
		try {
			global.Resources = new Resources();
			let ok = await global.Resources.init(basePath);
			if (ok) {
				global.Resources.Server.configure(
					process.env.SERVER_NAME,
					process.env.SERVER_VERSION,
					process.env.SERVER_PREFIX,
					process.env.SERVER_PORT
				);
				global.Resources.Server.run();
			}
		} catch (error) {
			reject(error);
		}
	});
};
