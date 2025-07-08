import { IEntity } from "./interfaces";


export abstract class Entity<T> implements IEntity<T> {
  public readonly id: T;

  constructor(id?: T) {
    this.id = id;
    Object.freeze(this.id);
  }
}
