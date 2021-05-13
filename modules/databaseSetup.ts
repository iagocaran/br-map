import { Module } from "@nuxt/types";
import { Client } from "pg";

const databaseSetup: Module = async function() {
  let client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  })
  await client.connect();
  const query = "CREATE TABLE IF NOT EXISTS people (" +
    "id SERIAL PRIMARY KEY," +
    "name varchar(50) NOT NULL," +
    "phone varchar(15) NOT NULL," +
    "address varchar(70) NOT NULL," +
    "lat double precision NOT NULL," +
    "long double precision NOT NULL" +
    ");"
  console.log(await client.query(query))
  await client.end();
}

export default databaseSetup
