import { Request, Response, NextFunction } from 'express';
import IClient from '../interfaces/client';
import logging from '../config/logging';
import Client from '../models/Client'
import sendResponse from '../helpers/buildResponse'

const NAMESPACE = 'Client Controller';

const create = async (req: Request, res: Response) => {
    logging.info(NAMESPACE, `Create client Method`);
    try {
        const  { name, lastName } = req.body;
        const client: IClient = new Client({
            name,
            lastName
        })
        return client
            .save()
            .then((client: IClient) => sendResponse(res,'CREATE_CLIENTS_SUCCESS',201, client))
            .catch((error: Error) => sendResponse(res,'CREATE_CLIENTS_ERROR',400, error));
    } catch (error) {
        console.error(error);
        return sendResponse(res,'CREATE_CLIENTS_ERROR',500, error)
    }
};

const getAll = async (req: Request, res: Response) => {
    logging.info(NAMESPACE, 'GetAllClients Method');
    try {
        const clients: IClient[] = await Client.find()
        return sendResponse(res,'GET_CLIENTS_SUCCESS',200, clients)
    } catch (error) {
        console.error(error);
        return sendResponse(res,'GET_CLIENTS_ERROR',500, error)
    }
};

export default {
    create,
    getAll
};