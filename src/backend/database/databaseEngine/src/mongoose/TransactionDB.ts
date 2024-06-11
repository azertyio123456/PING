import mongoose, { Document, Schema } from 'mongoose';
import { DatabaseEntity } from './databaseEntity';
const AutoIncrement = require('mongoose-sequence')(mongoose);

/**
 * Interface for the Transaction model.
 */
export interface ITransaction extends Document {
    _id: number | undefined;
    user_id: number;
    item_id: number;
    date: Date;
}

/**
 * Schema definition for the Transaction model.
 */
const transactionSchema: Schema<ITransaction> = new Schema(
{
    _id: { type: Number },
    user_id: { type: Number, required: true, ref: 'User' },
    item_id: { type: Number, required: true, ref: 'Boutique' },
    date: { type: Date, default: Date.now }
}, 
{
    _id: false,
    timestamps: true
});

// Apply AutoIncrement plugin to transactionSchema
transactionSchema.plugin(AutoIncrement, { inc_field: '_id', id: 'transaction_counter' });

// Compile model from schema
export const transactionModel = mongoose.model<ITransaction>('Transaction', transactionSchema);

/**
 * Database operations class for Transaction entities.
 */
export class TransactionDB extends DatabaseEntity<ITransaction>
{
    constructor()
    {
        super(transactionModel);
    }

    /**
     * Retrieves the user ID of a transaction at a specific index in the loaded documents.
     * @param index Index of the transaction in the loaded documents array.
     * @returns The user ID if found, otherwise undefined.
     */
    GetUserID(index: number): number | undefined
    {
        return this.document?.at(index)?.user_id;
    }

    /**
     * Updates the user ID of a transaction at a specific index in the loaded documents.
     * @param user_id New user ID to set.
     * @param index Index of the transaction in the loaded documents array.
     */
    SetUserID(user_id: number, index: number): void
    {
        const doc = this.document?.[index];
        if (doc)
        {
            doc.user_id = user_id;
        }
    }

    /**
     * Retrieves the item ID of a transaction at a specific index in the loaded documents.
     * @param index Index of the transaction in the loaded documents array.
     * @returns The item ID if found, otherwise undefined.
     */
    GetItemID(index: number): number | undefined
    {
        return this.document?.at(index)?.item_id;
    }

    /**
     * Updates the item ID of a transaction at a specific index in the loaded documents.
     * @param item_id New item ID to set.
     * @param index Index of the transaction in the loaded documents array.
     */
    SetItemID(item_id: number, index: number): void
    {
        const doc = this.document?.[index];
        if (doc)
        {
            doc.item_id = item_id;
        }
    }

    /**
     * Retrieves the date of a transaction at a specific index in the loaded documents.
     * @param index Index of the transaction in the loaded documents array.
     * @returns The date of the transaction if found, otherwise undefined.
     */
    GetDate(index: number): Date | undefined
    {
        return this.document?.at(index)?.date;
    }

    /**
     * Updates the date of a transaction at a specific index in the loaded documents.
     * @param date New date to set.
     * @param index Index of the transaction in the loaded documents array.
     */
    SetDate(date: Date, index: number): void
    {
        const doc = this.document?.[index];
        if (doc)
        {
            doc.date = date;
        }
    }
}
