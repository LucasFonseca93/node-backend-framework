/**
 * Define uma rota basica.
 *
 * @type {module.BaseRoute}
 */
module.exports = class BaseRoute {

    constructor(verbose, path) {
        this._action = null;
        this._verbose = verbose;
        this._path = path;
    }
	
	/**
	 * Define uma action/middleware para a rota.
	 * @param middleware
	 */
	defineAction(middleware) {
        this.action = middleware;
    }
	
	/**
	 * Construtor estático que gera uma rota a partir de um bind.
	 *
	 * @param bind
	 * @return {module.BaseRoute}
	 */
	static fromBind(bind) {
        if (!bind) {
            throw new Error('Base router needs bind')
        } else {
            let base = new BaseRoute(bind.verbose, bind.path);
            base.defineAction(bind.middleware);
            return base;
        }
    }

    get verbose() {
        return this._verbose;
    }

    set verbose(value) {
        this._verbose = value;
    }

    get path() {
        return this._path;
    }

    set path(value) {
        this._path = value;
    }

    get action() {
        return this._action;
    }

    set action(value) {
        this._action = value;
    }

};

