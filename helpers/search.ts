interface Search {
  keyword: string,
  regex?: RegExp
}

const searchHelper = (query: Record<string, any>): Search => {
  let objSearch: Search = {
    keyword: ""
  }
  if (query.keyword) {
    objSearch.keyword = query.keyword
    const regex = new RegExp(objSearch.keyword, "i") //i: ko phan biet hoa thg
    // console.log(regex): /iphone/i
    objSearch.regex = regex
  }

  return objSearch
}

export default searchHelper