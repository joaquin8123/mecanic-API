import dotenv from 'dotenv';
import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import logging from './config/logging';

/* Routes Import */



dotenv.config({path: './varibales.env'});

const NAMESPACE = 'Server';
const app = express();

/* Logging the request */

app.use((req, res, next) => {
    logging.info(NAMESPACE, `METHOD: [${req.method}] => URL: [${req.url}] => IP: [${req.socket.remoteAddress}]`);
    res.on('finish', () => {
        logging.info(NAMESPACE, `METHOD: [${req.method}] => URL: [${req.url}] => IP: [${req.socket.remoteAddress}] => STATUS: [${res.statusCode}]`);
    });

    next();
});

/* Parse the request */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/* Routes */

/* Error handling */
app.use((req, res, next) => {
    const error = new Error('not found');
    return res.status(404).json({
        message: error.message
    });
});

/* Create the server */
const httpServer = http.createServer(app);
httpServer.listen(process.env.PORT, () => logging.info(NAMESPACE, `API [Online] => Running on: ${process.env.HOST}: ${process.env.PORT}`));
