const { Int32, ObjectId } = require('mongodb');
const mongoose = require('mongoose');

require('dotenv').config();

/**
 * -------------- DATABASE ----------------
 */
const dbString = process.env.DB_STRING;
const dbOptions = {
     useNewUrlParser: true,
     useUnifiedTopology: true
}
 
const connection = mongoose.createConnection(dbString, dbOptions);
 

// Creates simple schema for a User.  The hash and salt are derived from the user's given password when they register
const UserSchema = new mongoose.Schema({
    googleID: String,
    displayName: String,
    emails: Array
});

// Creates a simple schema for a paste
const PasteSchema = new mongoose.Schema({
    owner: String,
    title: String,
    author: {
        type: String,
        ref: 'User'
    },
    abstract: String,
    status: {
        type: String,
        default: 'private',
        enum: ['private', 'public']
    },
    type: {
        type: String,
        default:'plaintext'
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

const Paste = connection.model('Paste', PasteSchema);

const User = connection.model('User', UserSchema);

// Expose the connection
module.exports = connection;
