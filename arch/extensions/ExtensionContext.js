/**
 * Contexto de extensões da aplicação.
 * Trabalha como storage de extensões.
 *
 * @type {module.ExtensionContext}
 */
class ExtensionContext {
	
	constructor() {
		this._extensions = {};
	}
	
	saveExtension(extension) {
		return new Promise((resolve, reject) => {
			try {
				if (extension) {
					this.extensions[extension.name] = extension;
				} else {
					reject(new Error('The extension must be provided'));
				}
			} catch (error) {
				reject(error);
			}
		});
	}
	
	retrieveExtension(name) {
		return new Promise((resolve, reject) => {
			try {
				if (this.extensions[name]) {
					resolve(this.extensions[name]);
				} else {
					reject(new Error('Extension with name ' + name + ' was not mapped'));
				}
			} catch (error) {
				reject(error);
			}
		});
	}
	
	get extensions() {
		return this._extensions;
	}
	
	set extensions(value) {
		this._extensions = value;
	}
	
}

module.exports = new ExtensionContext();
