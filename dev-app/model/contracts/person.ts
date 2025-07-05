import { IId } from "./id";

export interface Person {
  get id(): IId;
  get name(): string;
  get age(): number;
}
