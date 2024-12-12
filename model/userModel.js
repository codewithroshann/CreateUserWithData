const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/userDB');

const userSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    profileUrl: String

})

module.exports = mongoose.model('user', userSchema);