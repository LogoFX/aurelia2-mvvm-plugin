import { bindable, newInstanceForScope, inject, IContainer } from 'aurelia';
import { CanBeBusy, Enabled, IViewModelCreatorService, Selectable, ViewModelCreatorService, WrappingCollection } from '../src/view-model';
import { PersonViewModel } from './features/contacts';
import { Person } from './model/implementation/person';
import { IValidationController } from '@aurelia/validation-html';
import { IValidationRules, ValidateInstruction } from '@aurelia/validation';

type Item = {name?: string, value?: number};

class Wrapper {
  constructor(public item: Item) {}
}

class EnhancedWrapper extends CanBeBusy(Enabled(Selectable(Wrapper))) {}

@inject(IContainer, ViewModelCreatorService, newInstanceForScope(IValidationController))
export class MyApp  {
  
   
  @bindable()
  public wc: WrappingCollection;
  source: Person[] = []; 
  public personModel;
  public person: PersonViewModel;


  constructor(private container: IContainer, private viewModelCreatorService: IViewModelCreatorService, private validationController: IValidationController) {
    this.validationController.addObject(this.person);
  }
    created() {
      const personModel = this.container.invoke<Person>(Person, [{name: 'John Doe', age: 30}]);
      //personModel.validationRules.on(this.personModel); 
      this.personModel = personModel;
      this.person = this.viewModelCreatorService.create<PersonViewModel>(PersonViewModel, personModel);
    }

    
    attached() {
    
    // this.source = [new Person({name: 'John Doe', age: 30}), new Person({name: 'Jane Smith', age: 25}), new Person({name: 'Alice Johnson', age: 28})];
    // this.wc = new WrappingCollection()
    //   .withFactoryMethod((item) => this.viewModelCreatorService.create<PersonViewModel>(PersonViewModel, item))
    //   .withSource(this.source);

    // this.source.push(new Person({name: 'Jane Smith', age: 25}));
    // this.source.push(new Person({name: 'Alice Johnson', age: 28}));
    //this.source.push(new Person({name: 'Item 0', age: 0}));
    // this.source.push({name: 'Item 1', value: 10});
    // this.source.push({name: 'Item 2', value: 20});
    //console.log('WC', this.wc[0], this.wc[1]);
    //   this.source.unshift({name: 'Item 3', value: 30});
    //   this.source.splice(0, 1); 
    //   this.source.push({name: 'Item 4', value: 40});
    //   this.source.unshift({name: 'Item 3', value: 30});
    //   this.source.push({name: 'Item 5', value: 50}, {name: 'Item 6', value: 60});
    //   this.source.unshift({name: 'Item 7', value: 70}, {name: 'Item 8', value: 80});
    //   this.source.shift();
    //   this.source.splice(2, 0, {name: 'Item 9', value: 90});
    //   this.source.sort((a, b) => a.value! - b.value!);

    //console.log('Initial WrappingCollection:', this.wc.length, this.wc);
  }

  async add() {
    const result = await this.person.validateAsync();
    console.log('Validation result:', result);
    // if (result.valid) {
    //   this.source.push(new Person({name: 'Daniel Brick', age: 55}));
    // }
  }

  detaching() {
    this.wc.dispose();
  }

  
}
