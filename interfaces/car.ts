import { Document } from 'mongoose';
import IClient from './client';

export default interface ICar extends Document {
    brand: string;
    model: string;
    year: string;
    colour: string;
    patent: string;
    clientId?: IClient['_id'];
}