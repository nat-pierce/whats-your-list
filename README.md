# What's Your List?

The app: https://whatsyourlist.com/

My movie list (no account required to view): https://whatsyourlist.com/viewList?id=0teoLnhpRXaJWdHVL2aXZvsCJxY2

Movie-based social networking app that allows users to rank their favorite movies, analyze them, and compare them with friends. Includes user authentication and a custom friending system. 

The front-end is built with React, and uses React Context for state management. It uses a Firebase back-end with RapidAPI to retrieve film information.

## Notes-to-self for development

### To run locally

Run `npm start`

### To patch a package

Make the changes in the node_modules,
then run `npx patch-package some-package`,
then run `./node_modules/.bin/patch-package`

### To deploy

Run `npm run build` followed by `firebase deploy`

### To run emulators

Run `firebase emulators:start
