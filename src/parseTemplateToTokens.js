import Scanner from './Scanner'

// 将模板字符串变为tokens数组
export default function parseTemplateToTokens(templateStr) {
  let tokens = []

  // 创建扫描器
  let scanner = new Scanner(templateStr)
  // 让扫描器工作
  let words
  while (!scanner.eos()) {
    // 收集开始标记出现之前的文字
    words = scanner.scanUtil('{{')
    // 存起来
    if (words != '') tokens.push(['text', words])
    // 过双大括号
    scanner.scan('{{')

    // 收集结束标记出现之前的文字
    words = scanner.scanUtil('}}')
    // 存起来
    if (words != '') {
      // 这个words就是{{}}中间的东西，判断一下首字符
      if (words[0] == '#') {
        tokens.push(['#', words.substring(1)])
      } else if (words[0] == '/') {
        tokens.push(['/', words.substring(1)])
      } else {
        tokens.push(['name', words])
      }
    }
    // 过双大括号
    scanner.scan('}}')
  }

  return tokens
}