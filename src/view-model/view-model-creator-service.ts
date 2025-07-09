import { newInstanceForScope, resolve } from "aurelia";

export interface IViewModelCreatorService {
  /**
   * Creates an instance of the specified type.
   * @param type The type to create an instance of.
   * @param rest Optional additional parameters to pass to the instance.
   */
  create<T>(type: unknown, ...rest: unknown[]): T;
}

/**
 * The default implementation
 */
export class ViewModelCreatorService implements IViewModelCreatorService {
  public create<T>(type: unknown, ...rest: unknown[]): T {
    const instance: T = resolve(newInstanceForScope(type)) as T;

    if (rest.length > 0) {      
      instance['model'] = rest[0];
    }

    // console.log(rest);
    return instance;
  }
}
