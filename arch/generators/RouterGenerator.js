
const FS = require('fs');
const FILE_TEMPLATE = `

const Route = Resources.BaseRoute;
const PropertyValidator = Resources.Util.PropertyValidator;
const Handler = Resources.Util.HttpHandler;

/**
 * Mapeia os serviços rest expostos pelo arquivo.
 */
module.exports.rest = [

	/*
	 * Exemplo de serviço
	 */
	 Route.fromBind({
        verbose: 'get',
        path: '/sample/:message',
        middleware: async (req, res) => {
	        try {
	            let error = PropertyValidator.checkRequired(req.params, ['message']);
	            if (error) {
		            Handler.rejectError(res, error);
	            } else {
		            Handler.success(res, {
		                message: req.params['message']
		            });
	            }
	        } catch (error) {
		        Handler.rejectError(res, error);
	        }
        }
    })

];

`;


const path = __dirname + '/../../app/src/rest/' + process.env.name + '.js';
FS.writeFile(path, FILE_TEMPLATE, (error) => {
	if (error) {
		throw error;
	}
	console.log('Route generated');
});
