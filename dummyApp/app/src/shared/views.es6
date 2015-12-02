var frameModule = require('ui/frame');

var views = {
  'home': '/views/home/home',
  'second': '/views/second/second'
};

function navigateTo(targetView) {
  if (!views[targetView]) {
    throw new Error('"' + targetView + '" is not defined as a view');
  }
  var topmost = frameModule.topmost();
  topmost.navigate(views[targetView]);
}

export function home() {
  navigateTo('home');
}

export function second() {
  navigateTo('second');
}
