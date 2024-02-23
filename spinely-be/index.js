import http from 'http';
import bodyParser from 'body-parser';
import express from 'express';
import logging from './config/logging.js';
import config from './config/config.js';
import cors from 'cors';
import usersRouter from './routes/users.js';
import calibrationRouter from './routes/calibration.js';
import sessionRouter from './routes/session.js';
import progressRouter from './routes/progress.js';

const NAMESPACE = 'server';
export const app = express();

/** Log the request */
app.use((req, res, next) => {
    /** Log the req */
    logging.info(NAMESPACE, `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

    res.on('finish', () => {
        logging.info(NAMESPACE, `METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`);
    })
    
    next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }

    next();
});

// app.use(cors);

/** Routes go here */
app.use("/users", usersRouter);
app.use("/calibration", calibrationRouter);
app.use("/session", sessionRouter);
app.use("/progress", progressRouter);

/** Error handling */
app.use((req, res, next) => {
    const error = new Error('Not found');

    res.status(404).json({
        message: error.message
    });
});

const httpServer = http.createServer(app);

httpServer.listen(config.server.port, () => logging.info(NAMESPACE, `Server is running ${config.server.hostname}:${config.server.port}`));

// TODO: Switch to SQLite 
// TODO: Refactor Button code