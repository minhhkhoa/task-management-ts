import express, { Express} from "express"
import * as database from './config/database'
import dotenv from 'dotenv'
import mainV1Routes from "./api/v1/routes/index.route"
import cors from "cors"

dotenv.config()

database.connect()

const app: Express = express()
const port: number | string = process.env.PORT || 3000

app.use(cors())

//-thay the cho body-parser
app.use(express.json()); // Để parse JSON
app.use(express.urlencoded({ extended: true })); // Để parse URL-encoded
//-end thay the cho body-parser

mainV1Routes(app)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})