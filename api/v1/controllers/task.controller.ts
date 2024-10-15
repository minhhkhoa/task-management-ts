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

  if (req.query.status) {
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
  if (req.query.sortKey && req.query.sortValue) {
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

export const changeStatus = async (req: Request, res: Response) => {
  try {
    //-lay ra id can update
    const id: string = req.params.id

    //- thứ muốn cập nhật(nội dung cập nhật cho status mà front-end y/c)
    const status: string = req.body.status

    //-update
    await Task.updateOne({
      _id: id,
    }, {
      status: status
    })

    res.json({
      code: 200, // cap nhat thanh cong
      message: "Cập nhật trạng thái thành công"
    })
  } catch (error) {
    res.json({
      code: 400, // cap nhat thanh cong
      message: "Không tồn tại"
    })
  }
}

export const changeMultiStatus = async (req: Request, res: Response) => {
  try {
    const ids: string[] = req.body.ids
    const key: string = req.body.key
    const value: string = req.body.value

    switch (key) { //- dang test vs Postman vs key la status
      case "status":
        await Task.updateMany({
          _id: { $in: ids }
        }, {
          status: value
        })

        res.json({
          code: 200,
          message: "Cập nhật trạng thái thành công"
        })
        break;

      default:
        break
    }
  } catch (error) {
    res.json({
      code: 400, // cap nhat thanh cong
      message: "Không tồn tại"
    })
  }
}

export const create = async (req: Request, res: Response) => {

  try{
    const task = new Task(req.body)
    const data = await task.save()

    res.json({
      code: 200,
      message: "Cập nhật trạng thái thành công",
      data: data
    })
  } catch(err){
    res.json({
      code: 400,
      message: "Lỗi"
    })
  }
  
}