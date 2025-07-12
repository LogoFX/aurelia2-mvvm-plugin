import { IEntity } from "./interfaces";


/**
 * Abstract base class representing an entity with a unique identifier.
 * Entities are fundamental domain objects that have distinct identities.
 * 
 * @template T The type of the entity's identifier.
 * @implements {IEntity<T>}
 * 
 * @property id - The unique identifier for this entity. This value is immutable (frozen) once the entity is created.
 * 
 * @remarks
 * The constructor accepts either a direct identifier value or a factory function that generates an identifier.
 * Additional properties can be assigned during instantiation via the props parameter.
 */
export abstract class Entity<T> implements IEntity<T> {
  public readonly id: T;

  constructor(id?: T | (() => T), props?: Partial<IEntity<T>>) {
    this.id = typeof id === 'function' ? (id as () => T)() : id;
    Object.freeze(this.id);
    if (props) {
      Object.assign(this, props);
    }
  }
}
