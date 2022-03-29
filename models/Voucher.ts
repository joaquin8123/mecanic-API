import mongoose, { Schema } from 'mongoose';

const ComprobanteSchema: Schema = new Schema(
    {
        date: {
            type: String
        },
        amount: {
            type: Number
        },
        client: { type: Schema.Types.ObjectId, ref: 'clients' },
        services: [{ type: Schema.Types.ObjectId, ref: 'servicies' }]
    },
    {
        timestamps: true
    }
);

export default mongoose.model('Voucher', ComprobanteSchema);