const mongoose = require("mongoose");

//Scehma for members
const membersSchema = new mongoose.Schema({
    employee_id: {
        type: Number,
        required: true,
        min: 100000,
        max: 3000000
    },
    employee_name: {
        type: String,
        required: true,
        minlength: 3,
        // Built in match validator.
        match: /[a-zA-Z ]+$/,
    },
    technology_name: {
        type: String,
        required: true,
    },
    experience: {
        type: Number,
        required: true,
        min: 0
    },
});

//setting up members model
const Members = mongoose.model("Members", membersSchema);

module.exports = Members;
