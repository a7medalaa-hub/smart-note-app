const errorHandler = (err, req, res, next) => {
    console.error(err);

    if (err.name === "CastError") {
        return res.status(400).json({
            message: "Invalid ID format"
        });
    }

    if (err.code === 11000) {
        return res.status(409).json({
            message: "Duplicate value already exists"
        });
    }

    const statusCode = err.statusCode || 500;

    res.status(statusCode).json({
        message: err.message || "Internal server error"
    });
};

module.exports = errorHandler;