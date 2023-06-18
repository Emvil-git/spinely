import logging from '../config/logging.js';
import { Connect, Query } from '../config/mysql.js';
import bcrypt from "bcrypt";
import { decode } from '../auth.js';

const NAMESPACE = "Calibration";

const createCalibrationData = async (req, res, next) => {
    logging.info(NAMESPACE, 'Create calibration data');

    let { spineId, cervical_angle, thoracic_angle, lumbar_angle, left_acromion_angle, right_acromion_angle, left_midAxLine_angle, right_midAxLine_angle } = req.body;

    let query = `INSERT INTO users (spineId, cervical_angle, thoracic_angle, lumbar_angle, left_acromion_angle, right_acromion_angle, left_midAxLine_angle, right_midAxLine_angle) VALUES (${spineId}, ${cervical_angle}, ${thoracic_angle}, ${lumbar_angle}, ${left_acromion_angle}, ${right_acromion_angle}, ${left_midAxLine_angle}, ${right_midAxLine_angle})`;

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

const checkIfCalibrationExists = (req, res) => {
    logging.info(NAMESPACE, 'check Calibration Data for User');

    const userId = decode(req.headers.authorization).userId;

    let query = `SELECT * FROM calibration WHERE userId = ${userId}`;

    Connect()
    .then(connection => {
        Query(connection, query)
        .then(results => {

            if (results[0]){
                return res.status(200).json({
                    calibrationExists: true
                });
            } else {
                return res.status(200).json({
                    calibrationExists: false
                });
            }
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

const clearCalibrationData = async (req, res, next) => {
    logging.info(NAMESPACE, 'Clear calibration data');

    const userId = auth.decode(req.headers.authorization).userId;

    let query = `DELETE FROM users WHERE userId=${userId};`;

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

export default { createCalibrationData, checkIfCalibrationExists, clearCalibrationData };