import { required } from "aurelia-validation-decorators"
import { EditableEntity, Guid, ValueObject } from "../../../src";
import { IPerson } from "../contracts/person.interface";
import { Id } from "./id";
import { IValidationRules } from "@aurelia/validation";

export class Person extends EditableEntity<ValueObject<Guid>> implements IPerson {

  @required()
  public age: number = 0;

  public constructor(props?: Partial<IPerson>/* & { validationRules?: IValidationRules }*/) {
    super(Id.create, props);

    Object.assign(this, props);
  }

  //private _name: string = '';
  @required()
  public name: string;
  // public get name(): string {
  //   return this._name;
  // }
  // public set name(value: string) {
  //   if (this._name === value) {
  //     return;
  //   }

  //   this._name = value;
  //   this.makeDirty();
  // }

}
