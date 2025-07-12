import { ValueObject } from './value-object';
import { IValidationRules } from '@aurelia/validation';

export interface IEntity<T = ValueObject> {
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
  
  beginEdit(): Promise<void>;

  cancelEdit(): Promise<void>;

  commitEdit(): Promise<void>;

}

export interface IEditableEntity<T> extends IEntity<T>, ICanBeDirty, IEditableObject {
  
  get isNew(): boolean;

  get isEditing(): boolean;

}
