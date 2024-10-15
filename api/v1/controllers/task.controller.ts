import { Request, Response } from "express"


import Task from "../model/task.model"

export const index = async (req: Request, res: Response) => {
  const tasks = await Task.find({
    deleted: false
  })
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