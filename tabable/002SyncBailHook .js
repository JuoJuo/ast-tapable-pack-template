// 串行同步的，只不过，一旦有返回值不为null或者undfined，就停止下一个任务的执行
class SyncBailHook{
    constructor(argNames){
        this.tasks = [];
        this.argNames = argNames;
    }

    tap(name, task){
        this.tasks.push(task);
    }

    call(){
        let args = Array.prototype.slice.call(arguments, 0, this.argNames.length);
        let ret, i = 0;
        do{
            ret = this.tasks[i++](...args);
        }while(!ret)
    }
}

let queue = new SyncBailHook(['name']);
queue.tap('1',function(name){
  console.log(name,1);
  return 'Wrong';
});
queue.tap('2',function(name){
  console.log(name,2);
});
queue.tap('3',function(name){
  console.log(name,3);
});
queue.call('lirenjie');
