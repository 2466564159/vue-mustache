import Scanner from './Scanner'
import nestTokens from './nestTokens'

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
    if (words != '') {
      // 去空格
      // 标记是否在标签里
      let isInJJH = false
      let _words = ''
      for (let i = 0; i < words.length; i++) {

        // 判断是否在标签里
        if (words[i] == '<') {
          isInJJH = true
        } else if (words[i] == '>') {
          isInJJH = false
        }

        // 如果这项不是空格，拼接上
        if (!/\s/.test(words[i])) {
          _words += words[i]
        } else {
          // 如果这项是空格，只有当它在标签内的时候，才拼接上
          if (isInJJH) {
            _words += words[i]
          }
        }

      }
      tokens.push(['text', _words])
    }
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

  // 返回折叠收集的tokens
  return nestTokens(tokens)
}