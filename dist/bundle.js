(function (modules) { // webpackBootstrap
  // install a JSONP callback for chunk loading
  function webpackJsonpCallback(data) {
    var chunkIds = data[0];
    var moreModules = data[1];


    // add "moreModules" to the modules object,
    // then flag all "chunkIds" as loaded and fire callback
    var moduleId, chunkId, i = 0, resolves = [];
    for (; i < chunkIds.length; i++) {
      chunkId = chunkIds[i];
      if (installedChunks[chunkId]) {
        resolves.push(installedChunks[chunkId][0]);
      }
      installedChunks[chunkId] = 0;
    }
    for (moduleId in moreModules) {
      if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
        modules[moduleId] = moreModules[moduleId];
      }
    }
    if (parentJsonpFunction) parentJsonpFunction(data);

    while (resolves.length) {
      resolves.shift()();
    }

  };

  // The module cache
  var installedModules = {};

  // object to store loaded and loading chunks
  // undefined = chunk not loaded, null = chunk preloaded/prefetched
  // Promise = chunk loading, 0 = chunk loaded
  // 未加载undefined -> 预加载null -> 加载中promise -> 加载完成0
  var installedChunks = {
    "main": 0
  };

  // script path function
  //参数是代码块的id 返回代码块的加载路径
  function jsonpScriptSrc(chunkId) {
    //p就是配置里的publicPath
    return webpackRequire.publicPath + "" + chunkId + ".bundle.js"
  }

  // The require function
  function webpackRequire(moduleId) {

    // Check if module is in cache
    if (installedModules[moduleId]) {
      return installedModules[moduleId].exports;
    }
    // Create a new module (and put it into the cache)
    var module = installedModules[moduleId] = {
      //模块的标识符
      i: moduleId,
      //是否已经加载
      isLoaded: false,
      // 导出对象
      exports: {}
    };

    // Execute the module function
    modules[moduleId].call(module.exports, module, module.exports, webpackRequire);

    // Flag the module as loaded
    module.isLoaded = true;

    // Return the exports of the module
    return module.exports;
  }

  // This file contains only the entry chunk(就是entry).
  // The chunk loading function for additional chunks
  // 这个chunk加载函数式为了动态加载额外的代码块
  webpackRequire.e = function requireEnsure(chunkId) {
    var promises = [];


    // JSONP chunk loading for javascript

    var installedChunkData = installedChunks[chunkId];
    if (installedChunkData !== 0) { // 0 means "already installed".

      // a Promise means "currently loading".
      if (installedChunkData) {
        promises.push(installedChunkData[2]);
      } else {
        // setup Promise in chunk cache
        var promise = new Promise(function (resolve, reject) {
          installedChunkData = installedChunks[chunkId] = [resolve, reject];
        });
        promises.push(installedChunkData[2] = promise);

        // start chunk loading
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        var onScriptComplete;

        script.charset = 'utf-8';
        script.timeout = 120;
        if (webpackRequire.nc) {
          script.setAttribute("nonce", webpackRequire.nc);
        }
        script.src = jsonpScriptSrc(chunkId);

        onScriptComplete = function (event) {
          // avoid mem leaks in IE.
          script.onerror = script.onload = null;
          clearTimeout(timeout);
          var chunk = installedChunks[chunkId];
          if (chunk !== 0) {
            if (chunk) {
              var errorType = event && (event.type === 'load' ? 'missing' : event.type);
              var realSrc = event && event.target && event.target.src;
              var error = new Error('Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')');
              error.type = errorType;
              error.request = realSrc;
              chunk[1](error);
            }
            installedChunks[chunkId] = undefined;
          }
        };
        var timeout = setTimeout(function () {
          onScriptComplete({type: 'timeout', target: script});
        }, 120000);
        script.onerror = script.onload = onScriptComplete;
        head.appendChild(script);
      }
    }
    return Promise.all(promises);
  };

  // expose the modules object (__webpack_modules__)
  webpackRequire.m = modules;

  // expose the module cache
  webpackRequire.c = installedModules;

  // define getter function for harmony exports
  webpackRequire.d = function (exports, name, getter) {
    if (!webpackRequire.o(exports, name)) {
      Object.defineProperty(exports, name, {enumerable: true, get: getter});
    }
  };

  // define __esModule on exports
  webpackRequire.r = function (exports) {
    if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
      Object.defineProperty(exports, Symbol.toStringTag, {value: 'Module'});
    }
    Object.defineProperty(exports, '__esModule', {value: true});
  };

  // create a fake namespace object
  // mode & 1: value is a module id, require it
  // mode & 2: merge all properties of value into the ns
  // mode & 4: return value when already ns object
  // mode & 8|1: behave like require
  webpackRequire.t = function (value, mode) {
    if (mode & 1) value = webpackRequire(value);
    if (mode & 8) return value;
    if ((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
    var ns = Object.create(null);
    webpackRequire.r(ns);
    Object.defineProperty(ns, 'default', {enumerable: true, value: value});
    if (mode & 2 && typeof value != 'string') for (var key in value) webpackRequire.d(ns, key, function (key) {
      return value[key];
    }.bind(null, key));
    return ns;
  };

  // getDefaultExport function for compatibility with non-harmony modules
  webpackRequire.n = function (module) {
    var getter = module && module.__esModule ?
      function getDefault() {
        return module['default'];
      } :
      function getModuleExports() {
        return module;
      };
    webpackRequire.d(getter, 'a', getter);
    return getter;
  };

  // Object.prototype.hasOwnProperty.call
  webpackRequire.o = function (object, property) {
    return Object.prototype.hasOwnProperty.call(object, property);
  };

  // __webpack_public_path__
  webpackRequire.publicPath = "";

  // on error function for async loading
  webpackRequire.oe = function (err) {
    console.error(err);
    throw err;
  };

  var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
  var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
  jsonpArray.push = webpackJsonpCallback;
  jsonpArray = jsonpArray.slice();
  for (var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
  var parentJsonpFunction = oldJsonpFunction;


  // Load entry module and return exports
  return webpackRequire(webpackRequire.s = "./src/index.js");
})
({
  "./src/index.js":
    (function (module, exports, webpackRequire) {

      eval("window.app.addEventListener('click', function () {\r\n    webpackRequire.e(/*! import() */ 0).then(webpackRequire.bind(null, /*! ./click.js */ \"./src/click.js\")).then((param) => {\r\n        console.log(param);\r\n    })\r\n})\n\n//# sourceURL=webpack:///./src/index.js?");

    })

});