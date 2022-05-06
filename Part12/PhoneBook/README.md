# PhoneBook
## Running the app in development mode

```
docker-compose -f docker-compose.dev.yml up
```

Opens a hotloading frontend at http://localhost:3000 and a backend in http://localhost:3001. Also a persistent local Mongo database for development purposes is provided. 
## Running the app in production mode
```
docker-compose -f docker-compose.dev.yml up
```
Opens the frontend and backend in production mode. Provide the url to a production Mongo database in a .env file as MONGODB_URI.