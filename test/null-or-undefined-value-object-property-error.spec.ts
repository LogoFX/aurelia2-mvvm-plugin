import { NullOrUndefinedValueObjectPropertyError } from '../src/model/null-or-undefined-value-object-property-error';

describe('NullOrUndefinedValueObjectPropertyError', () => {
  it('should be an instance of Error', () => {
    const error = new NullOrUndefinedValueObjectPropertyError();
    expect(error).toBeInstanceOf(Error);
  });

  it('should have the correct name', () => {
    const error = new NullOrUndefinedValueObjectPropertyError();
    expect(error.name).toBe('NullOrUndefinedValueObjectPropertyError');
  });

  it('should use the default message when no message is provided', () => {
    const error = new NullOrUndefinedValueObjectPropertyError();
    expect(error.message).toBe('Value Object properties cannot be null or undefined');
  });

  it('should use the provided message when one is specified', () => {
    const customMessage = 'Custom error message';
    const error = new NullOrUndefinedValueObjectPropertyError(customMessage);
    expect(error.message).toBe(customMessage);
  });

  it('should support instanceof checks', () => {
    const error = new NullOrUndefinedValueObjectPropertyError();
    expect(error instanceof NullOrUndefinedValueObjectPropertyError).toBe(true);
    expect(error instanceof Error).toBe(true);
  });

  it('should support try/catch error handling', () => {
    expect(() => {
      throw new NullOrUndefinedValueObjectPropertyError();
    }).toThrow(NullOrUndefinedValueObjectPropertyError);
  });
});
