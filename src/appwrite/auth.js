import config from "../conf/config";
import { Client, Account, ID } from "appwrite";

class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(config.appwritesUrl) // Set Appwrite endpoint
      .setProject(config.appWriteProjectId); // Set Appwrite project ID

    this.account = new Account(this.client);
  }

  async createAccount(email, password, name) {
    try {
      const userAcount = await this.account.create(
        ID.unique(), // Unique user ID
        email,
        password,
        name
      );

      if (userAcount) {
        // call another methofd to create user profile
        return this.login({ email, password });
      } else {
        return userAcount;
      }
    } catch (error) {
      console.log("Error creating account:", error);
      throw error;
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      console.log("Error logging in:", error);
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("Error getting current user:", error);
      throw error;
    }
    return null;
  }

  async logout() {
    try {
      return await this.account.deleteSessions();
    } catch (error) {
      console.log("Error logging out:", error);
      throw error;
    }
  }
}

const authService = new AuthService();

module.exports = authService;
