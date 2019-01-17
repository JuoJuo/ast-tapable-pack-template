/**
 * 把源码转成语法ast
 * 对语法树进行遍历和转换
 * 把处理后的语法树重新生成代码
 */

const esprima = require('esprima');// 通过 esprima 把源码转化为AST
const estraverse = require('estraverse');// 通过 estraverse 遍历并更新AST
const escodegen = require('escodegen');// 通过 escodegen 将AST重新生成源码


let code = 'function ast(){}';
let ast = esprima.parse(code);
// console.log(ast);
// https://astexplorer.net/


let indent = 0;
function pad() {
  return ' '.repeat(indent);
}
//遍历ast， 深度优先
estraverse.traverse(ast, {
  enter(node) {
    console.log(pad() + '进入' + node.type);
    if (node.type == 'FunctionDeclaration') {
      node.id.name = 'ast_rename';
    }
    indent += 2;
  },
  leave(node) {
    indent -= 2;
    console.log(pad() + '离开' + node.type);
  }
});

let generated = escodegen.generate(ast);
console.log(generated);