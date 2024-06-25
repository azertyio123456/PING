// src/middlewares/databaseEngine/src/mongoose/UserDB.ts
import { DatabaseEntity } from './databaseEntity';
import mongoose, { Document, Schema } from 'mongoose';
const AutoIncrement = require('mongoose-sequence')(mongoose);

interface BattleLogEntry
{
    turn: number;
    pokemon1:
    {
        name: string;
        hp: number;
        attack: boolean;
    };
    pokemon2:
    {
        name: string;
        hp: number;
        attack: boolean;
    };
}

interface Battle
{
    date: Date;
    logs: BattleLogEntry[];
}

/**
 * Interface for the User model.
 */
export interface IUser extends Document
{
    _id: number | undefined;
    username: string;
    email: string;
    gamification:
    {
        competence: string[];
        gold: number[];
        exp: number[];
        evolution_id: number;
        path_image: string;
        lines_written: number[];
        errors: number[];
        victory: boolean[];
    };
    battleLog: Battle[];
}

/**
 * Schema definition for the User model.
 */
const userSchema: Schema<IUser> = new Schema(
{
    _id: { type: Number },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    gamification:
    {
        competence: { type: [String], default: [] },
        gold: { type: [Number], default: [] },
        exp: { type: [Number], default: [] },
        evolution_id: { type: Number },
        path_image: { type: String },
        lines_written: { type: [Number], default: [] },
        errors: { type: [Number], default: [] },
        victory: { type: [Boolean], default: [] }
    },
    battleLog: [
        {
            date: { type: Date },
            logs: [
                {
                    turn: { type: Number },
                    pokemon1:
                    {
                        name: { type: String },
                        hp: { type: Number },
                        attack: { type: Boolean }
                    },
                    pokemon2:
                    {
                        name: { type: String },
                        hp: { type: Number},
                        attack: { type: Boolean }
                    }
                }
            ]
        }
    ]
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

    GetEmail(index: number): string | undefined
    {
        return this.document?.at(index)?.email;
    }

    SetEmail(email: string, index: number): void
    {
        const doc = this.document?.[index];
        if (doc)
        {
            doc.email = email;
        }
    }

    GetUsername(index: number): string | undefined
    {
        return this.document?.at(index)?.username;
    }

    SetUsername(username: string, index: number): void
    {
        const doc = this.document?.[index];
        if (doc)
        {
            doc.username = username;
        }
    }

    GetGamification(index: number): any | undefined
    {
        return this.document?.at(index)?.gamification;
    }

    SetGamification(gamification: any, index: number): void
    {
        const doc = this.document?.[index];
        if (doc)
        {
            doc.gamification = gamification;
        }
    }

    GetCompetence(index: number): string[] | undefined
    {
        return this.document?.at(index)?.gamification.competence;
    }

    SetCompetence(competence: string[], index: number): void
    {
        const doc = this.document?.[index];
        if (doc)
        {
            doc.gamification.competence = competence;
        }
    }

    GetEvolutionID(index: number): number | undefined
    {
        return this.document?.at(index)?.gamification.evolution_id;
    }

    SetEvolutionID(evolution_id: number, index: number): void
    {
        const doc = this.document?.[index];
        if (doc)
        {
            doc.gamification.evolution_id = evolution_id;
        }
    }

    GetPathImages(index: number): string | undefined
    {
        return this.document?.at(index)?.gamification.path_image;
    }

    SetPathImages(path_image: string, index: number): void
    {
        const doc = this.document?.[index];
        if (doc)
        {
            doc.gamification.path_image = path_image;
        }
    }

    GetLinesWritten(index: number): number[] | undefined
    {
        return this.document?.at(index)?.gamification.lines_written;
    }

    SetLinesWritten(lines: number[], index: number): void
    {
        const doc = this.document?.[index];
        if (doc)
        {
            doc.gamification.lines_written = lines;
        }
    }

    GetErrors(index: number): number[] | undefined
    {
        return this.document?.at(index)?.gamification.errors;
    }

    SetErrors(errors: number[], index: number): void
    {
        const doc = this.document?.[index];
        if (doc)
        {
            doc.gamification.errors = errors;
        }
    }

    GetGold(index: number): number[] | undefined
    {
        return this.document?.at(index)?.gamification.gold;
    }

    SetGold(gold: number[], index: number): void
    {
        const doc = this.document?.[index];
        if (doc)
        {
            doc.gamification.gold = gold;
        }
    }

    GetExp(index: number): number[] | undefined
    {
        return this.document?.at(index)?.gamification.exp;
    }

    SetExp(exp: number[], index: number): void
    {
        const doc = this.document?.[index];
        if (doc)
        {
            doc.gamification.exp = exp;
        }
    }

    GetVictory(index: number): boolean[] | undefined
    {
        return this.document?.at(index)?.gamification.victory;
    }

    SetVictory(victory: boolean[], index: number): void
    {
        const doc = this.document?.[index];
        if (doc)
        {
            doc.gamification.victory = victory;
        }
    }

    GetBattleLog(index: number): Battle[] | undefined
    {
        return this.document?.at(index)?.battleLog;
    }

    SetBattleLog(battlelog: Battle[], index: number): void
    {
        const doc = this.document?.[index];
        if (doc)
        {
            doc.battleLog = battlelog;
        }
    }
}
