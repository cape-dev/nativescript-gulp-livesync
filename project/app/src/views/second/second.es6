import { Observable } from 'data/observable';
import * as views from '../../shared/views';


export function pageLoaded(args) {
  var page = args.object;
  page.bindingContext = page.bindingContext || new SecondModel();
}

class SecondModel extends Observable {
  constructor() {
    super();

    this.views = views;
  }
}
