import { ITransaction } from '../mongoose/TransactionDB'; 
import { transactionModel } from '../mongoose/TransactionDB';

/**
 * Class representing a transaction with properties and methods to manipulate transaction data.
 */
export class Transaction
{
    private _id: number | undefined;
    private user_id: number;
    private item_id: number;
    private date: Date;

    /**
     * Constructs a Transaction instance with provided values, with defaults for optional properties.
     * @param user_id - ID of the user making the transaction.
     * @param item_id - ID of the item being purchased.
     * @param date - Date of the transaction (optional, default now).
     * @param id - Transaction ID (optional, default undefined).
     */
    constructor(
        user_id: number,
        item_id: number,
        date?: Date,
        id?: number
    )
    {
        this._id = id;
        this.user_id = user_id;
        this.item_id = item_id;
        this.date = date || new Date();
    }

    /**
     * Gets the ID of the transaction.
     * @returns Transaction ID.
     */
    GetID(): number | undefined
    {
        return this._id;
    }

    /**
     * Gets the user ID of the transaction.
     * @returns User ID.
     */
    GetUserID(): number
    {
        return this.user_id;
    }

    /**
     * Sets the user ID of the transaction.
     * @param user_id - New user ID to set.
     */
    SetUserID(user_id: number): void
    {
        this.user_id = user_id;
    }

    /**
     * Gets the item ID of the transaction.
     * @returns Item ID.
     */
    GetItemID(): number
    {
        return this.item_id;
    }

    /**
     * Sets the item ID of the transaction.
     * @param item_id - New item ID to set.
     */
    SetItemID(item_id: number): void
    {
        this.item_id = item_id;
    }

    /**
     * Gets the date of the transaction.
     * @returns Date of the transaction.
     */
    GetDate(): Date
    {
        return this.date;
    }

    /**
     * Sets the date of the transaction.
     * @param date - New date to set.
     */
    SetDate(date: Date): void
    {
        this.date = date;
    }

    /**
     * Converts the Transaction instance to a ITransaction interface type, for use with mongoose operations.
     * @returns The ITransaction object ready for database operations.
     */
    ToITransaction(): ITransaction
    {
        return new transactionModel({
            _id: this._id,
            user_id: this.user_id,
            item_id: this.item_id,
            date: this.date
        });
    }
}
