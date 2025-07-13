import { ValueObject } from './value-object';
import { IValidationRules } from '@aurelia/validation';

/**
 * Represents an entity with a unique identifier.
 * 
 * @template T - The type of the identifier, defaults to ValueObject
 */
export interface IEntity<T = ValueObject> {
  
  /**
   * The unique immutable identifier of the entity.
   * 
   * @type {T}
   */
  id: T;    
}

/**
 * Interface for objects that can track their modified ("dirty") state.
 * 
 * Implementing classes can indicate whether they have unsaved changes,
 * and provide methods to control the dirty state.
 * 
 * @interface ICanBeDirty
 */

export interface ICanBeDirty {

  /**
   * Indicates whether the object has unsaved changes.
   * 
   * @readonly
   * @property {boolean} isDirty - True if the object has been modified since last saved/initialized.
   */
  get isDirty(): boolean;

  /**
   * Marks the object as dirty (modified).
   * 
   * @method makeDirty
   * @returns {void}
   */
  makeDirty(): void;

  /**
   * Clears the dirty state of the object, typically called after saving changes.
   * 
   * @method cleanDirty
   * @returns {void}
   */
  cleanDirty(): void;

}

/**
 * Interface for objects that support an editable state with transaction-like behavior.
 * Provides methods to control the editing lifecycle of an object.
 *
 * @interface IEditableObject
 */
export interface IEditableObject {
  
  /**
   * Begins the edit mode for the object, allowing changes to be made.
   * 
   * @method beginEdit
   * @returns {Promise<void>} A promise that resolves when the edit mode is successfully started.
   */
  beginEdit(): Promise<void>;

  /**
   * Cancels the edit mode for the object, discarding any changes made.
   * 
   * @method cancelEdit
   * @returns {Promise<void>} A promise that resolves when the edit mode is successfully canceled.
   */
  cancelEdit(): Promise<void>;

  /**
   * Commits the changes made during the edit mode.
   * 
   * @method commitEdit
   * @returns {Promise<void>} A promise that resolves when the changes are successfully committed.
   */
  commitEdit(): Promise<void>;

}

/**
 * Represents an entity that can be validated.
 * 
 * @interface IValidateable
 * @property {IValidationRules} validationRules - The validation rules to be applied to this entity.
 */
export interface IValidateable {

  /**
   * The validation rules associated with this entity.
   * 
   * @type {IValidationRules}
   */
  validationRules: IValidationRules;
}

/**
 * Represents an editable entity that can be validated and tracks its state.
 * 
 * @template T The type of the entity identifier
 * @extends {IEntity<T>} Provides base entity functionality with identity
 * @extends {ICanBeDirty} Provides capability to track changes (dirty state)
 * @extends {IEditableObject} Provides methods for editing operations
 * @extends {IValidateable} Provides validation capabilities
 * 
 * @property {boolean} isNew - Indicates whether the entity is newly created and not yet persisted
 * @property {boolean} isEditing - Indicates whether the entity is currently in edit mode
 */
export interface IEditableEntity<T> extends IEntity<T>, ICanBeDirty, IEditableObject, IValidateable {
  
  /**
   * Indicates whether the entity is new (not yet persisted).
   * 
   * @readonly
   * @property {boolean} isNew - True if the entity is new.
   */
  get isNew(): boolean;

  /**
   * Indicates whether the entity is in edit mode.
   * 
   * @readonly
   * @property {boolean} isEditing - True if the entity is in edit mode.
   */
  get isEditing(): boolean;

}
