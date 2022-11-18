/*
  可以在dataObj对象中，寻找连续点符号的keyName属性
  比如，dataObj是
  {
    a: {
      b: {
        c: 100
      }
    }
  }
  那么lookup(dataObj, 'a.b.c') 结果就是100
*/
export default function lookup (dataObj, keyName) {
  if (keyName.trim() == '.') {
    // 当keyName为 . 时 表示dataObj为基本类型，直接返回自身
    return dataObj
  } else if (keyName.indexOf('.') != -1) {
    // 当keyName为 a.b.c 时
    let keys = keyName.split('.')
    let temp = dataObj

    for (const key of keys) {
      temp = temp[key]
    }

    return temp
  }

  return dataObj[keyName]
}