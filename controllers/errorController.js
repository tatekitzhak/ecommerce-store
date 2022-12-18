// Express automatically knows that this entire function is an error handling middleware by specifying 4 parameters
module.exports = (err, req, res, next) => {
    console.log('Error handler:\n', err.message, 'err.stack:\n', err.stack);
    err.statusCode = err.statusCode || 500;

    res.status(err.statusCode).json({
        status: err.statusCode,
        error: err,
        message: err.message,
        stack: err.stack
    });
    return;
};