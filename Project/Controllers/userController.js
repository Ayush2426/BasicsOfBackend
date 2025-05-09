const User = require('../Models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


exports.register = async (req, res) => {
    const { username, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            username,
            password: hashedPassword
        })
        res.status(201).json({
            message: 'success',
            userId: user._id
        })
    } catch (error) {
        res.status(500).json({
            message: 'error',
            error: error.message
        })
    }
}

exports.login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user || !await bcrypt.compare(password, user.password)) {
            return res.status(401).json({
                message: 'error',
                error: 'Invalid username or password'
            })
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({token});
}catch (error) {
        res.status(500).json({
            message: 'error',
            error: error.message
        })
    }
}