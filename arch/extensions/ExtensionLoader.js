
const recursive = require('recursive-readdir');

/**
 * Loader de rotas da aplicação.
 *
 * @type {module.RouterLoader}
 */
class ExtensionLoader {
	
	loadExtensions(extensionsPath) {
		return new Promise((resolve, reject) => {
			try {
				console.log('----');
				console.log('[Extensions] Loading extensions...');
				recursive(extensionsPath, async (error, files) => {
					if (error) {
						reject(error);
					} else {
						let size = files.length;
						for (let k=0; k<size; k++) {
							let path = files[k];
							let extensions = require(path);
							if (extensions.instance) {
								let ok = await extensions.instance.init();
								if (ok) {
									Resources.ExtensionContext.saveExtension(extensions.instance);
									console.log('[Extensions] Extension ' + extensions.instance.name + ' mapped');
								}
							}
						}
						console.log('[Extensions] Loader configured');
						resolve(true);
					}
				});
			} catch (error) {
				reject(error);
			}
		});
	}
	
}

module.exports = new ExtensionLoader();