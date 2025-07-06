/**
 * Represents an error that is thrown when a circular reference is detected.
 * Circular references occur when a chain of object references creates a loop,
 * which can lead to infinite recursion.
 * 
 * @export
 * @class CircularReferenceError
 * @extends {Error}
 */
export class CircularReferenceError extends Error {
  constructor(message = 'Circular reference detected') {
    super(message);

    Object.setPrototypeOf(this, new.target.prototype);

    this.name = 'CircularReferenceError';
  }
}
