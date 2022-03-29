import express from 'express';
import clientController from '../controllers/client';

const router = express.Router();

router.post('/', clientController.create);


export = router;