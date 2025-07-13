import { IValidationRules, ValidationRules } from "@aurelia/validation";
import { IEditableEntity, IEntity } from "./interfaces";
import { last, newInstanceOf, resolve } from "@aurelia/kernel";
import { Entity } from "./entity";
import { RootContainer } from "../core";

/**
 * Represents an entity that can be edited, providing functionality for tracking edit state and validation.
 * This class extends the base Entity class and implements the IEditableEntity interface.
 * 
 * @template T - The type of the entity's identifier.
 * @extends {Entity<T>}
 * @implements {IEditableEntity<T>}
 * 
 * @remarks
 * The EditableEntity class manages the editing lifecycle of an entity, tracking whether an entity:
 * - Is new
 * - Is dirty (has been modified during the current edit session)
 * - Is currently being edited
 * 
 * It provides methods to begin, cancel, and commit edit operations, as well as marking
 * an entity as new or dirty and cleaning its dirty state.
 */
export abstract class EditableEntity<T> extends Entity<T> implements IEditableEntity<T> {

  public readonly validationRules: IValidationRules;
  
  private _newGuard: boolean;
  private _isDirty: boolean = false;
  private _isNew: boolean = false;
  private _isEditing: boolean = false;

  constructor(id?: T | (() => T), props?: Partial<IEntity<T>>) {    
    super(id, props);
    this.validationRules = resolve(IValidationRules);
  }

  public get isNew(): boolean {
    return this._isNew;
  }

  public get isDirty(): boolean {
    return this._isDirty;
  }

  public get isEditing(): boolean {
    return this._isEditing;
  }

  public makeDirty(): void {
    // eslint-disable-next-line no-constant-binary-expression
    this._isDirty = (true && this._isEditing);
  }

  public cleanDirty(): void {
    this._isDirty = false;
  }

  public async beginEdit(): Promise<void> {
    this.cleanDirty();
    this._isEditing = true;
  }

  public async cancelEdit(): Promise<void> {
    this.cleanDirty();
    this._isEditing = false;
  }

  public async commitEdit(): Promise<void> {
    this.cleanDirty();
    this._isEditing = false;
  }

  protected makeNew(): void {
    if (!this._newGuard) {
      this._newGuard = this._isNew = true;
    }
  }
  //this.validationRules.rules.forEach(rule => rule.validate(this));

}
