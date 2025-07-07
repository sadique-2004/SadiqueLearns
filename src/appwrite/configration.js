import config from "../conf/config";
import { Client, ID, Databases, Storage, Query } from "appwrite";

class AppwriteStorageService {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(config.appwritesUrl) // Set Appwrite endpoint
      .setProject(config.appWriteProjectId); // Set Appwrite project ID
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client); // bucket is nothing but storage
  }

  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await this.databases.createDocument(
        config.appWriteDatabaseId,
        config.appWriteCollectionId,
        slug || ID.unique(), // Use slug as ID or generate a unique ID
        {
          title,
          content,
          featuredImage,
          status,
          userId,
        }
      );
    } catch (error) {
      console.log("Arrwrite services :: createPost :: error", error);
      throw error;
    }
  }

  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.databases.updateDocument(
        config.appWriteDatabaseId,
        config.appWriteCollectionId,
        slug, // Use slug as ID
        {
          title,
          content,
          featuredImage,
          status,
        }
      );
    } catch (error) {
      console.log(
        "Appwrite services :: updatePost :: Error updating post:",
        error
      );
      throw error;
    }
  }

  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        config.appWriteDatabaseId,
        config.appWriteCollectionId,
        slug // Use slug as ID
      );
      return true;
    } catch (error) {
      console.log("appwrite services :: deletePost error:", error);
      return false;
    }
  }

  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        config.appWriteDatabaseId,
        config.appWriteCollectionId,
        slug // Use slug as ID
      );
    } catch (error) {
      console.log("appwite service :: get Post :: error:", error);
      return null;
    }
  }

  //   for doing this we must have indexes in appwrite databases
  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      const result = await this.databases.listDocuments(
        config.appWriteDatabaseId,
        config.appWriteCollectionId,
        queries
      );

      return result.documents;
    } catch (error) {
      console.log("appwrite service :: get posts :: error:", error);
      return [];
    }
  }

  //   file upload service
  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        config.appWriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("appwrite service :: upload file :: error:", error);
      return false;
    }
  }

  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(config.appWriteBucketId, fileId);
      return true;
    } catch (error) {
      console.log("appwrite service :: delete file :: error:", error);
      return false;
    }
  }

  getFilePreview(fileId) {
    return this.bucket.getFilePreview(config.appWriteBucketId, fileId);
  }
}

const appwriteStorageService = new AppwriteStorageService();

export default appwriteStorageService;
