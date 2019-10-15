var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String
    },
    mobileNumber: Number,
    dob: Date,
    gender: {
        type: String,
        enum: ['male', 'female', 'others']
    },
    role: {
        type: Number,
        enum: [1, 2],
        default: 2
    },
    activeStatus: {
        type: Boolean,
        default: true
    },
    createdTIme: Date,
    updatedTime: Date
}, {
    timestamps: true
});

var UserModel = mongoose.model('users', UserSchema);

module.exports = UserModel;