// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
  	apiKey: "AIzaSyBNly1YD5N-e8uA55Cv7udKHtDNXIqvQRA",
    authDomain: "logjam-catchphrase.firebaseapp.com",
    databaseURL: "https://logjam-catchphrase.firebaseio.com",
    projectId: "logjam-catchphrase",
    storageBucket: "logjam-catchphrase.appspot.com",
    messagingSenderId: "13977911084"
  }
};

/*
 * In development mode, for easier debugging, you can ignore zone related error
 * stack frames such as `zone.run`/`zoneDelegate.invokeTask` by importing the
 * below file. Don't forget to comment it out in production mode
 * because it will have a performance impact when errors are thrown
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
