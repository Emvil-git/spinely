import logging from '../config/logging.js';
import { Connect, Query } from '../config/mysql.js';
import bcrypt from "bcrypt";
import { decode } from '../auth.js';

const NAMESPACE = "Spine";

const addSpineData = async (req, res, next) => {
    logging.info(NAMESPACE, 'add spine');

    let { userId, cervical_max_angle, cervical_min_angle, cervical_avg_angle, thoracic_max_angle, thoracic_min_angle, thoracic_avg_angle, lumbar_max_angle, lumbar_min_angle, lumbar_avg_angle } = req.body;

    let query = `INSERT INTO spine_range (userId, cervical_max_angle, cervical_min_angle, cervical_avg_angle, thoracic_max_angle, thoracic_min_angle, thoracic_avg_angle, lumbar_max_angle, lumbar_min_angle, lumbar_avg_angle) VALUES (${userId}, ${cervical_max_angle}, ${cervical_min_angle}, ${cervical_avg_angle}, ${thoracic_max_angle}, ${thoracic_min_angle}, ${thoracic_avg_angle}, ${lumbar_max_angle}, ${lumbar_min_angle}, ${lumbar_avg_angle})`;

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

const checkIfSpineDataExists = (req, res) => {
    logging.info(NAMESPACE, 'check Spine Data for User');

    const userId = decode(req.headers.authorization).userId;

    let query = `SELECT * FROM spine_range WHERE userId = ${userId}`;

    Connect()
    .then(connection => {
        Query(connection, query)
        .then(results => {

            if (results[0]){
                return res.status(200).json({
                    spineDataExists: true
                });
            } else {
                return res.status(200).json({
                    spineDataExists: false
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

const editSpineData = (req, res) => {
    logging.info(NAMESPACE, 'edit spine data');

    const userInfo = decode(req.headers.authorization);

    let { cervical_max_angle, cervical_min_angle, cervical_avg_angle, thoracic_max_angle, thoracic_min_angle, thoracic_avg_angle, lumbar_max_angle, lumbar_min_angle, lumbar_avg_angle } = req.body;

    const query = `UPDATE spine_range SET cervical_max_angle=${cervical_max_angle} cervical_min_angle=${cervical_min_angle} cervical_avg_angle=${cervical_avg_angle} thoracic_max_angle=${thoracic_max_angle} thoracic_min_angle=${thoracic_min_angle} thoracic_avg_angle=${thoracic_avg_angle} lumbar_max_angle=${lumbar_max_angle} lumbar_min_angle=${lumbar_min_angle} lumbar_avg_angle=${lumbar_avg_angle} WHERE userId=${userInfo.userId}`;

    Connect()
    .then(connection => {
        Query(connection, query)
        .then(results => {
            return res.status(200).json({
            results
            })
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

const clearSpineData = async (req, res, next) => {
    logging.info(NAMESPACE, 'Clear spine data');

    const userId = auth.decode(req.headers.authorization).userId;

    let query = `DELETE FROM spine_range WHERE userId=${userId};`;

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

const getUserSpineData = async (req, res, next) => {
    logging.info(NAMESPACE, 'Get User spine data');

    const userId = auth.decode(req.headers.authorization).userId;

    let query = `SELECT * FROM spine_range WHERE userId=${userId};`;

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

export default { addSpineData, checkIfSpineDataExists, editSpineData, clearSpineData, getUserSpineData };