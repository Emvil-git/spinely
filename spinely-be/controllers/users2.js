import logging from '../config/logging.js';
import bcrypt from "bcrypt";
import { createAccessToken, decode } from '../auth.js';
import sqlite from 'sqlite3';

const db = new sqlite.Database("./spinely.db");

const createTable = async (req, res) => {
    console.log('createTable is running');
    const query = `INSERT INTO asd(id, name) VALUES(1, john)`;

    db.run(query, function(err) {
        if (err) { return console.log(err.message); }
        console.log(`A row has been inserted with rowid ${this.lastID}`);
    });
    db.close();
    res.status(200).json({'succ':'succ'})

}

// const signUp = async (req, res) => {
//     logging.info(NAMESPACE, 'User sign up');

//     let { name, username, email, password } = req.body;
//     let query = `INSERT INTO users (name, username, email, password) VALUES ("${name}", "${username}", "${email}", "${ bcrypt.hashSync(password, 5)}")`;

//     console.log(req.body);
//     console.log(query);

// }



export default { createTable };