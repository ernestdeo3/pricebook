// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
export const environment = {
  production: false,
  firebase: {
    apiKey: "api key",
    authDomain: "mokprj-679f2.firebaseapp.com",
    databaseURL: "https://mokprj-679f2.firebaseio.com",
    projectId: "mokprj-679f2",
    storageBucket: "mokprj-679f2.appspot.com",
    messagingSenderId: ""
  }
};
