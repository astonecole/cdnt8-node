module.exports = (customKey) => {
    return (req, res, next) => {
        const key = req.query.key;

        if (!key || key !== customKey) {
            res.status(401).json({ error: 'Unauthorized' });
        } else {
            next();
        }
    };
};
