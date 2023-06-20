import logging from '../config/logging.js';
import { Connect, Query } from '../config/mysql.js';
import bcrypt from "bcrypt";
import { createAccessToken, decode } from '../auth.js';

const NAMESPACE = "Users";

const signUp = async (req, res, next) => {
    logging.info(NAMESPACE, 'User sign up');

    let { name, username, email, password } = req.body;

    let query = `INSERT INTO users (name, username, email, password) VALUES ("${name}", "${username}", "${email}", "${ bcrypt.hashSync(password, 5)}")`;

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

const logIn = async (req, res, next) => {
    logging.info(NAMESPACE, 'User sign up');

    let { username, password } = req.body;

    let query = `SELECT * FROM users WHERE username = "${username}"`;

     Connect()
    .then(connection => {
        Query(connection, query)
        .then((result, error) => {
            const user =result[0]

            const isPasswordCorrect = bcrypt.compareSync(password, user.password)

            console.log(error)

            if(isPasswordCorrect) {
                const token = createAccessToken(user);

                res.status(200).json({
                    access: token
                });
            } else {
                return res.status(401).json({
                    message: "Wrong Password"
                })
            }
        }
        )
        .catch(error => {
            logging.error(NAMESPACE, error.message, error);

            return res.status(404).json({
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

const getName = (req, res) => {
    logging.info(NAMESPACE, 'getting name');

    const userInfo = decode(req.headers.authorization);

    if(userInfo) {
        return res.status(200).json({
            name: userInfo.name
        });
    } else {
        return res.status(500).json({
            message: "Invalid Token"
        })
    }
}

const getAllUsers = (req, res) => {
    logging.info(NAMESPACE, 'get all users');

    let query = "SELECT * FROM users";

    Connect()
    .then(connection => {
        Query(connection, query)
        .then(results => {
            return res.status(200).json({
                results
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

const checkIfUsernameExists = (req, res) => {
    logging.info(NAMESPACE, 'check if username exists');

    const {username} = req.body;

    let query = `SELECT * FROM users WHERE username = "${username}"`;

    Connect()
    .then(connection => {
        Query(connection, query)
        .then(results => {

            if (results[0]){
                return res.status(200).json({
                    usernameExists: true
                });
            } else {
                return res.status(200).json({
                    usernameExists: false
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

const editUserInfo = (req, res) => {
    logging.info(NAMESPACE, 'edit user info');

    const userInfo = decode(req.headers.authorization);

    let { name, username, email } = req.body;

    const query = `UPDATE users SET name="${name}", username="${username}", email="${email}" WHERE userId=${userInfo.userId}`;

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

const getUserInfo = (req, res) => {
    logging.info(NAMESPACE, 'get user info');

    const userInfo = decode(req.headers.authorization);

    let query = `SELECT * FROM users WHERE userId = ${userInfo.userId}`;

    Connect()
    .then(connection => {
        Query(connection, query)
        .then(results => {
            return res.status(200).json({
                results
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

const refreshToken = async (req, res, next) => {
    logging.info(NAMESPACE, 'Refresh Token');

    const userInfo = decode(req.headers.authorization);

    let query = `SELECT * FROM users WHERE userId = ${userInfo.userId}`;

     Connect()
    .then(connection => {
        Query(connection, query)
        .then((result, error) => {
            const user =result[0]

            const token = createAccessToken(user);

            return res.status(200).json({
                    access: token
            });
        }
        )
        .catch(error => {
            logging.error(NAMESPACE, error.message, error);

            return res.status(404).json({
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

export default { signUp, getAllUsers, logIn, checkIfUsernameExists, editUserInfo, getName, getUserInfo, refreshToken };