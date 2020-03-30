import { variables } from 'config';
import { IMonkManager } from 'monk';
import { databaseFactory } from './database';

export default class Container {
  private static instance: Container;

  private constructor() {
    console.log('#juliantla');
  }

  static getInstance(): Container {
    if (!Container.instance) {
      Container.instance = new Container();
    }
    return Container.instance;
  }

  private db!: IMonkManager;
  async getDb(): Promise<IMonkManager> {
    if (!this.db) {
      this.db = await databaseFactory(variables.mongoUri);
    }
    return this.db;
  }
}
