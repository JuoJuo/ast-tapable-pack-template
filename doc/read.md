- 首先
```js
window.app.addEventListener('click', function () {
      webpackRequire
      .e(0)
      .then(webpackRequire.bind(null,"./src/click.js"))
      .then((param) => {
          console.log(param);
      })
})
```
- webpackRequire.e就是创建script标签，执行后，会执行webpackJsonpCallback，在这个函数里，给modules加上click.js:包装后的函数
，把webpackRequire.e返回的promise给成功了
```js
(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0], {
  "./src/click.js":
    (function (module, __webpack_exports__, __webpack_require__) {
      "use strict";
      eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\r\n    name: 'hello world'\r\n});\n\n//# sourceURL=webpack:///./src/click.js?");
    })
}]);
```
- 才能走接下来的.then(webpackRequire.bind(null,"./src/click.js"))
- webpackRequire.bind(null,"./src/click.js")执行click.js，并缓存，返回export
