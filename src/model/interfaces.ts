import { ValueObject } from './value-object';
import { IValidationRules } from '@aurelia/validation';

export interface IEntity<T = ValueObject<unknown>> {
    id: T;    
}

export interface IHaveValidationRules {
  readonly validationRules: IValidationRules;
}

export interface ICanBeDirty {

  get isDirty(): boolean;

  makeDirty(): void;

  cleanDirty(): void;

}

export interface IEditableObject {
  
  beginEdit(): void;

  cancelEdit(): void;

  commitEdit(): void;

}

export interface IEditableEntity<T> extends IEntity<T>, ICanBeDirty, IEditableObject {

  get isNew(): boolean;

}
