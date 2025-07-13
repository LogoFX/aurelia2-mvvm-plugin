import { IContainer } from "aurelia";

export class RootContainer {
  private static _container: IContainer;

  public static get container(): IContainer {
    if (!this._container) {
      throw new Error("Root container is not initialized.");
    }
    return this._container;
  }

  public static set container(value: IContainer) {
    if (this._container) {
      throw new Error("Root container is already initialized.");
    }
    this._container = value;
  }
}
