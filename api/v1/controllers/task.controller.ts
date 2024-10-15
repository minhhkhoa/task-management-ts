import { Request, Response } from "express"


import Task from "../model/task.model"

export const index = async (req: Request, res: Response) => {

  //- interface
  interface Find {
    deleted: boolean,
    status?: string
  }


  const find: Find = {
    deleted: false,
  }

  if (req.query.status){
    // find["status"] = req.query.status //- lam nhu nay hoac interface
    find.status = req.query.status.toString() //- Neu co query thi nen chuyen no thanh string
  }

  const tasks = await Task.find(find)
  res.json(tasks)
}

export const detail = async (req: Request, res: Response) => {

  //-lay ra id can xem detail
  const id: string = req.params.id

  const task = await Task.findOne({
    _id: id,
    deleted: false
  })
  res.json(task)
}