import express from 'express';
import serviceController from '../controllers/service';

const router = express.Router();

router.post('/', serviceController.create);


export = router;