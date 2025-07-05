import { Constructable } from "aurelia";

export class CircularReferenceError extends Error {
  constructor(message = 'Circular reference detected') {
    super(message);

    Object.setPrototypeOf(this, new.target.prototype);

    this.name = 'CircularReferenceError';
  }
}

export class NullOrUndefinedValueObjectPropertyError extends Error {
  constructor(message = 'Value Object properties cannot be null or undefined') {
    super(message);

    Object.setPrototypeOf(this, new.target.prototype);

    this.name = 'NullOrUndefinedValueObjectPropertyError';
  }
}

/**
 * Abstract base class for Value Objects.
 * Value Objects are immutable and compared by their structural properties.
 */
export abstract class ValueObject<T = object> {

  // Immutable properties stored in a protected field
  protected readonly props: T;

  constructor(props: T) {
    // Ensure properties are not null or undefined
    if (props === null || props === undefined) {
      throw new NullOrUndefinedValueObjectPropertyError('Value Object properties cannot be null or undefined');
    }     
      
    // Ensure properties have no circular references
    this.checkForCircularReferences(props);

    // Deep freeze the properties to enforce immutability
    this.props = this.deepFreeze(props);
  }

  /**
   * Checks structural equality with another Value Object
   * @param vo Value Object to compare with
   * @returns true if equal
   */
  public equals(vo?: ValueObject<T>): boolean {
    if (vo === null || vo === undefined) return false;
    if (vo.constructor !== this.constructor) return false;
    return this.valueEquals(vo.props);
  }

  /**
   * Compares the underlying properties for equality
   * @param props Properties to compare with
   * @returns true if properties are structurally equal
   */
  protected valueEquals(props: T): boolean {
    return this.deepEqual(this.props, props);
  }

  /**
   * Returns the raw properties of the Value Object
   */
  public get value(): T {
    return this.props;
  }

  /**
   * Deep equality check for objects/arrays/primitives
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private deepEqual(a: any, b: any): boolean {
    // Primitive comparison
    if (a === b) return true;
  
    // Handle Date objects
    if (a instanceof Date && b instanceof Date) 
      return a.getTime() === b.getTime();
  
    // Check if both are objects
    if (typeof a === 'object' && typeof b === 'object' && a !== null && b !== null) {
      const keysA = Object.keys(a);
      const keysB = Object.keys(b);
  
      // Compare key length
      if (keysA.length !== keysB.length) return false;
  
      // Compare each key recursively
      for (const key of keysA) {
        if (!keysB.includes(key)) return false;
        if (!this.deepEqual(a[key], b[key])) return false;
      }
      
      return true;
    }
  
    return false;
  }

  private checkForCircularReferences<T>(props: T) {
    const seen = new WeakSet();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const detectCircular = (obj: any) => {
      if (obj && typeof obj === 'object') {
        if (seen.has(obj)) throw new CircularReferenceError("Circular reference detected");
        seen.add(obj);
        for (const key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) {
            detectCircular(obj[key]);
          }
        }
      }
    };
    detectCircular(props);
  }
  
  /**
   * Recursively deep-freezes an object and all nested objects/arrays.
   */
  private deepFreeze<T>(obj: T): T {
    if (obj && typeof obj === 'object' && !Object.isFrozen(obj)) {
      Object.freeze(obj);
      Object.getOwnPropertyNames(obj).forEach((prop) => {
        
        if (
          obj[prop] !== null &&
          (typeof obj[prop] === 'object' || typeof obj[prop] === 'function') &&
          !Object.isFrozen(obj[prop])
        ) {
          this.deepFreeze(obj[prop]);
        }
      });
    }
    return obj;
  }

}


