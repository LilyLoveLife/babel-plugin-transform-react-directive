/*
 * @Description: 
 * @version: 
 * @Author: 
 * @Date: 2024-04-26 00:39:45
 * @LastEditors: 
 * @LastEditTime: 2024-04-26 00:40:13
 */

export default (babel) => {
  const { types: t } = babel
  return {
    visitor: {
      // JSXAttribute
      JSXElement(path) {
        const { node } = path
        const { attributes } = node.openingElement
        // for (let attribute of attributes) {
        //   if (attribute.name.name === 'r-if') {

        //   }
        // }
        const rIFIndex = attributes.findIndex(item => item.name.name === 'r-if')
        let rIFAttribute
          // = attributes[rIFIndex]

        if (rIFIndex > -1) {
          rIFAttribute = node.openingElement?.attributes.splice(rIFIndex, 1)?.[0]
          const { expression: ifTest } = rIFAttribute.value
          const conditionalExpression = t.conditionalExpression(
            ifTest,
            { ...node },
            { type: 'NullLiteral' }
          )
          const jSXExpressionContainer = t.jSXExpressionContainer(conditionalExpression)
          path.replaceWith(jSXExpressionContainer)
        }
        
      }
    },
    
  }
}