Database Setup:
  1. Make sure you have mongo installed, download: https://www.mongodb.com/download-center/community
  2. In the terminal, run "mongod"
  3. Open another terminal and run "npm run db:populate"
  4. create a admin user in mongodb for your app to use to connect to database (you can do this by running "mongo" in the terminal, run "use admin" and then copy and pasting the contents in /scripts/createMongoAdmin.txt)
