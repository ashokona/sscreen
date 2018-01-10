var express = require('express');
var router = express.Router();
var auth = require('./auth');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var tempToken = mongoose.model('tempToken');
var crypto = require('crypto');
var auth = require('./auth');
var nodemailer = require("nodemailer")
var MailService = require('../config/transport')
var serverUrl = require('../config').serverUrl;
router.get('/auth', auth.required, function(req, res, next) {
    User.findById(req.payload.id, function(err, user) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!user) {
            return res.status(401).json({
                title: 'Not Authorised',
                error: { message: 'Login Again' }
            });
        } else {
            var token = user.generateJWT();
            var user = user.toAuthJSON();
            res.status(200).json({
                token: token,
                user: user
            });
        }
    })
});

router.post('/auth', function(req, res, next) {
    User.findOne({ email: req.body.email }, function(err, user) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        } else if (!user) {
            return res.status(401).json({
                title: 'Email not registered',
                error: { message: 'Please register to login' }
            });
        } else if (!user.validPassword(req.body.password)) {
            return res.status(401).json({
                title: 'Login failed',
                error: { message: 'Invalid login credentials' }
            });
        } else if (!user.emailVerified) {
            var token = new tempToken();
            token.user = user._id;
            token.token = crypto.randomBytes(16).toString('hex')
            token.save(function(err) {
                if (err) {
                    return res.status(500).json({
                        title: 'An error occurred',
                        error: err
                    });
                }
                let toVerify = "email"

                var confirmationLink = serverUrl + 'verify/' + token.token + '?toverify=' + toVerify;
                var mailOptions = {
                    from: 'noreply@anydayemployment.com',
                    to: user.email,
                    subject: 'Congratulations ' + ', Welcome to Any Day Employment - Dental Connections',
                    // text: 'eaders.host + '\/user' + '\/confirmation\/' + token.token + '.\n'
                    html: '<b>Welcome <strong>' + '</strong>,</b><br>' +
                        ' <a href="' + confirmationLink + '">click here</a>'

                };

                MailService(mailOptions)
                    .then(result => {
                        res.status(401).json({
                            title: 'Email not yet verified, verify email sent to ' + user.email + ' .',
                        });
                    })
                    .catch(err => {
                        return res.status(500).json({
                            title: 'An error occurred',
                            error: err
                        });
                    })
            });
        } else {
            var token = user.generateJWT();
            var user = user.toAuthJSON();
            res.status(200).json({
                message: 'Successfully logged in',
                token: token,
                user: user
            });
        }

    });
});

router.post('/save', function(req, res, next) {

    User.findOne({ email: req.body.email }, function(err, user) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (user) {
            return res.status(401).json({
                title: 'Email already registered!',
                error: { message: 'please login' }
            });
        } else {
            var user = new User();

            user.setPassword(req.body.password);
            user.email = req.body.email;
            user.role = req.body.role;

            user.save(function(err, result) {
                if (err) {
                    return res.status(500).json({
                        title: 'An error occurred',
                        error: err
                    });
                } else {
                    var token = new tempToken();
                    token.user = result._id;
                    token.token = crypto.randomBytes(16).toString('hex')
                    token.save(function(err) {
                        if (err) {
                            return res.status(500).json({
                                title: 'An error occurred',
                                error: err
                            });
                        }
                        let toVerify = "email"
                        var confirmationLink = serverUrl + 'verify/' + token.token + '?toverify=' + toVerify;
                        var mailOptions = {
                            from: 'noreply@anydayemployment.com',
                            to: result.email,
                            subject: 'Congratulations ' + ', Welcome to Any Day Employment - Dental Connections',
                            // text: 'eaders.host + '\/user' + '\/confirmation\/' + token.token + '.\n'
                            html: '<b>Welcome <strong>' + '</strong>,</b><br>' +
                                ' <a href="' + confirmationLink + '">click here</a>'

                        };

                        MailService(mailOptions)
                            .then(data => {
                                res.status(200).json({
                                    message: 'Sucessfully registered, verfy email sent to ' + result.email + ' .',
                                });
                            })
                            .catch(err => {
                                return res.status(500).json({
                                    title: 'An error occurred',
                                    error: err
                                });
                            })

                    });
                }
            });
        }
    })

});

