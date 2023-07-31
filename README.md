# dot.Assignment


- **Project Description**:
  - This project allows defining the schema for multiple database tables in a JSON file named `schema.json`.
  - The schema format follows the example format present in the `schema.json` file.
 
- **Concurrent Environment**:
   - Since this project is using local database using SQLite, on concurret environment, global database should be used so all machine use one database.
   - Code should be version-controlled using git. Deplyment to mutiple machine will be easier
   - Concurrent update, or delete of rows in the databse should be eliminated
   - Incoming http request to machines should be evenly distributed
- **CRUD Routes**:
  - Four routes are implemented for performing CRUD operations on any defined database table:
    - `POST /:collection/`: Creates a new record in the specified table.
      Sample API usage: POST - localhost:5000/users/      Here users is the table name created. Use any table name you create
    - `DELETE /:collection/:id`: Deletes a record with id from the specified table.
      Sample API usage: DELETE - localhost:5000/users/1
    - `PUT /:collection/:id`: Updates an existing record with id in the specified table.
      Sample API usage: PUT - localhost:5000/users/1
    - `GET /:collection/:id`: Retrieves records from the specified table.
      Sample API usage: GET - localhost:5000/users/1

- **Testing**:
  - Testing is provided for all four routes (`POST`, `DELETE`, `PUT`, and `GET`) for each table defined.
  - To perform testing, run the command `npm run test`.

- **Environment Setup**:
  - Use `npm run dev` to run the application in the development environment.
  - Use `npm run prod` to run the application in the production environment.

- **Usage**:
  - Clone the repository and install the required dependencies using `npm install`.
  - Define the database schema in `schema.json` according to the provided example format.
  - Start the application using one of the available scripts (`npm run dev` for development or `npm run prod` for production).

- **Note**:
  - The application uses `PUT` instead of `POST` for the update route to adhere to RESTful conventions.
  - I have used same database for all the environment.
