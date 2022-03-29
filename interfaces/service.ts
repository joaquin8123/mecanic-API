import { Document } from 'mongoose';

export default interface IService extends Document {
    name: string;
    price: number;
}