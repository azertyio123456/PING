import { IUser } from '../mongoose/UserDB'; 
import { userModel } from '../mongoose/UserDB';

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
 * Class representing a user with properties and methods to manipulate user data.
 */
export class User
{
    private _id: number | undefined;
    private username: string;
    private email: string;
    private gamification: {
        competence: string[];
        gold: number[];
        exp: number[];
        evolution_id: number;
        path_image: string;
        lines_written: number[];
        errors: number[];
        victory: boolean[];
    };
    private battleLog: Battle[];

    /**
     * Constructs a User instance with provided values.
     * @param username - User's username.
     * @param email - User's email address.
     * @param gamification - User's gamification data.
     * @param battleLog - User's battle log data.
     * @param id - User's ID (optional, default undefined).
     */
    constructor(
        username: string,
        email: string,
        gamification: {
            competence: string[];
            gold: number[];
            exp: number[];
            evolution_id: number;
            path_image: string;
            lines_written: number[];
            errors: number[];
            victory: boolean[];
        },
        battleLog: Battle[],
        id?: number
    )
    {
        this._id = id;
        this.username = username;
        this.email = email;
        this.gamification = gamification;
        this.battleLog = battleLog;
    }

    /**
     * Gets the ID of the user.
     * @returns User's ID.
     */
    GetID(): number | undefined
    {
        return this._id;
    }

    /**
     * Gets the username of the user.
     * @returns User's username.
     */
    GetUsername(): string
    {
        return this.username;
    }

    /**
     * Sets the username of the user.
     * @param username - New username to set.
     */
    SetUsername(username: string): void
    {
        this.username = username;
    }

    /**
     * Gets the email of the user.
     * @returns User's email address.
     */
    GetEmail(): string
    {
        return this.email;
    }

    /**
     * Sets the email of the user.
     * @param email - New email address to set.
     */
    SetEmail(email: string): void
    {
        this.email = email;
    }

    /**
     * Gets the gamification data of the user.
     * @returns User's gamification data.
     */
    GetGamification(): any
    {
        return this.gamification;
    }

    /**
     * Sets the gamification data of the user.
     * @param gamification - New gamification data to set.
     */
    SetGamification(gamification: any): void
    {
        this.gamification = gamification;
    }

    /**
     * Gets the battle log of the user.
     * @returns User's battle log.
     */
    GetBattleLog(): Battle[]
    {
        return this.battleLog;
    }

    /**
     * Sets the battle log of the user.
     * @param battleLog - New battle log to set.
     */
    SetBattleLog(battleLog: Battle[]): void
    {
        this.battleLog = battleLog;
    }

    /**
     * Converts the User instance to a IUser interface type, for use with mongoose operations.
     * @returns The IUser object ready for database operations.
     */
    ToIUser(): IUser
    {
        return new userModel({
            _id: this._id,
            username: this.username,
            email: this.email,
            gamification: this.gamification,
            battleLog: this.battleLog
        });
    }
}
