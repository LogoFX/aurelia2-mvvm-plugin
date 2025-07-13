import { Guid } from '../src/core/guid';

describe('Guid', () => {
  describe('static properties', () => {
    it('should have a validator RegExp', () => {
      expect(Guid.validator).toBeInstanceOf(RegExp);
    });

    it('should have an EMPTY value', () => {
      expect(Guid.EMPTY).toBe('00000000-0000-0000-0000-000000000000');
    });
  });

  describe('isGuid', () => {
    it('should return true for valid GUID strings', () => {
      expect(Guid.isGuid('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11')).toBe(true);
    });

    it('should return true for Guid instances', () => {
      const guid = Guid.create();
      expect(Guid.isGuid(guid)).toBe(true);
    });

    it('should return false for invalid GUID strings', () => {
      expect(Guid.isGuid('not-a-guid')).toBe(false);
      expect(Guid.isGuid('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx')).toBe(false);
    });
  });

  describe('create', () => {
    it('should create a valid GUID', () => {
      const guid = Guid.create();
      expect(Guid.isGuid(guid)).toBe(true);
      expect(guid.toString()).toMatch(Guid.validator);
    });

    it('should create unique GUIDs', () => {
      const guid1 = Guid.create();
      const guid2 = Guid.create();
      expect(guid1.toString()).not.toBe(guid2.toString());
    });
  });

  describe('createEmpty', () => {
    it('should create a Guid with empty guid value', () => {
      const guid = Guid.createEmpty();
      expect(guid.isEmpty()).toBe(true);
    });
  });

  describe('parse', () => {
    it('should parse a valid GUID string', () => {
      const guidStr = 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11';
      const guid = Guid.parse(guidStr);
      expect(guid.toString()).toBe(guidStr);
    });

    it('should throw for null or empty input', () => {
      expect(() => Guid.parse(null as string)).toThrow(TypeError);
      expect(() => Guid.parse('')).toThrow(TypeError);
    });

    it('should return a Guid with EMPTY value for invalid GUID strings', () => {
      const guid = Guid.parse('not-a-valid-guid');
      expect(guid.toString()).toBe(Guid.EMPTY);
    });
  });

  describe('raw', () => {
    it('should return a string representing a valid GUID', () => {
      const rawGuid = Guid.raw();
      expect(typeof rawGuid).toBe('string');
      expect(rawGuid).toMatch(Guid.validator);
    });
  });

  describe('equals', () => {
    it('should return true for equal GUIDs', () => {
      const guidStr = 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11';
      const guid1 = Guid.parse(guidStr);
      const guid2 = Guid.parse(guidStr);
      expect(guid1.equals(guid2)).toBe(true);
    });

    it('should return false for different GUIDs', () => {
      const guid1 = Guid.create();
      const guid2 = Guid.create();
      expect(guid1.equals(guid2)).toBe(false);
    });
  });

  describe('isEmpty', () => {
    it('should return true for empty GUID', () => {
      const guid = Guid.parse(Guid.EMPTY);
      expect(guid.isEmpty()).toBe(true);
    });

    it('should return false for non-empty GUID', () => {
      const guid = Guid.create();
      expect(guid.isEmpty()).toBe(false);
    });
  });

  describe('toString', () => {
    it('should return the string representation', () => {
      const guidStr = 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11';
      const guid = Guid.parse(guidStr);
      expect(guid.toString()).toBe(guidStr);
    });
  });

  describe('toJSON', () => {
    it('should return an object with value property', () => {
      const guidStr = 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11';
      const guid = Guid.parse(guidStr);
      expect(guid.toJSON()).toEqual({ value: guidStr });
    });
  });
});
