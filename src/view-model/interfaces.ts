import { IEntity, ValueObject } from "../model";

export interface ISelectable {
  isSelected: boolean;
}

export interface ISupportEnabled {
  isEnabled: boolean;
}

export interface ICanBeBusy {
  isBusy: boolean;
}

export interface IObjectWrapper<T extends IEntity<ValueObject | ValueObject<unknown>>> {

  model: T;

}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface IObjectViewModel<T extends IEntity<ValueObject | ValueObject<unknown>>> extends IObjectWrapper<T> {
}
