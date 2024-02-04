const express = require("express");
const membersRouter = require("./routers/teams");
const Admin = require("./mongoose/models/admin");
const jwt = require("jsonwebtoken");
const { helpers } = require("./helper");
require("./mongoose/mongoose");

const app = new express();

app.use(express.json());
app.use(membersRouter);

app.post('/admin/login', async (req, res) => {
    const { name, password } = req.body;

    try {
        const admin = await Admin.findOne({ name });
        if (!admin || password !== admin.password) {
            return res.status(400).json({ error: 'Username or password is wrong' });
        }

        // Generate JWT token
        const token = jwt.sign({ _id: admin._id }, helpers.secret_token, {
            expiresIn: '1h', // Set token expiration time
        });

        // Update admin's tokens array
        admin.tokens.push({ token });
        await admin.save();

        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Server error.' });
    }
});

module.exports = app;