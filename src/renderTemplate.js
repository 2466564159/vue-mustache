import lookup from "./lookup"

// 让tokens数组变为dom字符串
export default function renderTemplate(tokens, data) {
  // 结果字符串
  let resultStr = ''

  for (const token of tokens) {
    // 看类型
    if (token[0] == 'text') {
      resultStr += token[1]
    } else if (token[0] == 'name') {
      // 使用lookup防止这里是'a.b.c'有逗号的形式 或者 . 的形式
      resultStr += lookup(data, token[1])
    } else if (token[0] == '#') {
      // token[1]为循环数据的键名
      // token[2]为循环的tokens
      // 获取循环的数据
      let vals = lookup(data, token[1])
      for (const val of vals) {
        // 递归调用renderTemplate
        resultStr += renderTemplate(token[2], val)
      }

    }
  }
  
  return resultStr
} 