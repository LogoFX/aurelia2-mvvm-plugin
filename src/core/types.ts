/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
export type Constructor<T = {}> = new (...args: any[]) => T;
export type AbstractConstructor<T = {}> = (abstract new (...args: any[]) => T) | (new (...args: any[]) => T);
