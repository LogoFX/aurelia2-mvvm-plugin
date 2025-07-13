
/**
 * Error thrown when a Value Object contains null or undefined property values.
 * 
 * This error is typically thrown during Value Object instantiation or validation
 * when a required property is missing or set to null/undefined, which violates
 * Value Object integrity rules.
 * 
 * @class NullOrUndefinedValueObjectPropertyError
 * @description Represents an error that is thrown when a Value Object property is null or undefined.
 * @extends {Error}
 */
export class NullOrUndefinedValueObjectPropertyError extends Error {
  constructor(message = 'Value Object properties cannot be null or undefined') {
    super(message);

    Object.setPrototypeOf(this, new.target.prototype);

    this.name = 'NullOrUndefinedValueObjectPropertyError';
  }
}
