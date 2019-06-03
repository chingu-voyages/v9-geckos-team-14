# Color palletes

[Chingu](https://chingu.io/) Voyage-9 project

# Development

After cloning this repo you need to do little setup:

- First, `npm install`
- After that you need to prepare frontend side: `npm run client-install`

At this point, if you want only **frontend** server to work, you can do `npm run client`. It will start React's development server.

For backend you need to install [mongoDB](https://www.mongodb.com/) and make sure it's up and running on your machine.

Now you're ready to get started! For running backend server do `npm run server`, for frontend server do `npm run client`. For both frontend and backend at same time do `npm run dev`, it will run both servers using [concurrently](https://www.npmjs.com/package/concurrently) package.
