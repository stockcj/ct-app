// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyAYSSdOlXenecmOsNFCaGwDWJFi3ucvYbc',
    authDomain: 'contingency-tracker.firebaseapp.com',
    databaseURL: 'https://contingency-tracker.firebaseio.com',
    projectId: 'contingency-tracker',
    storageBucket: 'contingency-tracker.appspot.com',
    messagingSenderId: '166131358906'
  }
};