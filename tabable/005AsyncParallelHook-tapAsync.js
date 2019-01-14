//let {AsyncParallelHook}=require('tapable');
// 这个的区别是，所有任务完了才调完成的回调
class AsyncParallelHook {
    constructor() {
        this.tasks = [];
    }
    tapAsync(name, task) {
        this.tasks.push(task);
    }
    callAsync() {
        let args = Array.from(arguments);
        let callback = args.pop();
        let i = 0, size = this.tasks.length;
        function done() {
            if (++i == size) {
                callback(null);
            }
        }
        this.tasks.forEach(task => {
            task(...args, done);
        });
    }
}
let queue = new AsyncParallelHook(['name']);
console.time('cost');
queue.tapAsync('1', function (name, callback) {
    setTimeout(function () {
        console.log(1);
        callback();
    }, 1000)
});
queue.tapAsync('2', function (name, callback) {
    setTimeout(function () {
        console.log(2);
        callback();
    }, 2000)
});
queue.tapAsync('3', function (name, callback) {
    setTimeout(function () {
        console.log(3);
        callback();
    }, 3000)
});
queue.callAsync('zfpx', err => {
    console.log(err);
    console.timeEnd('cost');
});
