import Aurelia, { AppTask, Registration } from 'aurelia';
import { DI, IContainer } from '@aurelia/kernel';
import { MyApp } from './my-app';
import { ValidationHtmlConfiguration } from '@aurelia/validation-html';
import { AureliaMvvm } from '../src';
import { PersonViewModel } from './features';
//import { PersonViewModel } from './features';

Aurelia
  .register(ValidationHtmlConfiguration)
  .register(AureliaMvvm)
  .app(MyApp)
  .start();
