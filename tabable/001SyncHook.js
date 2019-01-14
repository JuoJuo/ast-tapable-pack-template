// 串行同步的
class SyncHook{
    constructor(argNames){
        this.tasks = [];
        this.argNames = argNames;
    }

    tap(name, task){
        this.tasks.push(task);
    }

    call(...args){
        // 思维拓展语法（优点就是在new SyncHook(['name', 'age', 'xx'])里面数组的个数就决定了arg的length，不会把多的参数给传进去）
        // let args = Array.prototype.slice.call(arguments, 0, this.argNames.length);
        this.tasks.forEach(task => task(...args));
    }
}

let queue = new SyncHook(['name', 'age', 'xx']);

queue.tap('1', function(name, age, xx){
    console.log(name, age, xx);
})
queue.tap('2', function(name){
    console.log(name);
})

queue.call('lirenjie',9,888,88888)
