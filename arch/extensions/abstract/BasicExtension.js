/**
 * Define uma extensão basica para o framework.
 *
 * @type {module.BasicExtension}
 */
module.exports = class BasicExtension {
	
	constructor(name) {
		this.name = name;
	}
	
	init() {
		return new Promise((resolve, reject) => {
			reject(new Error('Extension initializer not implemented'));
		});
	}
	
};
