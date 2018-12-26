
const recursive = require('recursive-readdir');

/**
 * Loader de rotas da aplicação.
 *
 * @type {module.RouterLoader}
 */
class RouterLoader {

    LoadRoutes(routerPath) {
	    return new Promise(async (resolve, reject) => {
		    try {
		    	console.log('----');
			    console.log('[Router] Loading routes...');
			    recursive(routerPath, (error, files) => {
				    if (error) {
					    reject(error);
				    } else {
				    	let size = files.length;
				    	for (let k=0; k<size; k++) {
				    		let path = files[k];
						    console.log('[Router] Loading file ' + path);
						    let routes = require(path);
						    if (routes.rest) {
							    routes.rest.forEach((BaseRoute) => {
								    console.log('[Router] ' + BaseRoute.path + ' mapped');
								    Resources.Server.publishRoute(BaseRoute);
							    })
						    }
					    };
					    console.log('[Router] Routes configured');
					    resolve(true);
				    }
			    });
		    } catch (error) {
			    reject(error);
		    }
	    });
    }

}

module.exports = new RouterLoader();
