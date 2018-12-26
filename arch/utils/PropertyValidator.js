/**
 * Validador de propriedades.
 * Pode ser utilizado para validação de dados em um rest.
 *
 * @type {module.PropertyValidator}
 */
class PropertyValidator {

    checkRequired(object, properties) {
        let error = {};
        if (!object || !properties) {
            properties.forEach((name) => {
                if (!object[name]) {
                    error[name] = 'field required'
                }
            })
        }
        if (Object.keys(error).length !== 0) {
            return error;
        }
        return false;
    }
    
}

module.exports = new PropertyValidator();
