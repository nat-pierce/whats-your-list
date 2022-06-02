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
# Make sure instructions already followed here: https://firebase.google.com/docs/rules/emulator-setup, then run:
`npm run emulators` in one Terminal window (viewable at localhost:4000),
and `npm start` in another Terminal window

### To deploy a production build to localhost
`npm run buildnserve`

### To deploy to production
`npm run deploy`

### To deploy only firebase functions to production
`npm run build && firebase deploy --only functions`