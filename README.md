# Todo List API

Done to complete the second project in [this list](https://roadmap.sh/backend/project-ideas)

## Dependencies

- Node 20+
- pnpm

## Setup the project

open the main project folder and run:

```
pnpm install
```

create `.env` file in the root folder and place this inside (replace with your own credentials)

```js
MONGODB_URL=mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority
PORT=8080
JWT_SECRET=yourfavoritecolor
JWT_EXPIRES_IN=12h
```

## Run the backend

```
node server.js
```