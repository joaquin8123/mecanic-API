import { Request, Response, NextFunction } from 'express';
import logging from '../config/logging';
import Client from '../models/Client'

const NAMESPACE = 'Client Controller';

const create = async (req: Request, res: Response) => {
    logging.info(NAMESPACE, `Create client Method`);
    try {
        const  { name, lastName } = req.body;
        const client = new Client({
            name,
            lastName
        })
        return client
            .save()
            .then((client) => res.status(201).json({ message: 'CREATE_SUCCESS', data: client }))
            .catch((error) => res.status(400).json({ message: 'CREATE_ERROR', data: error }));
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'CREATE_ERROR', data: error })
    }
};


export default {
    create
};