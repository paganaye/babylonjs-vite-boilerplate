# BabylonJs + vite Boilerplate

## Description

This is a BabylonJS + vite minimal boilerplate for development and production to work with **typescript**. 
It starts faster than webpack and allow debugging from vscode.

## instructions

- clone or download the repo
- npm install
- For development: `npm run dev`
- For production: `npm run build` then to preview what was built `npm run preview`

## Development mode and debugging
First `npm run dev`
Then in vscode press F5, otherwise just open a browser at http://localhost:3000/

## Live Demo
You can see this repository live here:
https://babylonjs-vite-boilerplate.vercel.app/

## Production build
First `npm run build`
A `dist` folder is created and contains the distribution. 
You can `npm run preview` it on your development machine.
Production preview runs at http://localhost:5000/ . The terminal will display external URLs if you want to test from a phone or tablet.

## File Structure

### /index.html
This file is used as a template by vite to create the actual **index.html** that will be served to the client.

### /public
This folder contains your html asset. The files in this folder are served by the test webserver as root files.

### /src 
This is where you should place all your application code.

### /src/main.ts
This is the entry point of the app. 

### /src/AppOne.ts
A sample app that copy the code from the babylon.js playground.

## Thank you!

Thank you for using it, feel free to contribute in any way you can/want, just keep in mind that this should stay as a very mimimalistic boilerplate. 
If you'd like to add complexity just fork it and let me know when you're done, so that I might reference it here in case someone comes looking for a more opinionated environment.

Enjoy!
