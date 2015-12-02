module.exports = {
  'clean': {
    'path': [
      './app/{shared,views}'
    ]
  },
  'watch': {
    'src': [
      'app/src/*.{js,es6,xml,css}',
      'app/src/**/*.{js,es6,xml,css}'
    ]
  },
  'files': {
    'es6': {
      'src': [
        'app/src/**/*.es6'
      ]
    },
    'es5': {
      'src': [
        'app/src/**/*.js'
      ]
    },
    'resources': {
      'src': [
        'app/src/*.{xml,css}',
        'app/src/**/*.{xml,css}'
      ]
    },
    'dest': 'app'
  },
  'lint': {
    'src': [
      'app/src/*.{js,es6}',
      'app/src/**/*.{js,es6}'
    ]
  }
};
