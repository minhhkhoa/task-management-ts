import {Express} from "express"

import { taskRoutes } from "./task.route"

// const authMiddleware = require("../middleware/auth.middleware")

//- Nhungs file home
const mainV1Routes = (app: Express): void => {

  const version = "/api/v1"

  //- cac route con cua tasks deu can bao mat
  app.use(
    version + '/tasks',
    taskRoutes
  )
}

export default mainV1Routes