import { Db, MongoClient } from 'mongodb';
import config from '../config/index.js';

class MongoLib {
  private client: MongoClient;
  private dbName: string = config.dbName!;
  private mongoUri: string = config.mongoUri!;
  private static connection: Db;

  constructor() {
    this.client = new MongoClient(this.mongoUri);
  }

  async connect() {
    if (!MongoLib.connection) {
      try {
        // Use connect method to connect to the server
        await this.client.connect();
        console.log('[mongodb] Connected successfully to server');
        MongoLib.connection = this.client.db(this.dbName);
      } catch (error) {
        console.log(error);
      }
    }
    return MongoLib.connection;
  }
}

export default new MongoLib().connect();
