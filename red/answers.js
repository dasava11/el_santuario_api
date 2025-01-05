
const success = (req, res, message, status) => {
    const statusCode = status || 200;
    const messageOk = message || '';
    res.status(statusCode).send({
        error: false,
        status: statusCode,
        body: message
    });
}

const error = (req, res, message, status) => {
    const statusCode = status || 500;
    const messageError = message || 'Error interno';
    res.status(statusCode).send({
        error: true,
        status: statusCode,
        body: message
    });
}

export {
    success,
    error
}