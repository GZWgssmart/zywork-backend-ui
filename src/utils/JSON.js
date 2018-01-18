const getSortedKeys = (jsonData) => {
  let keyArray = []
  for (let key in jsonData) {
    keyArray.push(key)
  }
  keyArray.sort()
  return keyArray
}

export default getSortedKeys
