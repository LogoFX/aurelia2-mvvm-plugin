import { ValueObject } from "../../../src/model/value-object";
import { Guid } from "../../../src/core/guid";
import { IId as IdContract } from "../contracts/id";

export class Id extends ValueObject<IdContract> implements IdContract {
  constructor(id: IdContract = { id: Guid.create() }) {
    super(id);
  }

  id: Guid;
}
