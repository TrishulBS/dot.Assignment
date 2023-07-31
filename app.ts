import express from "express";
import { buildDatabaseSchema } from "./config/buildSchema";
import bodyParser from "body-parser";
import crudRouter from "./route/crudRoute";

export const app = express();


buildDatabaseSchema();

app.use(bodyParser.json());
app.use("/", crudRouter);