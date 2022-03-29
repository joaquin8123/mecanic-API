import mongoose, { Schema } from 'mongoose';
import IService from '../interfaces/service';

const ServiceSchema: Schema = new Schema(
    {
        name: {
            type: String,
            required: 'Name is required.'
        },
        price: {
            type: Number
        }
    },
    {
        timestamps: true
    }
);

export default mongoose.model<IService>('Service', ServiceSchema);