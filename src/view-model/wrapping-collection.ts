import { IContainer, inject, newInstanceOf } from "@aurelia/kernel";
import {
  Collection,
  ICollectionObserver,
  ICollectionSubscriber,
  IndexMap,
  ObserverLocator,
} from "@aurelia/runtime";
import { DI, IDisposable, IObserverLocator, resolve } from "aurelia";
import { IEntity, ValueObject } from "../model";
import { IObjectWrapper, ISelectable } from "./interfaces";
import { RootContainer } from "../core";

export type FactoryMethodType = (
  item: IEntity<ValueObject> | ValueObject | unknown
) => IObjectWrapper<IEntity<ValueObject | ValueObject<unknown>>> | unknown;

export const IWrappingCollection = DI.createInterface<IWrappingCollection>(
  "IWrappingCollection",
  (x) => x.transient(WrappingCollection)
);

// Export type equal to the class to serve as an interface.
export type IWrappingCollection = WrappingCollection;

export class WrappingCollection
  extends Array
  implements ICollectionSubscriber, IDisposable
{
  private _source: unknown[] = [];
  private _observerLocator: IObserverLocator;
  private _observer: ICollectionObserver<"array">;
  private readonly _internalMap = new WeakMap<object, unknown>();

  private _factoryMethod: FactoryMethodType = (
    item: IEntity<ValueObject> | ValueObject | unknown
  ): IObjectWrapper<IEntity<ValueObject | ValueObject<unknown>>> | unknown =>
    item;

  constructor() {
    super();

    Object.setPrototypeOf(this, new.target.prototype);

    this.initializeFromSource();
  }

  private initializeFromSource() {
    if (!Array.isArray(this._source)) {
      throw new Error("Source must be an array.");
    }

    for (const item of this._source) {
      this.pushCore(
        item,
        WrappingCollection.createWrapper(item, this._factoryMethod)
      );
    }
  }

  public withFactoryMethod(
    factoryMethod: FactoryMethodType
  ): WrappingCollection {
    this._factoryMethod = factoryMethod;
    return this;
  }

  public withSource(source: unknown[]): WrappingCollection {
    this._source = source;
    this.initializeFromSource();
    this._observerLocator = RootContainer.container.get(IObserverLocator);
    this._observer = this._observerLocator.getArrayObserver(this._source);
    this._observer.subscribe(this);

    return this;
  }

  public dispose(): void {
    this._observer.unsubscribe(this);
  }

  public handleCollectionChange(
    collection: Collection,
    indexMap: IndexMap
  ): void {
    const c = collection;
    const added = Array.from({ length: indexMap.length }, (_, i) => i).filter(
      (i) => indexMap[i] === -2
    );
    const removed = indexMap.deletedIndices ?? [];
    console.log("WrappingCollection.handleCollectionChange", c, indexMap);
    console.log(`Added Indices: ${added}. Removed Indices: ${removed}`);

    if (added.length > 0) {
      for (const index of added) {
        this.addCore(
          c[index],
          WrappingCollection.createWrapper(c[index], this._factoryMethod),
          index
        );
      }
    }
    if (removed.length > 0) {
      for (const index of removed) {
        this.removeCore(index, c[index]);
      }
    }
    if (added.length === 0 && removed.length === 0) {
      // If no items were added or removed, we can assume the collection was sorted.
      this.sort();
    }
  }

  public getSelectedItems(): unknown[] {
    return super.filter((item: ISelectable): boolean =>
      (item as ISelectable) ? item.isSelected : false
    );
  }

  public canSelectAll(): boolean {
    return this.length > this.getSelectedItems().length;
  }

  public selectAll(): void {
    this.forEach((item: ISelectable): boolean =>
      (item as ISelectable) ? (item.isSelected = true) : false
    );
  }

  public canUnselectAll(): boolean {
    return this.getSelectedItems().length > 0;
  }

  public unselectAll(): void {
    this.forEach((item: unknown): void => {
      const selectable = item as ISelectable;
      if (selectable) {
        selectable.isSelected = false;
      }
    });
  }

  public override sort(compareFn?: (a: unknown, b: unknown) => number): this {
    if (compareFn) {
      super.sort(compareFn);
    } else {
      super.sort();
    }

    const newArray = this._source.map((item) =>
      WrappingCollection.createWrapper(item, this._factoryMethod)
    );
    this.splice(0, this.length, ...newArray);

    return this;
  }

  
  /**
   * Creates a shallow copy of a portion of the collection into a new array.
   * 
   * @param start - The zero-based index at which to begin extraction.
   *                A negative index can be used, indicating an offset from the end of the collection.
   *                If omitted, defaults to 0.
   * @param end - The zero-based index at which to end extraction (extraction will occur up to, but not including, this index).
   *              A negative index can be used, indicating an offset from the end of the collection.
   *              If omitted, all elements from `start` to the end of the collection will be extracted.
   * @returns A new instance of the Array (not a WrappingCollection instance!) containing the extracted elements.
   * @override
   */
  public override slice(start?: number, end?: number): unknown[] {
    const result: unknown[] = [];
    const len = this.length;

    // Normalize start
    let from = start ?? 0;
    if (from < 0) {
      from = Math.max(len + from, 0);
    } else {
      from = Math.min(from, len);
    }

    // Normalize end
    let to = end ?? len;
    if (to < 0) {
      to = Math.max(len + to, 0);
    } else {
      to = Math.min(to, len);
    }

    // Copy selected elements
    for (let i = from; i < to; i++) {
      result.push(this[i]);
    }

    return result;
  }

  private static createWrapper(
    item: unknown,
    factoryMethod: FactoryMethodType
  ): unknown {
    return factoryMethod(item);
  }

  private readonly pushCore: (model: unknown, wrapped: unknown) => void = (
    model: object,
    wrapped: unknown
  ) => {
    this._internalMap.set(model, wrapped);
    this.push(wrapped);
  };

  private readonly containsWrapper: (model: object) => boolean = (
    model: object
  ) => {
    return this._internalMap.has(model);
  };

  private readonly addCore: (
    modelItem: object,
    wrappedItem: unknown,
    indexOfModelItem: number
  ) => void = (
      modelItem: object,
      wrappedItem: unknown,
      indexOfModelItem: number
    ) => {
      if (this.containsWrapper(modelItem)) {
        throw new Error("The duplications are not allowed for the model items.");
      }

      this._internalMap.set(modelItem, wrappedItem);
      if (indexOfModelItem === this.length) {
        this.push(wrappedItem);
      } else {
        this.splice(indexOfModelItem, 0, wrappedItem);
      }
    };

  private readonly removeCore: (index: number, removedItem: object) => void = (
    index: number,
    removedItem: object
  ) => {
    this._internalMap.delete(removedItem);
    this.splice(index, 1);
  };
}
