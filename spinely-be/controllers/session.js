import logging from '../config/logging.js';
import { Connect, Query } from '../config/mysql.js';
import bcrypt from "bcrypt";
import { decode } from '../auth.js';

const NAMESPACE = "Session";

const addSession = async (req, res, next) => {
    logging.info(NAMESPACE, 'add session');

    // const userInfo = decode(req.headers.authorization);
    const userId = decode(req.headers.authorization).userId;

    // let { percent_proper, date_start, date_end } = req.body;

    // let query = `INSERT INTO sessions (userId, percent_proper, date_start, date_end) VALUES ("${userInfo.userId}", ${percent_proper}, "${date_start}", "${date_end}")`;
    let query = `INSERT INTO sessions (userId) VALUES ("${userId}")`;

    //  console.log(req.body);
     console.log(query);

     Connect()
    .then(connection => {
        Query(connection, query)
        .then(result => {
                return res.status(200).json({
                    result
                });
            })
        .catch(error => {
            logging.error(NAMESPACE, error.message, error);

            return res.status(500).json({
            message: error.message,
            error
            })
        })
        .finally(() => {
            connection.end();
        })
    })
    .catch(error => {
        logging.error(NAMESPACE, error.message, error);

        return res.status(500).json({
            message: error.message,
            error
        })
    })
};

const updateSession = async (req, res, next) => {
    logging.info(NAMESPACE, 'add session');

    const userInfo = decode(req.headers.authorization);

    let { percent_proper } = req.body;

    let query = `INSERT INTO sessions (userId, percent_proper, date_start, date_end) VALUES ("${userInfo.userId}", ${percent_proper}, "${date_start}", "${date_end}")`;

     console.log(req.body);
     console.log(query);

     Connect()
    .then(connection => {
        Query(connection, query)
        .then(result => {
                return res.status(200).json({
                    result
                });
            })
        .catch(error => {
            logging.error(NAMESPACE, error.message, error);

            return res.status(500).json({
            message: error.message,
            error
            })
        })
        .finally(() => {
            connection.end();
        })
    })
    .catch(error => {
        logging.error(NAMESPACE, error.message, error);

        return res.status(500).json({
            message: error.message,
            error
        })
    })
};

const clearSessions = async (req, res, next) => {
    logging.info(NAMESPACE, 'Clear spine data');

    const userId = decode(req.headers.authorization).userId;

    let query = `DELETE FROM sessions WHERE userId=${userId};`;

     Connect()
    .then(connection => {
        Query(connection, query)
        .then(result => {
                return res.status(200).json({
                    result
                });
            })
        .catch(error => {
            logging.error(NAMESPACE, error.message, error);

            return res.status(500).json({
            message: error.message,
            error
            })
        })
        .finally(() => {
            connection.end();
        })
    })
    .catch(error => {
        logging.error(NAMESPACE, error.message, error);

        return res.status(500).json({
            message: error.message,
            error
        })
    })
}

const getUserSessions = async (req, res, next) => {
    logging.info(NAMESPACE, 'Get User sessions');

    const userId = decode(req.headers.authorization).userId;

    let query = `SELECT * FROM sessions WHERE userId=${userId};`;

     Connect()
    .then(connection => {
        Query(connection, query)
        .then(result => {
                return res.status(200).json({
                    result
                });
            })
        .catch(error => {
            logging.error(NAMESPACE, error.message, error);

            return res.status(500).json({
            message: error.message,
            error
            })
        })
        .finally(() => {
            connection.end();
        })
    })
    .catch(error => {
        logging.error(NAMESPACE, error.message, error);

        return res.status(500).json({
            message: error.message,
            error
        })
    })
}

export default { addSession, updateSession, clearSessions, getUserSessions }