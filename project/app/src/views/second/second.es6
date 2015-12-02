var Observable = require('data/observable').Observable;
import { rules } from './rules-view-model';

export function pageLoaded(args) {
  var page = args.object;
  page.bindingContext = page.bindingContext || new RulesModel();
}

class RulesModel extends Observable {
  constructor() {
    super();

    this.rules = rules;
  }
}
