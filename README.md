# NativeScript livesync with logs

This gulp framework's key feature is that it **outputs all your JavaScript console.log's** during a ***tns livesync***. Additionally it supports ecma6 files in NativeScript apps.

Currently supporting NativeScript version 1.4.0

### Installation

You need NativeScript installed.

You need Android SDK and ADB installed.

You need Gulp installed globally:

```sh
$ npm install -g gulp
```

```sh
$ git clone https://github.com/kamekazemaster/nativescript-gulp-livesync.git ns-app
$ cd ns-app
$ npm install
$ cd dummyApp
$ npm install
```

Now you have 3 options.

**1. Start on Genymotion Emulator**

Herefore you first have to follow the instructions on this site: https://www.genymotion.com/#!/support?chapter=collapse-adb#faq 
in order to connect Genymotion with Android's ADB to capture the logs. After that start Genymotion emulator and just execute in *dummyApp/*:
```sh
$ gulp
```

**2. Start on Androids AVD Manager's Emulator**

Start the emulator and execute in *dummyApp/*
```sh
$ gulp emulator
```

**3. Start on connected Android device**

Connect the device and execute in *dummyApp/*
```sh
$ gulp live
```

### Directory Structure

You will notice that unlike a common nativescript app dir structure you have your *views* and *shared* folders as subfolders in 
the *src* folder. This is in order to support es6 js files. All files in the src folder will be transpiled **IF* they have an ending like 
*.es6. These transpiled files and all other files (*.css, *.xml, *.css, etc.) will be copied to their common place alongside app.js and 
app.css to the *app* folder..

**Please only develop in the *src* subfolder! The *shared* and *views* folder in the *app* folder will be deleted during the gulp process 
and replaced by new transpiled or copied files!**

### Gulp Tasks
 
```sh
$ gulp
**shortcut for "live" task**
```
```sh
$ gulp emulator
**starts the build process including tns livesync on android avd**
```
```sh
$ gulp live
**starts the build process including tns livesync on genymotion or on connected device**
```
```sh
$ gulp lint
**lints all files corresponding to the gulp/config.js file with eslint (eslint config is in .eslintrc file)**
```

There are several more tasks which are executed from the "dev" task. Look in to gulp/tasks for the other ones.

*For more information on setup look into gulp/config.js file.*

License
----

MIT
