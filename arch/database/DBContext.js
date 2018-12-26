/**
 * Contexto de banco de dados.
 * Trabalha como storage de pool's de conexões.
 *
 * @type {module.DBContext}
 */
class DBContext {

    constructor() {
        this._connections = {}
    }

    saveConnection(name, connection) {
    	return new Promise((resolve, reject) => {
    		try {
			    if (name && connection) {
				    this.connections[name] = connection;
			    } else {
				    reject(new Error('The connection name and cursor must be provided'));
			    }
		    } catch (error) {
    			reject(error);
		    }
	    });
    }

    retrieveConnection(name) {
	    return new Promise((resolve, reject) => {
		    try {
			    if (this.connections[name]) {
				    resolve(this.connections[name]);
			    } else {
				    reject(new Error('Connection with name ' + name + ' was not mapped'));
			    }
		    } catch (error) {
			    reject(error);
		    }
	    });
    }

    get connections() {
        return this._connections
    }

    set connections(value) {
        this._connections = value
    }

}

module.exports = new DBContext();
