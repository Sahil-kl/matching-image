const express = require('express');
const controller = require('../controller/controller')
let route = express.Router();
const auth = require('../middlewares/auth')
const { body } = require('express-validator')

//API

route.post('/login',
    body('email').exists().withMessage('Please enter your Email')
        .isEmail().withMessage('Invalid email address'),

    body('password').exists().withMessage('Please enter your Password'),

    controller.login);

route.post('/sign-up',
    body('name').exists().withMessage('Please enter your Name')
        .isLength({ max: 15 }).isAlpha().withMessage('Name is not valid, Should be of 3 characters atleast'),

    body('email').exists().withMessage('Please enter your Email')
        .isEmail().withMessage("Invalid email"),

    body('password').exists().withMessage('Please enter your Password')
        .isLength({ min: 6 })
        .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/, "i")
        .withMessage('Password must include one lowercase character, one uppercase character, a number, and a special character and should be of 6 characters at least.'),
    body('original').isLength({ min: 1 }),
    body('auth_part').isLength({ min: 1 }),
    body('user_part').isLength({ min: 1 }),
    controller.signUp);

route.post('/transaction', auth.authorization, body('user_part').isLength({ min: 1 }), controller.transaction);

module.exports = route;
