import { IBoutique } from '../mongoose/BoutiqueDB';
import { boutiqueModel } from '../mongoose/BoutiqueDB';

/**
 * Class representing a boutique item with properties and methods to manipulate item data.
 */
export class ItemShop
{
    private _id: number | undefined;
    private name: string;
    private cost: number;
    private picture: string;
    private reward: {
        exp?: number;
        competence?: string[];
    };

    /**
     * Constructs a Boutique instance with provided values.
     * @param name - Name of the item.
     * @param cost - Cost of the item.
     * @param picture - Picture URL of the item.
     * @param reward - Reward for the item.
     * @param id - Item ID (optional, default undefined).
     */
    constructor(
        name: string,
        cost: number,
        picture: string,
        reward: {
            exp?: number;
            competence?: string[];
        },
        id?: number
    )
    {
        this._id = id;
        this.name = name;
        this.cost = cost;
        this.picture = picture;
        this.reward = reward;
    }

    /**
     * Gets the ID of the item.
     * @returns Item's ID.
     */
    GetID(): number | undefined
    {
        return this._id;
    }

    /**
     * Gets the name of the item.
     * @returns Item's name.
     */
    GetName(): string
    {
        return this.name;
    }

    /**
     * Sets the name of the item.
     * @param name - New name to set.
     */
    SetName(name: string): void
    {
        this.name = name;
    }

    /**
     * Gets the cost of the item.
     * @returns Item's cost.
     */
    GetCost(): number
    {
        return this.cost;
    }

    /**
     * Sets the cost of the item.
     * @param cost - New cost to set.
     */
    SetCost(cost: number): void
    {
        this.cost = cost;
    }

    /**
     * Gets the picture URL of the item.
     * @returns Item's picture URL.
     */
    GetPicture(): string
    {
        return this.picture;
    }

    /**
     * Sets the picture URL of the item.
     * @param picture - New picture URL to set.
     */
    SetPicture(picture: string): void
    {
        this.picture = picture;
    }

    /**
     * Gets the reward of the item.
     * @returns Item's reward.
     */
    GetReward(): any
    {
        return this.reward;
    }

    /**
     * Sets the reward of the item.
     * @param reward - New reward to set.
     */
    SetReward(reward: any): void
    {
        this.reward = reward;
    }

    /**
     * Converts the Boutique instance to a IBoutique interface type, for use with mongoose operations.
     * @returns The IBoutique object ready for database operations.
     */
    ToIBoutique(): IBoutique
    {
        return new boutiqueModel({
            _id: this._id,
            name: this.name,
            cost: this.cost,
            picture: this.picture,
            reward: this.reward
        });
    }
}
