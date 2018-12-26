/**
 * Handler http padrão.
 *
 * @type {module.HttpHandler}
 */
class HttpHandler {

    rejectError(res, error) {
        if (!res || !error) {
	        /*
	         * Este erro é "jogado" para forçar a queda da aplicação.
	         *
	         * Neste caso é necessário pois pode gerar uma promessa não resolvida e/ou
	         * crescimento do consumo de recursos do servidor como memória e etc..
	         */
            throw new Error('The response and error objects must be provided')
        } else {
            if (error['message']) {
                error = error.message
            }
            res.status(502).json({
                error: error
            });
        }
    }

    success(res, success) {
        if (!res || !success) {
	        /*
			 * Este erro é "jogado" para forçar a queda da aplicação.
			 *
			 * Neste caso é necessário pois pode gerar uma promessa não resolvida e/ou
			 * crescimento do consumo de recursos do servidor como memória e etc..
			 */
            throw new Error('The response and success objects must be provided')
        } else {
            if (typeof success !== 'object') {
                success = {
                    message: success
                }
            }
            res.status(200).json(success);
        }
    }

}

module.exports = new HttpHandler();
