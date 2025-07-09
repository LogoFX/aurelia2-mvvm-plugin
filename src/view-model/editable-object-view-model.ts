import { ControllerValidateResult, IValidationController } from "@aurelia/validation-html";
import { IEditableEntity, ValueObject } from "../model";
import { ObjectViewModel } from "./object-view-model";
import { newInstanceForScope, resolve } from "@aurelia/kernel";

export abstract class EditableObjectViewModel<T extends IEditableEntity<ValueObject>> extends ObjectViewModel<T> {

  protected readonly validationController: IValidationController = resolve(newInstanceForScope(IValidationController));

  constructor(model: T) {
    super(model);
  }

  public canCancelChanges: boolean;

  public beginEdit(): void {
    this.model.beginEdit();
  }

  public cancelEdit(): void {
    this.model.cancelEdit();
  }

  public commitEdit(): void {
    this.validationController
      .validate()
      .then(async (validation: ControllerValidateResult): Promise<void> => {
        if (!validation.valid) {
          throw new Error(validation.results.toString());
        } else {
          await this.save(this.model)
            .then((/* */): void => {
              this.model.commitEdit();
            })
            .then(async (/* */): Promise<unknown> => this.afterSave(this.model));
        }
      })
      .catch(async (error: unknown): Promise<void> => {
        await this.showError(error);
      });
  }

  protected abstract save(model: T): Promise<unknown>;

  protected abstract afterSave(model: T): Promise<unknown>;

  protected abstract discard(model: T): Promise<unknown>;

  protected abstract showError<TError = Error>(error: TError): Promise<unknown>;
}
