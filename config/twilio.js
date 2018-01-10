const config = require('./config');
var client = require('twilio')(config.twilio.accountSid, config.twilio.authToken);

var fromNumber = "+18448223442"

var TwilioService = function(data) {
    return new Promise(function(resolve, reject) {
        client.messages.create({
            to: data.to,
            from: fromNumber,
            body: data.body,
        }, function(err, message) {
            if (err) {
                reject({
                    success: false,
                    error: err,
                    data: null
                });
            }
            resolve({
                success: true,
                error: null,
                data: message
            });
        });
    });

}

module.exports = TwilioService;