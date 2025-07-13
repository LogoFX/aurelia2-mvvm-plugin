/**
 * This class represents a globally unique identifier, as described by IETF RFC 4122.
 *
 */
export class Guid {

  /**
   * Gets the regular expression, which may be used to validate string representation of the GUID.
   */
  
  static validator = new RegExp(
    '^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$',
    'i'
  );
  /**
   *  Gets the empty ("zero") GUID string.
   */
  public static EMPTY = '00000000-0000-0000-0000-000000000000';

  private readonly value: string;

  private constructor(guid: string) {
    if (!guid) { throw new TypeError('Invalid argument; `value` has no value.'); }

    this.value = Guid.EMPTY;

    if (guid && Guid.isGuid(guid)) {
      this.value = guid;
    }
  }

  /**
   * Gets
   * @param guid Indicates whether a GUID is valid, i.e. whether it would be successfully
   * parsed by @method Guid.parse(). This function is cheaper than Guid.tryParse() because
   * it does not construct a Guid object.
   */
  public static isGuid(guid: unknown): boolean {
    if (!guid) return false;
    
    if (guid instanceof Guid) return true;
    
    const value: string = typeof guid === 'string' ? guid : guid.toString();
    return Guid.validator.test(value);
  }

  /**
   * Returns a new Guid instance with a pseudo-randomly generated GUID.
   */
  public static create(): Guid {
    return new Guid([Guid.gen(2), Guid.gen(1), Guid.gen(1), Guid.gen(1), Guid.gen(3)].join('-'));
  }

  public static createEmpty(): Guid {
    return new Guid(Guid.EMPTY);
  }

  /**
   * Parses the input string to construct a new Guid object.
   * If the string cannot be parsed, then an error is thrown.
   */
  public static parse(guid: string): Guid {
    return new Guid(guid);
  }

  /**
   * Returns a string representing newly generated GUID value.
   */
  public static raw(): string {
    return [Guid.gen(2), Guid.gen(1), Guid.gen(1), Guid.gen(1), Guid.gen(3)].join('-');
  }

  private static gen(count: number): string {
    let out = '';
    for (let i = 0; i < count; i++) {
      let random: number = crypto.getRandomValues(new Uint32Array(1))[0];
      random = random / Math.pow(10, random.toString().length);
      out += (((1 + random) * 0x10000) | 0)
        .toString(16)
        .substring(1);
    }

    return out;
  }

  /**
   * Compares the instance of the Guid with another instance.
   */
  public equals(other: Guid): boolean {
    // Comparing string `value` against provided `guid` will auto-call
    // toString on `guid` for comparison
    return Guid.isGuid(other) && this.value === other.toString();
  }

  /**
   * Indicates whether the instance of the Guid is empty.
   */
  public isEmpty(): boolean {
    return this.value === Guid.EMPTY;
  }

  /**
   * Returns a string representation of the GUID.
   */
  public toString(): string {
    return this.value;
  }

  /**
   * Returns a JSON representation of the GUID.
   */
  public toJSON(): unknown {
    return {
      value: this.value
    };
  }
}
