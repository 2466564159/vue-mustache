import parseTemplateToTokens from './parseTemplateToTokens'
import renderTemplate from './renderTemplate'

// 全局提供ZX_TemplateEngine对象
window.ZX_TemplateEngine = {
  // 渲染方法
  render (templateStr, data) {
    // 调用parseTemplateToTokens函数，让模板字符串能够变为tokens数组
    let tokens = parseTemplateToTokens(templateStr)
    // 调用renderTemplate函数，让tokens数组变为dom字符串
    let domStr = renderTemplate(tokens, data)
    
    return domStr
  }
}