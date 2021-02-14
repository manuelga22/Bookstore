# Bookstore
Software Engineering I project

instructions to run:
1. have npm and node installed in your pc.
2. run npm install in your command line
3. run node app.js in your command line

## Importing Database

Make sure you have MySQL installed. Run `npm install` to get the sequelize and mysql2 packages installed.

On Mac/Linux these commands work. Not sure about Windows shells. Run these in your app root directory.

Create the database:

`echo "create database `geek_text`" | mysql -u username -p`

Run the setup command

`npm run setup-db`