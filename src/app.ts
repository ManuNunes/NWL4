import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors'
import 'reflect-metadata';
import createConnection from './database';
import { AppError } from './errors/appErrors';
import { routes } from './routes';

createConnection()

const app = express();

app.use(express.json())
app.use(routes)

app.use((err: Error, req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ message: err.message })
  }

  return res.status(500).json({
    status: "Error",
    message: `internal server error ${err.message}`
  })
})

export { app }