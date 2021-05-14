import http from "http";
import { NextFunction } from 'connect'
import { Client } from "pg"
import axios from "axios";

class ParsedMessage extends http.IncomingMessage {
  originalUrl?: http.IncomingMessage["url"];
  body?: any;
}

type ServerMiddleware = (req: ParsedMessage, res: http.ServerResponse, next: NextFunction) => void;

const myServerMiddleware: ServerMiddleware = async function (req, res, next) {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }});
  await client.connect();
  if (req.method === "POST") {
    let location = req.body["Número"] + " " + req.body["Rua"] + ", " + req.body["Código Postal"] + " " + req.body["Cidade"] + ", " + req.body["País"]
    let url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + location + ".json?limit=1&access_token=" + process.env.NUXT_ENV_MAPBOX_API_KEY
    const mapbox = await axios.get(url, {
      headers: { 'Host': req.headers.host }
    })
    let [ long, lat ] = mapbox.data.features[0].center
    let query = "INSERT INTO people(name, phone, address, lat, long) VALUES($1, $2, $3, $4, $5)"
    let result = await client.query(query, [ req.body["Nome"], req.body["Telefone"], location.trim(), lat, long ])
    res.write("Thanks")
  } else {
    let data = []
    let result = await client.query("SELECT * FROM people")
    data = result.rows.map((value) => {
      return { name: value.name, phone: value.phone, position: { long: value.long, lat: value.lat }}
    })
    if (data === []) {
      res.write("Oops! An error was produced.")
    } else {
      res.setHeader('Content-Type', 'application/json')
      res.write(JSON.stringify(data))
    }
  }
  await client.end();
  res.end()
}

export default myServerMiddleware
