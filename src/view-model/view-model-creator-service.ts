import { Constructable, DI, IContainer, inject, singleton } from "aurelia";
export interface IViewModelCreatorService {
  /**
   * Creates an instance of the specified type.
   * @param type The type to create an instance of.
   * @param rest Optional additional parameters to pass to the instance.
   */
  create<T>(type: unknown, ...rest: unknown[]): T;
}

/**
 * Service responsible for creating view model instances.
 * 
 * This service utilizes the dependency injection container to instantiate
 * view model objects based on the provided type. It also supports setting
 * a model property on the created instance if additional parameters are provided.
 * 
 * @implements {IViewModelCreatorService}
 */
@inject(IContainer)
@singleton()
export class ViewModelCreatorService implements IViewModelCreatorService {
  constructor(private readonly container: IContainer) {
    // Ensure the container is set up correctly.
    if (!this.container) {
      throw new Error("Container is not provided.");
    }
  }

  public create<T>(type: Constructable, ...rest: unknown[]): T {
    
    const instance: T = this.container.invoke(type, rest) as T;

    return instance;
  }
}

