import { ValueObject } from "../../../src/model/value-object";
import { Guid } from "../../../src/core/guid";


export class Id extends ValueObject<Guid> {
  constructor(id: Guid = Guid.create()) {
    super(id);
    Object.freeze(this);
  }

  public override get value(): Guid {
    return super.value;
  } 
  public override toString(): string {
    return this.value.toString();
  }

  public static create(id: Guid = Guid.create()): Id {
    return new Id(id);
  }
}
