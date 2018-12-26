
const RClient = require('ioredis');

/**
 * Define uma entidade gerenciadora de conexões com o Redis.
 *
 * @type {module.RedisConnector}
 */
class RedisConnector {

    connect(RedisConnection) {
    	return new Promise((resolve, reject) => {
		    try {
		    	if (RedisConnection.isNull()) {
		    		reject(new Error('The providing params to connect are null'));
			    } else {
				    let client = new RClient(RedisConnection.getTypedConnection());
				    resolve(client);
			    }
		    } catch (error) {
		    	reject(error);
		    }
	    });
    }
    
}

module.exports = new RedisConnector();

