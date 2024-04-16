const bcrypt = require('bcrypt');
const express = require('express');
const bodyParser = require('body-parser');
const app = express(); // Removed .Router()
const { students } = require('../models/students');
const { faculties } = require('../models/faculties');
const { admins } = require("../models/admins");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const addadmins = async (req, res) => {
    try {
        const {
            username,
            password,
        } = req.body;
        if (!username || !password) {
            return res.status(401).send({ message: 'please fill all details' });
        }
        let adminsExist = await admins.findOne({ username: username });
        if (adminsExist) {
            return res.status(401).send({ message: 'admin already exist' });
        } else {
            var salt = await bcrypt.genSalt(10);
            var hashedpassword = await bcrypt.hash(password, salt);
            const newadmins = await admins.create({
                username: username,
                password: hashedpassword
            });
            const saveduser = await newadmins.save();
            res.status(200).send({ message: 'user added successfully' });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: err.message, massage: 'Internal server Error' });
    }
};

const addstudents = async (req, res) => {
    try {
        const {
            username,
            password,
        } = req.body;
        if (!username || !password) {
            return res.status(401).send({ message: 'please fill all details' });
        }
        let studentsExist = await students.findOne({ username: username });
        if (studentsExist) {
            return res.status(401).send({ message: 'student already exist' });
        } else {
            var salt = await bcrypt.genSalt(10);
            var hashedpassword = await bcrypt.hash(password, salt);
            const newstudents = await students.create({
                username: username,
                password: hashedpassword
            });
            const saveduser = await newstudents.save();
            res.status(200).send({ message: 'user added successfully' });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: err.message, massage: 'Internal server Error' });
    }
};

const addfaculties = async (req, res) => {
    try {
        const {
            username,
            password,
        } = req.body;
        if (!username || !password) {
            return res.status(401).send({ message: 'please fill all details' });
        }
        let facultiesExist = await faculties.findOne({ username: username });
        if (facultiesExist) {
            return res.status(401).send({ message: 'faculty already exist' });
        } else {
            var salt = await bcrypt.genSalt(10);
            var hashedpassword = await bcrypt.hash(password, salt);
            const newfaculties = await faculties.create({
                username: username,
                password: hashedpassword
            });
            const saveduser = await newfaculties.save(); // Fixed typo: newadmins -> newfaculties
            res.status(200).send({ message: 'user added successfully' });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: err.message, massage: 'Internal server Error' });
    }
};

// Exporting the functions
module.exports = {
    addadmins,
    addstudents,
    addfaculties
};
