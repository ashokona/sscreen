const nodemailer = require('nodemailer');
const Promise = require('bluebird');
const config = require('./config');


var MailService = function(data) {
    return new Promise(function(resolve, reject) {
        let transporter = nodemailer.createTransport({
            host: config.nodemailer.host,
            port: config.nodemailer.port,
            service: "SMTP",
            secure: false,
            auth: {
                user: config.nodemailer.email,
                pass: config.nodemailer.password
            }
        });
        let mailOptions = {
            from: '"' + config.nodemailer.sender + '" <' + config.nodemailer.email + '>',
            to: data.to,
            subject: data.subject,
            text: data.text,
            html: data.html
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                reject({
                    success: false,
                    error: error,
                    data: null
                });
            }
            resolve({
                success: true,
                error: null,
                data: info
            });
        });
    });

}

module.exports = MailService;