// if (typeof window !== "undefined") {
//     const originalOnError = window.onerror;
//     window.onerror = function(message, source, lineno, colno, error) {
//       if (typeof message === "string" && message.includes("Failed to construct 'ImageData'")) {
//         // Suppress this specific error
//         return true; // Returning true prevents the error from propagating.
//       }
//       // For any other error, use the original handler (if it exists)
//       if (originalOnError) {
//         return originalOnError(message, source, lineno, colno, error);
//       }
//       return false;
//     };
//   }


import { registerRootComponent } from 'expo';

import App from './App';




// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
