import monk, { ICollection, IMonkManager, id as monkId, IObjectID } from 'monk';
import { Entity } from 'models';
import { DatabaseService } from './interfaces';

export default class MongoService implements DatabaseService {
  private static instance: MongoService;

  private constructor() {
    this.isConnected = false;
    console.log('#SanFrancisco');
  }

  private db!: IMonkManager;

  getCollection<T>(collectionName: string): ICollection<T> {
    return this.db.get(collectionName);
  }

  async connect(connectionUri: string): Promise<boolean> {
    this.db = await monk(connectionUri);
    return true;
  }

  isConnected: boolean;

  async create<T extends Entity>(entity: T): Promise<T> {
    const collection = this.getCollection<T>(entity.name);
    const original = await collection.insert<T>(entity);
    return { ...original, id: original._id.toString(), _id: undefined };
  }

  async createMany<T extends Entity>(entities: T[]): Promise<T[]> {
    if (entities.length === 0) {
      return Promise.resolve([]);
    }
    const collectionName = entities[0].__name;
    const collection = this.getCollection<T>(collectionName);
    const values: T[] = await collection.insert<T[]>(entities);
    return values.map((value: T) => {
      return { ...value, id: value._id.toString(), _id: undefined };
    });
  }

  async retrieve<T extends Entity>(
    entity: Pick<T, 'id' | '__name'> | string,
    repository?: string,
  ): Promise<T> {
    let id: IObjectID, collectionName: string;
    if (typeof entity === 'string') {
      id = monkId(entity);
      if (!repository) {
        Promise.reject(
          'If entity id is provided as string, repository name is required',
        );
      }
      collectionName = repository as string;
    } else {
      id = monkId(entity.id);
      collectionName = repository ?? entity.__name;
    }
    const collection = this.getCollection<T>(collectionName);
    const doc = await collection.findOne<T>(id);
    if (!doc) {
      Promise.reject('Entity not found');
    }
    const definitive = {
      ...doc,
      id: doc?._id.toString,
      _id: undefined,
    } as T;
    return definitive;
  }

  async retrieveMany<T extends Entity, TFilter extends Partial<Entity>>(
    filter: TFilter,
  ): Promise<T[]> {
    const collectionName = filter.__name;
    const collection = this.getCollection<T>(collectionName);
    const values: T[] = await collection.find<T>(filter);
    return values.map((value: T) => {
      return { ...value, id: value._id.toString(), _id: undefined };
    });
  }

  async update<T extends Entity>(entity: T): Promise<T> {
    if (!entity.id) {
      Promise.reject('Entity not saved or id is missing');
    }
    const { id, ...rest } = entity;
    const collection = this.getCollection<T>(entity.__name);
    const modified = await collection.findOneAndUpdate<T>(monkId(id), rest);
    if(!modified)
    return { ...modified, id: modified?._id.toString, _id: undefined } as T;
  }

  updateMany<T extends Entity>(entities: T[]): Promise<T[]> {
    throw new Error('Method not implemented.');
  }
  delete<T extends Entity>(entity: T): Promise<T> {
    throw new Error('Method not implemented.');
  }
  deleteMany<T extends Entity>(entities: T[]): Promise<T[]> {
    throw new Error('Method not implemented.');
  }
  disconnect(): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  static getInstance(): MongoService {
    if (!MongoService.instance) {
      MongoService.instance = new MongoService();
    }
    return MongoService.instance;
  }
}
