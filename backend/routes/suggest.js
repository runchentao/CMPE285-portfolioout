const express = require('express');

const router = express.Router();

// @route   GET suggest/
// @desc    Get stock suggestion, test route
// @access  Public
router.get('/', async(req, res) => {
    try {
        res.json("This is GET suggest/ route");
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server Error');
    }
});

module.exports = router;