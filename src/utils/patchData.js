import { isEmpty } from 'lodash';
var qs = require('qs');

function patchData(datas) {
  if (isEmpty(datas)) {
    return null
  }

  const dataName = Object.keys(datas)
  const requestData = []
  dataName.map((name) => {
    requestData[name] = datas[name]
  })

  return qs.stringify(requestData)
}

export default patchData
