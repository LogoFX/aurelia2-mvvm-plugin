export interface ICommand {

  // when(predicate:(payload?: unknown) => boolean): ICommand;
  do(payload?: unknown): void;
  // doAsync(action: (payload?: unknown) => Promise<void>): ICommand;
}

export class Command implements ICommand {
  
  private _when?: (payload?: unknown) => boolean;
  private _do?: (payload?: unknown) => void;
  private _doAsync?: (payload?: unknown) => Promise<void>;
  private _instance: Command;

  private constructor() { 
    //
  }

  public when(predicate:(payload?: unknown) => boolean): ICommand {    
    this._when = predicate || (() => true);
    return this;
  }

  public static when(predicate:(payload?: unknown) => boolean): ICommand {
    const command = new Command();
    command._when = predicate || (() => true);
    return command;
  }

  public static do(action: (payload?: unknown) => void): ICommand {
    const command = new Command();
    command._do = action;
    return command;
  }

  public do(payload?: unknown): void {    
    this._do?.(payload);
  }

  public static doAsync(action: (payload?: unknown) => Promise<void>): ICommand {
    const command = new Command();
    command._doAsync = action;
    return command;
  }

  public doAsync(action: (payload?: unknown) => Promise<void>): ICommand {
    this._instance._doAsync = action;
    return this;
  }

  private execute(payload?: unknown): void {
    if (this._when && !this._when(payload)) {
      return;
    }
    if (this._do) {
      this._do(payload);
    }
    if (this._doAsync) {
      this._doAsync(payload).catch(err => console.error('Command execution failed:', err));
    }
  }

}
