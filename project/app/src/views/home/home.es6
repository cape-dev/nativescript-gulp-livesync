var Observable = require('data/observable').Observable;
var views = require('../../shared/views');

var homeModel = new HomeModel();

export function pageLoaded(args) {
  var page = args.object;
  page.bindingContext = homeModel;
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