import { IContainer, Registration } from '@aurelia/kernel';
import { WrappingCollection, EditableObjectViewModel, ViewModelCreatorService, IViewModelCreatorService } from './view-model';
import { EditableEntity } from './model';
import { RootContainer } from './core';
import { IValidationRules, ValidationRules } from '@aurelia/validation';
import { registerBindingCommands } from './command/command-binding-command';

export * from './core';
export * from './model';
export * from './view-model';

export const AureliaMvvm = {
  register(c: IContainer): void {
    RootContainer.container = c;
    registerBindingCommands(c);
    console.log('Plugin registered!');
  }
};
