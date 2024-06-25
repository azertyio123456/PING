import mongoose, { Document, Schema } from 'mongoose';
import { DatabaseEntity } from './databaseEntity';

export interface IPokemon extends Document
{
    _id: number | undefined;
    username: string;
    gamification:
    {
        level: number;
        evolutionLevel: number;
        competences:
        {
            name: string;
            attack: number;
            random: number;
        };
        hp: number;
        happiness: number;
    };
}

const pokemonSchema: Schema<IPokemon> = new Schema(
{
    _id: { type: Number },
    username: { type: String, required: true },
    gamification:
    {
        level: { type: Number, required: true, default: 1 },
        evolutionLevel: { type: Number, required: true },
        competences: 
        { 
            name: { type: String, required: true }, 
            attack: { type: Number, required: true },
            random: { type: Number, required: true }
        },
        hp: { type: Number, required: true },
        happiness: { type: Number, required: true }
    }
}, 
{
    _id: false,
    timestamps: true
});
    
const AutoIncrement = require('mongoose-sequence')(mongoose);
pokemonSchema.plugin(AutoIncrement, { inc_field: '_id', id: 'pokemon_counter' });

export const pokemonModel = mongoose.model<IPokemon>('Pokemon', pokemonSchema);

export class PokemonDB extends DatabaseEntity<IPokemon>
{
    constructor()
    {
        super(pokemonModel);
    }

    GetName(index: number): string | undefined
    {
        return this.document?.at(index)?.username;
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
}
