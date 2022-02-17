# DigitalPantry
Digital Pantry App Project for CS 481 

## Installation

This repository can be cloned with:

```bash
git clone https://github.com/elimccoy/DigitalPantry.git
```

The main project is located in the `DigitalPantry/` Directory. Change into the directory and install the node modules.

```bash
cd DigitalPantry
npm install
```

## Running

```bash
npm run start
```

Similar commands exist to run the dev server to target certain platforms, but they can also be started with `npm run start`.

```bash
npm run web # Prepares the code to be viewed from a web browser
npm run android # Prepares the code for an adb android emulator
npm run ios # Prepares the code to be viewed from an ios emulator
```

See the [official expo-cli documentation](https://docs.expo.dev/workflow/expo-cli) for more on running this project.

## Publishing

The app can be built an published using expo-cli:

```bash
expo publish 
```

## Testing

There are no automated tests for this app however it does have code linting.

```bash
npm run lint
```