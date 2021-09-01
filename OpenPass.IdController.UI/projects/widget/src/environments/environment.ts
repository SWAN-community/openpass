// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { defaultEnv } from './default';
const appHost = 'https://localhost:4200';

export const environment = {
  appHost,
  ...defaultEnv,
  production: false,
<<<<<<< HEAD:OpenPass.IdController.UI/projects/widget/src/environments/environment.ts
  idControllerAppUrl: appHost + '/open-pass',
=======
  idControllerAppUrl: 'https://localhost:4200/open-pass',
>>>>>>> 6c306a3f96610e772cab2728cdd0874f645fbd4f:Criteo.IdController.UI/projects/widget/src/environments/environment.ts
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
