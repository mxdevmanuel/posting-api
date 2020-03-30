/*
 * connect
 * isConnected
 * create
 * createMany
 * retrieve
 * retrieveMany
 * update
 * updateMany
 * delete
 * deleteMany
 * disconnect
 * */
import { Entity } from 'models';

export interface DatabaseService {
  connect(connectionUri: string): Promise<boolean>;
  isConnected: boolean;
  create<T extends Entity>(entity: T): Promise<T>;
  createMany<T extends Entity>(entities: T[]): Promise<T[]>;
  retrieve<T extends Entity>(entity: Pick<T, 'id'> | string): Promise<T>;
  retrieveMany<T extends Entity, TFilter extends Partial<Entity>>(
    filter: TFilter,
  ): Promise<T[]>;
  update<T extends Entity>(entity: T): Promise<T>;
  updateMany<T extends Entity>(entities: T[]): Promise<T[]>;
  delete<T extends Entity>(entity: T): Promise<T>;
  deleteMany<T extends Entity>(entities: T[]): Promise<T[]>;
  disconnect(): Promise<boolean>;
}
