import { DatabaseEntity } from './databaseEntity';
import mongoose, { Document, Schema } from 'mongoose';
const AutoIncrement = require('mongoose-sequence')(mongoose);

/**
 * Interface for the Boutique model.
 */
export interface IBoutique extends Document {
    _id: number | undefined;
    name: string;
    cost: number;
    picture: string;
    reward: {
        exp?: number;
        competence?: string[];
    };
}

/**
 * Schema definition for the Boutique model.
 */
const boutiqueSchema: Schema<IBoutique> = new Schema(
{
    _id: { type: Number },
    name: { type: String, required: true },
    cost: { type: Number, required: true },
    picture: { type: String, required: true },
    reward: {
        exp: { type: Number, default: 0 },
        competence: { type: [String], default: [] }
    }
}, 
{
    _id: false,
    timestamps: true
});

// Apply AutoIncrement plugin to boutiqueSchema
boutiqueSchema.plugin(AutoIncrement, { inc_field: '_id', id: 'boutique_counter' });

// Compile model from schema
export const boutiqueModel = mongoose.model<IBoutique>('Boutique', boutiqueSchema);
/**
 * Database operations class for Boutique entities.
 */
export class BoutiqueDB extends DatabaseEntity<IBoutique>
{
    constructor()
    {
        super(boutiqueModel);
    }

    /**
     * Retrieves the name of an item at a specific index in the loaded documents.
     * @param index Index of the item in the loaded documents array.
     * @returns The name of the item if found, otherwise undefined.
     */
    GetName(index: number): string | undefined
    {
        return this.document?.at(index)?.name;
    }

    /**
     * Updates the name of an item at a specific index in the loaded documents.
     * @param name New name to set.
     * @param index Index of the item in the loaded documents array.
     */
    SetName(name: string, index: number): void
    {
        const doc = this.document?.[index];
        if (doc)
        {
            doc.name = name;
        }
    }

    /**
     * Retrieves the cost of an item at a specific index in the loaded documents.
     * @param index Index of the item in the loaded documents array.
     * @returns The cost of the item if found, otherwise undefined.
     */
    GetCost(index: number): number | undefined
    {
        return this.document?.at(index)?.cost;
    }

    /**
     * Updates the cost of an item at a specific index in the loaded documents.
     * @param cost New cost to set.
     * @param index Index of the item in the loaded documents array.
     */
    SetCost(cost: number, index: number): void
    {
        const doc = this.document?.[index];
        if (doc)
        {
            doc.cost = cost;
        }
    }

    /**
     * Retrieves the picture URL of an item at a specific index in the loaded documents.
     * @param index Index of the item in the loaded documents array.
     * @returns The picture URL if found, otherwise undefined.
     */
    GetPicture(index: number): string | undefined
    {
        return this.document?.at(index)?.picture;
    }

    /**
     * Updates the picture URL of an item at a specific index in the loaded documents.
     * @param picture New picture URL to set.
     * @param index Index of the item in the loaded documents array.
     */
    SetPicture(picture: string, index: number): void
    {
        const doc = this.document?.[index];
        if (doc)
        {
            doc.picture = picture;
        }
    }

    /**
     * Retrieves the reward of an item at a specific index in the loaded documents.
     * @param index Index of the item in the loaded documents array.
     * @returns The reward object if found, otherwise undefined.
     */
    GetReward(index: number): any | undefined
    {
        return this.document?.at(index)?.reward;
    }

    /**
     * Updates the reward of an item at a specific index in the loaded documents.
     * @param reward New reward to set.
     * @param index Index of the item in the loaded documents array.
     */
    SetReward(reward: any, index: number): void
    {
        const doc = this.document?.[index];
        if (doc)
        {
            doc.reward = reward;
        }
    }
}