# Graffiti Gallery

This is a image gallery app built during the #100daysofcode challenge.

## Architecture

The app uses firebase to store the images and show them in the homepage. Authentication is also done using firebase.
Material UI was used as the UI library.

## How to start

### Prerequisites

- [Node.js](https://nodejs.org/en/)

### Installation

- To run the application, first clone the repository to your local machine, and then run the following command in the created folder:

```
yarn install
```

- Then you'll need to create a [Firebase](https://firebase.google.com/) project and provide the application with the environment variables. Those variables should be in the file named ".env".

The firebase project should contain the following modules activated:

- Authentication (Google provider enabled)
- Firestore Database
- Storage

- And then the app can be started with the command:

```
yarn dev
```

- Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.