import dotenv from 'dotenv';
import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import logging from './config/logging';
import mongoose from 'mongoose';

/* Routes Import */
import carRoutes from './routes/car';
import clientRoutes from './routes/client';
import voucherRoutes from './routes/voucher';
import serviceRoutes from './routes/service'


dotenv.config({path: './variables.env'});

const NAMESPACE = 'Server';
const app = express();

/* Connect to MongoDB */
mongoose
    .connect( `mongodb+srv://${process.env.DB_USER}:${process.env.DB_USER}@clustermecanic.urj1r.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`)
    .then(() => logging.info(NAMESPACE, `DATABASE [Online] => Name: ${process.env.DB_NAME}`))
    .catch((error:Error) => logging.error(NAMESPACE, error.message, error));

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
app.use('/car', carRoutes);
app.use('/client', clientRoutes);
app.use('/voucher', voucherRoutes);
app.use('/service', serviceRoutes);

/* Error handling */
app.use((req, res, next) => {
    const error:Error = new Error('not found');
    return res.status(404).json({
        message: error.message
    });
});

/* Create the server */
const httpServer = http.createServer(app);
httpServer.listen(process.env.PORT, () => logging.info(NAMESPACE, `API [Online] => Running on: ${process.env.HOST}: ${process.env.PORT}`));
