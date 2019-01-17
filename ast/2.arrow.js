/**
 * 把源码转成语法ast
 * 对语法树进行遍历和转换
 * 把处理后的语法树重新生成代码
 */

//babel核心库--本身没有转换逻辑只是一个引擎，需要配合插件
const babel = require('@babel/core');

//t用来处理类型的，可以通过它来判断某个对象是不是某个特定的类型
//或者生成某个类型的实例
const t = require('@babel/types');


let transformArrowFunction = {
  visitor: {
    //nodePath不但包含了那个节点，而且还包含了父节点，上下文。
    //还可以替换节点
    ArrowFunctionExpression(nodePath) {
      let node = nodePath.node;
      let id = nodePath.parent.id;
      let params = node.params;

      let body = t.blockStatement([
        t.returnStatement(node.body)
      ]);
      //generator false
      //async false
      let functionExpression = t.functionExpression(id, params, body, false, false);
      nodePath.parentPath.parentPath.replaceWith(functionExpression);
    }
  }
};

const code = `const sum = (a,b)=>a+b`;
const result = babel.transform(code, {
  plugins: [transformArrowFunction]
});


console.log(result.code);