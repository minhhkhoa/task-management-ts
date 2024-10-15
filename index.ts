import express, { Express, Request, Response} from "express"
import * as database from './config/database'
import dotenv from 'dotenv'
import Task from "./model/task.model"

dotenv.config()

database.connect()

const app: Express = express()
const port: number | string = process.env.PORT || 3000

app.get('/tasks', async (req: Request, res: Response) => {
  const tasks = await Task.find({
    deleted: false
  })
  res.json(tasks)
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})