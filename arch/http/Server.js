
const EX = require('express');
const BP = require('body-parser');
const Cors = require('cors');

/**
 * Define um servidor http.
 *
 * @type {module.Server}.
 */
class Server {

    constructor() {
        this._routes = [];
        this._name = null;
        this._version = null;
        this._port = null;
        this._express = null;
        this._prefix = null;
    }
	
	/**
	 * Publica uma rota no servidor.
	 *
	 * @param BaseRoute
	 */
	publishRoute(BaseRoute) {
        if (!BaseRoute) {
            throw new Error('The base router must be provided')
        } else {
            this.routes.push(BaseRoute)
        }
    }
	
	/**
	 * Configura o servidor http.
	 *
	 * @param name
	 * @param version
	 * @param prefix
	 * @param port
	 */
	configure(name, version, prefix, port) {
		console.log('----');
		console.log('[Server] Configuring...');
		
        this.name = name;
        this.version = version;
        this.prefix = prefix;
        this.port = port;
        
        this.express = EX();
		this.express.use(Cors());
        this.express.use(BP.json({
            limit: '10mb'
        }));
        
		let size = this.routes.length;
		for (let k=0; k<size; k++) {
			let BaseRoute = this.routes[k];
			this.express[BaseRoute.verbose](this.prefix + BaseRoute.path, BaseRoute.action);
		}
    }
	
	/**
	 * Coloca o servidor http em execução.
	 */
	run() {
        if (this.isNull()) {
            throw new Error('You need to execute configure before run')
        } else {
            this.express.listen(this.port);
            console.log('[Server] Running on port ' + this.port);
            console.log('==========================================================');
        }
    }

    isNull() {
        return !this.port || !this.express
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    get version() {
        return this._version;
    }

    set version(value) {
        this._version = value;
    }

    get routes() {
        return this._routes;
    }

    set routes(value) {
        this._routes = value;
    }

    get port() {
        return this._port;
    }

    set port(value) {
        this._port = value;
    }

    get express() {
        return this._express;
    }

    set express(value) {
        this._express = value;
    }
	
	get prefix() {
		return this._prefix;
	}
	
	set prefix(value) {
		this._prefix = value;
	}
	
}

module.exports = new Server();
