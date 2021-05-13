import http from "http";
import { NextFunction } from 'connect'

class ParsedMessage extends http.IncomingMessage {
  originalUrl?: http.IncomingMessage["url"];
  body?: any;
}

type ServerMiddleware = (req: ParsedMessage, res: http.ServerResponse, next: NextFunction) => void;

const myServerMiddleware: ServerMiddleware = function (req, res, next) {
  console.log(req.body)
  res.write("Thanks")
  res.end()
}

export default myServerMiddleware
