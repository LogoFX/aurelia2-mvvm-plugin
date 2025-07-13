import {
  ControllerValidateResult
} from "@aurelia/validation-html";
import { IEditableEntity, IEditableObject, ValueObject } from "../model";
import { ObjectViewModel } from "./object-view-model";
import { Validateable } from "./mixins";

/**
 * Abstract base class for view models that represent editable objects.
 * 
 * This class provides the core functionality for managing an editable entity's lifecycle,
 * including beginning an edit session, committing changes, and canceling edits.
 * It also provides validation support through the Validatable mixin.
 * 
 * @template T The type of the model, which must implement IEditableEntity<ValueObject>
 * @extends {Validatable(ObjectViewModel)<T>}
 * @implements {IEditableObject}
 */
export abstract class EditableObjectViewModel<T extends IEditableEntity<ValueObject>> 
  extends Validateable(ObjectViewModel)<T> 
  implements IEditableObject {

  constructor(model: T) {
    super(model);
  }

  public canCancelChanges: boolean = false;

  public async beginEdit(): Promise<void> {
    await this.model.beginEdit();
  }

  public async cancelEdit(): Promise<void> {
    await this.model.cancelEdit();
  }

  public async commitEdit(): Promise<void> {
    try {
      const validation: ControllerValidateResult =
        await this.validationController.validate();
      if (!validation.valid) {
        throw new Error(validation.results.toString());
      }

      await this.beforeCommit(this.model);
      this.model.commitEdit();
      await this.afterCommit(this.model);
    } catch (error) {
      await this.showError(error);
    }
  }

  protected abstract beforeCommit(model: T): Promise<unknown>;

  protected abstract afterCommit(model: T): Promise<unknown>;

  protected abstract discard(model: T): Promise<unknown>;

  protected abstract showError<TError = Error>(error: TError): Promise<unknown>;
}
