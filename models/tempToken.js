var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var tempTokenSchema = new Schema({
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    token: { type: String, required: true },
    createdAt: { type: Date, required: true, default: Date.now, expires: 43200 }
});

mongoose.model('tempToken', tempTokenSchema);