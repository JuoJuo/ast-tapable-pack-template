// 同步串行，只不过，会判断每一个任务的返回值，如果是true就再执行，直到返回undefined为止，才执行下一个任务
class SyncLoopHook {
    constructor(argNames) {
        this.tasks = [];
        this.argNames = argNames;
    }

    tap(name, task) {
        this.tasks.push(task);
    }

    call() {
        let args = Array.prototype.slice(arguments, 0, this.argNames.length);
        this.tasks.forEach(task => {
            let ret = true;
            do {
                ret = task(...args);
            } while (ret == true || !(ret === undefined))
        });
    }
}

let queue = new SyncLoopHook(['name']);
let count = 0;
queue.tap('1', function (name) {
    console.log(count++);
    if (count == 3) {
        return;
    } else {
        return true;
    }
});
queue.tap('2', function (name) {
    console.log("----------");
    return;
});
queue.call('zfpx');
