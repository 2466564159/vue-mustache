import parseTemplateToTokens from './parseTemplateToTokens'

// 全局提供ZX_TemplateEngine对象
window.ZX_TemplateEngine = {
  // 渲染方法
  render (templateStr, data) {
    // 调用parseTemplateToTokens函数，让模板字符串能够变为tokens数组
    let tokens = parseTemplateToTokens(templateStr)
    console.log(tokens)
  }
}