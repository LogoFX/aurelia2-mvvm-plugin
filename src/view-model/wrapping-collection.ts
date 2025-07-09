import { Collection, ICollectionSubscriber, IndexMap } from "@aurelia/runtime";
import { IDisposable, IObserverLocator, resolve } from "aurelia";
import { IEntity, ValueObject } from "../model";
import { IObjectWrapper, ISelectable } from "./interfaces";

type FactoryMethodType = (
  item: IEntity<ValueObject> | ValueObject | unknown
) => IObjectWrapper<IEntity<ValueObject | ValueObject<unknown>>> | unknown;

export class WrappingCollection
  extends Array
  implements ICollectionSubscriber, IDisposable
{
  private readonly _source: unknown[];
  private readonly _internalMap = new WeakMap<object, unknown>();

  public factoryMethod: FactoryMethodType;

  constructor(
    factoryMethod?: FactoryMethodType,
    source?: unknown[]
  ) {
    super();

    Object.setPrototypeOf(this, new.target.prototype);

    if (factoryMethod === null || factoryMethod === undefined) {
      factoryMethod = (
        item: IEntity<ValueObject> | ValueObject | unknown
      ): IObjectWrapper<IEntity<ValueObject | ValueObject<unknown>>> | unknown => item;
    }

    this.factoryMethod = factoryMethod;

    this._source = source ?? [];

    const observerLocator: IObserverLocator = resolve(IObserverLocator);

    const observer = observerLocator.getArrayObserver(this._source);
    observer.subscribe(this);

    for (const item of this._source) {
      this.pushCore(
        item,
        WrappingCollection.createWrapper(item, this.factoryMethod)
      );
    }
  }

  public dispose(): void {
    const observerLocator: IObserverLocator = resolve(IObserverLocator);
    observerLocator.getArrayObserver(this._source).unsubscribe(this);
  }

  public handleCollectionChange(
    collection: Collection,
    indexMap: IndexMap
  ): void {
    const c = collection;
    const added = Array.from({ length: indexMap.length }, (_, i) => i)
      .filter(i => indexMap[i] === -2);
    const removed = indexMap.deletedIndices ?? [];
    console.log('WrappingCollection.handleCollectionChange', c, indexMap);
    console.log(`Added Indices: ${added}. Removed Indices: ${removed}`);

    if (added.length > 0) {
      for (const index of added) {
        this.addCore(c[index], WrappingCollection.createWrapper(c[index], this.factoryMethod), index);
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
    return super.filter((item: ISelectable): boolean => (item as ISelectable) ? item.isSelected : false);
  }

  public canSelectAll(): boolean {
    return this.length > this.getSelectedItems().length;
  }

  public selectAll(): void {
    this.forEach((item: ISelectable): boolean => (item as ISelectable) ? item.isSelected = true : false);
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

    const newArray = this._source.map(item => WrappingCollection.createWrapper(item, this.factoryMethod));
    this.splice(0, this.length, ...newArray);

    return this;
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

  private readonly containsWrapper: (model: object) => boolean = (model: object) => {
    return this._internalMap.has(model);
  };

  private readonly addCore: (
    modelItem: object,
    wrappedItem: unknown,
    indexOfModelItem: number) => void = (modelItem: object, wrappedItem: unknown, indexOfModelItem: number) => {

      if (this.containsWrapper(modelItem)) {
        throw new Error('The duplications are not allowed for the model items.');
      }
  
      this._internalMap.set(modelItem, wrappedItem);
      this.splice(indexOfModelItem, 0, wrappedItem);
  
    };

  private readonly removeCore: (index: number, removedItem: object) => void = (index: number, removedItem: object) => {
    this._internalMap.delete(removedItem);
    this.splice(index, 1);
  };

}
