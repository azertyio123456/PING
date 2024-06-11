import mongoose, { Document, Model } from 'mongoose';
import { Logger } from '../logger/logger';
import { CatchErrors } from '../decorateur/decorateur';
import { error } from 'console';
import { FilterQuery } from 'mongoose';

/**
 * Enumeration for sort directions used in database queries.
 */
export enum SortDirection
{
    HIGHER_TO_LOWER = -1,
    LOWER_TO_HIGHER = 1
}

/**
 * Abstract class to define common properties and methods for database entities.
 * @template T Extends mongoose Document indicating the type of the model document.
 */
export abstract class DatabaseEntity<T extends Document>
{
    /**
     * The mongoose model associated with the entity.
     */
    protected model: Model<T>;

    /**
     * Active document instances loaded by the entity.
     */
    protected document?: T[];

    /**
     * Initializes a new instance of the DatabaseEntity class with a mongoose model.
     * @param model The mongoose model to use for database operations.
     */
    constructor(model: Model<T>)
    {
        this.model = model;
        this.document = [];
    }

    /**
     * Retrieves a document by its ID and stores it if found.
     * @param id The ID of the document to retrieve.
     */
    @CatchErrors
    async RetrieveOneById(id: number)
    {
        const document = await this.model.findById(id).exec();
        if (document)
        {
            this.document?.push(document);
            Logger.success("Document retrieved: " + JSON.stringify(document));
        }
        else
        {
            Logger.error('Error retrieving document by ID.');
            Logger.info("Make sure the ID exists");
            throw error;
        }
    }

    /**
     * Saves a new instance of a document in the database.
     * @param object The document object to save.
     */
    @CatchErrors
    async SaveNewInstance(object: T): Promise<void>
    {
        if (!this.model)
        {
            throw new Error("No model defined");
        }

        const savedDocument = await new this.model(object).save();
        Logger.success('Document saved successfully.');
        Logger.info("Saved document: " + JSON.stringify(savedDocument));
    }

    /**
     * Updates and saves all loaded documents and clears them after saving.
     */
    @CatchErrors
    async UpdateAndClean(): Promise<void>
    {
        if (!this.document)
        {
            throw new Error("No document loaded");
        }

        for (let i = 0; i < this.document.length; i++)
        {
            await this.document[i].save();
            Logger.success('Document updated and saved successfully.');
        }

        this.document = [];
    }

    /**
     * Updates and saves all loaded documents.
     */
    @CatchErrors
    async Update(): Promise<void>
    {
        if (!this.document)
        {
            throw new Error("No document loaded");
        }

        for (let i = 0; i < this.document.length; i++)
        {
            await this.document[i].save();
            Logger.success('Document updated and saved successfully.');
        }
    }

    /**
     * Retrieves all documents of the model.
     */
    @CatchErrors
    async RetrieveAll()
    {
        const document = await this.model.find().exec();
        if (document)
        {
            this.document = document;
            Logger.success("Documents retrieved successfully.");
        }
        else
        {
            Logger.error('Error retrieving documents.');
            Logger.info("Make sure the Model Exists or your URI is correct");
            throw error;
        }
    }

    /**
     * Retrieves documents based on the specified criteria.
     * @param criteria The criteria to use for retrieving documents.
     */
    @CatchErrors
    async RetrieveByCriteria(criteria: FilterQuery<T>)
    {
        const document = await this.model.find(criteria).exec();
        if (document && document.length > 0)
        {
            this.document = document;
            Logger.success("Documents retrieved successfully.");
        }
        else
        {
            Logger.error("No documents match the provided criteria.");
            this.document = [];  // Assurez-vous que this.document est vide
        }
    }

    /**
     * Retrieves and sorts documents based on the given criteria and sort directive.
     * @param sort The sort direction and fields.
     * @param criteria The criteria to filter documents (optional).
     */
    @CatchErrors
    async RetrievedAndSort(sort: { [key: string]: 1 | -1 }, criteria: FilterQuery<T> = {})
    {
        const documents = await this.model.find(criteria).sort(sort).exec();
        if (documents.length > 0)
        {
            this.document = documents;
            Logger.success("Documents retrieved and sorted successfully.");
        }
        else
        {
            Logger.info("No documents found matching the criteria and sort conditions.");
        }
    }

    /**
     * Retrieves documents with pagination.
     * @param skip The number of documents to skip.
     * @param limit The limit on the number of documents to return.
     * @param criteria The criteria to filter documents (optional).
     */
    async FindWithPagination(skip: number, limit: number, criteria: FilterQuery<T> = {})
    {
        if (limit <= 0)
        {
            Logger.error("Limit must be greater than 0. Provided limit: " + limit);
            return;
        }

        const documents = await this.model.find(criteria).skip(skip).limit(limit).exec();
        if (documents.length > 0)
        {
            this.document = documents;
            Logger.success("Documents retrieved with pagination successfully.");
        }
        else
        {
            Logger.info("No documents found matching the criteria with the specified pagination.");
        }
    }

    /**
     * Gets the currently loaded documents.
     * @returns An array of documents or undefined if no documents are loaded.
     */
    GetDocument(): T[] | undefined
    {
        return this.document;
    }
}
