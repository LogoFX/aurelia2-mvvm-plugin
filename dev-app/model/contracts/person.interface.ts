import { Guid, IEditableEntity, ValueObject } from "../../../src";

export interface IPerson extends IEditableEntity<ValueObject<Guid>> {
  name: string;
  age: number;
}
