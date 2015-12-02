import { Observable } from 'data/observable';
import * as views from '../../shared/views';


export function pageLoaded(args) {
  var page = args.object;
  page.bindingContext = page.bindingContext || new HomeModel();
}

class HomeModel extends Observable {
  constructor() {
    super();

    this.views = views;
  }

  testFunction() {
    console.log('This message should occur in the log while livesync is active!');
  }
}
