const config = {
    appwritesUrl: String(process.env.VITE_APPWRITE_ENDPOINT),
    appWriteProjectId: String(process.env.VITE_APPWRITE_PROJECT_ID),
    appWriteDatabaseId: String(process.env.VITE_APPWRITE_DATABASE_ID),
    appWriteCollectionId: String(process.env.VITE_APPWRITE_COLLECTION_ID),
    appWriteBucketId: String(process.env.VITE_APPWRITE_BUCKET_ID),
}

export default config