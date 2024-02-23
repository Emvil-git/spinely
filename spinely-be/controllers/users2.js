import logging from '../config/logging.js';
import bcrypt from "bcrypt";
import { createAccessToken, decode } from '../auth.js';
import sqlite from 'sqlite3';

// connect to the db like this. (the directory is relative to the root of the project. not this js file)
const db = new sqlite.Database("./controllers/spinely.db");

const createTable = async (req, res) => {
    // Define the query
    console.log('createTable is running');
    const query = `INSERT INTO asd(id, name) VALUES(1, 'john')`;

    // Use db.run to run the INSERT Function. 
    //  (use 'db.get' to get one row, and db.all for multiple rows)
    db.run(query, function(err) {
        if (err) { return console.log(err.message); }
        console.log(`A row has been inserted with rowid ${this.lastID}`);
    });

    // Close the connection for this function (not sure if entirely necessary)
    db.close();

    // return the json. Check the example I sent in messenger for GETs
    res.status(200).json({'succ':'succ'});
}


// export the function
export default { createTable };