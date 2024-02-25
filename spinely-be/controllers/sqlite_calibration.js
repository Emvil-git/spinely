import logging from '../config/logging.js';
import { Connect, Query } from '../config/mysql.js';
import { decode } from '../auth.js';
import sqlite from 'sqlite3';
import {msgInsertOne} from '../config/message.js';

const NAMESPACE = "Calibration";
const db = new sqlite.Database("../spinely_db.db");

const createCalibrationData = async (req, res, next) => {
    logging.info(NAMESPACE, 'Create calibration data');

    const userId = decode(req.headers.authorization).userId;

    let { cervical_angle_min, cervical_angle_max, cervical_angle_avg, thoracic_angle_min, thoracic_angle_max,  thoracic_angle_avg, lumbar_angle_min, lumbar_angle_max, lumbar_angle_avg, left_midAxLine_angle_min, left_midAxLine_angle_max, left_midAxLine_angle_avg, right_midAxLine_angle_min, right_midAxLine_angle_max,  right_midAxLine_angle_avg,  calibration_timestamp } = req.body;

    let query = `INSERT INTO device_calibration (userId, cervical_angle_min, cervical_angle_max, cervical_angle_avg, thoracic_angle_min, thoracic_angle_max,  thoracic_angle_avg, lumbar_angle_min, lumbar_angle_max, lumbar_angle_avg, left_midAxLine_angle_min, left_midAxLine_angle_max, left_midAxLine_angle_avg, right_midAxLine_angle_min, right_midAxLine_angle_max,  right_midAxLine_angle_avg,  calibration_timestamp) VALUES (${userId}, ${cervical_angle_min}, ${cervical_angle_max}, ${cervical_angle_avg}, ${thoracic_angle_min}, ${thoracic_angle_max}, ${thoracic_angle_avg}, ${lumbar_angle_min}, ${lumbar_angle_max}, ${lumbar_angle_avg}, ${left_midAxLine_angle_min}, ${left_midAxLine_angle_max}, ${left_midAxLine_angle_avg}, ${right_midAxLine_angle_min}, ${right_midAxLine_angle_max}, ${right_midAxLine_angle_avg}, '${calibration_timestamp}')`;

     console.log(req.body);
     console.log(query);

    db.run(query, error => {
        if (error) {
            logging.error(NAMESPACE, error.message, error);
            return res.status(500).json(
                {
                    message: error.message
                }
            )
        } else {
            return res.status(200).json(
                {
                    message: msgInsertOne(NAMESPACE, this.lastID)
                }
            )
        }
    })

    return db.close();
};

const checkIfCalibrationExists = (req, res) => {
    logging.info(NAMESPACE, 'check Calibration Data for User');

    const userId = decode(req.headers.authorization).userId;

    let query = `SELECT * FROM device_calibration WHERE userId = ${userId}`;

    Connect() // Connect fxn for mysql
    .then(connection => {
        Query(connection, query)
        .then(results => { // then stuff for when query successful

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
            connection.end(); // still have to end the connection here
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

    const userId = decode(req.headers.authorization).userId;

    let query = `DELETE FROM device_calibration WHERE userId=${userId};`;

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

const getUserCalibration = async (req, res, next) => {
    logging.info(NAMESPACE, 'Get user calibration data');

    const userId = decode(req.headers.authorization).userId;

    let query = `SELECT * FROM device_calibration WHERE userId=${userId};`;

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

const updateCalibrationData = async (req, res, next) => {
    logging.info(NAMESPACE, 'Update calibration data');

    const userId = decode(req.headers.authorization).userId;

    let { cervical_angle_min, cervical_angle_max, cervical_angle_avg, thoracic_angle_min, thoracic_angle_max,  thoracic_angle_avg, lumbar_angle_min, lumbar_angle_max, lumbar_angle_avg, left_midAxLine_angle_min, left_midAxLine_angle_max, left_midAxLine_angle_avg, right_midAxLine_angle_min, right_midAxLine_angle_max,  right_midAxLine_angle_avg,  calibration_timestamp } = req.body;

    let query = `UPDATE device_calibration SET userId="${userId}", cervical_angle_min=${cervical_angle_min}, cervical_angle_max=${cervical_angle_max}, cervical_angle_avg=${cervical_angle_avg}, thoracic_angle_min=${thoracic_angle_min}, thoracic_angle_max=${thoracic_angle_max}, thoracic_angle_avg=${thoracic_angle_avg}, lumbar_angle_min=${lumbar_angle_min}, lumbar_angle_max=${lumbar_angle_max}, lumbar_angle_avg=${lumbar_angle_avg}, left_midAxLine_angle_min=${left_midAxLine_angle_min}, left_midAxLine_angle_max=${left_midAxLine_angle_max}, left_midAxLine_angle_avg=${left_midAxLine_angle_avg}, right_midAxLine_angle_min=${right_midAxLine_angle_min}, right_midAxLine_angle_max=${right_midAxLine_angle_max}, right_midAxLine_angle_avg=${right_midAxLine_angle_avg},  calibration_timestamp=${calibration_timestamp}) WHERE userId = ${userId}`;

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

export default { createCalibrationData, checkIfCalibrationExists, clearCalibrationData, getUserCalibration, updateCalibrationData };