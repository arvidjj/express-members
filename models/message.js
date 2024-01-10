const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required:true,
    },
    timestamp : {
        type: Date,
        required:true,
    },
    user : {
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref: 'User'    
    }
});

const Message = mongoose.model("Message", MessageSchema);

module.exports = Message;

