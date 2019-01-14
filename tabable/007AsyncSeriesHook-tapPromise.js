class AsyncSeriesHook{
  constructor() {
    this.tasks=[];
  }
  tapPromise(name,task) {
    this.tasks.push(task);
  }
  promise() {
    let promises=this.tasks.map(item => item());
    return promises.reduce((a,b) => a.then(()=>b));
  }
}
let queue=new AsyncSeriesHook(['name']);
console.time('cost');
queue.tapPromise('1',function(name){
  return new Promise(function(resolve){
    setTimeout(function(){
      console.log(1);
      resolve();
    },1000)
  });
});
queue.tapPromise('2',function(name,callback){
  return new Promise(function(resolve){
    setTimeout(function(){
      console.log(2);
      resolve();
    },2000)
  });
});
queue.tapPromise('3',function(name,callback){
  return new Promise(function(resolve){
    setTimeout(function(){
      console.log(3);
      resolve();
    },3000)
  });
});
queue.promise('zfpx').then(data=>{
  console.log(data);
  console.timeEnd('cost');
});

