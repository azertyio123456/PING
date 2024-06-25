import { IPokemon, pokemonModel } from "../mongoose/PokemonDB";

/**
 * Class representing a Pokémon with properties and methods to manipulate Pokémon data.
 */
export class Pokemon
{
    private _id: number | undefined;
    private username: string;
    private gamification:
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
        attack: number;
        happiness: number;
    };

    /**
     * Constructs a Pokémon instance with provided values.
     * @param username - User's username.
     * @param gamification - User's gamification data.
     * @param id - User's ID (optional, default undefined).
     */
    constructor(
        username: string,
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
            attack: number;
            happiness: number;
        },
        id?: number
    ) {
        this._id = id;
        this.username = username;
        this.gamification = gamification;
    }

    /**
     * Gets the ID of the Pokémon.
     * @returns Pokémon's ID.
     */
    GetID(): number | undefined
    {
        return this._id;
    }

    /**
     * Gets the username of the Pokémon.
     * @returns Pokémon's username.
     */
    GetUsername(): string
    {
        return this.username;
    }

    /**
     * Sets the username of the Pokémon.
     * @param username - New username to set.
     */
    SetUsername(username: string): void
    {
        this.username = username;
    }

    /**
     * Gets the gamification data of the Pokémon.
     * @returns Pokémon's gamification data.
     */
    GetGamification(): any
    {
        return this.gamification;
    }

    /**
     * Sets the gamification data of the Pokémon.
     * @param gamification - New gamification data to set.
     */
    SetGamification(gamification: any): void
    {
        this.gamification = gamification;
    }

    /**
     * Converts the Pokémon instance to an IPokemon interface type, for use with mongoose operations.
     * @returns The IPokemon object ready for database operations.
     */
    ToIPokemon(): IPokemon
    {
        return new pokemonModel({
            _id: this._id,
            username: this.username,
            gamification: this.gamification
        });
    }
}
