const User = require('../model/User')
const ImageVerification = require('../model/image')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const response = require('../Res/response')


const { body, validationResult } = require('express-validator')
const { ObjectId } = require('bson')

exports.login =
    (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            response.validationErrorWithData(res, ' Validation Failed ', errors.array())

        }
        else {

            User.findOne({ email: req.body.email }).exec()
                .then(user => {

                    if (!user) {
                        response.unauthorizedResponse(res, 'User not found with email', req.body.email)
                    }

                    else {
                        bcrypt.compare(req.body.password, user.password, (err, result,) => {

                            if (!result) {
                                response.validationError(res, ' Incorrect Password ')
                            }

                            else {

                                const token = jwt.sign(
                                    {
                                        id: user._id,
                                    },
                                    'SecretString',
                                    {
                                        expiresIn: "12hr"
                                    }
                                )

                                const fulldata = ({
                                    name: user.name,
                                    email: user.email,
                                    token: token
                                })

                                response.successResponseWithData(res, 'You are logged in', fulldata)
                            }
                        });
                    }
                }).catch(err => {
                    response.ErrorResponse(res, 'Could not entred', err)
                })
        }
    }



exports.signUp =
    (req, res) => {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            response.validationErrorWithData(res, 'validation failed ', errors.array())
        }

        else {

            bcrypt.hash(req.body.password, 10, (err, hash) => {

                if (err) {
                    response.ErrorResponse(res, "Hash error", err)
                }
                else {

                    User.findOne({ email: req.body.email })
                        .then(data => {
                            if (data) {
                                response.validationErrorWithData(res, 'Email is already taken', data.email)
                            }
                            else {
                                var user = new User({
                                    name: req.body.name,
                                    email: req.body.email,
                                    phone: req.body.phone,
                                    password: hash,
                                    confirmPassword: hash,
                                    location: { type: 'Point', coordinates: [req.body.lng, req.body.lat] }
                                })

                                user.save(user)
                                    .then(data => {

                                        if (data) {

                                            const token = jwt.sign(
                                                {
                                                    id: data._id,
                                                },
                                                'SecretString',
                                                {
                                                    expiresIn: "12hr"
                                                }
                                            )

                                            const fulldata = ({
                                                name: data.name,
                                                email: data.email,
                                                token: token
                                            })
                                            ImageVerification.create({
                                                user_id: data._id,
                                                original: req.body.original,
                                                auth_part: req.body.auth_part,
                                                user_part: req.body.user_part
                                            })
                                            response.successResponseWithData(res, 'You are logged in', fulldata)
                                        }
                                        else {
                                            response.ErrorResponse(res, "User not added")
                                        }

                                    })
                                    .catch(err => {
                                        response.ErrorResponse(res, 'Error occured failed to add user')
                                    })
                            }
                        })
                }
            })
        }
    }

exports.transaction =
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return response.validationErrorWithData(res, ' Validation Failed ', errors.array())

        }
        console.log(req.currentUser)
        console.log(req.body)
        const validate = await ImageVerification.findOne({ user_part: req.body.user_part })
        if (!validate) {
            return response.ErrorResponseWithoutData(res, 'Invalid string code')
        }

        const original = validate.auth_part + req.body.user_part
        console.log('original======>', original)
        const check_original = await ImageVerification.findOne({ user_id: ObjectId(req.currentUser), original: original })
        if (!check_original) {
            return response.ErrorResponseWithoutData(res, 'Original part doesnot match!')
        }
        response.successResponseWithData(res, 'Note matched', check_original)

    }

