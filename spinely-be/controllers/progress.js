import logging from '../config/logging.js';
import { Connect, Query } from '../config/mysql.js';
import bcrypt from "bcrypt";
import { decode } from '../auth.js';

const NAMESPACE = "Progress Report";

const makeProgressReport = async (req, res, next) => {
    logging.info(NAMESPACE, 'make progress report');

    let { sessionId, result_proper, progress_proper,date_time } = req.body;

    let query = `INSERT INTO sessions (sessionId, result_proper, progress_proper,date_time) VALUES (${sessionId}, ${result_proper}, ${progress_proper}, "${date_time}")`;

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

const clearReports = async (req, res, next) => {
    logging.info(NAMESPACE, 'Clear reports');

    let query = `DELETE FROM progress_report WHERE sessionId=${req.params.sessionId};`;

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

const getSessionReports = async (req, res, next) => {
    logging.info(NAMESPACE, 'Get session reports');

    let query = `SELECT * FROM progress_report WHERE sessionId=${req.params.sessionId};`;

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

export default { makeProgressReport, clearReports, getSessionReports }