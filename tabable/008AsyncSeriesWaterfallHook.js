// let { AsyncSeriesWaterfallHook } = require('tapable');
class AsyncSeriesWaterfallHook {
  constructor() {
    this.tasks = [];
  }
  tapPromise(name, task) {
    this.tasks.push(task);
  }
  promise(...args) {
    //first是第一个函数， tasks是剩下的函数
    let [first, ...tasks] = this.tasks;
    return tasks.reduce((a, b) => {
      return a.then((data) => b(data));
    }, first(...args));
  }
}
let queue = new AsyncSeriesWaterfallHook(['name']);
console.time('cost');
queue.tapPromise('1', function (name) {
  return new Promise(function (resolve) {
    setTimeout(function () {
      console.log(name, 1);
      resolve(1);
    }, 1000);
  });
});
queue.tapPromise('2', function (data) {
  return new Promise(function (resolve) {
    setTimeout(function () {
      console.log(data, 2);
      resolve(2);
    }, 2000);
  });
});
queue.tapPromise('3', function (data) {
  return new Promise(function (resolve) {
    setTimeout(function () {
      console.log(data, 3);
      resolve(3);
    }, 3000);
  });
});
queue.promise('zfpx').then(err => {
  console.timeEnd('cost');
});
