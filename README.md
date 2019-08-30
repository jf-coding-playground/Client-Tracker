


#Setup Guide:

####In order to run the application you must setup the database first:

#####Database Setup:
  1. Make sure you have mongo installed, download: https://www.mongodb.com/download-center/community
  2. In the terminal, run "mongod".
  3. Open another terminal and run "npm run db:populate" inside of the "api" folder.
  4. Create a admin user in mongodb for your app to use to connect to database (you can do this by running "mongo" in the terminal, run "use admin" and then copy and pasting the contents in /scripts/createMongoAdmin.txt)
  5. Lastly make sure you run "mongod" in a termial to start the mongo service

#####Once the database is setup we have to populate it with our mock data:
  1. Navigate to the /api folder in a separate terminal.
  2. Run "npm install" to install the dependencies.
  3. rename the .env.sample to .env to enable the env variables.
  3. Now to populate the database, run "npm run db:populate".
  4. To run the server, run "npm start".

#####Now that we have the database and server running now we can run the client side application:
  1. Navigate to the /client folder in a separate terminal.
  2. Run "yarn install" to install the dependencies.
  3. To start, run "yarn start".
  

###With that, you should be up and running!