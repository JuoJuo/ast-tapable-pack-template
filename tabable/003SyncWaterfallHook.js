// 也是同步串行的，只不过上一个函数的执行结果，当参数传给了下一个函数
class SyncWaterfallHook {
    constructor(argNames) {
        this.tasks = [];
        this.argNames = argNames;
    }

    tap(name, task) {
        this.tasks.push(task);
    }

    call() {
        let args = Array.prototype.slice.call(arguments, 0, this.argNames.length);
        let [first, ...leftTask] = this.tasks;
        // leftTask.reduce((prev, next) => next(prev), first(...args))
        this.tasks.reduce((prev, next) => (...args) => next(prev(...args)))(...args);
    }
}


let queue = new SyncWaterfallHook(['a', 'b']);
queue.tap('1', function (a, b) {
    console.log(a, b);
    return a + b;
});
queue.tap('2', function (data) {
    console.log(data);
    return data.toUpperCase();
});
queue.tap('3', function (data) {
    console.log(data);
    return data.length;
});
queue.call('a', 'b');
