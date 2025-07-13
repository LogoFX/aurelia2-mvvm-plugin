import { IEntity, ValueObject } from "../model";

/**
 * Represents an object that can be selected.
 * 
 * This interface defines the contract for objects that can be in a selected state,
 * such as items in a list, grid, or other UI elements that support selection.
 * 
 * @interface ISelectable
 * @property {boolean} isSelected - Indicates whether the object is currently selected.
 */
export interface ISelectable {
  isSelected: boolean;
}

/**
 * Interface representing an object that can be enabled or disabled.
 * 
 * @interface ISupportEnabled
 * @property {boolean} isEnabled - Indicates whether the object is enabled.
 */
export interface ISupportEnabled {
  isEnabled: boolean;
}

/**
 * Represents an entity that can be in a busy state.
 * 
 * This interface is typically implemented by view models that need to indicate
 * when they are processing operations and may not be ready for user interaction.
 * 
 * @interface ICanBeBusy
 * @property {boolean} isBusy - Indicates whether the entity is currently busy processing an operation.
 */
export interface ICanBeBusy {
  isBusy: boolean;
}

export interface IObjectWrapper<T extends IEntity<ValueObject | ValueObject<unknown>>> {

  model: T;

}

/**
 * Represents a view model for entity objects.
 * 
 * This interface provides a specialized wrapper for entity objects that contain value objects,
 * facilitating the connection between the view and the underlying model in an MVVM architecture.
 * 
 * @template T - The entity type that this view model wraps. Must be an entity containing value objects.
 * @extends {IObjectWrapper<T>} - Inherits the basic wrapping functionality from IObjectWrapper.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface IObjectViewModel<T extends IEntity<ValueObject | ValueObject<unknown>>> extends IObjectWrapper<T> {
}
