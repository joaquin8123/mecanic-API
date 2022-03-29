import mongoose, { Schema } from 'mongoose';
import ICar from '../interfaces/car';

const CarSchema: Schema = new Schema(
    {
        brand: { type: String},
        model: { type: String},
        year: { type: String},
        colour: { type: String},
        patent: { type: String, unique: true},
        clientId: { type: Schema.Types.ObjectId, ref: 'clients' },
    },
    {
        timestamps: true
    }
);

export default mongoose.model<ICar>('Car', CarSchema);