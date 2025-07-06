import { CircularReferenceError } from '../src/model/circular-reference-error';

describe('CircularReferenceError', () => {
  it('should create an instance with default message', () => {
    const error = new CircularReferenceError();
    
    expect(error).toBeInstanceOf(Error);
    expect(error).toBeInstanceOf(CircularReferenceError);
    expect(error.message).toBe('Circular reference detected');
    expect(error.name).toBe('CircularReferenceError');
  });

  it('should create an instance with custom message', () => {
    const customMessage = 'Custom circular reference error message';
    const error = new CircularReferenceError(customMessage);
    
    expect(error).toBeInstanceOf(Error);
    expect(error).toBeInstanceOf(CircularReferenceError);
    expect(error.message).toBe(customMessage);
    expect(error.name).toBe('CircularReferenceError');
  });

  it('should maintain proper inheritance chain', () => {
    const error = new CircularReferenceError();
    
    expect(Object.getPrototypeOf(error)).toBe(CircularReferenceError.prototype);
    expect(error instanceof Error).toBe(true);
    expect(error instanceof CircularReferenceError).toBe(true);
  });

  it('should be catchable as an Error', () => {
    try {
      throw new CircularReferenceError();
    } catch (error) {
      expect(error instanceof Error).toBe(true);
      expect(error instanceof CircularReferenceError).toBe(true);
    }
  });
});
