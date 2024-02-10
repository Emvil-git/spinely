import logging from '../config/logging.js';
import { Connect, Query } from '../config/mysql.js';
import bcrypt from "bcrypt";
import { decode } from '../auth.js';

const NAMESPACE = "Session";

const addSession = async (req, res, next) => {
    logging.info(NAMESPACE, 'add session');

    const userInfo = decode(req.headers.authorization);

    let {
        seconds_elapsed,
        total_monitoredpos,
        total_matchproper,
        overall_forwardup,
        overall_forwardmid,
        overall_forwardlow,
        overall_left,
        overall_right
    } = req.body;

    let query = `INSERT INTO sessions (userId, seconds_elapsed, total_monitoredpos, total_matchproper, overall_forwardup, overall_forwardmid, overall_forwardlow, overall_left, overall_right) VALUES ("${userInfo.userId}", ${seconds_elapsed}, ${total_monitoredpos}, ${total_matchproper}, ${overall_forwardup}, ${overall_forwardmid}, ${overall_forwardlow}, ${overall_left}, ${overall_right})`;

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

const updateSession = async (req, res, next) => {
    logging.info(NAMESPACE, 'Update session');

    const { sessionId } = req.params; // Extract session ID from request parameters
    const {
        seconds_elapsed,
        total_monitoredpos,
        total_matchproper,
        overall_forwardup,
        overall_forwardmid,
        overall_forwardlow,
        overall_left,
        overall_right
    } = req.body; // Extract values to update from request body

    // Construct SQL query to update session rows
    let query = `
        UPDATE sessions 
        SET 
            seconds_elapsed = ${seconds_elapsed},
            total_monitoredpos = ${total_monitoredpos},
            total_matchproper = ${total_matchproper},
            overall_forwardup = ${overall_forwardup},
            overall_forwardmid = ${overall_forwardmid},
            overall_forwardlow = ${overall_forwardlow},
            overall_left = ${overall_left},
            overall_right = ${overall_right}
        WHERE
            sessionId = ${sessionId};`;

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

// const clearSessions = async (req, res, next) => {
//     logging.info(NAMESPACE, 'Clear spine data');

//     const userId = decode(req.headers.authorization).userId;

//     let query = `DELETE FROM sessions WHERE userId=${userId};`;

//      Connect()
//     .then(connection => {
//         Query(connection, query)
//         .then(result => {
//                 return res.status(200).json({
//                     result
//                 });
//             })
//         .catch(error => {
//             logging.error(NAMESPACE, error.message, error);

//             return res.status(500).json({
//             message: error.message,
//             error
//             })
//         })
//         .finally(() => {
//             connection.end();
//         })
//     })
//     .catch(error => {
//         logging.error(NAMESPACE, error.message, error);

//         return res.status(500).json({
//             message: error.message,
//             error
//         })
//     })
// }

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




export default { addSession, updateSession, getUserSessions }

// sessionRouter.get('/elapsedTime', controller.getElapsedTime); // time passed during the session (in s)
// sessionRouter.get('/countProperPosture', controller.getProperOverall); // A proper out of N total postures
// sessionRouter.get('/forwardUpperSensor', controller.forwardUpperSensor); // B forward bends out of N total
// sessionRouter.get('/forwardMidSensor', controller.forwardMidSensor); // C forward bends out of N total
// sessionRouter.get('/forwardLowerSensor', controller.forwardLowerSensor); // D forward bends out of N total
// sessionRouter.get('/leftBentSensor', controller.leftBentSensor); // E left bends out of N total
// sessionRouter.get('/rightBentSensor', controller.forwardUpperSensor); // F right bends out of N total