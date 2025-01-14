This is a base node js project template,which anyone can use as it has been prepared,by keeping some of the most important code principles and project management recommendation.feel free to change anything.


`src`=>inside the source folder all the actual source code regarding the project will reside,this will not include any kind of tests. (you might want to make seperate tests folder)

lets take a look inside the `src` folder

- `config` =>In this folder anything and everything regarding any configuaration o:setup of a library or module will be done.
For Example: setting up `dotenv` so thatwe can use the environmental variables in a cleaner  fashion,this is done in the `server-config.js`.One more can be to setup your logging library that will help you prepare meaningfull logs,so configuation for this library should also be done here.

- `routes`=> In the routes folder, we register a route and the corresponding middleware and controllers to it.

-`middlewares`=>they are just going to intercept the incoming requests where we can write authenticators, validators etc.

-`controllers`=>They are kind of last middleware as post them you call your business layer to execute the business logic.In controllers we just receive the incoming requests and data and then pass it to business layer, and once businesss layer returns an output,we structure the api response in controllers and send the output.

- `repositories`=>this folder contains all the logic using which we interact the DB by writing queries,all the raw queries or ORM queries will go here.

- `services` => conatins the business logic and interacts with
repositories for data from the database

- `utils` => contains helper methods and error classes etc.

## Setup the project

-Download this template from github and open it in your favourate text editor.
-Go inside the folder path and execute the following command.
```
npm install
```
-In the root directory create a `.env` file and add the following env variables
```
PORT=<Port number of your choice>
```
```
ex:
```
PORT=3000
```
-go inside the `src` folder and execute the following command:
```
npx sequelize init
```
-By executing the above commandyou will get migrations and seeders folder  with a config.json in config folder in your src folder.
-Inside  the `src/config` folder create a file named as `config.json` and write the following code:
```
{
  "development": {
    "username": "root",
    "password": null,
    "database": "database_development",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
```

-If you are setting up your developmant environment,then write the username of your db,password of your db and in dialect mention whatever db you are using for ex: mysql,mariadb etc.
-if you're seeting up the test and prod make sure that you also replace the host with hosted db url.

-To run the server execute the follwing command
```
npm start
```