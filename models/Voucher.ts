import mongoose, { Schema } from 'mongoose';

const ComprobanteSchema: Schema = new Schema(
    {
        date: {
            type: String
        },
        amount: {
            type: Number
        },
        clientId: { type: Schema.Types.ObjectId, ref: 'clients' },
        carId: { type: Schema.Types.ObjectId, ref: 'cars' },
        services: [{ type: Schema.Types.ObjectId, ref: 'services' }]
    },
    {
        timestamps: true
    }
);

export default mongoose.model('Voucher', ComprobanteSchema);