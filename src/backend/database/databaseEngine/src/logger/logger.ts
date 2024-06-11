import { createLogger, format, transports } from 'winston';
import 'winston-mongodb';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Provides static methods to log messages with different levels of importance and colors to the console.
 * Additionally logs messages to MongoDB for persistent storage.
 */
export class Logger
{
    /**
     * ANSI escape code to reset the console color.
     */
    private static RESET = '\x1b[0m';

    /**
     * ANSI escape code for red color, used for errors.
     */
    private static RED = '\x1b[31m';

    /**
     * ANSI escape code for green color, used for successes.
     */
    private static GREEN = '\x1b[32m';

    /**
     * ANSI escape code for yellow color, used for warnings.
     */
    private static YELLOW = '\x1b[33m';

    /**
     * ANSI escape code for blue color, used for informational messages.
     */
    private static BLUE = '\x1b[34m';

    /**
     * Winston logger instance configured to log to console and MongoDB.
     */
    private static logger = createLogger({
        level: 'info', // Default logging level
        format: format.combine(
            format.timestamp(),
            format.json()
        ),
        transports: [
            new transports.Console({
                format: format.combine(
                    format.colorize(),
                    format.simple()
                )
            }),
            new transports.MongoDB({
                db: process.env.MONGODB_URI as string,
                options: { useUnifiedTopology: true },
                collection: 'logs',
                level: 'info'
            })
        ]
    });

    /**
     * Logs an informational message to the console with blue text and MongoDB.
     * @param message - The message to log.
     */
    static info(message: string)
    {
        console.log(`${Logger.BLUE}${message}${Logger.RESET}`);
        Logger.logger.info(message);
    }

    /**
     * Logs a success message to the console with green text and MongoDB.
     * @param message - The message to log.
     */
    static success(message: string)
    {
        console.log(`${Logger.GREEN}${message}${Logger.RESET}`);
        Logger.logger.info(message);
    }

    /**
     * Logs a warning message to the console with yellow text and MongoDB.
     * @param message - The message to log.
     */
    static warning(message: string)
    {
        console.log(`${Logger.YELLOW}${message}${Logger.RESET}`);
        Logger.logger.warn(message);
    }

    /**
     * Logs an error message to the console with red text and MongoDB.
     * @param message - The message to log.
     */
    static error(message: string)
    {
        console.log(`${Logger.RED}${message}${Logger.RESET}`);
        Logger.logger.error(message);
    }
}
