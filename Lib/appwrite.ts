import { Client, Account, Databases } from 'appwrite';

export const client = new Client();

client
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_URL!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!); // Replace with your project ID

export const account = new Account(client);
export const databases = new Databases(client);
export { ID } from 'appwrite';

export const DB = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!
export const USERS = process.env.NEXT_PUBLIC_APPWRITE_USER_COLLECTION_ID!
export const UPLOADS = process.env.NEXT_PUBLIC_APPWRITE_UPLOAD_COLLECTION_ID!









