// app.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Connect to MongoDB
mongoose.connect('mongodb+srv://dheerajdev247:HBDdoJkvqCKvYX9d@first-cluster.7d6u0t8.mongodb.net/usersDB?retryWrites=true&w=majority&appName=first-cluster', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('error', (err) => {
    console.error(`MongoDB connection error: ${err}`);
    process.exit(-1);
});

// Create a user schema and model
const userSchema = new mongoose.Schema({
    name: String,
    email: String
});

const User = mongoose.model('User', userSchema);

// Middleware
app.use(bodyParser.json());

// Routes
app.post('/addUser', async (req, res) => {
    try {
        const { name, email } = req.body;
        const newUser = new User({ name, email });
        await newUser.save();
        res.status(201).json({ message: 'User added successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/getAllUsers', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/helloWorld', (req, res) => {
    res.status(200).send('Hello, World!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
