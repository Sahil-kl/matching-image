const jwt = require('jsonwebtoken');
const User = require('../model/User');
const { ObjectId } = require('bson');

exports.authorization = (req, res, next) => {

    try {
        const bearerHeader = req.headers.authorization
        let bearer = bearerHeader.split(' ')
        const token = bearer[1]

        let user = jwt.verify(token, 'SecretString')

        console.log(user)
        User.findOne({ _id: ObjectId(user.id) })
            .then(data => {

                if (data) {
                    req.currentUser = data.id;
                    next();
                }

                else {
                    res.status(400).json({
                        message: "No data Found"
                    })
                }

            }).catch(err => {
                res.status(401).json({
                    message: 'Unathorized User'
                })
            })
    }
    catch (err) {
        res.status(401).json({
            message: 'Unathorized User(Token expired please login again)'
        })
    }
}