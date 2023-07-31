import supertest from "supertest";
import {app} from "../index"
import fs from 'fs';

const schemaPath = './schema.json';
let dbPath = './database.db'
const schema: any = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));

let tableNames: string[] = []

schema.tables.forEach((tableDef: any) => {
    const { name, columns } = tableDef;
    tableNames.push(name)
})


beforeAll(async () => {
    fs.writeFile(dbPath, '', (err) => {
        if (err) {
          console.error('Error clearing the file:', err);
        } else {
          console.log('File content cleared successfully.');
        }
      });

  });



  
  test.each(tableNames)(
    "should return 201 when new row is created",
    async (tableName: string) => {
      const reqBody = {id: 1}
      const response = await supertest(app).post(`/${tableName}/`).send(reqBody);
      expect(response.status).toBe(201);
    }
  );

  test.each(tableNames)(
    "should return 400 if there is incorrect request body when creating a row",
    async (tableName: string) => {
      const reqBody = {id: 99, jjjdjd:""}
      const response = await supertest(app).post(`/${tableName}/`).send(reqBody);
      expect(response.status).toBe(400);
    }
  );

  test.each(tableNames)(
    "should return 200 if the row with id is present",
    async (tableName: string) => {
      const response = await supertest(app).get(`/${tableName}/1`);
      expect(response.status).toBe(200);
    }
  );

  test.each(tableNames)(
    "should return 404 if the row with id is not present",
    async (tableName: string) => {
      const response = await supertest(app).get(`/${tableName}/2`);
      expect(response.status).toBe(404);
    }
  );

  test.each(tableNames)(
    "should return 200 if the row with id is updated successfully",
    async (tableName: string) => {
      const body =  {id: 99}
      const response = await supertest(app).put(`/${tableName}/1`).send(body);
      expect(response.status).toBe(200);
    }
  );

  test.each(tableNames)(
    "should return 200 if the row with id is deleted successfully",
    async (tableName: string) => {
      const response = await supertest(app).delete(`/${tableName}/99`);
      expect(response.status).toBe(200);
    }
  );

  

