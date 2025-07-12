import { newInstanceForScope, resolve } from "aurelia";
import { IValidationController } from "@aurelia/validation-html";
import { AbstractConstructor } from "../core";
import { ISelectable, ISupportEnabled, ICanBeBusy } from "./interfaces";

/**
 * A mixin that adds selection capability to a class.
 * 
 * @template TBase - The type of the base class constructor.
 * @param Base - The base class to extend with selection functionality.
 * @returns A new class that extends the base class and implements the {@link ISelectable} interface,
 *          adding an `isSelected` property initialized to false.
 * 
 * @example
 * ```typescript
 * class MyViewModel extends Selectable(BaseViewModel) {
 *   // MyViewModel now has isSelected property
 * }
 * ```
 */
export function Selectable<TBase extends AbstractConstructor>(Base: TBase) {
  return class extends Base implements ISelectable {
    isSelected = false;
  };
}

/**
 * Mixin that adds enabled functionality to a class.
 * The mixed-in class will implement the {@link ISupportEnabled} interface
 * and have an `isEnabled` property set to `true` by default.
 * 
 * @template TBase - The base class constructor type
 * @param Base - The base class to extend from
 * @returns A new class that extends the base class and implements {@link ISupportEnabled}
 */
export function Enabled<TBase extends AbstractConstructor>(Base: TBase) {
  return class extends Base implements ISupportEnabled {
    isEnabled = true;
  };
}

/**
 * A mixin that adds "busy" state functionality to a class.
 * 
 * @template TBase - The type of the base class constructor
 * @param Base - The base class constructor to extend
 * @returns A new class that extends the base class and implements the ICanBeBusy interface,
 *          adding an isBusy property to track the busy state
 */
export function CanBeBusy<TBase extends AbstractConstructor>(Base: TBase) {
  return class extends Base implements ICanBeBusy {
    isBusy = false;
  };
}

/**
 * A mixin that adds validation capabilities to a class.
 * 
 * This function extends the provided base class with validation functionality
 * by injecting a validation controller instance. The validation controller
 * is resolved through the DI container for the appropriate scope.
 * 
 * @template TBase - The type of the base class, must extend AbstractConstructor
 * @param Base - The base class to extend with validation capabilities
 * @returns A new class that extends the base class and includes validation functionality
 */
export function Validatable<TBase extends AbstractConstructor>(Base: TBase) {
  return class extends Base {

    protected readonly validationController: IValidationController = resolve(newInstanceForScope(IValidationController));
    
  };
}
