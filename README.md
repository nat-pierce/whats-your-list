# What's Your List?

The app: https://whatsyourlist.com/

My movie list (no account required to view): https://whatsyourlist.com/viewList?id=0teoLnhpRXaJWdHVL2aXZvsCJxY2

Movie-based social networking app that allows users to rank their favorite movies, analyze them, and compare them with friends. Includes user authentication and a custom friending system. 

The front-end is built with React, and uses React Context for state management. It uses a Firebase back-end with RapidAPI to retrieve film information.

## Notes-to-self for development

There are some "security vulnerabilities" in react-scripts,
but for now just use `npm audit --production`
(https://github.com/facebook/create-react-app/issues/11174)

### To run locally

Run `npm start`

### To deploy

Run `npm run build` followed by `firebase deploy`

### To run emulators

Run `firebase emulators:start`
