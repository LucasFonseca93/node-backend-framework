/**
 * Arquivo inicializador da aplicação.
 *
 * Os passos para iniciaplização são bem simples.
 * 1 - Recuperar uma instancia do Framework Resources.
 * 2 - Através da instancia executar o load do framework.
 */
const ENV = require('dotenv');
const CORE = require('./arch/Resources');

try {
	ENV.config();
	CORE.loadFramework(__dirname)
		.then(() => {
			console.log('App running');
		})
		.catch((error) => {
			throw error;
		});
} catch (error) {
	throw error;
}
