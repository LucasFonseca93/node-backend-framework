
const MClient = require('mongodb').MongoClient;

/**
 * Define um conector para a base mongo db.
 *
 * @type {module.MongoConnector}
 */
class MongoConnector {

    makeUrl(MongoConn) {
        if (MongoConn.isNull()) {
            throw new Error('Connection has null fields')
        } else {
            let url = `mongodb://${MongoConn.user}:${MongoConn.pass}@${MongoConn.hosts}/${MongoConn.db}`;
            if (MongoConn.preferences) {
                url += '?' + MongoConn.preferences;
            }
            return url;
        }
    }
	
	/**
     * Prove uma conexão junto ao mongo.
     *
	 * @param MongoConn
	 * @return {Promise}
	 */
	connect(MongoConn) {
        return new Promise((resolve, reject) => {
            try {
	            let url = this.makeUrl(MongoConn);
	            let options = {
	            	useNewUrlParser: true
	            };
	            MClient.connect(url, options, (error, connection) => {
		            if (error) {
			            reject(error);
		            } else {
			            resolve(connection);
		            }
	            })
            } catch (error) {
                reject(error);
            }
        });
    }

};

module.exports = new MongoConnector();
