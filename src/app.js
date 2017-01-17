import 'zone.js/dist/zone';
import 'reflect-metadata';
import {
  Router, RouteConfig, RouteParams,
  LocationStrategy, HashLocationStrategy,
  ROUTER_PROVIDERS, ROUTER_DIRECTIVES, ROUTER_PRIMARY_COMPONENT
} from 'angular2/router';

import { Component, View, bootstrap } from 'angular2/angular2';
import { HelloComponent } from './hello.component';

@Component({
  selector: 'hello-app'
})

@View({
  directives: [HelloComponent],
  template: `
    <div>
      <hello-component></hello-component>
    </div>
  `
})

class HelloApp { }

bootstrap(HelloApp, []);
