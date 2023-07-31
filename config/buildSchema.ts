import sqlite3 from 'sqlite3';
import fs from 'fs';

let dbPath = './database.db'
const schemaPath = './schema.json';

let db: sqlite3.Database;


interface ColumnDefinition {
  name: string;
  type: string;
  primaryKey?: boolean;
  unique?: boolean;
}

interface TableDefinition {
  name: string;
  columns: ColumnDefinition[];
}

let tableNames: string[] = [];

interface DatabaseSchema {
  tables: TableDefinition[];
}

export const buildDatabaseSchema = async (): Promise<void> => {
  db = new sqlite3.Database(dbPath, (err: Error | null) => {
    if (err) {
      console.error('Error opening database:', err.message);
    } else {
      console.log('Connected to the database.');
      const schema: DatabaseSchema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));

      schema.tables.forEach((tableDef) => {
        const { name, columns } = tableDef;
        tableNames.push(name)
        const createTableQuery = `CREATE TABLE IF NOT EXISTS ${name} (${columns
          .map((col) => `${col.name} ${col.type}${col.primaryKey ? ' PRIMARY KEY' : ''}${col.unique ? ' UNIQUE' : ''}`)
          .join(', ')});`;

        db.run(createTableQuery, (err) => {
          if (err) {
            console.error(`Error creating table ${name}: ${err.message}`);
          } else {
            console.log(`Table ${name} created.`);
          }
        });
      });
    }
  });
};

export const getTableNames = async (): Promise<string[]> => {
  if (!tableNames) {
    await buildDatabaseSchema();
  }
  return tableNames;
}; 

export const getDB = async (): Promise<sqlite3.Database> => {
  if (!db) {
    await buildDatabaseSchema();
  }
  return db;
};

