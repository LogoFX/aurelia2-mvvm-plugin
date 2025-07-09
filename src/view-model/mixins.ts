import { newInstanceForScope, resolve } from "aurelia";
import {
  ControllerValidateResult,
  IValidationController,
} from "@aurelia/validation-html";
import { Constructor } from "../core";
import { ISelectable, ISupportEnabled, ICanBeBusy } from "./interfaces";

export function Selectable<TBase extends Constructor>(Base: TBase) {
  return class extends Base implements ISelectable {
    isSelected = false;
  };
}

export function Enabled<TBase extends Constructor>(Base: TBase) {
  return class extends Base implements ISupportEnabled {
    isEnabled = true;
  };
}

export function CanBeBusy<TBase extends Constructor>(Base: TBase) {
  return class extends Base implements ICanBeBusy {
    isBusy = false;
  };
}

export function Validator<TBase extends Constructor>(Base: TBase) {
  return class extends Base {
    protected readonly validationController: IValidationController = resolve(
      newInstanceForScope(IValidationController)
    );    
  };
}
