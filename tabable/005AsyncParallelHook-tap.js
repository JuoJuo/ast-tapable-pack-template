// 任务里有异步，所以这个称为异步并行
// AsyncParallelHook-tap这个跟SyncHook几乎是同样的效果

// 原本想着在执行task的时候，用setTimout让任务异步，实际测试的时候，发现1 2 3的任务都被添加到同一个下一次的事件循环里，还是相当于串行
class AsyncParallelHook {
    constructor(argNames) {
        this.tasks = [];
        this.argNames = argNames;
    }

    tap(name, task) {
        this.tasks.push(task);
    }

    callAsync(...args) {
        const finalCallback = args.pop();
        this.tasks.forEach(task => task(...args));
        finalCallback();
    }
}

let hook = new AsyncParallelHook(['name']);

console.time('cost');

hook.tap('1', function (name) {
    setTimeout(() => {
        console.log(1, name);
    }, 1000)
})

hook.tap('2', function (name) {
    setTimeout(() => {
        console.log(2, name);
    }, 2000)
})
hook.tap('3', function (name) {
    setTimeout(() => {
        console.log(3, name);
    }, 3000)
})

hook.callAsync('lirenjie', () => {
    console.log('well done')
    console.timeEnd('cost');
})
