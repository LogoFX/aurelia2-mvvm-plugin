import { IValidationRules } from "@aurelia/validation";
import { IEditableEntity } from "./interfaces";
import { newInstanceOf, resolve } from "@aurelia/kernel";
import { Entity } from "./entity";

export abstract class EditableEntity<T> extends Entity<T> implements IEditableEntity<T> {

  protected readonly validationRules: IValidationRules = resolve(newInstanceOf(IValidationRules));
  
  private _newGuard: boolean;
  private _isDirty: boolean = false;
  private _isNew: boolean = false;
  private _isEditing: boolean = false;

  constructor(id: T) {
    super(id);
  }

  public get isNew(): boolean {
    return this._isNew;
  }

  public get isDirty(): boolean {
    return this._isDirty;
  }

  public makeDirty(): void {
    // eslint-disable-next-line no-constant-binary-expression
    this._isDirty = (true && this._isEditing);
  }

  public cleanDirty(): void {
    this._isDirty = false;
  }

  public beginEdit(): void {
    this.cleanDirty();
    this._isEditing = true;
  }

  public cancelEdit(): void {
    this.cleanDirty();
    this._isEditing = false;
  }

  public commitEdit(): void {
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
