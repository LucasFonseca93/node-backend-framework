
const Route = Resources.BaseRoute;
const PropertyValidator = Resources.Util.PropertyValidator;
const Handler = Resources.Util.HttpHandler;
const ExtensionContext = Resources.ExtensionContext;

/**
 * Mapeia os serviços rest expostos pelo arquivo.
 */
module.exports.rest = [
	
	Route.fromBind({
        verbose: 'get',
        path: '/warrant/search/:document',
        middleware: async (req, res) => {
	        try {
	            let error = PropertyValidator.checkRequired(req.params, ['document']);
	            if (error) {
		            Handler.rejectError(res, error);
	            } else {
	                let soap = await ExtensionContext.retrieveExtension('bnmp_soap');
	                let response = await soap.search(req.params['document']);
		            Handler.success(res, response);
	            }
	        } catch (error) {
		        Handler.rejectError(res, error);
	        }
        }
    }),
	
	Route.fromBind({
		verbose: 'get',
		path: '/warrant/detail/:number',
		middleware: async (req, res) => {
			try {
				let error = PropertyValidator.checkRequired(req.params, ['number']);
				if (error) {
					Handler.rejectError(res, error);
				} else {
					let soap = await ExtensionContext.retrieveExtension('bnmp_soap');
					let response = await soap.detail(req.params['number']);
					Handler.success(res, response);
				}
			} catch (error) {
				Handler.rejectError(res, error);
			}
		}
	})

];
