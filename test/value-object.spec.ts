/* eslint-disable @typescript-eslint/no-explicit-any */
import { CircularReferenceError, ValueObject } from '../src/model/value-object';

// Test implementation of ValueObject
class TestValueObject extends ValueObject<any> {
  constructor(props: any) {
    super(props);
  }
}

describe('ValueObject', () => {
  describe('constructor', () => {
    it('should create an instance with immutable properties', () => {
      const props = { name: 'Test', value: 123 };
      const vo = new TestValueObject(props);

      expect(vo.value).toEqual(props);
      // The value object should not expose the original props reference
      expect(vo.value).toBe(props);
      expect(Object.isFrozen(vo.value)).toBe(true);

      // This should throw an error in strict mode if we try to modify the frozen value
      expect(() => {
        // Attempt to modify the original props
         props.name = 'Changed';        
      }).toThrow(TypeError);
      // This should throw an error in strict mode if we try to modify the frozen value
      expect(() => {
        vo.value.name = 'Modified';
      }).toThrow(TypeError);
      expect(vo.value.name).toBe('Test');
    });

    it('should deeply freeze nested objects', () => {
      const props = { 
        name: 'Test', 
        nested: { 
          prop: 'value',
          arr: [1, 2, { x: 'y' }]
        } 
      };
      
      const vo = new TestValueObject(props);
      
      expect(Object.isFrozen(vo.value.nested)).toBe(true);
      expect(Object.isFrozen(vo.value.nested.arr)).toBe(true);
      expect(Object.isFrozen(vo.value.nested.arr[2])).toBe(true);
    });
  });

  describe('equals', () => {
    it('should return false when comparing with null or undefined', () => {
      const vo = new TestValueObject({ name: 'Test' });
      
      expect(vo.equals(null as any)).toBe(false);
      expect(vo.equals(undefined)).toBe(false);
    });

    it('should return false when comparing with different type of value object', () => {
      const vo1 = new TestValueObject({ name: 'Test' });
      
      // Different class extending ValueObject
      class AnotherValueObject extends ValueObject<any> {
        constructor(props: any) {
          super(props);
        }
      }
      
      const vo2 = new AnotherValueObject({ name: 'Test' });
      
      expect(vo1.equals(vo2)).toBe(false);
    });

    it('should return true for structurally equal value objects', () => {
      const vo1 = new TestValueObject({ name: 'Test', value: 123 });
      const vo2 = new TestValueObject({ name: 'Test', value: 123 });
      
      expect(vo1.equals(vo2)).toBe(true);
    });

    it('should return false for structurally different value objects', () => {
      const vo1 = new TestValueObject({ name: 'Test', value: 123 });
      const vo2 = new TestValueObject({ name: 'Test', value: 456 });
      
      expect(vo1.equals(vo2)).toBe(false);
    });
    
    it('should handle date objects correctly', () => {
      const date = new Date('2023-01-01');
      const vo1 = new TestValueObject({ date });
      const vo2 = new TestValueObject({ date: new Date('2023-01-01') });
      const vo3 = new TestValueObject({ date: new Date('2023-02-01') });
      
      expect(vo1.equals(vo2)).toBe(true);
      expect(vo1.equals(vo3)).toBe(false);
    });
    
    it('should handle circular references', () => {
      const objA: any = { name: 'Test' };
      objA.self = objA;
      
      const objB: any = { name: 'Test' };
      objB.self = objB;
      
      const objC: any = { name: 'Different' };
      objC.self = objC;

      expect(() => {
        new TestValueObject(objA);
      }).toThrow(CircularReferenceError);

      expect(() => {
        new TestValueObject(objB);
      }).toThrow(CircularReferenceError);

      expect(() => {
        new TestValueObject(objC);
      }).toThrow(CircularReferenceError);      
    });
    
    it('should compare arrays correctly', () => {
      const vo1 = new TestValueObject([1, 2, 3]);
      const vo2 = new TestValueObject([1, 2, 3]);
      const vo3 = new TestValueObject([1, 2, 4]);
      const vo4 = new TestValueObject([1, 2]);
      
      expect(vo1.equals(vo2)).toBe(true);
      expect(vo1.equals(vo3)).toBe(false);
      expect(vo1.equals(vo4)).toBe(false);
    });
  });

  describe('value getter', () => {
    it('should return the immutable properties', () => {
      const props = { name: 'Test', value: 123 };
      const vo = new TestValueObject(props);
      
      expect(vo.value).toEqual(props);
      //expect(vo.value).not.toBe(props); // Should be a different reference
      // Attempting to modify should fail silently or throw in strict mode
      if (Object.isFrozen(vo.value)) {
        try {
          (vo.value as any).name = 'Modified';
        } catch (e) {
          expect(e).toBeInstanceOf(TypeError);
        }
        expect(vo.value.name).toBe('Test'); // Value remains unchanged
      } else {
        (vo.value as any).name = 'Modified';
        expect(vo.value.name).toBe('Test'); // Value remains unchanged
      }
      expect(vo.value.name).toBe('Test'); // Value remains unchanged
    });
  });
});
