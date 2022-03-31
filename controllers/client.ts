import { Request, Response, NextFunction } from 'express';
import IClient from '../interfaces/client';
import logging from '../config/logging';
import Client from '../models/Client'

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
            .then((client: IClient) => res.status(201).json({ message: 'CREATE_SUCCESS', data: client }))
            .catch((error: Error) => res.status(400).json({ message: 'CREATE_ERROR', data: error }));
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'CREATE_ERROR', data: error })
    }
};

const getAll = async (req: Request, res: Response) => {
    logging.info(NAMESPACE, 'GetAllClients Method');
    try {
        const clients: IClient[] = await Client.find()
        return res.status(200).json({ message: 'GET_ALL_SUCCESS', data: clients  })
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'GET_CAR_ERROR', data: error  })
    }
};

export default {
    create,
    getAll
};