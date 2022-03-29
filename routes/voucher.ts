import express from 'express';
import voucherController from '../controllers/voucher';

const router = express.Router();

router.post('/', voucherController.create);

export = router;