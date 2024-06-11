import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Logger } from '../logger/logger';
import { CatchErrors } from '../decorateur/decorateur';

// Load environment variables from .env file
dotenv.config();

/**
 * Manages database connections using mongoose. It supports connecting and disconnecting from the MongoDB server.
 */
export class Moongose 
{
    public static isConnected: boolean = false;

    /**
     * Connects to the MongoDB database using the URI provided in the environment variables.
     */
    @CatchErrors
    public static async ConnectToDatabase(): Promise<void> 
    {
        if (this.isConnected) 
        {
            Logger.info('Already connected to database.');
            return;
        }

        const uri: string = process.env.MONGODB_URI as string;
        Logger.info(uri);
        await mongoose.connect(uri);
        this.isConnected = true;
        Logger.info('Database connection established.');
    }

    /**
     * Disconnects from the MongoDB database.
     */
    @CatchErrors
    public static async DisconnectFromDatabase(): Promise<void> 
    {
        if (!this.isConnected) 
        {
            Logger.info('No active database connection to disconnect.');
            return;
        }
        await mongoose.disconnect();
        this.isConnected = false;
        Logger.info('Database connection closed.');
    }
}
