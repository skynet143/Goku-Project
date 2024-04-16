const bcrypt  = require('bcryptjs');
const express  = require('express');
const bodyParser = require('body-parser');
const  app      = express().router();
const {students}  = require( './models/students' );
const {faculties}  = require('./models/faculties') ;
const {admins} = require("./models/admins");

﻿
// students
const studentslogin = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json('Please enter all fields');
        }

        const user = await students.findOne({ username: username });
        if (!user) {
            return res.status(400).json('User not found');
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json('Invalid credentials');
        }

        const token = jwt.sign({ id: user._id }, JWT_SECRET);
        delete user.password;
        return res.status(200).json({ token, user });
    } catch (err) {
        console.log(err);
        return res.status(500).json('Internal server error');
    }
};
// faculty
const facultieslogin = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json('Please enter all fields');
        }

        const user = await faculties.findOne({ username: username });
        if (!user) {
            return res.status(400).json('User not found');
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json('Invalid credentials');
        }

        const token = jwt.sign({ id: user._id }, JWT_SECRET);
        delete user.password;
        return res.status(200).json({ token, user });
    } catch (err) {
        console.log(err);
        return res.status(500).json('Internal server error');
    }
};
// admin
const adminslogin = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json('Please enter all fields');
        }

        const user = await admins.findOne({ username: username });
        if (!user) {
            return res.status(400).json('User not found');
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json('Invalid credentials');
        }

        const token = jwt.sign({ id: user._id }, JWT_SECRET);
        delete user.password;
        return res.status(200).json({ token, user });
    } catch (err) {
        console.log(err);
        return res.status(500).json('Internal server error');
    }
};
module.exports={adminslogin,studentslogin,facultieslogin}
