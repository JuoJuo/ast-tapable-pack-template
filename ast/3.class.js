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


let transformClass = {
  visitor: {
    ClassDeclaration(path) {
      let node = path.node;
      let id = node.id;
      let constructorFunction = t.functionDeclaration(id, [], t.blockStatement([]), false, false);
      let methods = node.body.body;
      let functions = [];
      methods.forEach(method => {
        if (method.kind == 'constructor') {
          constructorFunction = t.functionDeclaration(id, method.params, method.body, false, false);
          functions.push(constructorFunction);
        } else {
          let memberObj = t.memberExpression(t.memberExpression(id, t.identifier('prototype')), method.key);
          let memberFunction = t.functionExpression(id, method.params, method.body, false, false);
          let assignment = t.assignmentExpression('=', memberObj, memberFunction);
          functions.push(assignment);
        }
      });
      if (functions.length == 1) {
        path.replaceWith(functions[0]);
      } else {
        path.replaceWithMultiple(functions);
      }
    }
  }
};

const code = `class Person {
      constructor(name) {
          this.name=name;
      }
      getName() {
          return this.name;
      }
  }`;
/*
*    function Person(){ this.name = name}
*    Person.prototype.getName = function(){ return this.name }
* */
const result = babel.transform(code, {
  plugins: [transformClass]
});


console.log(result.code);