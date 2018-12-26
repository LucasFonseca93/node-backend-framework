
const RedisConnection = require('./abstract/RedisConnection');
const MongoConnection = require('./abstract/MongoConnection');

/**
 * Loader de conexões com o banco de dados.
 *
 * @type {module.DBLoader}
 */
class DBLoader {

    LoadConnections(dsPath) {
		return new Promise(async (resolve, reject) => {
			try {
				let ds = require(dsPath);
				if (ds) {
					console.log('----');
					console.log('[DataBase] Loadding connections on datasource...');
					await this.loadRedisConnections(ds);
					await this.loadMongoConnections(ds);
					
					console.log('[DataBase] Loader configured');
					resolve(true);
				} else {
					reject(new Error('Datasource file could not located'));
				}
			} catch (error) {
				reject(error);
			}
		});
    }
    
    loadRedisConnections(ds) {
    	return new Promise(async (resolve, reject) => {
    		try {
			    console.log('[DataBase] Loadding Redis connections');
    			if (ds.redis) {
				    let size = ds.redis.length;
				    for (let k=0; k<size; k++) {
				        let connectionData = ds.redis[k];
					    let redisConnection = new RedisConnection();
					    /*
						 * Define se a conexão utilizará host (simples) ou cluster (sentinela).
						 */
					    if (connectionData.host) {
						    redisConnection.defineHost(connectionData.host);
					    } else {
						    redisConnection.defineSentinel(connectionData.sentinel);
					    }
					    /*
						 * Cria a conexão e armazena no contexto.
						 */
					    let ok = await redisConnection.connect();
					    if (ok) {
						    Resources.DBContext.saveConnection(connectionData.name, redisConnection);
						    console.log('[DataBase] Connection ' + connectionData.name + ' mapped');
					    } else {
						    console.error('[DataBase] Connection ' + connectionData.name + ' could not created');
					    }
				    }
			    }
			    resolve(true);
		    } catch (error) {
    			reject(error);
		    }
	    });
    }
	
	loadMongoConnections(ds) {
		return new Promise(async (resolve, reject) => {
			try {
				console.log('[DataBase] Loadding Mongo connections');
				if (ds.mongo) {
					let size = ds.mongo.length;
					for (let k=0; k<size; k++) {
						let connectionData = ds.mongo[k];
						/*
						 * Define os dados básicos de acesso.
						 */
						let mongoConnection = new MongoConnection(connectionData.db, connectionData.host);
						mongoConnection.defineAuth(connectionData.user, connectionData.pass);
						if (connectionData.preference) {
							mongoConnection.preferences = connectionData.preference;
						}
						/*
						 * Cria a conexão e armazena no contexto.
						 */
						let ok = await mongoConnection.connect();
						if (ok) {
							Resources.DBContext.saveConnection(connectionData.name, mongoConnection);
							console.log('[DataBase] Connection ' + connectionData.name + ' mapped');
						} else {
							console.error('[DataBase] Connection ' + connectionData.name + ' could not created');
						}
					}
				}
				resolve(true);
			} catch (error) {
				reject(error);
			}
		});
	}

}

module.exports = new DBLoader();
