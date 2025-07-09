import { IEntity, ValueObject } from "../model";
import { IObjectViewModel } from "./interfaces";

export abstract class ObjectViewModel<T extends IEntity<ValueObject>> implements IObjectViewModel<T> {

  public model: T;

  constructor(model?: T) {
    this.model = model;
  }

}
