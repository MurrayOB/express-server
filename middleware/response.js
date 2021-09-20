const Response = (success = false, message = '', data = null) => {
    const response = {
        Success: success, 
        Message: message, 
        Data: data
    }

    return response; 
}

module.exports = Response