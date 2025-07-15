import { IContainer } from '@aurelia/kernel';
import { BindingCommandStaticAuDefinition, ICommandBuildInfo, IInstruction, ListenerBindingInstruction } from '@aurelia/template-compiler';
import { IExpressionParser } from 'aurelia';
import { BindingCommandInstance, bindingCommand } from 'aurelia';

export const etIsFunction = 'IsFunction'; 
const bindingCommandTypeName = 'binding-command';
@bindingCommand('command')
export class CommandBindingCommand implements BindingCommandInstance {
  public static readonly $au: BindingCommandStaticAuDefinition = {
    type: bindingCommandTypeName,
    name: 'command',
  };
  // eslint-disable-next-line @typescript-eslint/class-literal-property-style
  public get ignoreAttr() { return true; }

  public build(info: ICommandBuildInfo, exprParser: IExpressionParser): IInstruction {
    return new ListenerBindingInstruction(
      exprParser.parse(info.attr.rawValue, etIsFunction),
      info.attr.target,
      false,
      info.attr.parts?.[2] ?? null
    );
  }
}

export function registerBindingCommands(container: IContainer) {
  // Register our custom command with Aurelia's DI container
  container.register(CommandBindingCommand);
}