router.get('/verifyemail/:id', function(req, res, next) {
    tempToken.findOne({ token: req.params.id }, function(err, token) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!token) {
            return res.status(401).send({
                title: 'Sorry! this link expired please, request for a new link',
                error: { message: 'token expired' }
            });
        } else {
            User.findOne({ _id: token.user }, function(err, user) {
                if (err) {
                    return res.status(500).json({
                        title: 'An error occurred',
                        error: err
                    });
                }
                if (!user) {
                    return res.status(401).send({
                        title: 'Sorry! this link expired please, request for a new link',
                        error: { message: 'token expired' }
                    });
                }
                if (user.emailVerified) {
                    return res.status(400).send({
                        title: 'Account is alredy verified, login into your account',
                        error: { message: 'please login' }
                    });
                }
                // Verify and save the user
                else {
                    user.emailVerified = true;
                    user.save(function(err) {
                        if (err) {
                            return res.status(500).json({
                                title: 'An error occurred',
                                error: err
                            });
                        }
                        res.status(200).send({ message: "Congrats! email has been verified. Please login." });
                    });
                }
            });
        }

    });
});

router.get('/resendconfirmation/:id', auth.required, function(req, res, next) {
    User.findOne({ email: req.params.id }, function(err, user) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!user) {
            return res.status(401).json({
                title: 'No account found with the associated email',
                error: { message: 'please register' }
            });
        }
        if (user.Email_Verified) {
            return res.status(401).json({
                title: user.email + 'is already verified, please login',
                error: { message: 'please Login' }
            });
        } else {
            var token = new tempToken();
            token.user = user._id;
            token.token = crypto.randomBytes(16).toString('hex')
            token.save(function(err) {
                if (err) {
                    return res.status(500).json({
                        title: 'An error occurred',
                        error: err
                    });
                }
                let toVerify = "email"

                var confirmationLink = serverUrl + token.token;
                var mailOptions = {
                    from: 'noreply@anydayemployment.com',
                    to: user.email,
                    subject: 'Congratulations ' + user.Firstname + ', Welcome to Employment - Dental Connections',
                    // text: 'eaders.host + '\/user' + '\/confirmation\/' + token.token + '.\n'
                    html: '<b>Welcome <strong>' + user.Firstname + '</strong>,</b><br>' +
                        ' <p>Congratulation on Signing up with Employment – Dental Connections. Your next step is to complete your profile and then you are ready to join the growing community of Dental Professionals ready to Get Help or Get Hired, Right Now, Today, AnyDay you want….</p>' +
                        ' <p>What exactly does that mean? We are a real-time portal using Text/Email messaging to allow connections between Dental Office Employers and the Immediate Staff or Specialists they need. If an employee calls in sick, has an emergency, is on vacation or away from the office for any reason, the Dental Office can login and immediately search for individuals who have indicated in their work schedule they are available to work Right Now, Today. Text/Email connections are made privately through the Communication System. As a Job Seeker, your name and contact information is kept secure until you accept the job offer from the dental office. It’s fast, simple, easy and FREE!  As an employer, it is FREE to search for available team members before posting your job offer to them in real time, Right Now, Today, AnyDay.</p>' +
                        ' <p>Click the link below to Login with your Email and Password and Complete your Profile Information. As a Job Seeker, enter your availability on the scheduling calendar with one day a week, one day a month, or AnyDay you like………..Employers are looking for you.</p>' +
                        ' <p>Login here and Complete your Profile:</p>' +
                        ' <a href="' + confirmationLink + '">click here</a>' +
                        ' <p>Thank you, now you’re on your way to Get Help or Get Hired to Work AnyDay you want.</p>' +
                        ' <p><b>The Community is adding new members everyday however the growth depends COMPLETELY on your involvement to help everyone be productive. Tell your friends, co-workers, office managers, dental specialists and dental employers about this service. Please keep your contact information updated as well as you work schedule. The Community is Building and if you do not get a job or find a team member with your initial attempts, as more offices and team members join, you will. Keep Checking as we grow.</b></p><br>' +
                        ' <p>Thank you Again and Welcome,</p>' +
                        ' <p>Administrator</p>' +
                        ' <p>Any Day Employment</p>'
                };

                MailService(mailOptions)
                    .then(result => {
                        res.status(200).json({
                            message: 'A verification email has been sent to ' + user.email + '.',
                        });
                    })
                    .catch(err => {
                        return res.status(500).json({
                            title: 'An error occurred',
                            error: err
                        });
                    })
            });
        }

    })
})


module.exports = router;