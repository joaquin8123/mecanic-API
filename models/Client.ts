import mongoose, { Schema } from 'mongoose';
import IClient from '../interfaces/client'; 

const ClientSchema: Schema = new Schema(
    {
        name: {
            type: String,
            required: 'name is required.'
        },
        lastName: {
            type: String,
            required: 'lastName is required.'
        }
    },
    {
        timestamps: true
    }
);

export default mongoose.model<IClient>('Client', ClientSchema);