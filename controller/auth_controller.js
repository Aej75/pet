const User = require('../model/User');

exports.signup = async (req, res, next) => {
    const newUser = await User.create(req.body);

    res.status(200).json({
        status: "success",
        data: {
            user: newUser
        }
    })
}