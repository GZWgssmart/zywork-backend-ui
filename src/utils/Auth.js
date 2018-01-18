import getSortedKeys from './JSON'
let md5 = require('js-md5')

const generateSignature = (jsonData, signType = 'md5') => {
  let sortedKeys = getSortedKeys(jsonData)
  let str = String()
  sortedKeys.forEach(function (key) {
    if (key !== 'sign') {
      str = str + key + jsonData[key]
    }
  })
  return md5.base64(str).toUpperCase()
}

export default generateSignature
