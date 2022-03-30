import { Document } from 'mongoose';
import ICar from './car';
import IClient from './client';
import IService from './service';

export default interface IVoucher extends Document {
    date: Date;
    amount: number;
    clientId: IClient['_id'];
    carId: ICar['_id'];
    services?: [IService['_id']] | any;
}