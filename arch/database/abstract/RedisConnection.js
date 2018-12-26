

const Connector = require('../conector/RedisConnector');

/**
 * Define a entidade de conexão com o Redis.
 *
 * @type {module.RedisConnection}
 */
module.exports = class RedisConnection {

    constructor() {
        this._host = null;
        this._sentinel = null;
        this._connection = null;
    }
	
	/**
	 * Define as configurações de acesso.
	 * O parametro host deve ser um objeto contendo os seguintes dados:
	 * {
	 *      port: 'porta de acesso',
	 *      host: 'ip de acesso',
	 *      password: 'senha'
	 * }
	 * @param host
	 */
	defineHost(host) {
        if (host) {
            this.host = {
                port: host.port,
                host: host.host,
                password: host.pass
            }
        } else {
            throw new Error('The host info must be provided')
        }
    }
	
	/**
	 * Define as configurações de acesso em modelo sentinela.
	 * O parametro host deve ser um objeto contendo os seguintes dados:
	 * {
	 *      sentinels: ['lista de ip's dos sentinelas'],
	 *      name: 'nome do sentinela',
	 *      password: 'senha',
	 *      db: 'banco para conexão default'
	 * }
	 * @param sentinel
	 */
    defineSentinel(sentinel) {
        if (sentinel) {
            this.sentinel = {
                sentinels : sentinel.sentinels,
                name : sentinel.name,
                password : sentinel.pass,
                db : sentinel.db
            }
        } else {
            throw new Error('The sentinel info must be provided')
        }
    }

    getTypedConnection() {
        if (this.host) {
            return this.host
        } else {
            return this.sentinel
        }
    }

    connect(callback) {
    	return new Promise(async (resolve, reject) => {
    		try {
    			if (!this.connection) {
				    this.connection = await Connector.connect(this);
			    }
    			Connector.connect(this, (connection) => {
				    this.connection = connection;
				    if (callback) {
					    callback();
				    }
			    });
		    } catch (error) {
    			reject(error);
		    }
	    });
    }

    isNull() {
        return !this.host && !this.sentinel;
    }

    get host() {
        return this._host;
    }

    set host(value) {
        this._host = value;
    }

    get sentinel() {
        return this._sentinel;
    }

    set sentinel(value) {
        this._sentinel = value;
    }

    get connection() {
        return this._connection;
    }

    set connection(value) {
        this._connection = value;
    }

};

