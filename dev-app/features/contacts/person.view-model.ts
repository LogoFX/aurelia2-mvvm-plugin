import { customElement } from "aurelia";
import { CanBeBusy, Enabled, Selectable, EditableObjectViewModel, Validatable } from "../../../src";
import { IPerson } from "../../model/contracts/person.interface";
import template from "./person.view.html";

@customElement({
  name: 'person-view',
  aliases: ['person', 'person-view-model'],
  template: template
})
export class PersonViewModel extends CanBeBusy(Enabled(Selectable(EditableObjectViewModel<IPerson>))) {

  protected beforeCommit(model: IPerson): Promise<unknown> {
    throw new Error('Method not implemented.');
  }

  protected afterCommit(model: IPerson): Promise<unknown> {
    throw new Error('Method not implemented.');
  }

  protected discard(model: IPerson): Promise<unknown> {
    throw new Error('Method not implemented.');
  }

  protected showError<TError = Error>(error: TError): Promise<unknown> {
    throw new Error('Method not implemented.');
  }
  public constructor(model: IPerson) {
    super(model);
  }
}
