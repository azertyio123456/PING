import { Logger } from '../logger/logger';

/**
 * A decorator to catch and log errors for asynchronous methods within a class.
 * @template T - This generic represents the function type being decorated.
 * @param target - The constructor function of the class for the instance member.
 * @param propertyName - The name of the method being decorated.
 * @param descriptor - The property descriptor for the method.
 * @returns {void} Modifies the descriptor in-place to wrap the original method with error handling.
 */
export function CatchErrors<T extends (...args: any[]) => Promise<any>>(
    target: Object, 
    propertyName: string, 
    descriptor: TypedPropertyDescriptor<T>
)
{
    // Original method retrieved from the descriptor.
    const originalMethod = descriptor.value;

    if (!originalMethod)
    {
        throw new Error("No method found for the decorator to apply.");
    }

    // Replacing the original method with a new async function that includes try-catch logic.
    descriptor.value = async function(this: any, ...args: any[])
    {
        try
        {
            // Executing the original method and logging the success case.
            const result = await originalMethod.apply(this, args);
            Logger.success(`${propertyName} finished well.`);
            return result;
        } 
        catch (error)
        {
            // Logging the error case before re-throwing the error.
            Logger.error(`${propertyName} failed: ${error}`);
            throw error;
        }
    } as T;
}
