import { DatabaseEntity } from './databaseEntity';
import mongoose, { Document, Schema } from 'mongoose';
const AutoIncrement = require('mongoose-sequence')(mongoose);

/**
 * Interface for the User model.
 */
export interface IUser extends Document {
    _id: number | undefined;
    username: string;
    email: string;
    gamification: {
        competence: string[];
        gold: number;
        exp: number;
        evolution_id: number;
        path_images: string;
    };
}

/**
 * Schema definition for the User model.
 */
const userSchema: Schema<IUser> = new Schema(
{
    _id: { type: Number },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    gamification: {
        competence: { type: [String], default: [] },
        gold: { type: Number, default: 0 },
        exp: { type: Number, default: 0 },
        evolution_id: { type: Number },
        path_images: {type: String}
    }
}, 
{
    _id: false,
    timestamps: { createdAt: 'inscriptionDate', updatedAt: 'lastConnexion' }
});

// Apply AutoIncrement plugin to userSchema
userSchema.plugin(AutoIncrement, { inc_field: '_id', id: 'user_counter' });

// Create indexes for email and username fields
userSchema.index({ email: 1, username: 1 }, { unique: true });

// Compile model from schema
export const userModel = mongoose.model<IUser>('User', userSchema);

/**
 * Database operations class for User entities, extending generic DatabaseEntity class.
 */
export class UserDB extends DatabaseEntity<IUser>
{
    constructor()
    {
        super(userModel);
    }

    /**
     * Retrieves the email of a user at a specific index in the loaded documents.
     * @param index Index of the user in the loaded documents array.
     * @returns The email of the user if found, otherwise undefined.
     */
    GetEmail(index: number): string | undefined
    {
        return this.document?.at(index)?.email;
    }

    /**
     * Updates the email of a user at a specific index in the loaded documents.
     * @param email New email to set.
     * @param index Index of the user in the loaded documents array.
     */
    SetEmail(email: string, index: number): void
    {
        const doc = this.document?.[index];
        if (doc)
        {
            doc.email = email;
        }
    }

    /**
     * Retrieves the username of a user at a specific index in the loaded documents.
     * @param index Index of the user in the loaded documents array.
     * @returns The username of the user if found, otherwise undefined.
     */
    GetUsername(index: number): string | undefined
    {
        return this.document?.at(index)?.username;
    }

    /**
     * Updates the username of a user at a specific index in the loaded documents.
     * @param username New username to set.
     * @param index Index of the user in the loaded documents array.
     */
    SetUsername(username: string, index: number): void
    {
        const doc = this.document?.[index];
        if (doc)
        {
            doc.username = username;
        }
    }

    /**
     * Retrieves the gamification data of a user at a specific index in the loaded documents.
     * @param index Index of the user in the loaded documents array.
     * @returns The gamification data of the user if found, otherwise undefined.
     */
    GetGamification(index: number): any | undefined
    {
        return this.document?.at(index)?.gamification;
    }

    /**
     * Updates the gamification data of a user at a specific index in the loaded documents.
     * @param gamification New gamification data to set.
     * @param index Index of the user in the loaded documents array.
     */
    SetGamification(gamification: any, index: number): void
    {
        const doc = this.document?.[index];
        if (doc)
        {
            doc.gamification = gamification;
        }
    }

    /**
     * Retrieves the competence of a user at a specific index in the loaded documents.
     * @param index Index of the user in the loaded documents array.
     * @returns The competence of the user if found, otherwise undefined.
     */
    GetCompetence(index: number): string[] | undefined
    {
        return this.document?.at(index)?.gamification.competence;
    }

    /**
     * Updates the competence of a user at a specific index in the loaded documents.
     * @param competence New competence to set.
     * @param index Index of the user in the loaded documents array.
     */
    SetCompetence(competence: string[], index: number): void
    {
        const doc = this.document?.[index];
        if (doc)
        {
            doc.gamification.competence = competence;
        }
    }

    /**
     * Retrieves the gold balance of a user at a specific index in the loaded documents.
     * @param index Index of the user in the loaded documents array.
     * @returns The gold balance of the user if found, otherwise undefined.
     */
    GetGold(index: number): number | undefined
    {
        return this.document?.at(index)?.gamification.gold;
    }

    /**
     * Updates the gold balance of a user at a specific index in the loaded documents.
     * @param gold New gold balance to set.
     * @param index Index of the user in the loaded documents array.
     */
    SetGold(gold: number, index: number): void
    {
        const doc = this.document?.[index];
        if (doc)
        {
            doc.gamification.gold = gold;
        }
    }

    /**
     * Retrieves the experience points (EXP) of a user at a specific index in the loaded documents.
     * @param index Index of the user in the loaded documents array.
     * @returns The experience points of the user if found, otherwise undefined.
     */
    GetExp(index: number): number | undefined
    {
        return this.document?.at(index)?.gamification.exp;
    }

    /**
     * Updates the experience points (EXP) of a user at a specific index in the loaded documents.
     * @param exp New experience points to set.
     * @param index Index of the user in the loaded documents array.
     */
    SetExp(exp: number, index: number): void
    {
        const doc = this.document?.[index];
        if (doc)
        {
            doc.gamification.exp = exp;
        }
    }

    /**
     * Retrieves the evolution ID of a user at a specific index in the loaded documents.
     * @param index Index of the user in the loaded documents array.
     * @returns The evolution ID of the user if found, otherwise undefined.
     */
    GetEvolutionID(index: number): number | undefined
    {
        return this.document?.at(index)?.gamification.evolution_id;
    }

    /**
     * Updates the evolution ID of a user at a specific index in the loaded documents.
     * @param evolution_id New evolution ID to set.
     * @param index Index of the user in the loaded documents array.
     */
    SetEvolutionID(evolution_id: number, index: number): void
    {
        const doc = this.document?.[index];
        if (doc)
        {
            doc.gamification.evolution_id = evolution_id;
        }
    }

    /**
     * Retrieves the evolution ID of a user at a specific index in the loaded documents.
     * @param index Index of the user in the loaded documents array.
     * @returns The evolution ID of the user if found, otherwise undefined.
     */
    GetPathImages(index: number): string | undefined
    {
        return this.document?.at(index)?.gamification.path_images;
    }

    /**
     * Updates the evolution ID of a user at a specific index in the loaded documents.
     * @param evolution_id New evolution ID to set.
     * @param index Index of the user in the loaded documents array.
     */
    SetPathImages(path_images: string, index: number): void
    {
        const doc = this.document?.[index];
        if (doc)
        {
            doc.gamification.path_images = path_images;
        }
    }
}
