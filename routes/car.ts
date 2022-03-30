import express from 'express';
import carController from '../controllers/car';

const router = express.Router();

router.post('/', carController.create);
router.delete('/:id', carController.deleteCar);
router.put('/:id', carController.edit);
router.get('/', carController.getAll);
router.get('/:id', carController.getById);
router.get('/history/:id',carController.history)

export = router;