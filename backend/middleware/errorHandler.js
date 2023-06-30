const errorHandler = (err, req, res, next) => {
    //return res.status(400).send(err.message);
    return res.status(400).json({ error: err.message });
}

module.exports = errorHandler;