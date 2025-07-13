
/**
 * Represents an error that occurs when an attempt to change state fails.
 * This error is typically thrown when a state transition operation cannot be completed.
 * 
 * @class StateChangeFailureError
 * @extends {Error}
 * @classdesc Custom error for state change failure scenarios in application state management.
 * 
 * @example
 * ```typescript
 * try {
 *   // State changing operation
 *   if (!this.isEditing) {
 *     throw new StateChangeFailureError('Cannot set name when the entity is not editing. Please call beginEdit() first.');
 *   }
 * } catch (error) {
 *   if (error instanceof StateChangeFailureError) {
 *     // Handle state change errors specifically
 *   }
 * }
 * ```
 */
export class StateChangeFailureError extends Error {
  constructor(message = 'Attempt to change state failed.') {
    super(message);

    Object.setPrototypeOf(this, new.target.prototype);

    this.name = 'StateChangeFailureError';
  }
}
