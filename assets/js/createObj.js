
export default class Result {
  constructor ({ id, col1, col2, col3 }) {
    this.id = id
    this.col1 = col1
    this.col2 = col2
    this.col3 = col3
  }
}

// 创建result对象
export function createResult (data) {
  return new Result({
    id: data.Id,
    col1: data.Name || data.Position,
    col2: data.IndustryField,
    col3: data.ResearchDirection || data.CoopWay || data.InvestmentScale || data.JobDuties
  })
}
