import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

// Obtenir le chemin du fichier actuel et du répertoire
const BASE_IMAGES_DIR = path.resolve(__dirname, '../../images');

export class ImageProcessor
{
    private static inputDir = path.join(BASE_IMAGES_DIR, 'input');

    /**
     * Compresses an image using Sharp
     * @param inputPath - The path of the input image
     * @param outputPath - The path where the compressed image will be saved
     */
    static async compressImageSharp(inputPath: string, outputPath: string): Promise<void>
    {
        try
        {
            await sharp(inputPath)
                .resize(800)
                .toFormat('jpeg')
                .jpeg({ quality: 80 })
                .toFile(outputPath);
            console.log(`Image compressed and saved to ${outputPath}`);
        }
        catch (error)
        {
            console.error('Error compressing image with sharp:', error);
        }
    }

    /**
     * Processes all images in the input directory
     * @param outputDir - The directory where the processed images will be saved
     */
    static async processImages(outputDir: string): Promise<void>
    {
        if (!fs.existsSync(this.inputDir))
        {
            console.error(`Input directory does not exist: ${this.inputDir}`);
            return;
        }

        const files = fs.readdirSync(this.inputDir);
        for (const file of files)
        {
            const inputPath = path.join(this.inputDir, file);
            const outputPathSharp = path.join(outputDir, `sharp-${file}`);

            await this.compressImageSharp(inputPath, outputPathSharp);
        }
    }

    /**
     * Generates a SHA-256 hash from an email
     * @param email - The email of the user
     * @returns The hash as a hexadecimal string
     */
    static hashEmail(email: string): string
    {
        return crypto.createHash('sha256').update(email).digest('hex');
    }

    /**
     * Creates a folder in the images directory using the hashed email as the folder name
     * @param email - The email of the user
     */
    static async createUserImageFolder(email: string): Promise<void>
    {
        const imagesDir = BASE_IMAGES_DIR;
        const userFolder = path.join(imagesDir, this.hashEmail(email));

        // Check if the images directory exists, if not, create it
        if (!fs.existsSync(imagesDir))
        {
            fs.mkdirSync(imagesDir, { recursive: true });
        }

        // Check if the user folder exists, if not, create it
        if (!fs.existsSync(userFolder))
        {
            fs.mkdirSync(userFolder, { recursive: true });
            console.log(`Dossier créé: ${userFolder}`);
        }
        else
        {
            console.log(`Le dossier existe déjà: ${userFolder}`);
        }
    }

    /**
     * Creates user image folder and processes images
     * @param email - The email of the user
     */
    static async processUserImages(email: string): Promise<string | undefined>
    {
        try
        {
            const pathPictures = path.join(BASE_IMAGES_DIR, this.hashEmail(email));
            await this.createUserImageFolder(email);
            console.log('User folder created successfully.');
            await this.processImages(pathPictures);
            console.log('Image processing completed.');
            return pathPictures;
        }
        catch (err)
        {
            console.error('Error creating user folder or processing images:', err);
            return undefined;
        }
    }
}
