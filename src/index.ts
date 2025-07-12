import { IContainer, Registration } from '@aurelia/kernel';
import { WrappingCollection, EditableObjectViewModel, ViewModelCreatorService, Validatable } from './view-model';
import { EditableEntity } from './model';
import { RootContainer } from './core';
import { IValidationRules, ValidationRules } from '@aurelia/validation';

export * from './core';
export * from './model';
export * from './view-model';

export const AureliaMvvm = {
  register(c: IContainer): void {
    RootContainer.container = c;
    //c.register(Registration.transient(IValidationRules, ValidationRules));
    console.log('Plugin registered!');
  }
};
