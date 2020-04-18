

function ResponseObject(status, message, body) {
    return {
        status,
        message,
        body
    }
}

module.exports = ResponseObject;
