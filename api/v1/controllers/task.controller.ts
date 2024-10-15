import { Request, Response } from "express"
import paginationHelper from "../../../helpers/pagination"

import Task from "../model/task.model"
import searchHelper from "../../../helpers/search"

export const index = async (req: Request, res: Response) => {

  //- Find
  //- interface
  interface Find {
    deleted: boolean,
    status?: string,
    title?: RegExp
  }


  const find: Find = {
    deleted: false,
  }

  if (req.query.status){
    // find["status"] = req.query.status //- lam nhu nay hoac interface
    find.status = req.query.status.toString() //- Neu co query thi nen chuyen no thanh string
  }
  //-end find

  //-tim kiem
  const objSearch = searchHelper(req.query)
  if (req.query.keyword) {
    find.title = objSearch.regex
  }
  //-end tim kiem

  //start Phan trang
  const countTask = await Task.countDocuments(find)

  let objPagination = paginationHelper(
    {
      currentPage: 1,
      limitItems: 2
    },
    req.query,
    countTask
  )
  //end phan trang

  //-sort
  const sort = {}
  if(req.query.sortKey  && req.query.sortValue){
    sort[`${req.query.sortKey}`] = req.query.sortValue.toString() //- Neu co query thi nen chuyen no thanh string

  }
  //-end sort

  const tasks = await Task.find(find)
    .sort(sort)
    .limit(objPagination.limitItems)
    .skip(objPagination.skip)
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