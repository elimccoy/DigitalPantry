// You will need to create this file.
import DEV_CONFIG from './dev.js';

const DEFAULT_CONFIG = {
  // Write general non secret config options here
};

console.log(DEV_CONFIG)

// merges default config with development specific config
// development specific config should contain personal credentials and should not be commited
// NODE_ENV is already set to 'development' while running the dev server (npm run start)
export default {
  ...DEFAULT_CONFIG,
  ...((process.env.NODE_ENV === 'development') ? DEV_CONFIG : {}),
};