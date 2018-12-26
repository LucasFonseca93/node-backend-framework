
const Connector = require('../conector/MongoConnector');

/**
 * Define a conexão com o banco mongo.
 *
 * @type {module.MongoConnection}
 */
module.exports = class MongoConnection {

    constructor(db, host) {
        this._db = db;
        this._host = host;
        this._user = null;
        this._pass = null;
        this._preferences = null;
        this._pool = null;
    }
	
	/**
     * Define as credenciais de acesso ao mongo.
     *
	 * @param user
	 * @param pass
	 */
	defineAuth(user, pass) {
        this._user = user;
        this._pass = pass;
    }
	
	/**
     * Prove um pool de conexões para o objeto connection.
     *
	 * @return {Promise}
	 */
	connect() {
        return new Promise(async (resolve, reject) => {
            try {
                this.pool = await Connector.connect(this);
                resolve(true);
            } catch (error) {
                reject(error);
            }
        });
    }

    isNull() {
        return !this.db || !this.host || !this.user || !this.pass;
    }

    get db() {
        return this._db;
    }

    set db(value) {
        this._db = value;
    }

    get host() {
        return this._host;
    }
	
	/**
     * Formata os hosts de conexão.
     *
	 * @return {string}
	 */
	get hosts() {
        let hostAsString = '';
        this.host.forEach((host) => {
            hostAsString += host + ',';
        });
        return hostAsString.substring(0, hostAsString.length - 1);
    }

    set host(value) {
        this._host = value;
    }

    get user() {
        return this._user;
    }

    set user(value) {
        this._user = value;
    }

    get pass() {
        return this._pass;
    }

    set pass(value) {
        this._pass = value;
    }

    get preferences() {
        return this._preferences;
    }

    set preferences(value) {
        this._preferences = value;
    }

    get pool() {
        return this._pool;
    }

    set pool(value) {
        this._pool = value;
    }
    
};

