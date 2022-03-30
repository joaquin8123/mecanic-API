import { Document } from 'mongoose';
export default interface IClient extends Document {
    name: string;
    lastName: string;
}