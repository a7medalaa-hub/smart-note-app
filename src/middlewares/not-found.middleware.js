const notFound = (req, res) => {
    res.status(404).json({
        message: "This router is not exist"
    });
};

module.exports = notFound;